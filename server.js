const express = require('express');
const http = require('http');
const path = require('path');
const os = require('os');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('error', (err) => {
  if (err.code !== 'EADDRINUSE') {
    console.error('WebSocketServer error:', err);
  }
});

let currentPort = Number(process.env.PORT || 80);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bleach-vs-naruto-3.3', express.static(path.join(__dirname, 'bleach-vs-naruto-3.3'), {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));
app.use('/ruffle', express.static(path.join(__dirname, 'public/ruffle')));

// Helper: Get local network LAN IPv4 addresses
function getLanIps() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        ips.push({ interface: name, address: net.address });
      }
    }
  }
  return ips;
}

// Link Online Tunnel (localtunnel không giới hạn băng thông)
let publicTunnelUrl = null;
let isTunneling = false;

async function enableOnlineTunnel() {
  if (isTunneling) return publicTunnelUrl;
  isTunneling = true;
  try {
    const localtunnel = require('localtunnel');
    console.log(`\n⏳ Đang thiết lập đường hầm Online Tunnel (mở port ra Internet)...`);
    const tunnel = await localtunnel({ port: currentPort });
    publicTunnelUrl = tunnel.url;
    console.log('='.repeat(60));
    console.log('🌐 LINK ONLINE INTERNET (Gửi cho bất kỳ ai không cần cùng Wi-Fi):');
    console.log(`   👉 ${publicTunnelUrl}`);
    console.log('='.repeat(60) + '\n');

    tunnel.on('close', () => {
      console.log('⚠️ Đường hầm Online Tunnel đã đóng.');
      publicTunnelUrl = null;
      isTunneling = false;
    });

    tunnel.on('error', (err) => {
      console.error('Online tunnel error:', err.message);
      publicTunnelUrl = null;
      isTunneling = false;
    });

    return publicTunnelUrl;
  } catch (err) {
    console.error('Không thể tạo online tunnel:', err.message);
    isTunneling = false;
    return null;
  }
}

// REST endpoint to get server info & LAN IPs
app.get('/api/server-info', (req, res) => {
  res.json({
    port: currentPort,
    lanIps: getLanIps(),
    onlineUrl: publicTunnelUrl,
    roomsCount: rooms.size
  });
});

// Endpoint to enable online tunnel on demand from web UI
app.post('/api/enable-online', async (req, res) => {
  try {
    const url = await enableOnlineTunnel();
    res.json({ success: !!url, onlineUrl: url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Game Room State Management
 * room = {
 *   id: string,
 *   players: { X: ws | null, O: ws | null },
 *   spectators: Set<ws>,
 *   moves: Map<string, { x: number, y: number, player: 'X'|'O', order: number, time: number }>,
 *   moveList: Array<{ x: number, y: number, player: 'X'|'O', order: number }>,
 *   currentTurn: 'X' | 'O',
 *   winner: 'X' | 'O' | null,
 *   winningLine: Array<{x: number, y: number}> | null,
 *   scores: { X: number, O: number },
 *   rematchVotes: Set<'X' | 'O'>
 * }
 */
function createCaroRoom(id = 'caro-default', name = 'Phòng Cờ Đại Sảnh (Công Khai)', password = '') {
  return {
    id,
    name: name || `Phòng Cờ #${id.slice(-4)}`,
    hasPassword: !!password,
    password: password || '',
    hostRole: 'X',
    players: { X: null, O: null },
    playerNames: { X: 'Player X', O: 'Player O' },
    spectators: new Set(),
    moves: new Map(),
    moveList: [],
    currentTurn: 'X',
    winner: null,
    winningLine: null,
    scores: { X: 0, O: 0 },
    rematchVotes: new Set(),
    createdAt: Date.now()
  };
}

const rooms = new Map();
rooms.set('caro-default', createCaroRoom('caro-default', 'Phòng Cờ Đại Sảnh (Công Khai)', ''));

function getOrCreateRoom(roomId) {
  const id = (roomId || 'caro-default').trim().toLowerCase();
  if (!rooms.has(id)) {
    rooms.set(id, createCaroRoom(id));
  }
  return rooms.get(id);
}

function getCaroRoomsSummary() {
  const list = [];
  for (const room of rooms.values()) {
    const humanCount = (room.players.X ? 1 : 0) + (room.players.O ? 1 : 0);
    let state = 'WAITING';
    if (room.winner) state = 'FINISHED';
    else if (room.moveList.length > 0) state = 'PLAYING';
    else if (humanCount === 2) state = 'READY';

    const hostName = (room.hostRole === 'O') ? room.playerNames.O : room.playerNames.X;

    list.push({
      id: room.id,
      name: room.name,
      hasPassword: room.hasPassword,
      playerCount: humanCount,
      spectatorCount: room.spectators.size,
      hasX: !!room.players.X,
      hasO: !!room.players.O,
      playerX: room.players.X ? room.playerNames.X : null,
      playerO: room.players.O ? room.playerNames.O : null,
      hostRole: room.hostRole,
      hostName: hostName || 'Chủ phòng',
      state,
      currentTurn: room.currentTurn,
      movesCount: room.moveList.length,
      scores: room.scores
    });
  }
  return list;
}

function broadcastCaroRoomsList() {
  const summary = getCaroRoomsSummary();
  const data = JSON.stringify({ type: 'CARO_ROOMS_LIST', rooms: summary });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function checkWin(movesMap, lastX, lastY, player) {
  const directions = [
    [1, 0],   // Horizontal
    [0, 1],   // Vertical
    [1, 1],   // Diagonal Down-Right
    [1, -1]   // Diagonal Up-Right
  ];

  for (const [dx, dy] of directions) {
    const line = [{ x: lastX, y: lastY }];

    // Forward
    let step = 1;
    while (true) {
      const key = `${lastX + step * dx},${lastY + step * dy}`;
      const move = movesMap.get(key);
      if (move && move.player === player) {
        line.push({ x: lastX + step * dx, y: lastY + step * dy });
        step++;
      } else {
        break;
      }
    }

    // Backward
    step = 1;
    while (true) {
      const key = `${lastX - step * dx},${lastY - step * dy}`;
      const move = movesMap.get(key);
      if (move && move.player === player) {
        line.unshift({ x: lastX - step * dx, y: lastY - step * dy });
        step++;
      } else {
        break;
      }
    }

    if (line.length >= 5) {
      return { won: true, winningLine: line };
    }
  }

  return { won: false, winningLine: null };
}

function broadcastToRoom(room, data) {
  const message = JSON.stringify(data);
  const targets = [room.players.X, room.players.O, ...room.spectators];
  for (const client of targets) {
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function serializeRoomState(room, forPlayerRole = null) {
  return {
    type: 'ROOM_STATE',
    roomId: room.id,
    roomName: room.name,
    hasPassword: room.hasPassword,
    currentTurn: room.currentTurn,
    winner: room.winner,
    winningLine: room.winningLine,
    scores: room.scores,
    moves: room.moveList,
    lastMove: room.moveList.length > 0 ? room.moveList[room.moveList.length - 1] : null,
    players: {
      X: room.players.X ? room.playerNames.X : null,
      O: room.players.O ? room.playerNames.O : null
    },
    spectatorCount: room.spectators.size,
    rematchVotes: Array.from(room.rematchVotes),
    yourRole: forPlayerRole,
    isHost: (room.hostRole === forPlayerRole)
  };
}

// =========================================================
// ASTRO PARTY ONLINE MULTIPLAYER ENGINE (SERVER-SIDE)
// =========================================================
const ASTRO_CONFIG = {
  V_WIDTH: 800,
  V_HEIGHT: 600,
  SHIP_SPEED: 135,          // 135 px/s: lướt mượt, nhạy bén, không bị trễ/chậm
  TURN_STEP: 15 * (Math.PI / 180), // Mỗi lần bấm rẽ xoay 1 góc nhẹ 15 độ (~0.2618 rad)
  BULLET_SPEED: 460,        // Tốc độ đạn bay mượt mà
  BULLET_MAX_DIST: 800 * 1.5,
  BULLET_MAX_LIFE: 2.5,
  PILOT_SPEED: 40,
  POINTS_TO_WIN: 5,
  TICK_INTERVAL: 16 // 60 FPS (16ms) - cực kỳ mượt mà, triệt tiêu hoàn toàn delay
};

const ASTRO_SHIP_SPEED = ASTRO_CONFIG.SHIP_SPEED;
const ASTRO_TURN_STEP = ASTRO_CONFIG.TURN_STEP;
const ASTRO_BULLET_SPEED = ASTRO_CONFIG.BULLET_SPEED;
const ASTRO_BULLET_MAX_DIST = ASTRO_CONFIG.BULLET_MAX_DIST;
const ASTRO_BULLET_MAX_LIFE = ASTRO_CONFIG.BULLET_MAX_LIFE;
const ASTRO_PILOT_SPEED = ASTRO_CONFIG.PILOT_SPEED;
const ASTRO_V_WIDTH = ASTRO_CONFIG.V_WIDTH;
const ASTRO_V_HEIGHT = ASTRO_CONFIG.V_HEIGHT;

const ASTRO_SPAWNS = [
  { x: 120, y: 120, angle: Math.PI * 0.25 },  // P1: Top-Left
  { x: 680, y: 480, angle: Math.PI * 1.25 },  // P2: Bottom-Right
  { x: 680, y: 120, angle: Math.PI * 0.75 },  // P3: Top-Right
  { x: 120, y: 480, angle: Math.PI * 1.75 }   // P4: Bottom-Left
];

const ASTRO_DEFAULT_NAMES = ['P1 (Cyan)', 'P2 (Magenta)', 'P3 (Green)', 'P4 (Yellow)'];

function createAstroRoom(id = 'astro-default', name = 'Phòng Đại Sảnh (Công Khai)', password = '', mode = 'PVP', botCount = 0) {
  const room = {
    id,
    name: name || `Phòng #${id.slice(-4)}`,
    hasPassword: !!password,
    password: password || '',
    mode: (mode === 'BOT') ? 'BOT' : 'PVP',
    hostSlot: 0,
    slots: [null, null, null, null],
    slotNames: [...ASTRO_DEFAULT_NAMES],
    isBot: [false, false, false, false],
    spectators: new Set(),
    mapType: 'CLASSIC', // 'CLASSIC', 'CROSS', 'MAZE', 'OPEN', 'MATRIX', 'RANDOM'
    state: 'LOBBY', // 'LOBBY' (Phòng chờ chọn màu/map), 'PLAYING', 'ROUND_OVER', 'MATCH_OVER'
    scores: [0, 0, 0, 0],
    players: [],
    bullets: [],
    laserBeams: [],
    blocks: [],
    drops: [],
    bombs: [],
    events: [],
    roundTimer: 0,
    roundWinnerText: '',
    matchWinnerText: '',
    interval: null,
    lastTime: Date.now()
  };

  if (room.mode === 'BOT') {
    const numBots = Math.min(3, Math.max(1, Number(botCount) || 1));
    let added = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== room.hostSlot && added < numBots) {
        room.isBot[i] = true;
        room.slotNames[i] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][i]})`;
        added++;
      }
    }
  }

  return room;
}

const astroRooms = new Map();

// Initialize default public room (PvP Mode by default)
astroRooms.set('astro-default', createAstroRoom('astro-default', 'Phòng Đại Sảnh (Công Khai)', '', 'PVP'));

function getOrCreateAstroRoom(id = 'astro-default') {
  if (!astroRooms.has(id)) {
    astroRooms.set(id, createAstroRoom(id));
  }
  return astroRooms.get(id);
}

function getAstroRoomsSummary() {
  const list = [];
  for (const room of astroRooms.values()) {
    const humanCount = room.slots.filter(s => s && s !== 'BOT').length;
    const botCount = room.isBot.filter(b => b).length;
    const totalPlayers = humanCount + botCount;
    const hostName = room.slotNames[room.hostSlot] || 'Chủ phòng';
    list.push({
      id: room.id,
      name: room.name,
      hasPassword: room.hasPassword,
      mode: room.mode || 'PVP',
      playerCount: totalPlayers,
      humanCount,
      botCount,
      maxPlayers: 4,
      state: room.state,
      mapType: room.mapType,
      hostName: hostName.replace(/\s\((Cyan|Magenta|Green|Yellow)\)$/, ''),
      slots: room.slots.map((s, i) => ({
        slot: i,
        occupied: !!s || room.isBot[i],
        isBot: room.isBot[i],
        name: room.slotNames[i]
      }))
    });
  }
  return list;
}

function broadcastAstroRoomsList() {
  const summary = getAstroRoomsSummary();
  const data = JSON.stringify({ type: 'ASTRO_ROOMS_LIST', rooms: summary });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function broadcastAstroRoomUpdate(room) {
  const data = JSON.stringify({
    type: 'ASTRO_ROOM_UPDATE',
    room: {
      id: room.id,
      name: room.name,
      hasPassword: room.hasPassword,
      mode: room.mode || 'PVP',
      hostSlot: room.hostSlot,
      mapType: room.mapType,
      state: room.state,
      scores: room.scores,
      slots: room.slots.map((s, i) => ({
        slot: i,
        connected: !!s,
        isBot: room.isBot[i],
        name: room.slotNames[i]
      })),
      spectatorsCount: room.spectators.size
    }
  });
  broadcastToAstroRoom(room, data);
}

function generateAstroBlocks(mapType = 'CLASSIC') {
  const blocks = [];
  const blockSize = 40;
  const gridW = 20; // 800 / 40
  const gridH = 15; // 600 / 40

  let type = mapType;
  if (type === 'RANDOM') {
    const list = ['CLASSIC', 'CROSS', 'MAZE', 'OPEN', 'MATRIX'];
    type = list[Math.floor(Math.random() * list.length)];
  }

  if (type === 'CLASSIC') {
    // 1. ĐẤU TRƯỜNG CỔ ĐIỂN
    // 4 trụ kim loại phản xạ
    const pillars = [
      { gx: 6, gy: 4 }, { gx: 13, gy: 4 },
      { gx: 6, gy: 10 }, { gx: 13, gy: 10 }
    ];
    pillars.forEach(p => {
      blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
    });

    // Các cụm hộp hàng có thể bắn nổ (rơi quà)
    for (let gy = 3; gy <= 11; gy++) {
      for (let gx = 5; gx <= 14; gx++) {
        if ((gx === 9 || gx === 10) && (gy === 4 || gy === 10)) {
          blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
        } else if ((gy === 6 || gy === 8) && (gx === 7 || gx === 12)) {
          blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
        }
      }
    }

    // 4 ĐOẠN CỔNG NĂNG LƯỢNG XUYÊN TƯỜNG (Người & đạn bay xuyên qua!)
    blocks.push({ x: 9 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 10 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 4 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 15 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

  } else if (type === 'CROSS') {
    // 2. PHÁO ĐÀI CHỮ THẬP
    // 4 góc pháo đài là thép kim loại
    const steels = [
      { gx: 8, gy: 5 }, { gx: 11, gy: 5 },
      { gx: 8, gy: 9 }, { gx: 11, gy: 9 },
      { gx: 5, gy: 4 }, { gx: 14, gy: 4 },
      { gx: 5, gy: 10 }, { gx: 14, gy: 10 }
    ];
    steels.forEach(p => {
      blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
    });

    // Cánh chữ thập là hộp phá hủy được
    const crates = [
      { gx: 9, gy: 5 }, { gx: 10, gy: 5 },
      { gx: 9, gy: 9 }, { gx: 10, gy: 9 },
      { gx: 7, gy: 7 }, { gx: 8, gy: 7 },
      { gx: 11, gy: 7 }, { gx: 12, gy: 7 }
    ];
    crates.forEach(p => {
      blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
    });

    // Cổng xuyên thấu giữa lõi pháo đài và 2 cửa ngõ
    blocks.push({ x: 9 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 10 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 9 * blockSize, y: 3 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 10 * blockSize, y: 11 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

  } else if (type === 'MAZE') {
    // 3. MÊ CUNG KHÔNG GIAN
    for (let gy = 3; gy <= 11; gy++) {
      for (let gx = 5; gx <= 14; gx++) {
        const bx = gx * blockSize;
        const by = gy * blockSize;
        if ((gx === 6 && (gy === 3 || gy === 4 || gy === 10 || gy === 11)) ||
            (gx === 13 && (gy === 3 || gy === 4 || gy === 10 || gy === 11))) {
          blocks.push({ x: bx, y: by, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
        } else if ((gy === 5 || gy === 9) && (gx >= 8 && gx <= 11 && gx !== 9 && gx !== 10)) {
          blocks.push({ x: bx, y: by, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
        } else if ((gx === 6 && gy !== 7) || (gx === 13 && gy !== 7)) {
          blocks.push({ x: bx, y: by, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
        }
      }
    }

    // 4 CỔNG XUYÊN TƯỜNG BÍ MẬT THOÁT HIỂM
    blocks.push({ x: 6 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 13 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 9 * blockSize, y: 5 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 10 * blockSize, y: 9 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

  } else if (type === 'OPEN') {
    // 4. VŨ TRỤ MỞ
    // 2 trạm vệ tinh kim loại
    blocks.push({ x: 8 * blockSize, y: 6 * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
    blocks.push({ x: 11 * blockSize, y: 8 * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });

    // Hộp quà vỡ
    blocks.push({ x: 9 * blockSize, y: 4 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
    blocks.push({ x: 10 * blockSize, y: 10 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
    blocks.push({ x: 6 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
    blocks.push({ x: 13 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });

    // 2 Cổng Warp xuyên tường ở 2 biên
    blocks.push({ x: 3 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 16 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

  } else if (type === 'MATRIX') {
    // 5. MA TRẬN CỘT ĐÁ
    for (let my = 4; my <= 10; my += 3) {
      for (let mx = 6; mx <= 13; mx += 3.5) {
        const gx = Math.round(mx);
        const gy = Math.round(my);
        if (gx === 10 && gy === 7) {
          // Tâm ma trận là Cổng Xuyên Thấu!
          blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
        } else {
          const isInd = (gx === 6 || gx === 13) && (gy === 4 || gy === 10);
          blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: isInd, isPhasePortal: false, dead: false });
        }
      }
    }
    // 2 cổng xuyên thấu phụ
    blocks.push({ x: 10 * blockSize, y: 4 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    blocks.push({ x: 10 * blockSize, y: 10 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
  }

  return blocks;
}

function spawnAstroRound(room) {
  room.bullets = [];
  room.laserBeams = [];
  room.drops = [];
  room.bombs = [];
  room.blocks = generateAstroBlocks(room.mapType || 'CLASSIC');
  room.events = [];
  room.players = [];

  // Count active human/bot slots
  let activeCount = 0;
  for (let i = 0; i < 4; i++) {
    if (room.slots[i] || room.isBot[i]) activeCount++;
  }
  // If only 1 player, automatically add 1 AI Bot to an empty slot so they can battle!
  if (activeCount < 2) {
    const emptySlot = [0, 1, 2, 3].find(idx => !room.slots[idx] && !room.isBot[idx]);
    if (emptySlot !== undefined) {
      room.isBot[emptySlot] = true;
      room.slotNames[emptySlot] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][emptySlot]})`;
    }
  }

  for (let i = 0; i < 4; i++) {
    const isHuman = !!room.slots[i];
    const isBot = !isHuman && room.isBot[i];
    const isActive = isHuman || isBot;

    const sp = ASTRO_SPAWNS[i];
    room.players.push({
      id: i + 1,
      slot: i,
      x: sp.x,
      y: sp.y,
      angle: sp.angle,
      radius: 13,
      recoilTime: 0,
      isDestroyed: false,
      pilot: null,
      inputs: { rotate: false, shoot: false, rotateStep: false },
      isBot: isBot,
      active: isActive,
      botShootCooldown: 0,
      // Thính & Quà power-ups:
      leftBlade: false,
      rightBlade: false,
      bombsCount: 0,
      laserCharges: 0
    });
  }
}

function circleRect(cx, cy, r, rx, ry, rw, rh) {
  const closestX = Math.max(rx, Math.min(cx, rx + rw));
  const closestY = Math.max(ry, Math.min(cy, ry + rh));
  const distX = cx - closestX;
  const distY = cy - closestY;
  return (distX * distX + distY * distY) < (r * r);
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function destroyAstroShip(room, p) {
  if (p.isDestroyed) return;
  p.isDestroyed = true;
  p.leftBlade = false;
  p.rightBlade = false;
  p.bombsCount = 0;
  p.laserCharges = 0;
  const ejectAngle = p.angle + Math.PI + (Math.random() - 0.5) * 0.4;
  p.pilot = {
    x: p.x,
    y: p.y,
    angle: p.angle,
    turnFlickTimer: 0,
    radius: 5,
    vx: Math.cos(ejectAngle) * 140,
    vy: Math.sin(ejectAngle) * 140,
    dead: false
  };
  room.events.push({ type: 'EXPLOSION', slot: p.slot, x: p.x, y: p.y });
}

function updateAstroRoom(room, dt) {
  if (room.state === 'ROUND_OVER') {
    room.roundTimer -= dt;
    if (room.roundTimer <= 0) {
      const maxScore = Math.max(...room.scores);
      if (maxScore >= ASTRO_CONFIG.POINTS_TO_WIN) {
        const winIdx = room.scores.indexOf(maxScore);
        room.state = 'MATCH_OVER';
        room.matchWinnerText = `${room.slotNames[winIdx]} WINS THE MATCH!`;
        room.events.push({ type: 'MATCH_WIN', winnerSlot: winIdx });
      } else {
        spawnAstroRound(room);
        room.state = 'PLAYING';
      }
    }
    return;
  }

  if (room.state !== 'PLAYING') return;

  // 1. AI Bots decision making
  room.players.forEach(p => {
    if (!p.active || !p.isBot) return;

    // Find nearest active enemy
    let nearestDist = Infinity;
    let target = null;
    room.players.forEach(other => {
      if (other.id === p.id || !other.active) return;
      let tx = other.isDestroyed ? (other.pilot && !other.pilot.dead ? other.pilot.x : null) : other.x;
      let ty = other.isDestroyed ? (other.pilot && !other.pilot.dead ? other.pilot.y : null) : other.y;
      if (tx !== null && ty !== null) {
        const dist = Math.hypot(tx - p.x, ty - p.y);
        if (dist < nearestDist) {
          nearestDist = dist;
          target = { x: tx, y: ty };
        }
      }
    });

    if (target) {
      const curAngle = p.isDestroyed ? (p.pilot ? p.pilot.angle : 0) : p.angle;
      let targetAngle = Math.atan2(target.y - p.y, target.x - p.x);
      let diff = (targetAngle - curAngle) % (Math.PI * 2);
      if (diff < 0) diff += Math.PI * 2;

      // Rotate clockwise towards target
      p.inputs.rotate = diff > 0.25;

      // Shoot if roughly facing target
      if (!p.isDestroyed && diff < 0.35 && nearestDist < 420 && p.botShootCooldown <= 0) {
        p.inputs.shoot = true;
        p.botShootCooldown = 0.35 + Math.random() * 0.35;
      }
    }
    if (p.botShootCooldown > 0) p.botShootCooldown -= dt;
  });

  // 2. Ships & Pilots Movement
  room.players.forEach(p => {
    if (!p.active) return;

    if (p.isDestroyed) {
      if (p.pilot && !p.pilot.dead) {
        if (p.inputs.rotateStep) {
          p.pilot.angle = (p.pilot.angle + ASTRO_TURN_STEP) % (Math.PI * 2);
          p.inputs.rotateStep = false;
        } else if (p.inputs.rotate) {
          p.pilot.angle = (p.pilot.angle + 4.8 * dt) % (Math.PI * 2);
        }

        p.pilot.vx += (Math.cos(p.pilot.angle) * ASTRO_PILOT_SPEED - p.pilot.vx) * (dt * 3.5);
        p.pilot.vy += (Math.sin(p.pilot.angle) * ASTRO_PILOT_SPEED - p.pilot.vy) * (dt * 3.5);
        p.pilot.x += p.pilot.vx * dt;
        p.pilot.y += p.pilot.vy * dt;

        if (p.pilot.x < 0) p.pilot.x += ASTRO_CONFIG.V_WIDTH;
        else if (p.pilot.x > ASTRO_CONFIG.V_WIDTH) p.pilot.x -= ASTRO_CONFIG.V_WIDTH;
        if (p.pilot.y < 0) p.pilot.y += ASTRO_CONFIG.V_HEIGHT;
        else if (p.pilot.y > ASTRO_CONFIG.V_HEIGHT) p.pilot.y -= ASTRO_CONFIG.V_HEIGHT;
      }
      return;
    }

    // ZERO DELAY & SIÊU MƯỢT MÀ:
    // Nhấp nhẹ = Góc xoay 15° tức thì ngay frame bấm phím, KHÔNG delay!
    // Giữ phím = Quay tròn liên tục 4.8 rad/s siêu mượt
    if (p.inputs.rotateStep) {
      p.angle = (p.angle + ASTRO_TURN_STEP) % (Math.PI * 2);
      p.inputs.rotateStep = false;
    } else if (p.inputs.rotate) {
      p.angle = (p.angle + 4.8 * dt) % (Math.PI * 2);
    }

    let forwardSpeed = ASTRO_SHIP_SPEED;
    if (p.recoilTime > 0) {
      forwardSpeed -= 150;
      p.recoilTime -= dt;
    }

    p.x += Math.cos(p.angle) * forwardSpeed * dt;
    p.y += Math.sin(p.angle) * forwardSpeed * dt;

    if (p.x < 0) p.x += ASTRO_CONFIG.V_WIDTH;
    else if (p.x > ASTRO_CONFIG.V_WIDTH) p.x -= ASTRO_CONFIG.V_WIDTH;
    if (p.y < 0) p.y += ASTRO_CONFIG.V_HEIGHT;
    else if (p.y > ASTRO_CONFIG.V_HEIGHT) p.y -= ASTRO_CONFIG.V_HEIGHT;

    // Firing (Thả Bom 2.5s / Siêu Laser Xuyên Bản Đồ / Đạn Thường)
    if (p.inputs.shoot) {
      if (p.bombsCount > 0) {
        // THẢ BOM: Thả 1 quả bom nổ chậm sau đuôi tàu, nổ sau 2.5s (tăng thời gian)
        const bx = p.x - Math.cos(p.angle) * 16;
        const by = p.y - Math.sin(p.angle) * 16;
        room.bombs.push({
          id: Math.random(),
          playerId: p.id,
          slot: p.slot,
          x: bx,
          y: by,
          timer: 2.5,
          maxTimer: 2.5,
          radius: 120,
          dead: false
        });
        p.bombsCount--;
        room.events.push({ type: 'BOMB_DROP', slot: p.slot, x: bx, y: by });
      } else if (p.laserCharges > 0) {
        // SIÊU LASER: Bắn 1 tia dài từ mũi tàu xuyên suốt tới cuối map theo đường thẳng
        const tipX = p.x + Math.cos(p.angle) * 16;
        const tipY = p.y + Math.sin(p.angle) * 16;
        const endX = tipX + Math.cos(p.angle) * 1200;
        const endY = tipY + Math.sin(p.angle) * 1200;
        const beam = {
          id: Math.random(),
          playerId: p.id,
          slot: p.slot,
          x1: tipX,
          y1: tipY,
          x2: endX,
          y2: endY,
          angle: p.angle,
          life: 0.35,
          maxLife: 0.35
        };
        room.laserBeams.push(beam);
        p.laserCharges--;
        p.recoilTime = 0.08;
        room.events.push({ type: 'MEGA_LASER', slot: p.slot, x1: tipX, y1: tipY, x2: endX, y2: endY, angle: p.angle });

        // Phá nổ tức thì mọi khối hộp destructible trên đường đi của tia laser
        room.blocks.forEach(blk => {
          if (blk.dead || blk.isPhasePortal || blk.isIndestructible) return;
          if (distToSegment(blk.x + blk.size / 2, blk.y + blk.size / 2, tipX, tipY, endX, endY) <= blk.size * 0.65 + 8) {
            blk.dead = true;
            room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              room.drops.push({
                id: Math.random(),
                x: blk.x + blk.size / 2,
                y: blk.y + blk.size / 2,
                type: types[Math.floor(Math.random() * types.length)],
                life: 25,
                dead: false
              });
            }
          }
        });

        // Tiêu diệt tức thì kẻ địch nằm trên tia laser
        room.players.forEach(p2 => {
          if (!p2.active || p2.id === p.id) return;
          if (!p2.isDestroyed) {
            if (distToSegment(p2.x, p2.y, tipX, tipY, endX, endY) <= p2.radius + 10) {
              destroyAstroShip(room, p2);
            }
          } else if (p2.pilot && !p2.pilot.dead) {
            if (distToSegment(p2.pilot.x, p2.pilot.y, tipX, tipY, endX, endY) <= p2.pilot.radius + 10) {
              p2.pilot.dead = true;
              room.events.push({ type: 'PILOT_DEATH', slot: p2.slot, x: p2.pilot.x, y: p2.pilot.y });
            }
          }
        });
      } else {
        // Đạn thường (tối đa 3 viên)
        const activeBullets = room.bullets.filter(b => b.playerId === p.id && !b.dead).length;
        if (activeBullets < 3) {
          const tipX = p.x + Math.cos(p.angle) * 17;
          const tipY = p.y + Math.sin(p.angle) * 17;
          room.bullets.push({
            id: Math.random(),
            playerId: p.id,
            slot: p.slot,
            x: tipX,
            y: tipY,
            vx: Math.cos(p.angle) * ASTRO_CONFIG.BULLET_SPEED,
            vy: Math.sin(p.angle) * ASTRO_CONFIG.BULLET_SPEED,
            isLaser: false,
            piercing: false,
            traveled: 0,
            life: 0,
            dead: false,
            bounces: 0
          });
          p.recoilTime = 0.05;
          room.events.push({ type: 'LASER', slot: p.slot, x: tipX, y: tipY });
        }
      }
      p.inputs.shoot = false;
    }
  });

  // 3. Drops (Thính) Lifetime & Player Pickup
  room.drops.forEach(d => {
    d.life -= dt;
    if (d.life <= 0) d.dead = true;
    room.players.forEach(p => {
      if (!p.active || p.isDestroyed || d.dead) return;
      if (Math.hypot(p.x - d.x, p.y - d.y) < p.radius + 15) {
        d.dead = true;
        if (d.type === 'SWORD') {
          p.leftBlade = true;
          p.rightBlade = true;
        } else if (d.type === 'BOMB') {
          p.bombsCount = 2;
        } else if (d.type === 'LASER') {
          p.laserCharges = 3;
        }
        room.events.push({ type: 'PICKUP', slot: p.slot, itemType: d.type, x: d.x, y: d.y });
      }
    });
  });
  room.drops = room.drops.filter(d => !d.dead);

  // 4. Bombs Countdown & Shockwave Detonation
  room.bombs.forEach(b => {
    b.timer -= dt;
    if (b.timer <= 0 && !b.dead) {
      b.dead = true;
      room.events.push({ type: 'BOMB_EXPLODE', x: b.x, y: b.y, radius: b.radius });

      // Phá hủy toàn bộ hộp hàng trong bán kính 120px
      room.blocks.forEach(blk => {
        if (blk.dead || blk.isIndestructible || blk.isPhasePortal) return;
        if (Math.hypot(blk.x + blk.size / 2 - b.x, blk.y + blk.size / 2 - b.y) <= b.radius + blk.size / 2) {
          blk.dead = true;
          room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
          if (Math.random() < 0.45) {
            const types = ['SWORD', 'BOMB', 'LASER'];
            room.drops.push({
              id: Math.random(),
              x: blk.x + blk.size / 2,
              y: blk.y + blk.size / 2,
              type: types[Math.floor(Math.random() * types.length)],
              life: 25,
              dead: false
            });
          }
        }
      });

      // Tiêu diệt TẤT CẢ phi thuyền & phi công trong bán kính (KỂ CẢ CHÍNH MÌNH)
      room.players.forEach(p => {
        if (!p.active) return;
        if (!p.isDestroyed) {
          if (Math.hypot(p.x - b.x, p.y - b.y) <= b.radius + p.radius) {
            destroyAstroShip(room, p);
          }
        } else if (p.pilot && !p.pilot.dead) {
          if (Math.hypot(p.pilot.x - b.x, p.pilot.y - b.y) <= b.radius + p.pilot.radius) {
            p.pilot.dead = true;
            room.events.push({ type: 'PILOT_DEATH', slot: p.slot, x: p.pilot.x, y: p.pilot.y });
          }
        }
      });
    }
  });
  room.bombs = room.bombs.filter(b => !b.dead);

  // 5. Dual Swords (Song Kiếm) vs Enemy & Blocks
  room.players.forEach(p1 => {
    if (!p1.active || p1.isDestroyed) return;
    if (!p1.leftBlade && !p1.rightBlade) return;

    const bladeDist = 22;
    const leftTipX = p1.x + Math.cos(p1.angle - 0.75) * bladeDist;
    const leftTipY = p1.y + Math.sin(p1.angle - 0.75) * bladeDist;
    const rightTipX = p1.x + Math.cos(p1.angle + 0.75) * bladeDist;
    const rightTipY = p1.y + Math.sin(p1.angle + 0.75) * bladeDist;

    // Đâm vào tàu địch gây nổ tàu địch ngay tức khắc!
    room.players.forEach(p2 => {
      if (!p2.active || p1.id === p2.id) return;
      if (!p2.isDestroyed) {
        if (p1.leftBlade && Math.hypot(p2.x - leftTipX, p2.y - leftTipY) < p2.radius + 6) {
          destroyAstroShip(room, p2);
          room.events.push({ type: 'BLADE_KILL', slot: p1.slot, x: leftTipX, y: leftTipY });
        } else if (p1.rightBlade && Math.hypot(p2.x - rightTipX, p2.y - rightTipY) < p2.radius + 6) {
          destroyAstroShip(room, p2);
          room.events.push({ type: 'BLADE_KILL', slot: p1.slot, x: rightTipX, y: rightTipY });
        }
      } else if (p2.pilot && !p2.pilot.dead) {
        if ((p1.leftBlade && Math.hypot(p2.pilot.x - leftTipX, p2.pilot.y - leftTipY) < p2.pilot.radius + 6) ||
            (p1.rightBlade && Math.hypot(p2.pilot.x - rightTipX, p2.pilot.y - rightTipY) < p2.pilot.radius + 6)) {
          p2.pilot.dead = true;
          room.events.push({ type: 'PILOT_DEATH', slot: p2.slot, x: p2.pilot.x, y: p2.pilot.y });
        }
      }
    });

    // Đâm vào chướng ngại vật -> Phá vỡ và MẤT 1 KIẾM!
    room.blocks.forEach(blk => {
      if (blk.dead || blk.isPhasePortal) return;
      if (p1.leftBlade && circleRect(leftTipX, leftTipY, 8, blk.x, blk.y, blk.size, blk.size)) {
        p1.leftBlade = false;
        room.events.push({ type: 'BLADE_CLASH', slot: p1.slot, x: leftTipX, y: leftTipY });
        if (!blk.isIndestructible) {
          blk.dead = true;
          room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
          if (Math.random() < 0.45) {
            const types = ['SWORD', 'BOMB', 'LASER'];
            room.drops.push({
              id: Math.random(),
              x: blk.x + blk.size / 2,
              y: blk.y + blk.size / 2,
              type: types[Math.floor(Math.random() * types.length)],
              life: 25,
              dead: false
            });
          }
        }
      } else if (p1.rightBlade && circleRect(rightTipX, rightTipY, 8, blk.x, blk.y, blk.size, blk.size)) {
        p1.rightBlade = false;
        room.events.push({ type: 'BLADE_CLASH', slot: p1.slot, x: rightTipX, y: rightTipY });
        if (!blk.isIndestructible) {
          blk.dead = true;
          room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
          if (Math.random() < 0.45) {
            const types = ['SWORD', 'BOMB', 'LASER'];
            room.drops.push({
              id: Math.random(),
              x: blk.x + blk.size / 2,
              y: blk.y + blk.size / 2,
              type: types[Math.floor(Math.random() * types.length)],
              life: 25,
              dead: false
            });
          }
        }
      }
    });
  });

  // 6. Bullets Movement
  room.bullets.forEach(b => {
    const dx = b.vx * dt;
    const dy = b.vy * dt;
    b.x += dx;
    b.y += dy;
    b.traveled += Math.hypot(dx, dy);
    b.life += dt;
    const maxDist = b.isLaser ? (ASTRO_CONFIG.V_WIDTH * 2) : ASTRO_CONFIG.BULLET_MAX_DIST;
    if (b.traveled >= maxDist || b.life >= ASTRO_CONFIG.BULLET_MAX_LIFE) {
      b.dead = true;
    }

    if (b.x < 0) b.x += ASTRO_CONFIG.V_WIDTH;
    else if (b.x > ASTRO_CONFIG.V_WIDTH) b.x -= ASTRO_CONFIG.V_WIDTH;
    if (b.y < 0) b.y += ASTRO_CONFIG.V_HEIGHT;
    else if (b.y > ASTRO_CONFIG.V_HEIGHT) b.y -= ASTRO_CONFIG.V_HEIGHT;
  });

  // 7. Bullets vs Blocks
  room.bullets.forEach(b => {
    if (b.dead) return;
    for (const blk of room.blocks) {
      if (blk.dead) continue;
      // ĐOẠN ĐI XUYÊN TƯỜNG (Cổng Hư Không): Đạn bay thẳng xuyên qua không bị cản!
      if (blk.isPhasePortal) continue;

      if (circleRect(b.x, b.y, b.isLaser ? 6 : 4, blk.x, blk.y, blk.size, blk.size)) {
        if (b.isLaser) {
          // Siêu Laser: XUYÊN THẲNG QUA MỌI ĐỊA HÌNH, phá vỡ khối destructible cản đường!
          if (!blk.isIndestructible) {
            blk.dead = true;
            room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              room.drops.push({
                id: Math.random(),
                x: blk.x + blk.size / 2,
                y: blk.y + blk.size / 2,
                type: types[Math.floor(Math.random() * types.length)],
                life: 25,
                dead: false
              });
            }
          }
        } else {
          // Đạn thường
          if (blk.isIndestructible) {
            b.dead = true;
            room.events.push({ type: 'BOUNCE', x: b.x, y: b.y });
          } else {
            blk.dead = true;
            b.dead = true;
            room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              room.drops.push({
                id: Math.random(),
                x: blk.x + blk.size / 2,
                y: blk.y + blk.size / 2,
                type: types[Math.floor(Math.random() * types.length)],
                life: 25,
                dead: false
              });
            }
          }
          break;
        }
      }
    }
  });

  room.bullets = room.bullets.filter(b => !b.dead);

  // 7b. Update Mega Laser Beams (Tia Laser Xuyên Suốt Toàn Bộ Bản Đồ)
  room.laserBeams.forEach(b => {
    b.life -= dt;
    room.players.forEach(p2 => {
      if (!p2.active || p2.id === b.playerId) return;
      if (!p2.isDestroyed) {
        if (distToSegment(p2.x, p2.y, b.x1, b.y1, b.x2, b.y2) <= p2.radius + 10) {
          destroyAstroShip(room, p2);
        }
      } else if (p2.pilot && !p2.pilot.dead) {
        if (distToSegment(p2.pilot.x, p2.pilot.y, b.x1, b.y1, b.x2, b.y2) <= p2.pilot.radius + 10) {
          p2.pilot.dead = true;
          room.events.push({ type: 'PILOT_DEATH', slot: p2.slot, x: p2.pilot.x, y: p2.pilot.y });
        }
      }
    });
  });
  room.laserBeams = room.laserBeams.filter(b => b.life > 0);

  // 8. Ships & Pilots vs Blocks (NẢY & DỘI RA, ĐI XUYÊN CỔNG PHASE)
  room.players.forEach(p => {
    if (!p.active) return;
    const targetObj = p.isDestroyed ? (p.pilot && !p.pilot.dead ? p.pilot : null) : p;
    if (!targetObj) return;

    for (const blk of room.blocks) {
      if (blk.dead) continue;
      // ĐOẠN ĐI XUYÊN TƯỜNG (Cổng Hư Không): Người và phi công đi xuyên qua tự do!
      if (blk.isPhasePortal) continue;

      const closestX = Math.max(blk.x, Math.min(targetObj.x, blk.x + blk.size));
      const closestY = Math.max(blk.y, Math.min(targetObj.y, blk.y + blk.size));
      const distX = targetObj.x - closestX;
      const distY = targetObj.y - closestY;
      const dist = Math.hypot(distX, distY);
      const rad = targetObj.radius || 13;

      if (dist < rad) {
        const overlap = rad - dist;
        if (dist > 0.001) {
          targetObj.x += (distX / dist) * overlap;
          targetObj.y += (distY / dist) * overlap;
        } else {
          targetObj.x -= 3;
        }

        // Húc vào ô item (!isIndestructible): CHỈ nổ khi có kiếm, không có kiếm thì nảy êm ái
        if (!blk.isIndestructible && !p.isDestroyed) {
          if (p.leftBlade || p.rightBlade) {
            blk.dead = true;
            if (p.leftBlade) p.leftBlade = false;
            else if (p.rightBlade) p.rightBlade = false;
            room.events.push({ type: 'BLADE_CLASH', slot: p.slot, x: closestX, y: closestY });
            room.events.push({ type: 'BREAK', x: blk.x + blk.size / 2, y: blk.y + blk.size / 2 });
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              room.drops.push({
                id: Math.random(),
                x: blk.x + blk.size / 2,
                y: blk.y + blk.size / 2,
                type: types[Math.floor(Math.random() * types.length)],
                life: 25,
                dead: false
              });
            }
          } else {
            // Không có kiếm: húc vào chỉ bị nảy dội êm ái, KHÔNG nổ hộp item
            room.events.push({ type: 'BOUNCE', x: closestX, y: closestY });
          }
        } else {
          room.events.push({ type: 'BOUNCE', x: closestX, y: closestY });
        }
      }
    }
  });

  // 9. Bullets vs Ships & Pilots
  room.bullets.forEach(b => {
    if (b.dead) return;
    room.players.forEach(p => {
      if (!p.active || b.playerId === p.id) return;
      if (!p.isDestroyed) {
        if (Math.hypot(b.x - p.x, b.y - p.y) < p.radius + 3) {
          if (!b.isLaser) b.dead = true;
          destroyAstroShip(room, p);
        }
      } else if (p.pilot && !p.pilot.dead) {
        if (Math.hypot(b.x - p.pilot.x, b.y - p.pilot.y) < p.pilot.radius + 3) {
          if (!b.isLaser) b.dead = true;
          p.pilot.dead = true;
          room.events.push({ type: 'PILOT_DEATH', slot: p.slot, x: p.pilot.x, y: p.pilot.y });
        }
      }
    });
  });

  // 10. Ships Ramming Living Enemy Pilots
  room.players.forEach(p1 => {
    if (!p1.active || p1.isDestroyed) return;
    room.players.forEach(p2 => {
      if (!p2.active || p1.id === p2.id) return;
      if (p2.pilot && !p2.pilot.dead) {
        if (Math.hypot(p1.x - p2.pilot.x, p1.y - p2.pilot.y) < p1.radius + p2.pilot.radius) {
          p2.pilot.dead = true;
          room.events.push({ type: 'PILOT_DEATH', slot: p2.slot, x: p2.pilot.x, y: p2.pilot.y });
        }
      }
    });
  });

  // 11. Alive Check & Round Winner
  const alivePlayers = room.players.filter(p => p.active && (!p.isDestroyed || (p.pilot && !p.pilot.dead)));
  if (alivePlayers.length <= 1) {
    room.state = 'ROUND_OVER';
    room.roundTimer = 2.5;
    if (alivePlayers.length === 1) {
      const winner = alivePlayers[0];
      room.scores[winner.slot]++;
      room.roundWinnerText = `${room.slotNames[winner.slot]} WINS THE ROUND!`;
      room.events.push({ type: 'ROUND_WIN', winnerSlot: winner.slot });
    } else {
      room.roundWinnerText = 'DRAW ROUND!';
      room.events.push({ type: 'ROUND_WIN', winnerSlot: -1 });
    }
  }
}

function broadcastToAstroRoom(room, msg) {
  const data = typeof msg === 'string' ? msg : JSON.stringify(msg);
  for (const client of [...room.slots, ...room.spectators]) {
    if (client && client !== 'BOT' && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

function broadcastAstroPlayersUpdate(room) {
  broadcastToAstroRoom(room, {
    type: 'ASTRO_PLAYERS_UPDATE',
    slots: room.slots.map((s, i) => ({
      slot: i,
      connected: !!s || room.isBot[i],
      isBot: room.isBot[i],
      name: room.slotNames[i]
    })),
    spectatorsCount: room.spectators.size,
    state: room.state
  });
}

function broadcastAstroState(room) {
  broadcastToAstroRoom(room, {
    type: 'ASTRO_STATE',
    state: room.state,
    mapType: room.mapType,
    scores: room.scores,
    players: room.players.filter(p => p.active).map(p => ({
      id: p.id,
      slot: p.slot,
      x: Math.round(p.x * 10) / 10,
      y: Math.round(p.y * 10) / 10,
      angle: Math.round(p.angle * 100) / 100,
      isDestroyed: p.isDestroyed,
      leftBlade: !!p.leftBlade,
      rightBlade: !!p.rightBlade,
      bombsCount: p.bombsCount || 0,
      laserCharges: p.laserCharges || 0,
      pilot: p.pilot ? {
        x: Math.round(p.pilot.x * 10) / 10,
        y: Math.round(p.pilot.y * 10) / 10,
        angle: Math.round(p.pilot.angle * 100) / 100,
        dead: p.pilot.dead
      } : null
    })),
    bullets: room.bullets.map(b => ({
      id: b.id,
      playerId: b.playerId,
      slot: b.slot,
      x: Math.round(b.x * 10) / 10,
      y: Math.round(b.y * 10) / 10,
      vx: Math.round(b.vx * 10) / 10,
      vy: Math.round(b.vy * 10) / 10,
      isLaser: !!b.isLaser
    })),
    blocks: room.blocks.filter(b => !b.dead).map(b => ({
      x: b.x,
      y: b.y,
      size: b.size,
      isIndestructible: b.isIndestructible,
      isPhasePortal: !!b.isPhasePortal
    })),
    drops: room.drops.filter(d => !d.dead).map(d => ({
      id: d.id,
      x: Math.round(d.x * 10) / 10,
      y: Math.round(d.y * 10) / 10,
      type: d.type
    })),
    bombs: room.bombs.filter(b => !b.dead).map(b => ({
      id: b.id,
      playerId: b.playerId,
      slot: b.slot,
      x: Math.round(b.x * 10) / 10,
      y: Math.round(b.y * 10) / 10,
      timer: Math.round(b.timer * 10) / 10,
      maxTimer: b.maxTimer,
      radius: b.radius
    })),
    laserBeams: room.laserBeams.map(b => ({
      id: b.id,
      slot: b.slot,
      x1: Math.round(b.x1),
      y1: Math.round(b.y1),
      x2: Math.round(b.x2),
      y2: Math.round(b.y2),
      life: Math.round(b.life * 100) / 100,
      maxLife: b.maxLife
    })),
    events: room.events,
    roundTimer: Math.ceil(room.roundTimer),
    roundWinnerText: room.roundWinnerText,
    matchWinnerText: room.matchWinnerText
  });
  room.events = [];
}

function startAstroLoop(room) {
  if (room.interval) return;
  room.lastTime = Date.now();
  room.interval = setInterval(() => {
    const now = Date.now();
    let dt = (now - room.lastTime) / 1000;
    room.lastTime = now;
    if (dt > 0.05) dt = 0.05;

    updateAstroRoom(room, dt);
    broadcastAstroState(room);
  }, ASTRO_CONFIG.TICK_INTERVAL);
}

// ====================================================================
// BLEACH VS NARUTO 3.3 ROOM STATE MANAGEMENT
// ====================================================================
/**
 * Bleach vs Naruto Room State Management
 * room = {
 *   id: string,
 *   name: string,
 *   hasPassword: boolean,
 *   password: string,
 *   hostSlot: 1 | 2,
 *   slots: { 1: ws | null, 2: ws | null },
 *   slotNames: { 1: string, 2: string },
 *   controls: { 1: 'LETTER' | 'NUMBER', 2: 'LETTER' | 'NUMBER' },
 *   spectators: Set<ws>,
 *   state: 'WAITING' | 'READY' | 'PLAYING',
 *   createdAt: number
 * }
 */
const bvnRooms = new Map();

function createBvnRoom(id = 'bvn-default', name = 'Phòng BVN Đại Sảnh (Công Khai)', password = '') {
  return {
    id,
    name: name || `Phòng BVN #${id.slice(-4)}`,
    hasPassword: !!password,
    password: password || '',
    hostSlot: 1,
    slots: { 1: null, 2: null },
    slotNames: { 1: 'Máy 1 (P1)', 2: 'Máy 2 (P2)' },
    controls: { 1: 'LETTER', 2: 'LETTER' },
    spectators: new Set(),
    state: 'WAITING',
    createdAt: Date.now()
  };
}

bvnRooms.set('bvn-default', createBvnRoom('bvn-default', 'Phòng BVN Đại Sảnh (Công Khai)', ''));

function getOrCreateBvnRoom(roomId) {
  const id = (roomId || 'bvn-default').trim().toLowerCase();
  if (!bvnRooms.has(id)) {
    bvnRooms.set(id, createBvnRoom(id));
  }
  return bvnRooms.get(id);
}

function getBvnRoomsSummary() {
  const list = [];
  for (const room of bvnRooms.values()) {
    const humanCount = (room.slots[1] ? 1 : 0) + (room.slots[2] ? 1 : 0);
    let state = 'WAITING';
    if (humanCount === 2) state = 'READY';
    else if (humanCount === 0) state = 'WAITING';

    const hostName = (room.hostSlot === 2) ? room.slotNames[2] : room.slotNames[1];

    list.push({
      id: room.id,
      name: room.name,
      hasPassword: room.hasPassword,
      playerCount: humanCount,
      spectatorCount: room.spectators.size,
      hasP1: !!room.slots[1],
      hasP2: !!room.slots[2],
      player1: room.slots[1] ? room.slotNames[1] : null,
      player2: room.slots[2] ? room.slotNames[2] : null,
      controls1: room.controls[1],
      controls2: room.controls[2],
      hostSlot: room.hostSlot,
      hostName: hostName || 'Chủ phòng',
      state
    });
  }
  return list;
}

function broadcastBvnRoomsList() {
  const summary = getBvnRoomsSummary();
  const data = JSON.stringify({ type: 'BVN_ROOMS_LIST', rooms: summary });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function broadcastBvnRoomUpdate(room) {
  if (!room) return;
  const updateMsg = JSON.stringify({
    type: 'BVN_ROOM_UPDATE',
    room: {
      id: room.id,
      name: room.name,
      hasPassword: room.hasPassword,
      hostSlot: room.hostSlot,
      slots: {
        1: !!room.slots[1],
        2: !!room.slots[2]
      },
      slotNames: room.slotNames,
      controls: room.controls,
      spectatorsCount: room.spectators.size,
      state: (room.slots[1] && room.slots[2]) ? 'READY' : 'WAITING'
    }
  });

  const sentClients = new Set();
  [room.slots[1], room.slots[2]].forEach(s => {
    if (s && s.readyState === WebSocket.OPEN && !sentClients.has(s)) {
      s.send(updateMsg);
      sentClients.add(s);
    }
  });
  room.spectators.forEach(s => {
    if (s && s.readyState === WebSocket.OPEN && !sentClients.has(s)) {
      s.send(updateMsg);
      sentClients.add(s);
    }
  });
}

wss.on('connection', (ws) => {
  let currentRoomId = null;
  let userRole = null; // 'X' | 'O' | 'SPECTATOR'
  let userName = 'DevPro';

  // Astro Party connection state
  let currentAstroRoom = null;
  let astroSlot = -1;

  function leaveCurrentAstroRoom() {
    if (!currentAstroRoom) return;
    const room = currentAstroRoom;
    if (astroSlot >= 0 && astroSlot < 4 && room.slots[astroSlot] === ws) {
      room.slots[astroSlot] = null;
      room.slotNames[astroSlot] = ASTRO_DEFAULT_NAMES[astroSlot];
    } else {
      room.spectators.delete(ws);
    }

    const humanCount = room.slots.filter(s => s && s !== 'BOT').length + room.spectators.size;
    if (humanCount === 0) {
      if (room.interval) {
        clearInterval(room.interval);
        room.interval = null;
      }
      if (room.id !== 'astro-default') {
        astroRooms.delete(room.id);
      } else {
        room.state = 'LOBBY';
        room.isBot = [false, false, false, false];
        room.hostSlot = 0;
        room.scores = [0, 0, 0, 0];
      }
    } else {
      if (room.hostSlot === astroSlot || !room.slots[room.hostSlot]) {
        for (let i = 0; i < 4; i++) {
          if (room.slots[i] && room.slots[i] !== 'BOT') {
            room.hostSlot = i;
            break;
          }
        }
      }
      broadcastAstroRoomUpdate(room);
    }

    currentAstroRoom = null;
    astroSlot = -1;
  }

  // Bleach vs Naruto connection state
  let currentBvnRoom = null;
  let bvnSlot = 0; // 1, 2, or 'SPECTATOR'

  function leaveCurrentBvnRoom() {
    if (!currentBvnRoom) return;
    const room = currentBvnRoom;
    if (bvnSlot === 1 && room.slots[1] === ws) {
      room.slots[1] = null;
      room.slotNames[1] = 'Máy 1 (P1)';
    } else if (bvnSlot === 2 && room.slots[2] === ws) {
      room.slots[2] = null;
      room.slotNames[2] = 'Máy 2 (P2)';
    } else {
      room.spectators.delete(ws);
    }

    const humanCount = (room.slots[1] ? 1 : 0) + (room.slots[2] ? 1 : 0) + room.spectators.size;
    if (humanCount === 0) {
      if (room.id !== 'bvn-default') {
        bvnRooms.delete(room.id);
      } else {
        room.state = 'WAITING';
        room.hostSlot = 1;
        room.controls = { 1: 'LETTER', 2: 'LETTER' };
      }
    } else {
      if (bvnSlot === room.hostSlot) {
        if (room.slots[1]) room.hostSlot = 1;
        else if (room.slots[2]) room.hostSlot = 2;
      }
      broadcastBvnRoomUpdate(room);
    }

    currentBvnRoom = null;
    bvnSlot = 0;
  }

  function leaveCurrentCaroRoom() {
    if (!currentRoomId || !rooms.has(currentRoomId)) return;
    const room = rooms.get(currentRoomId);
    if (room.players.X === ws) {
      room.players.X = null;
      room.playerNames.X = 'Player X';
      room.rematchVotes.delete('X');
    } else if (room.players.O === ws) {
      room.players.O = null;
      room.playerNames.O = 'Player O';
      room.rematchVotes.delete('O');
    } else {
      room.spectators.delete(ws);
    }

    broadcastToRoom(room, {
      type: 'USER_LEFT',
      role: userRole,
      name: userName,
      players: {
        X: room.players.X ? room.playerNames.X : null,
        O: room.players.O ? room.playerNames.O : null
      },
      spectatorCount: room.spectators.size
    });

    if (!room.players.X && !room.players.O && room.spectators.size === 0) {
      if (currentRoomId !== 'caro-default') {
        rooms.delete(currentRoomId);
      } else {
        room.moves.clear();
        room.moveList = [];
        room.winner = null;
        room.winningLine = null;
        room.currentTurn = 'X';
        room.scores = { X: 0, O: 0 };
        room.rematchVotes.clear();
      }
    }

    currentRoomId = null;
    userRole = null;
  }

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      switch (msg.type) {
        // =====================================================
        // CARO / XO LOBBY & ROOM MESSAGES
        // =====================================================
        case 'CARO_GET_ROOMS_LIST': {
          ws.send(JSON.stringify({
            type: 'CARO_ROOMS_LIST',
            rooms: getCaroRoomsSummary()
          }));
          break;
        }

        case 'CARO_CREATE_ROOM': {
          leaveCurrentCaroRoom();

          const pName = (msg.playerName || userName || 'DevPro').slice(0, 20);
          userName = pName;
          const roomId = 'caro-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000).toString(36);
          const roomName = (msg.name || `Phòng Cờ của ${pName}`).trim().slice(0, 30);
          const password = (msg.password || '').trim();
          const preferredRole = (msg.preferredRole === 'O') ? 'O' : 'X';

          const room = createCaroRoom(roomId, roomName, password);
          room.hostRole = preferredRole;
          room.players[preferredRole] = ws;
          room.playerNames[preferredRole] = pName;
          currentRoomId = room.id;
          userRole = preferredRole;

          rooms.set(roomId, room);

          ws.send(JSON.stringify({
            ...serializeRoomState(room, userRole),
            type: 'CARO_ROOM_JOINED',
            roomId: room.id,
            roomName: room.name,
            hasPassword: room.hasPassword,
            yourRole: userRole,
            isHost: true
          }));

          broadcastCaroRoomsList();
          break;
        }

        case 'CARO_JOIN_ROOM': {
          const roomId = msg.roomId || 'caro-default';
          const targetRoom = rooms.get(roomId);
          if (!targetRoom) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Phòng cờ không tồn tại hoặc đã bị hủy!' }));
            break;
          }

          if (targetRoom.hasPassword && targetRoom.password !== (msg.password || '').trim()) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Mật khẩu phòng cờ không chính xác!' }));
            break;
          }

          leaveCurrentCaroRoom();
          currentRoomId = targetRoom.id;
          userName = (msg.playerName || userName || 'DevPro').slice(0, 20);

          const pref = msg.preferredRole;
          if (pref === 'X' && !targetRoom.players.X) {
            targetRoom.players.X = ws;
            targetRoom.playerNames.X = userName;
            userRole = 'X';
          } else if (pref === 'O' && !targetRoom.players.O) {
            targetRoom.players.O = ws;
            targetRoom.playerNames.O = userName;
            userRole = 'O';
          } else if (!targetRoom.players.X) {
            targetRoom.players.X = ws;
            targetRoom.playerNames.X = userName;
            userRole = 'X';
          } else if (!targetRoom.players.O) {
            targetRoom.players.O = ws;
            targetRoom.playerNames.O = userName;
            userRole = 'O';
          } else {
            targetRoom.spectators.add(ws);
            userRole = 'SPECTATOR';
          }

          const isHost = (targetRoom.hostRole === userRole);

          ws.send(JSON.stringify({
            ...serializeRoomState(targetRoom, userRole),
            type: 'CARO_ROOM_JOINED',
            roomId: targetRoom.id,
            roomName: targetRoom.name,
            hasPassword: targetRoom.hasPassword,
            yourRole: userRole,
            isHost
          }));

          broadcastToRoom(targetRoom, {
            type: 'USER_JOINED',
            name: userName,
            role: userRole,
            players: {
              X: targetRoom.players.X ? targetRoom.playerNames.X : null,
              O: targetRoom.players.O ? targetRoom.playerNames.O : null
            },
            spectatorCount: targetRoom.spectators.size
          });

          broadcastCaroRoomsList();
          break;
        }

        case 'CARO_LEAVE_ROOM': {
          leaveCurrentCaroRoom();
          ws.send(JSON.stringify({ type: 'CARO_LEFT_ROOM' }));
          broadcastCaroRoomsList();
          break;
        }

        case 'CARO_SWITCH_ROLE': {
          if (!currentRoomId || !rooms.has(currentRoomId)) return;
          const room = rooms.get(currentRoomId);
          const targetRole = msg.targetRole === 'O' ? 'O' : 'X';
          if (userRole === targetRole) return;

          if (targetRole === 'X' && !room.players.X) {
            if (userRole === 'O') {
              room.players.O = null;
              room.playerNames.O = 'Player O';
            } else {
              room.spectators.delete(ws);
            }
            room.players.X = ws;
            room.playerNames.X = userName;
            userRole = 'X';
          } else if (targetRole === 'O' && !room.players.O) {
            if (userRole === 'X') {
              room.players.X = null;
              room.playerNames.X = 'Player X';
            } else {
              room.spectators.delete(ws);
            }
            room.players.O = ws;
            room.playerNames.O = userName;
            userRole = 'O';
          } else {
            ws.send(JSON.stringify({ type: 'ERROR', message: `Quân ${targetRole} đã có người chọn!` }));
            return;
          }

          broadcastToRoom(room, {
            type: 'CARO_ROLES_UPDATED',
            players: {
              X: room.players.X ? room.playerNames.X : null,
              O: room.players.O ? room.playerNames.O : null
            },
            yourRole: userRole
          });
          ws.send(JSON.stringify({ type: 'CARO_ROLE_CHANGED', yourRole: userRole }));
          broadcastCaroRoomsList();
          break;
        }

        case 'JOIN_ROOM': {
          const roomId = msg.roomId || 'dev-room';
          userName = (msg.name || 'Developer').slice(0, 20);
          const room = getOrCreateRoom(roomId);
          currentRoomId = room.id;

          // Assign role: prefer X, then O, else spectator
          if (!room.players.X) {
            room.players.X = ws;
            room.playerNames.X = userName;
            userRole = 'X';
          } else if (!room.players.O) {
            room.players.O = ws;
            room.playerNames.O = userName;
            userRole = 'O';
          } else {
            room.spectators.add(ws);
            userRole = 'SPECTATOR';
          }

          // Send current room state to joining player
          ws.send(JSON.stringify(serializeRoomState(room, userRole)));

          // Notify others in room
          broadcastToRoom(room, {
            type: 'USER_JOINED',
            name: userName,
            role: userRole,
            players: {
              X: room.players.X ? room.playerNames.X : null,
              O: room.players.O ? room.playerNames.O : null
            },
            spectatorCount: room.spectators.size
          });
          break;
        }

        case 'PLACE_MOVE': {
          if (!currentRoomId) return;
          const room = rooms.get(currentRoomId);
          if (!room) return;

          // Validate turn and game state
          if (room.winner) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Game has already ended. Vote for rematch!' }));
            return;
          }

          if (userRole !== room.currentTurn) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Not your turn!' }));
            return;
          }

          const { x, y } = msg;
          if (typeof x !== 'number' || typeof y !== 'number') return;

          const key = `${x},${y}`;
          if (room.moves.has(key)) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'Cell is already occupied!' }));
            return;
          }

          // Record move
          const moveData = {
            x,
            y,
            player: userRole,
            order: room.moveList.length + 1,
            time: Date.now()
          };
          room.moves.set(key, moveData);
          room.moveList.push(moveData);

          // Check win
          const winResult = checkWin(room.moves, x, y, userRole);
          if (winResult.won) {
            room.winner = userRole;
            room.winningLine = winResult.winningLine;
            room.scores[userRole] = (room.scores[userRole] || 0) + 1;
          } else {
            // Next turn
            room.currentTurn = room.currentTurn === 'X' ? 'O' : 'X';
          }

          // Broadcast move to all clients
          broadcastToRoom(room, {
            type: 'MOVE_MADE',
            move: moveData,
            nextTurn: room.currentTurn,
            winner: room.winner,
            winningLine: room.winningLine,
            scores: room.scores
          });
          break;
        }

        case 'REMATCH_VOTE': {
          if (!currentRoomId) return;
          const room = rooms.get(currentRoomId);
          if (!room || (userRole !== 'X' && userRole !== 'O')) return;

          room.rematchVotes.add(userRole);

          // If both players agreed (or only 1 player is connected and wants to reset)
          const neededPlayers = (room.players.X && room.players.O) ? 2 : 1;
          if (room.rematchVotes.size >= neededPlayers) {
            // Reset board
            room.moves.clear();
            room.moveList = [];
            room.winner = null;
            room.winningLine = null;
            room.rematchVotes.clear();
            // Alternate starting player or winner starts
            room.currentTurn = 'X';

            broadcastToRoom(room, {
              type: 'GAME_RESET',
              currentTurn: room.currentTurn,
              scores: room.scores
            });
          } else {
            broadcastToRoom(room, {
              type: 'REMATCH_PENDING',
              votes: Array.from(room.rematchVotes),
              voterRole: userRole,
              voterName: userName
            });
          }
          break;
        }

        case 'UNDO_REQUEST': {
          if (!currentRoomId) return;
          const room = rooms.get(currentRoomId);
          if (!room || (userRole !== 'X' && userRole !== 'O')) return;
          if (room.moveList.length === 0 || room.winner) return;

          const lastMove = room.moveList[room.moveList.length - 1];
          if (lastMove.player !== userRole) {
            ws.send(JSON.stringify({ type: 'ERROR', message: 'You can only undo your own last move!' }));
            return;
          }

          // Remove last move
          room.moveList.pop();
          room.moves.delete(`${lastMove.x},${lastMove.y}`);
          room.currentTurn = userRole; // It's their turn again

          broadcastToRoom(room, {
            type: 'UNDO_APPLIED',
            undoneMove: lastMove,
            currentTurn: room.currentTurn
          });
          break;
        }

        case 'SEND_CHAT': {
          const text = (msg.text || '').trim();
          if (!text) return;

          const sender = (msg.sender || userName || 'DevPro').slice(0, 20);
          const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
          const chatMsg = {
            type: 'CHAT_MESSAGE',
            sender,
            role: userRole || (astroSlot >= 0 ? `P${astroSlot + 1}` : null),
            text,
            time
          };

          // If in Caro room with password, restrict to Caro room
          if (currentRoomId && rooms.has(currentRoomId) && rooms.get(currentRoomId).hasPassword) {
            broadcastToRoom(rooms.get(currentRoomId), chatMsg);
          } else if (currentAstroRoom && currentAstroRoom.hasPassword) {
            // If in Astro room with password, restrict to Astro room
            broadcastToAstroRoom(currentAstroRoom, chatMsg);
          } else {
            // Global lobby chat / server-wide chat (broadcast to all connected users)
            const rawMsg = JSON.stringify(chatMsg);
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(rawMsg);
              }
            });
          }
          break;
        }

        case 'UPDATE_NAME': {
          const newName = (msg.name || 'DevPro').trim().slice(0, 20);
          if (!newName) break;
          userName = newName;

          // 1. If currently in a Caro room, update player name and broadcast
          if (currentRoomId && rooms.has(currentRoomId)) {
            const room = rooms.get(currentRoomId);
            if (userRole === 'X' && room.players.X === ws) {
              room.playerNames.X = userName;
            } else if (userRole === 'O' && room.players.O === ws) {
              room.playerNames.O = userName;
            }
            broadcastToRoom(room, {
              type: 'CARO_ROLES_UPDATED',
              players: {
                X: room.players.X ? room.playerNames.X : null,
                O: room.players.O ? room.playerNames.O : null
              },
              yourRole: userRole
            });
            broadcastCaroRoomsList();
          }

          // 2. If currently in an Astro Party room, update slot name and broadcast
          if (currentAstroRoom && astroSlot >= 0 && astroSlot < 4 && currentAstroRoom.slots[astroSlot] === ws) {
            const colorNames = ['Cyan', 'Magenta', 'Green', 'Yellow'];
            currentAstroRoom.slotNames[astroSlot] = `${userName} (${colorNames[astroSlot]})`;
            broadcastAstroRoomUpdate(currentAstroRoom);
            broadcastAstroPlayersUpdate(currentAstroRoom);
            broadcastAstroRoomsList();
          }

          ws.send(JSON.stringify({
            type: 'NAME_UPDATED',
            name: userName
          }));
          break;
        }

        // =====================================================
        // ASTRO PARTY ARCADE ONLINE MESSAGES (LOBBY & ROOM SYSTEM)
        // =====================================================
        case 'ASTRO_GET_ROOMS_LIST': {
          ws.send(JSON.stringify({
            type: 'ASTRO_ROOMS_LIST',
            rooms: getAstroRoomsSummary()
          }));
          break;
        }

        case 'ASTRO_CREATE_ROOM': {
          leaveCurrentAstroRoom();

          const pName = (msg.playerName || userName || 'DevPro').slice(0, 15);
          const roomId = 'room-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000).toString(36);
          const roomName = (msg.name || `Phòng của ${pName}`).trim().slice(0, 30);
          const password = (msg.password || '').trim();
          const mode = (msg.mode === 'BOT' || msg.withBots) ? 'BOT' : 'PVP';
          const botCount = Number(msg.botCount) || (mode === 'BOT' ? 3 : 0);

          const room = createAstroRoom(roomId, roomName, password, mode, 0);

          if (msg.mapType && ['CLASSIC', 'CROSS', 'MAZE', 'OPEN', 'MATRIX', 'RANDOM'].includes(msg.mapType)) {
            room.mapType = msg.mapType;
          }

          let preferredSlot = Number(msg.preferredSlot);
          if (isNaN(preferredSlot) || preferredSlot < 0 || preferredSlot > 3) {
            preferredSlot = 0;
          }
          room.hostSlot = preferredSlot;
          room.slots[preferredSlot] = ws;
          room.slotNames[preferredSlot] = `${pName} (${['Cyan', 'Magenta', 'Green', 'Yellow'][preferredSlot]})`;

          if (mode === 'BOT') {
            const numBots = Math.min(3, Math.max(1, botCount));
            let added = 0;
            for (let i = 0; i < 4; i++) {
              if (i !== preferredSlot && added < numBots) {
                room.isBot[i] = true;
                room.slotNames[i] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][i]})`;
                added++;
              }
            }
          }

          astroRooms.set(roomId, room);
          currentAstroRoom = room;
          astroSlot = preferredSlot;

          ws.send(JSON.stringify({
            type: 'ASTRO_ROOM_JOINED',
            room: {
              id: room.id,
              name: room.name,
              hasPassword: room.hasPassword,
              mode: room.mode,
              hostSlot: room.hostSlot,
              mapType: room.mapType,
              state: room.state,
              mySlot: astroSlot,
              isHost: true,
              slots: room.slots.map((s, i) => ({
                slot: i,
                connected: !!s,
                isBot: room.isBot[i],
                name: room.slotNames[i]
              })),
              scores: room.scores
            }
          }));

          broadcastAstroRoomsList();
          broadcastAstroRoomUpdate(room);
          break;
        }

        case 'ASTRO_JOIN_ROOM': {
          const roomId = msg.roomId || 'astro-default';
          const targetRoom = astroRooms.get(roomId);
          if (!targetRoom) {
            ws.send(JSON.stringify({ type: 'ASTRO_ERROR', message: 'Phòng không tồn tại hoặc đã bị đóng!' }));
            break;
          }

          if (targetRoom.hasPassword && targetRoom.password !== (msg.password || '').trim()) {
            ws.send(JSON.stringify({ type: 'ASTRO_ERROR', message: 'Mật khẩu phòng không chính xác!' }));
            break;
          }

          leaveCurrentAstroRoom();
          currentAstroRoom = targetRoom;

          const pName = (msg.playerName || userName || 'DevPro').slice(0, 15);
          let slotToTake = -1;

          let pref = Number(msg.preferredSlot);
          if (!isNaN(pref) && pref >= 0 && pref < 4 && !currentAstroRoom.slots[pref] && !currentAstroRoom.isBot[pref]) {
            slotToTake = pref;
          } else {
            for (let i = 0; i < 4; i++) {
              if (!currentAstroRoom.slots[i] && !currentAstroRoom.isBot[i]) {
                slotToTake = i;
                break;
              }
            }
          }

          if (slotToTake !== -1) {
            astroSlot = slotToTake;
            currentAstroRoom.slots[slotToTake] = ws;
            currentAstroRoom.slotNames[slotToTake] = `${pName} (${['Cyan', 'Magenta', 'Green', 'Yellow'][slotToTake]})`;
            if (currentAstroRoom.slots[currentAstroRoom.hostSlot] === null && !currentAstroRoom.isBot[currentAstroRoom.hostSlot]) {
              currentAstroRoom.hostSlot = astroSlot;
            }
          } else {
            astroSlot = -1;
            currentAstroRoom.spectators.add(ws);
          }

          const isHost = (currentAstroRoom.hostSlot === astroSlot);

          ws.send(JSON.stringify({
            type: 'ASTRO_ROOM_JOINED',
            room: {
              id: currentAstroRoom.id,
              name: currentAstroRoom.name,
              hasPassword: currentAstroRoom.hasPassword,
              mode: currentAstroRoom.mode || 'PVP',
              hostSlot: currentAstroRoom.hostSlot,
              mapType: currentAstroRoom.mapType,
              state: currentAstroRoom.state,
              mySlot: astroSlot,
              isHost,
              slots: currentAstroRoom.slots.map((s, i) => ({
                slot: i,
                connected: !!s,
                isBot: currentAstroRoom.isBot[i],
                name: currentAstroRoom.slotNames[i]
              })),
              scores: currentAstroRoom.scores
            }
          }));

          broadcastAstroRoomsList();
          broadcastAstroRoomUpdate(currentAstroRoom);
          break;
        }

        case 'ASTRO_SELECT_COLOR': {
          if (!currentAstroRoom) return;
          const targetSlot = Number(msg.slot);
          if (isNaN(targetSlot) || targetSlot < 0 || targetSlot > 3) return;
          if (targetSlot === astroSlot) return;

          if (currentAstroRoom.slots[targetSlot] || currentAstroRoom.isBot[targetSlot]) {
            ws.send(JSON.stringify({ type: 'ASTRO_ERROR', message: 'Màu này đã có người chọn!' }));
            return;
          }

          const pName = (msg.playerName || userName || 'DevPro').slice(0, 15);
          const oldSlot = astroSlot;

          if (oldSlot >= 0 && oldSlot < 4 && currentAstroRoom.slots[oldSlot] === ws) {
            currentAstroRoom.slots[oldSlot] = null;
            currentAstroRoom.slotNames[oldSlot] = ASTRO_DEFAULT_NAMES[oldSlot];
            if (currentAstroRoom.hostSlot === oldSlot) {
              currentAstroRoom.hostSlot = targetSlot;
            }
          } else if (oldSlot === -1) {
            currentAstroRoom.spectators.delete(ws);
            if (!currentAstroRoom.slots[currentAstroRoom.hostSlot]) {
              currentAstroRoom.hostSlot = targetSlot;
            }
          }

          astroSlot = targetSlot;
          currentAstroRoom.slots[targetSlot] = ws;
          currentAstroRoom.slotNames[targetSlot] = `${pName} (${['Cyan', 'Magenta', 'Green', 'Yellow'][targetSlot]})`;

          ws.send(JSON.stringify({
            type: 'ASTRO_SLOT_CHANGED',
            mySlot: astroSlot,
            isHost: (currentAstroRoom.hostSlot === astroSlot)
          }));

          broadcastAstroRoomUpdate(currentAstroRoom);
          broadcastAstroRoomsList();
          break;
        }

        case 'ASTRO_SET_MAP': {
          if (!currentAstroRoom) return;
          const mapType = msg.mapType;
          if (['CLASSIC', 'CROSS', 'MAZE', 'OPEN', 'MATRIX', 'RANDOM'].includes(mapType)) {
            currentAstroRoom.mapType = mapType;
            if (currentAstroRoom.state === 'PLAYING') {
              spawnAstroRound(currentAstroRoom);
              broadcastAstroState(currentAstroRoom);
            }
            broadcastAstroRoomUpdate(currentAstroRoom);
            broadcastAstroRoomsList();
          }
          break;
        }

        case 'ASTRO_SET_ROOM_MODE': {
          if (!currentAstroRoom) return;
          if (currentAstroRoom.hostSlot !== astroSlot) {
            ws.send(JSON.stringify({ type: 'ASTRO_ERROR', message: 'Chỉ chủ phòng mới có quyền đổi chế độ phòng!' }));
            return;
          }

          const targetMode = (msg.mode === 'BOT') ? 'BOT' : 'PVP';
          currentAstroRoom.mode = targetMode;

          if (targetMode === 'PVP') {
            // Xóa toàn bộ bot để nhường slot cho người chơi thật
            for (let i = 0; i < 4; i++) {
              if (currentAstroRoom.isBot[i]) {
                currentAstroRoom.isBot[i] = false;
                currentAstroRoom.slotNames[i] = ASTRO_DEFAULT_NAMES[i];
              }
            }
          } else {
            // Chế độ BOT: thêm bot vào các slot còn trống
            const numBots = Math.min(3, Math.max(1, Number(msg.botCount) || 3));
            let added = 0;
            for (let i = 0; i < 4; i++) {
              if (i !== astroSlot && !currentAstroRoom.slots[i] && added < numBots) {
                currentAstroRoom.isBot[i] = true;
                currentAstroRoom.slotNames[i] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][i]})`;
                added++;
              }
            }
          }

          broadcastAstroRoomUpdate(currentAstroRoom);
          broadcastAstroRoomsList();
          break;
        }

        case 'ASTRO_TOGGLE_BOT': {
          if (!currentAstroRoom) return;
          const targetSlot = Number(msg.slot);
          if (targetSlot >= 0 && targetSlot < 4 && !currentAstroRoom.slots[targetSlot]) {
            currentAstroRoom.isBot[targetSlot] = !currentAstroRoom.isBot[targetSlot];
            if (currentAstroRoom.isBot[targetSlot]) {
              currentAstroRoom.slotNames[targetSlot] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][targetSlot]})`;
            } else {
              currentAstroRoom.slotNames[targetSlot] = ASTRO_DEFAULT_NAMES[targetSlot];
            }
            const hasBots = currentAstroRoom.isBot.some(b => b);
            currentAstroRoom.mode = hasBots ? 'BOT' : 'PVP';
            broadcastAstroRoomUpdate(currentAstroRoom);
            broadcastAstroRoomsList();
          }
          break;
        }

        case 'ASTRO_START': {
          if (!currentAstroRoom) return;
          if (currentAstroRoom.hostSlot !== astroSlot) {
            ws.send(JSON.stringify({ type: 'ASTRO_ERROR', message: 'Chỉ chủ phòng mới có quyền bắt đầu trận đấu!' }));
            return;
          }

          const humanCount = currentAstroRoom.slots.filter(s => s && s !== 'BOT').length;
          const botCount = currentAstroRoom.isBot.filter(b => b).length;

          if (currentAstroRoom.mode === 'PVP') {
            if (humanCount < 2) {
              ws.send(JSON.stringify({
                type: 'ASTRO_ERROR',
                message: 'Phòng đang ở chế độ Đấu Với Người (PvP)! Cần ít nhất 2 người chơi thật để xuất kích. Hãy chờ bạn vào phòng hoặc đổi sang Đấu Với Máy.'
              }));
              return;
            }
          } else {
            // Chế độ Đấu Với Máy (BOT)
            if (botCount === 0) {
              for (let i = 0; i < 4; i++) {
                if (i !== astroSlot) {
                  currentAstroRoom.isBot[i] = true;
                  currentAstroRoom.slotNames[i] = `AI Bot (${['Cyan', 'Magenta', 'Green', 'Yellow'][i]})`;
                  break;
                }
              }
            }
          }

          currentAstroRoom.scores = [0, 0, 0, 0];
          spawnAstroRound(currentAstroRoom);
          currentAstroRoom.state = 'PLAYING';
          currentAstroRoom.lastTime = Date.now();
          startAstroLoop(currentAstroRoom);
          broadcastAstroState(currentAstroRoom);
          broadcastAstroRoomUpdate(currentAstroRoom);
          broadcastAstroRoomsList();
          break;
        }

        case 'ASTRO_RESET': {
          if (!currentAstroRoom) return;
          currentAstroRoom.scores = [0, 0, 0, 0];
          spawnAstroRound(currentAstroRoom);
          currentAstroRoom.state = 'PLAYING';
          currentAstroRoom.lastTime = Date.now();
          startAstroLoop(currentAstroRoom);
          broadcastAstroState(currentAstroRoom);
          break;
        }

        case 'ASTRO_BACK_TO_LOUNGE': {
          if (!currentAstroRoom) return;
          if (currentAstroRoom.interval) {
            clearInterval(currentAstroRoom.interval);
            currentAstroRoom.interval = null;
          }
          currentAstroRoom.state = 'LOBBY';
          broadcastAstroRoomUpdate(currentAstroRoom);
          broadcastAstroRoomsList();
          break;
        }

        case 'ASTRO_LEAVE_ROOM': {
          leaveCurrentAstroRoom();
          ws.send(JSON.stringify({ type: 'ASTRO_LEFT_ROOM' }));
          broadcastAstroRoomsList();
          break;
        }

        case 'ASTRO_JOIN': {
          const roomId = msg.roomId || 'astro-default';
          currentAstroRoom = getOrCreateAstroRoom(roomId);
          const pName = (msg.name || msg.playerName || userName || 'DevPro').slice(0, 15);

          astroSlot = -1;
          for (let i = 0; i < 4; i++) {
            if (!currentAstroRoom.slots[i] && !currentAstroRoom.isBot[i]) {
              astroSlot = i;
              currentAstroRoom.slots[i] = ws;
              currentAstroRoom.slotNames[i] = `${pName} (${['Cyan', 'Magenta', 'Green', 'Yellow'][i]})`;
              break;
            }
          }
          if (astroSlot === -1) {
            currentAstroRoom.spectators.add(ws);
          }

          ws.send(JSON.stringify({
            type: 'ASTRO_WELCOME',
            slot: astroSlot,
            slotNames: currentAstroRoom.slotNames,
            state: currentAstroRoom.state,
            scores: currentAstroRoom.scores
          }));

          broadcastAstroPlayersUpdate(currentAstroRoom);
          break;
        }

        case 'ASTRO_INPUT': {
          if (!currentAstroRoom || astroSlot < 0 || astroSlot > 3) return;
          const player = currentAstroRoom.players.find(p => p.slot === astroSlot);
          if (player && player.active) {
            if (typeof msg.rotate === 'boolean') player.inputs.rotate = msg.rotate;
            if (msg.rotateStep) player.inputs.rotateStep = true;
            if (typeof msg.shoot === 'boolean' && msg.shoot) player.inputs.shoot = true;
          }
          break;
        }

        // ====================================================================
        // BLEACH VS NARUTO 3.3 WEBSOCKET HANDLERS
        // ====================================================================
        case 'BVN_LIST_ROOMS': {
          ws.send(JSON.stringify({ type: 'BVN_ROOMS_LIST', rooms: getBvnRoomsSummary() }));
          break;
        }

        case 'BVN_CREATE_ROOM': {
          const roomId = 'bvn-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
          const roomName = (msg.roomName || 'Phòng Bleach vs Naruto').trim().slice(0, 30);
          const password = (msg.password || '').trim();
          const preferredRole = Number(msg.preferredRole) === 2 ? 2 : 1;
          const controls = (msg.controls === 'NUMBER') ? 'NUMBER' : 'LETTER';
          const pName = (msg.playerName || userName || 'DevPro').slice(0, 15);

          leaveCurrentBvnRoom();

          const room = createBvnRoom(roomId, roomName, password);
          room.hostSlot = preferredRole;
          currentBvnRoom = room;
          bvnSlot = preferredRole;
          room.slots[bvnSlot] = ws;
          room.slotNames[bvnSlot] = `${pName} (P${bvnSlot})`;
          room.controls[bvnSlot] = controls;
          bvnRooms.set(roomId, room);

          ws.send(JSON.stringify({
            type: 'BVN_WELCOME',
            slot: bvnSlot,
            controls: room.controls[bvnSlot],
            roomId: room.id,
            isHost: true
          }));

          broadcastBvnRoomUpdate(room);
          broadcastBvnRoomsList();
          break;
        }

        case 'BVN_JOIN_ROOM': {
          const roomId = (msg.roomId || 'bvn-default').trim().toLowerCase();
          const room = getOrCreateBvnRoom(roomId);
          const pName = (msg.playerName || userName || 'DevPro').slice(0, 15);

          if (room.hasPassword && room.password !== msg.password) {
            ws.send(JSON.stringify({
              type: 'BVN_ERROR',
              message: 'Mật khẩu phòng cờ/võ đài không chính xác!'
            }));
            return;
          }

          leaveCurrentBvnRoom();
          currentBvnRoom = room;

          const preferredRole = Number(msg.preferredRole) === 2 ? 2 : 1;
          const otherRole = (preferredRole === 1 ? 2 : 1);
          const controls = (msg.controls === 'NUMBER') ? 'NUMBER' : 'LETTER';

          if (!room.slots[preferredRole]) {
            bvnSlot = preferredRole;
          } else if (!room.slots[otherRole]) {
            bvnSlot = otherRole;
          } else {
            bvnSlot = 'SPECTATOR';
          }

          if (bvnSlot !== 'SPECTATOR') {
            room.slots[bvnSlot] = ws;
            room.slotNames[bvnSlot] = `${pName} (P${bvnSlot})`;
            room.controls[bvnSlot] = controls;
          } else {
            room.spectators.add(ws);
          }

          ws.send(JSON.stringify({
            type: 'BVN_WELCOME',
            slot: bvnSlot,
            controls: (bvnSlot !== 'SPECTATOR' ? room.controls[bvnSlot] : 'LETTER'),
            roomId: room.id,
            isHost: (room.hostSlot === bvnSlot)
          }));

          broadcastBvnRoomUpdate(room);
          broadcastBvnRoomsList();
          break;
        }

        case 'BVN_SWITCH_ROLE': {
          if (!currentBvnRoom) return;
          const targetSlot = (bvnSlot === 1 ? 2 : (bvnSlot === 2 ? 1 : 1));
          if (!currentBvnRoom.slots[targetSlot]) {
            const pName = currentBvnRoom.slotNames[bvnSlot] || userName || 'DevPro';
            currentBvnRoom.slots[bvnSlot] = null;
            currentBvnRoom.slotNames[bvnSlot] = `Máy ${bvnSlot} (P${bvnSlot})`;

            bvnSlot = targetSlot;
            currentBvnRoom.slots[bvnSlot] = ws;
            currentBvnRoom.slotNames[bvnSlot] = `${pName.split(' ')[0]} (P${bvnSlot})`;

            ws.send(JSON.stringify({
              type: 'BVN_WELCOME',
              slot: bvnSlot,
              controls: currentBvnRoom.controls[bvnSlot],
              roomId: currentBvnRoom.id,
              isHost: (currentBvnRoom.hostSlot === bvnSlot)
            }));

            broadcastBvnRoomUpdate(currentBvnRoom);
            broadcastBvnRoomsList();
          }
          break;
        }

        case 'BVN_SET_CONTROLS': {
          if (!currentBvnRoom || (bvnSlot !== 1 && bvnSlot !== 2)) return;
          const newControls = (msg.controls === 'NUMBER') ? 'NUMBER' : 'LETTER';
          currentBvnRoom.controls[bvnSlot] = newControls;
          broadcastBvnRoomUpdate(currentBvnRoom);
          break;
        }

        case 'BVN_LEAVE_ROOM': {
          leaveCurrentBvnRoom();
          ws.send(JSON.stringify({ type: 'BVN_LEFT_ROOM' }));
          broadcastBvnRoomsList();
          break;
        }

        case 'BVN_INPUT': {
          if (!currentBvnRoom) return;
          const otherSlot = bvnSlot === 1 ? 2 : 1;
          const targetWs = currentBvnRoom.slots[otherSlot];
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
              type: 'BVN_REMOTE_INPUT',
              role: bvnSlot,
              action: msg.action,
              key: msg.key,
              code: msg.code,
              keyCode: msg.keyCode,
              isDown: msg.isDown
            }));
          }
          break;
        }

        case 'BVN_SIGNAL': {
          if (!currentBvnRoom) return;
          const otherSlot = bvnSlot === 1 ? 2 : 1;
          const targetWs = currentBvnRoom.slots[otherSlot];
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
              type: 'BVN_SIGNAL',
              fromSlot: bvnSlot,
              data: msg.data
            }));
          }
          break;
        }

        case 'BVN_SYNC': {
          if (!currentBvnRoom) return;
          const otherSlot = bvnSlot === 1 ? 2 : 1;
          const targetWs = currentBvnRoom.slots[otherSlot];
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
              type: 'BVN_SYNC',
              fromSlot: bvnSlot,
              data: msg.data
            }));
          }
          break;
        }

        case 'PING': {
          ws.send(JSON.stringify({ type: 'PONG', timestamp: msg.timestamp }));
          break;
        }
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    // Bleach vs Naruto room cleanup
    leaveCurrentBvnRoom();
    broadcastBvnRoomsList();

    // Astro room cleanup
    leaveCurrentAstroRoom();
    broadcastAstroRoomsList();

    // Caro room cleanup
    leaveCurrentCaroRoom();
    broadcastCaroRoomsList();
  });
});


server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Cổng ${currentPort} đang bận, tự động thử cổng ${currentPort + 1}...`);
    currentPort += 1;
    setTimeout(() => {
      server.listen(currentPort, '0.0.0.0');
    }, 200);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(currentPort, '0.0.0.0', () => {
  const lanIps = getLanIps();
  const portSuffix = currentPort === 80 ? '' : `:${currentPort}`;
  console.log('\n' + '='.repeat(60));
  console.log('   🚀 INTELLIJ CARO SERVER ĐÃ SẴN SÀNG (PORT ' + currentPort + ')!');
  console.log('='.repeat(60));
  console.log(`💻 Localhost:         http://localhost${portSuffix}`);
  if (lanIps.length > 0) {
    console.log('🌐 Mạng LAN:');
    lanIps.forEach(net => {
      console.log(`   👉 http://${net.address}${portSuffix}  (${net.interface})`);
    });
  }
  if (publicTunnelUrl) {
    console.log('🚀 Link Online:');
    console.log(`   👉 ${publicTunnelUrl}`);
  }
  console.log('='.repeat(60) + '\n');

  // Tự động khởi tạo đường hầm Online Tunnel miễn phí không giới hạn băng thông
  enableOnlineTunnel();
});
