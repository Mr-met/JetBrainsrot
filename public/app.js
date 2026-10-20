/**
 * INTELLIJ IDEA MULTI-FILE CODE EDITOR & CARO LAN ENGINE
 * Authentic easyposbackend replica matching user's real IntelliJ IDEA workspace.
 * Stealth Mode: Caro is disguised inside security/SecurityFilterChainService.java!
 */

(function () {
  'use strict';

  // =========================================================
  // 1. VIRTUAL FILE SYSTEM (EASYPOSBACKEND FILES)
  // =========================================================
  const virtualFiles = {
    'RsInOutWardManagementServiceImpl.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > service > impl',
      icon: '©',
      isInterface: false,
      startLineNumber: 3738,
      content: `package vn.softdreams.easypos.service.impl;

import vn.softdreams.easypos.service.RsInOutWardManagementService;
import vn.softdreams.easypos.dto.BaseResultDTO;
import vn.softdreams.easypos.dto.RsXMLRequest;
import vn.softdreams.easypos.constants.RsInOutWardConstants;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Objects;
import java.util.Map;

@Service
@Transactional
public class RsInOutWardManagementServiceImpl implements RsInOutWardManagementService {

    private BaseResultDTO checkValidateImportXML(RsXMLRequest request) {
        ProductImportItemWarehouses ppu = mapProductProductUnits.get(keyProductProductUnits);
        if (ppu.getIsPrimary()) {
            response.setPrimary(true);
        }
        response.setProductProductUnitId(ppu.getPPUId());
        ppuId = ppu.getPPUId();
        response.setUnitId(ppu.getProductUnitId());
    } else {
        response.setAvailableProductUnits(mapProductImportItemWarehouses.get(product.getId()));
        response.setMessageErrorMap().put(RsInOutWardConstants.IMPORT_XML_UNIT_ID, XML_FILE_UNIT_PRODUCT_INVALID);
    }

    String keyProductInWarehouse = product.getId() + "_" + response.getWarehouseIdName().getId();
    boolean existsInWarehouse = mapProductInWarehouse.containsKey(keyProductInWarehouse);
    //
    // response.setAvailableWarehouses(mapProductWarehouses.get(product.getId()));
    response.setInWarehouse(false);
    // Product not existed in warehouse
    if (!existsInWarehouse) {
        response.setInWarehouse(true);
    }
    boolean hasBatchEnabled = Objects.equals(product.getHasBatch(), 1);
    if (hasBatchEnabled) {
        // (Strings.isNullOrEmpty(response.getLotNo())) {
        // response.setMessageErrorMap().put(RsInOutWardConstants.IMPORT_XML_LOT_NO, XML_FILE_LOT_NO_INVALID);
    }
    return response;
}`
    },

    'ProductProductUnitRepository.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > repository',
      icon: 'ⓘ',
      isInterface: true,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.softdreams.easypos.domain.ProductProductUnit;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProductProductUnitRepository extends JpaRepository<ProductProductUnit, Long> {
    Optional<ProductProductUnit> findByIdAndComId(Long id, Long comId);
    List<ProductProductUnit> findByProductId(Long productId);
    boolean existsByBarcodeAndComId(String barcode, Long comId);
}`
    },

    'PackageCacheService.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > service',
      icon: '©',
      isInterface: false,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class PackageCacheService {
    private final ConcurrentHashMap<String, Object> cacheMap = new ConcurrentHashMap<>();

    public Object get(String key) {
        return cacheMap.get(key);
    }

    public void put(String key, Object value) {
        cacheMap.put(key, value);
    }

    public void evict(String key) {
        cacheMap.remove(key);
    }
}`
    },

    'UserService.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > service',
      icon: 'ⓘ',
      isInterface: true,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.service;

import vn.softdreams.easypos.dto.UserDTO;
import vn.softdreams.easypos.domain.User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface UserService {
    Optional<User> findByUsername(String username);
    UserDTO getCurrentUser();
    boolean validateCredentials(String username, String rawPassword);
}`
    },

    'CategoryManagementServiceImpl.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > service > impl',
      icon: '©',
      isInterface: false,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CategoryManagementServiceImpl {
    public void syncCrmConfig() {
        log.info("Starting CRM category synchronization...");
        try {
            // syncCrn: DATA_EASYPOS\\config\\async-crm.json
        } catch (Exception ex) {
            log.error("[GetConfig] syncCrn failed: {}", ex.getMessage());
        }
    }
}`
    },

    'AreaManagementService.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > service',
      icon: 'ⓘ',
      isInterface: true,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.service;

import vn.softdreams.easypos.dto.AreaDTO;
import java.util.List;

public interface AreaManagementService {
    List<AreaDTO> getAllAreasByCompany(Long comId);
    AreaDTO getAreaDetails(Long id);
    void createArea(AreaDTO area);
}`
    },

    // DISGUISED SECURITY FILES
    'SecurityConfiguration.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > security',
      icon: '©',
      isInterface: false,
      isBvnGame: true,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/public/**", "/api/authenticate").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
}`
    },

    'JwtTokenProvider.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > security',
      icon: '©',
      isInterface: false,
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.security;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String jwtSecret = "easypos_secret_jwt_key_2026_secured";
    private final long jwtExpirationInMs = 86400000;

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
}`
    },

    // 🛡️ SECRET DISGUISED GAME FILE: SecurityFilterChainService.java
    'SecurityFilterChainService.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > security',
      icon: '©',
      isInterface: false,
      isSecurityGame: true, // CARO GAME LIVES HERE!
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityFilterChainService {

    private final JwtTokenProvider tokenProvider;

    public boolean validateInternalSecurityContext(HttpServletRequest request) {
        String token = request.getHeader("X-Security-Trace-ID");
        if (token == null || token.isEmpty()) {
            log.debug("No trace security token found in request headers");
            return false;
        }
        return tokenProvider != null;
    }

    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        // Trace access and security audit verification
        log.info("Security filter applied for IP: {}", req.getRemoteAddr());
    }
}`
    },

    // 🛡️ SECRET DISGUISED GAME FILE 2: JwtSecurityFilter.java (Astro Party Arcade)
    'JwtSecurityFilter.java': {
      path: 'easyposbackend > src > main > java > vn > softdreams > easypos > security',
      icon: '©',
      isInterface: false,
      isAstroGame: true, // 🚀 ASTRO PARTY ARCADE LIVES HERE!
      startLineNumber: 1,
      content: `package vn.softdreams.easypos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtSecurityFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = resolveToken(request);
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                String username = tokenProvider.getUsernameFromJWT(jwt);
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context: {}", ex.getMessage());
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}`
    }
  };

  // State
  let openTabs = [
    'ProductProductUnitRepository.java',
    'RsInOutWardManagementServiceImpl.java',
    'PackageCacheService.java',
    'UserService.java',
    'SecurityFilterChainService.java',
    'JwtSecurityFilter.java',
    'SecurityConfiguration.java'
  ];
  let activeFileName = 'RsInOutWardManagementServiceImpl.java';
  let modifiedFiles = new Set();
  let showSecurityCode = false; // When true, shows fake security code instead of game canvas
  let lastSecurityGame = 'SecurityFilterChainService.java';
  let astroViewMode = 'SPLIT';  // 'SPLIT' (Mặc định: Chia đôi 50:50 với code Java) | 'FULL' | 'MINI'
  let astroZoomScale = 'FIT';   // 'FIT' | 0.5 | 0.7 | 0.85 | 1.0 | 1.25
  let caroViewMode = 'FULL';    // 'FULL' | 'SPLIT'
  let bvnViewMode = 'SPLIT';     // 'SPLIT' (50:50 với Java code) | 'FULL'
  let splitRatio = 0.5;         // 50% code, 50% game

  // =========================================================
  // 2. DOM ELEMENTS
  // =========================================================
  const editorTabsBar = document.getElementById('editorTabsBar');
  const crumbFileName = document.getElementById('crumbFileName');
  const statusBreadcrumbPath = document.getElementById('statusBreadcrumbPath');
  const statusLineCol = document.getElementById('statusLineCol');

  const editorBodyArea = document.getElementById('editorBodyArea');
  const editorSplitter = document.getElementById('editorSplitter');
  const codeEditorView = document.getElementById('codeEditorView');
  const caroBoardView = document.getElementById('caroBoardView');
  const btnCaroSplit = document.getElementById('btnCaroSplit');
  const astroBoardView = document.getElementById('astroBoardView');
  const bvnBoardView = document.getElementById('bvnBoardView');
  const astroCanvas = document.getElementById('astroCanvas');
  const btnAstroViewMode = document.getElementById('btnAstroViewMode');
  const btnAstroZoom = document.getElementById('btnAstroZoom');
  const btnAstroMode = document.getElementById('btnAstroMode');
  const btnAstroMap = document.getElementById('btnAstroMap');
  const astroHudSlot = document.getElementById('astroHudSlot');
  const astroHudPlayers = document.getElementById('astroHudPlayers');
  const btnAstroAddBot = document.getElementById('btnAstroAddBot');
  const btnAstroReset = document.getElementById('btnAstroReset');
  const btnAstroBossKey = document.getElementById('btnAstroBossKey');
  const btnAstroLobbyToggle = document.getElementById('btnAstroLobbyToggle');
  const btnAstroBackLounge = document.getElementById('btnAstroBackLounge');

  // Astro Lobby & Lounge Elements
  const astroLobbyOverlay = document.getElementById('astroLobbyOverlay');
  const astroRoomLoungeOverlay = document.getElementById('astroRoomLoungeOverlay');
  const btnOpenCreateRoom = document.getElementById('btnOpenCreateRoom');
  const btnQuickPlay = document.getElementById('btnQuickPlay');
  const btnSoloBotPlay = document.getElementById('btnSoloBotPlay');
  const btnRefreshRooms = document.getElementById('btnRefreshRooms');
  const inputLobbySearch = document.getElementById('inputLobbySearch');
  const lobbyRoomCount = document.getElementById('lobbyRoomCount');
  const astroRoomsTableBody = document.getElementById('astroRoomsTableBody');

  const loungeRoomName = document.getElementById('loungeRoomName');
  const loungeLockBadge = document.getElementById('loungeLockBadge');
  const loungeRoomId = document.getElementById('loungeRoomId');
  const loungeSubtext = document.getElementById('loungeSubtext');
  const btnLeaveRoom = document.getElementById('btnLeaveRoom');
  const colorSlotsGrid = document.getElementById('colorSlotsGrid');
  const mapsSelectionGrid = document.getElementById('mapsSelectionGrid');
  const mapSelectionHint = document.getElementById('mapSelectionHint');
  const loungeStatusMsg = document.getElementById('loungeStatusMsg');
  const btnStartGame = document.getElementById('btnStartGame');
  const loungeModeBadge = document.getElementById('loungeModeBadge');
  const btnLoungeToggleMode = document.getElementById('btnLoungeToggleMode');

  const modalCreateRoomBackdrop = document.getElementById('modalCreateRoomBackdrop');
  const createRoomName = document.getElementById('createRoomName');
  const createRoomPassword = document.getElementById('createRoomPassword');
  const createAstroModePicker = document.getElementById('createAstroModePicker');
  const createAstroBotCount = document.getElementById('createAstroBotCount');
  const groupAstroBotCount = document.getElementById('groupAstroBotCount');
  const createColorPicker = document.getElementById('createColorPicker');
  const createRoomMap = document.getElementById('createRoomMap');
  const btnCloseCreateRoomModal = document.getElementById('btnCloseCreateRoomModal');
  const btnCancelCreateRoom = document.getElementById('btnCancelCreateRoom');
  const btnConfirmCreateRoom = document.getElementById('btnConfirmCreateRoom');

  const modalPasswordBackdrop = document.getElementById('modalPasswordBackdrop');
  const passwordPromptRoomName = document.getElementById('passwordPromptRoomName');
  const inputRoomPassword = document.getElementById('inputRoomPassword');
  const btnClosePasswordModal = document.getElementById('btnClosePasswordModal');
  const btnCancelPasswordModal = document.getElementById('btnCancelPasswordModal');
  const btnConfirmJoinPasswordRoom = document.getElementById('btnConfirmJoinPasswordRoom');

  // Caro Lobby & Modal Elements
  const btnCaroLobbyToggle = document.getElementById('btnCaroLobbyToggle');
  const caroHudRoomName = document.getElementById('caroHudRoomName');
  const caroHudRole = document.getElementById('caroHudRole');
  const btnCaroSwitchRole = document.getElementById('btnCaroSwitchRole');
  const btnCaroLeaveRoom = document.getElementById('btnCaroLeaveRoom');
  const caroLobbyOverlay = document.getElementById('caroLobbyOverlay');
  const btnOpenCaroCreateRoom = document.getElementById('btnOpenCaroCreateRoom');
  const btnCaroQuickPlay = document.getElementById('btnCaroQuickPlay');
  const btnCaroSoloMode = document.getElementById('btnCaroSoloMode');
  const btnRefreshCaroRooms = document.getElementById('btnRefreshCaroRooms');
  const inputCaroLobbySearch = document.getElementById('inputCaroLobbySearch');
  const caroLobbyRoomCount = document.getElementById('caroLobbyRoomCount');
  const caroRoomsTableBody = document.getElementById('caroRoomsTableBody');

  const modalCaroCreateRoomBackdrop = document.getElementById('modalCaroCreateRoomBackdrop');
  const createCaroRoomName = document.getElementById('createCaroRoomName');
  const createCaroRoomPassword = document.getElementById('createCaroRoomPassword');
  const createCaroRolePicker = document.getElementById('createCaroRolePicker');
  const btnCloseCaroCreateModal = document.getElementById('btnCloseCaroCreateModal');
  const btnCancelCaroCreateModal = document.getElementById('btnCancelCaroCreateModal');
  const btnConfirmCaroCreateRoom = document.getElementById('btnConfirmCaroCreateRoom');

  const modalCaroPasswordBackdrop = document.getElementById('modalCaroPasswordBackdrop');
  const caroPasswordPromptRoomName = document.getElementById('caroPasswordPromptRoomName');
  const inputCaroRoomPassword = document.getElementById('inputCaroRoomPassword');
  const btnCloseCaroPasswordModal = document.getElementById('btnCloseCaroPasswordModal');
  const btnCancelCaroPasswordModal = document.getElementById('btnCancelCaroPasswordModal');
  const btnConfirmJoinCaroPasswordRoom = document.getElementById('btnConfirmJoinCaroPasswordRoom');

  const editorGutter = document.getElementById('editorGutter');
  const syntaxHighlightLayer = document.getElementById('syntaxHighlightLayer');
  const codeInputTextarea = document.getElementById('codeInputTextarea');
  const editorContentWrapper = document.getElementById('editorContentWrapper');

  const btnBossKey = document.getElementById('btnBossKey');
  const statusBossKeyIndicator = document.getElementById('statusBossKeyIndicator');

  const bottomToolWindow = document.getElementById('bottomToolWindow');
  const btnToggleBottom = document.getElementById('btnToggleBottom');
  const tabRunEasypos = document.getElementById('tabRunEasypos');
  const tabRunCaro = document.getElementById('tabRunCaro');
  const consoleLogs = document.getElementById('consoleLogs');
  const caroChatWrapper = document.getElementById('caroChatWrapper');
  const chatLogsStream = document.getElementById('chatLogsStream');
  const txtChatInput = document.getElementById('txtChatInput');
  const btnSendChat = document.getElementById('btnSendChat');
  const btnClearLogs = document.getElementById('btnClearLogs');

  const sideNgrokUrl = document.getElementById('sideNgrokUrl');
  const sideLanUrl = document.getElementById('sideLanUrl');
  const btnSideCopyNgrok = document.getElementById('btnSideCopyNgrok');
  const btnSideCopyLan = document.getElementById('btnSideCopyLan');
  const sideRoleText = document.getElementById('sideRoleText');
  const sideTurnText = document.getElementById('sideTurnText');

  const projectToolWindow = document.getElementById('projectToolWindow');
  const btnMinimizeProject = document.getElementById('btnMinimizeProject');
  const mavenToolWindow = document.getElementById('mavenToolWindow');
  const btnMinimizeMaven = document.getElementById('btnMinimizeMaven');
  const pillMaven = document.getElementById('pillMaven');
  const btnMavenReload = document.getElementById('btnMavenReload');
  const btnMavenCollapseAll = document.getElementById('btnMavenCollapseAll');
  const btnMavenSettings = document.getElementById('btnMavenSettings');
  const mavenProfilesNode = document.getElementById('mavenProfilesNode');
  const mavenProfilesChildren = document.getElementById('mavenProfilesChildren');
  const mavenDevUserNode = document.getElementById('mavenDevUserNode');
  const mavenProfileUserLabel = document.getElementById('mavenProfileUserLabel');
  const mavenEasyposNode = document.getElementById('mavenEasyposNode');
  const mavenEasyposChildren = document.getElementById('mavenEasyposChildren');

  const modalDevProfileBackdrop = document.getElementById('modalDevProfileBackdrop');
  const inputDevUserName = document.getElementById('inputDevUserName');
  const jvmPreviewName = document.getElementById('jvmPreviewName');
  const btnCloseProfileModal = document.getElementById('btnCloseProfileModal');
  const btnCancelProfileModal = document.getElementById('btnCancelProfileModal');
  const btnSaveProfileModal = document.getElementById('btnSaveProfileModal');

  // Caro Canvas Elements
  const canvas = document.getElementById('caroCanvas');
  const ctx = canvas.getContext('2d');
  const hudCoord = document.getElementById('hudCoord');
  const hudZoom = document.getElementById('hudZoom');
  const hudTurn = document.getElementById('hudTurn');
  const hudModeBtn = document.getElementById('hudModeBtn');
  const hudCenterBtn = document.getElementById('hudCenterBtn');
  const hudLastMoveBtn = document.getElementById('hudLastMoveBtn');
  const hudRematchBtn = document.getElementById('hudRematchBtn');
  const hudUndoBtn = document.getElementById('hudUndoBtn');
  const ijNotification = document.getElementById('ijNotification');
  const notifTitle = document.getElementById('notifTitle');
  const notifBody = document.getElementById('notifBody');

  // =========================================================
  // 3. SYNTAX HIGHLIGHTING ENGINE (INTELLIJ JAVA THEME)
  // =========================================================
  function highlightJava(rawCode) {
    let escaped = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const tokenRegex = /(\/\/.*$)|(".*?"|'.*?')|(@\w+)|(\b(package|import|public|class|interface|implements|extends|private|protected|static|final|void|return|if|else|for|while|new|this|boolean|int|long|double|float|char|byte|null|true|false|try|catch|finally|throw|throws)\b)|(\b[A-Z]\w*\b)|(\b\d+(\.\d+)?\b)/gm;

    return escaped.replace(tokenRegex, (match, comment, str, ann, kw, _, cls, num) => {
      if (comment) return `<span class="com">${comment}</span>`;
      if (str) return `<span class="str">${str}</span>`;
      if (ann) return `<span class="ann">${ann}</span>`;
      if (kw) return `<span class="kw">${kw}</span>`;
      if (cls) return `<span class="cls">${cls}</span>`;
      if (num) return `<span class="num">${num}</span>`;
      return match;
    });
  }

  // =========================================================
  // 4. EDITOR RENDERING & EVENT HANDLERS
  // =========================================================
  function renderEditorContent(fileName) {
    const file = virtualFiles[fileName];
    if (!file) return;

    // Disguised Caro game file handling
    if (file.isSecurityGame) {
      lastSecurityGame = fileName;
      if (!showSecurityCode) {
        if (astroBoardView) {
          astroBoardView.style.display = 'none';
          astroBoardView.classList.remove('mini-mode');
        }
        if (bvnBoardView) bvnBoardView.style.display = 'none';
        if (caroViewMode === 'SPLIT') {
          if (editorBodyArea) editorBodyArea.classList.add('split-active');
          codeEditorView.style.display = 'flex';
          codeEditorView.style.width = `${Math.floor(splitRatio * 100)}%`;
          caroBoardView.style.display = 'block';
          const code = file.content;
          codeInputTextarea.value = code;
          syntaxHighlightLayer.innerHTML = highlightJava(code);
          updateLineNumbers(fileName, code);
          updateCursorPosition();
        } else {
          if (editorBodyArea) editorBodyArea.classList.remove('split-active');
          codeEditorView.style.display = 'none';
          codeEditorView.style.width = '100%';
          caroBoardView.style.display = 'block';
        }
        document.title = `easyposbackend – SecurityFilterChainService.java [IntelliJ IDEA]`;
        updateBreadcrumb(fileName);
        updateAstroViewUI();
        resizeCanvas();
        renderBoard();
        return;
      }
    }

    // Disguised Astro Party arcade game file handling
    if (file.isAstroGame) {
      lastSecurityGame = fileName;
      if (!showSecurityCode) {
        caroBoardView.style.display = 'none';
        if (bvnBoardView) bvnBoardView.style.display = 'none';
        if (astroViewMode === 'SPLIT') {
          if (editorBodyArea) editorBodyArea.classList.add('split-active');
          astroBoardView.classList.remove('mini-mode');
          codeEditorView.style.display = 'flex';
          codeEditorView.style.width = `${Math.floor(splitRatio * 100)}%`;
          astroBoardView.style.display = 'flex';
          const code = file.content;
          codeInputTextarea.value = code;
          syntaxHighlightLayer.innerHTML = highlightJava(code);
          updateLineNumbers(fileName, code);
          updateCursorPosition();
        } else if (astroViewMode === 'MINI') {
          if (editorBodyArea) editorBodyArea.classList.remove('split-active');
          codeEditorView.style.display = 'flex';
          codeEditorView.style.width = '100%';
          const code = file.content;
          codeInputTextarea.value = code;
          syntaxHighlightLayer.innerHTML = highlightJava(code);
          updateLineNumbers(fileName, code);
          updateCursorPosition();
          astroBoardView.classList.add('mini-mode');
          astroBoardView.style.display = 'flex';
        } else {
          // FULL
          if (editorBodyArea) editorBodyArea.classList.remove('split-active');
          astroBoardView.classList.remove('mini-mode');
          codeEditorView.style.display = 'none';
          codeEditorView.style.width = '100%';
          astroBoardView.style.display = 'flex';
          astroBoardView.style.width = '100%';
        }
        document.title = `easyposbackend – JwtSecurityFilter.java [IntelliJ IDEA]`;
        updateBreadcrumb(fileName);
        updateAstroViewUI();
        resizeAstroCanvas();
        return;
      }
    }

    // Disguised Bleach vs Naruto fighting game file handling
    if (file.isBvnGame) {
      lastSecurityGame = fileName;
      if (!showSecurityCode) {
        caroBoardView.style.display = 'none';
        if (astroBoardView) {
          astroBoardView.classList.remove('mini-mode');
          astroBoardView.style.display = 'none';
        }
        if (bvnViewMode === 'SPLIT') {
          if (editorBodyArea) editorBodyArea.classList.add('split-active');
          codeEditorView.style.display = 'flex';
          codeEditorView.style.width = `${Math.floor(splitRatio * 100)}%`;
          bvnBoardView.style.display = 'flex';
          const code = file.content;
          codeInputTextarea.value = code;
          syntaxHighlightLayer.innerHTML = highlightJava(code);
          updateLineNumbers(fileName, code);
          updateCursorPosition();
        } else {
          // FULL
          if (editorBodyArea) editorBodyArea.classList.remove('split-active');
          codeEditorView.style.display = 'none';
          codeEditorView.style.width = '100%';
          bvnBoardView.style.display = 'flex';
          bvnBoardView.style.width = '100%';
        }
        document.title = `easyposbackend – SecurityConfiguration.java [IntelliJ IDEA]`;
        updateBreadcrumb(fileName);
        if (typeof initBvnGameIfNeeded === 'function') initBvnGameIfNeeded();
        if (typeof updateBvnViewUI === 'function') updateBvnViewUI();
        return;
      }
    }

    // Normal Java Code Editor view
    if (editorBodyArea) editorBodyArea.classList.remove('split-active');
    caroBoardView.style.display = 'none';
    if (astroBoardView) {
      astroBoardView.classList.remove('mini-mode');
      astroBoardView.style.display = 'none';
    }
    if (bvnBoardView) bvnBoardView.style.display = 'none';
    codeEditorView.style.display = 'flex';
    codeEditorView.style.width = '100%';
    document.title = `easyposbackend – ${fileName} [IntelliJ IDEA]`;

    const code = file.content;
    codeInputTextarea.value = code;
    syntaxHighlightLayer.innerHTML = highlightJava(code);

    updateLineNumbers(fileName, code);
    updateBreadcrumb(fileName);
    updateCursorPosition();
  }

  function updateLineNumbers(fileName, code) {
    const file = virtualFiles[fileName];
    const linesCount = code.split('\n').length;
    const startNum = (file && file.startLineNumber) ? file.startLineNumber : 1;

    let gutterHtml = '';
    for (let i = 0; i < linesCount; i++) {
      gutterHtml += `<div>${startNum + i}</div>`;
    }
    editorGutter.innerHTML = gutterHtml;
  }

  function updateBreadcrumb(fileName) {
    const file = virtualFiles[fileName];
    if (file) {
      statusBreadcrumbPath.textContent = file.path;
      crumbFileName.textContent = fileName.replace('.java', '');
    }
  }

  function updateCursorPosition() {
    const text = codeInputTextarea.value;
    const selStart = codeInputTextarea.selectionStart || 0;
    const textBefore = text.substring(0, selStart);
    const lines = textBefore.split('\n');
    const lineIndex = lines.length;
    const colIndex = lines[lines.length - 1].length + 1;

    const file = virtualFiles[activeFileName];
    const baseLine = (file && file.startLineNumber) ? file.startLineNumber : 1;
    statusLineCol.textContent = `Ln ${baseLine + lineIndex - 1}, Col ${colIndex}`;
  }

  editorContentWrapper.addEventListener('scroll', () => {
    editorGutter.scrollTop = editorContentWrapper.scrollTop;
  });

  codeInputTextarea.addEventListener('scroll', () => {
    editorContentWrapper.scrollTop = codeInputTextarea.scrollTop;
    editorContentWrapper.scrollLeft = codeInputTextarea.scrollLeft;
  });

  codeInputTextarea.addEventListener('input', () => {
    const code = codeInputTextarea.value;
    syntaxHighlightLayer.innerHTML = highlightJava(code);

    if (virtualFiles[activeFileName]) {
      virtualFiles[activeFileName].content = code;
    }

    modifiedFiles.add(activeFileName);
    renderTabs();
    updateLineNumbers(activeFileName, code);
    updateCursorPosition();
  });

  codeInputTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeInputTextarea.selectionStart;
      const end = codeInputTextarea.selectionEnd;
      const value = codeInputTextarea.value;

      codeInputTextarea.value = value.substring(0, start) + '    ' + value.substring(end);
      codeInputTextarea.selectionStart = codeInputTextarea.selectionEnd = start + 4;
      codeInputTextarea.dispatchEvent(new Event('input'));
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      modifiedFiles.delete(activeFileName);
      renderTabs();
      showToastNotification('File Saved', `${activeFileName} đã được lưu thành công.`);
    }
  });

  codeInputTextarea.addEventListener('click', updateCursorPosition);
  codeInputTextarea.addEventListener('keyup', updateCursorPosition);

  // =========================================================
  // 5. TAB MANAGEMENT & SWITCHING
  // =========================================================
  function renderTabs() {
    editorTabsBar.innerHTML = '';

    openTabs.forEach(fileName => {
      const file = virtualFiles[fileName] || { icon: '©', isInterface: false };
      const isActive = fileName === activeFileName;
      const isModified = modifiedFiles.has(fileName);

      const tab = document.createElement('div');
      tab.className = `tab-item${isActive ? ' active' : ''}`;
      tab.dataset.file = fileName;

      const badgeClass = file.isInterface ? 'java-interface-badge' : 'java-class-badge';
      tab.innerHTML = `
        <span class="${badgeClass}">${file.icon}</span>
        <span class="tab-name">${fileName}${isModified ? ' •' : ''}</span>
        <span class="tab-close" data-close="${fileName}">✕</span>
      `;

      tab.addEventListener('click', (e) => {
        if (e.target.dataset.close) {
          closeTab(e.target.dataset.close);
        } else {
          switchToFile(fileName);
        }
      });

      editorTabsBar.appendChild(tab);
    });

    const badges = document.createElement('div');
    badges.className = 'tabs-right-badges';
    badges.innerHTML = `
      <span class="error-badge error-red">2</span>
      <span class="error-badge warn-orange">0</span>
      <span class="error-badge info-yellow">1</span>
      <span class="warn-summary">⚠ 257 ▴</span>
    `;
    editorTabsBar.appendChild(badges);

    document.querySelectorAll('.tree-node.file').forEach(el => {
      el.classList.toggle('active', el.dataset.file === activeFileName);
    });
  }

  function switchToFile(fileName) {
    if (!virtualFiles[fileName]) return;
    if (!openTabs.includes(fileName)) {
      openTabs.push(fileName);
    }
    activeFileName = fileName;
    showSecurityCode = false; // Reset to Caro board if opening SecurityFilterChainService
    renderTabs();
    renderEditorContent(fileName);

    if (fileName === 'JwtSecurityFilter.java') {
      if (typeof handleSwitchToAstroFile === 'function') {
        handleSwitchToAstroFile();
      }
    } else if (fileName === 'SecurityFilterChainService.java') {
      if (typeof handleSwitchToCaroFile === 'function') {
        handleSwitchToCaroFile();
      }
    } else if (fileName === 'SecurityConfiguration.java') {
      if (typeof handleSwitchToBvnFile === 'function') {
        handleSwitchToBvnFile();
      }
    }
  }

  function closeTab(fileName) {
    openTabs = openTabs.filter(f => f !== fileName);
    if (activeFileName === fileName) {
      activeFileName = openTabs.length > 0 ? openTabs[openTabs.length - 1] : 'RsInOutWardManagementServiceImpl.java';
    }
    renderTabs();
    renderEditorContent(activeFileName);
  }

  document.querySelectorAll('.tree-node.file').forEach(el => {
    el.addEventListener('click', () => {
      const fileName = el.dataset.file;
      if (fileName) switchToFile(fileName);
    });
  });

  document.querySelectorAll('.tree-node.folder').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextSibling = el.nextElementSibling;
      if (nextSibling && nextSibling.classList.contains('tree-children')) {
        const isCollapsed = nextSibling.style.display === 'none';
        nextSibling.style.display = isCollapsed ? 'block' : 'none';
        const arrow = el.querySelector('.tree-arrow');
        if (arrow) arrow.textContent = isCollapsed ? '▼' : '▶';
      }
    });
  });

  // =========================================================
  // 6. BOSS KEY / STEALTH SWITCHER
  // =========================================================
  function toggleBossMode() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      try {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      } catch (_) {}
    }
    if (activeFileName === 'SecurityFilterChainService.java' || activeFileName === 'JwtSecurityFilter.java' || activeFileName === 'SecurityConfiguration.java') {
      // Toggle between code view and game view
      showSecurityCode = !showSecurityCode;
      renderEditorContent(activeFileName);
      if (showSecurityCode) codeInputTextarea.focus();
    } else {
      // If currently on another code file, switch to the last played security game
      switchToFile(lastSecurityGame || 'SecurityConfiguration.java');
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'F2') {
      toggleBossMode();
      e.preventDefault();
    }
  });

  btnBossKey.addEventListener('click', toggleBossMode);
  statusBossKeyIndicator.addEventListener('click', toggleBossMode);

  // =========================================================
  // 7. BOTTOM RUN TOOL WINDOW TABS & LOGS
  // =========================================================
  tabRunEasypos.addEventListener('click', () => {
    tabRunEasypos.classList.add('active');
    tabRunCaro.classList.remove('active');
    consoleLogs.style.display = 'block';
    caroChatWrapper.style.display = 'none';
  });

  tabRunCaro.addEventListener('click', () => {
    tabRunCaro.classList.add('active');
    tabRunEasypos.classList.remove('active');
    consoleLogs.style.display = 'none';
    caroChatWrapper.style.display = 'flex';
    const dot = tabRunCaro.querySelector('.chat-unread-dot');
    if (dot) dot.remove();
    if (txtChatInput) txtChatInput.focus();
  });

  btnToggleBottom.addEventListener('click', () => {
    bottomToolWindow.classList.toggle('collapsed');
  });

  btnMinimizeProject.addEventListener('click', () => {
    projectToolWindow.classList.toggle('collapsed');
  });

  btnMinimizeMaven.addEventListener('click', () => {
    mavenToolWindow.classList.toggle('collapsed');
  });

  pillMaven.addEventListener('click', () => {
    mavenToolWindow.classList.toggle('collapsed');
    pillMaven.classList.toggle('active', !mavenToolWindow.classList.contains('collapsed'));
  });

  // Storage helpers for customized player name (DevPro by default)
  function getStoredPlayerName() {
    try {
      const saved = localStorage.getItem('easypos_player_name');
      if (saved && saved.trim()) return saved.trim().slice(0, 20);
    } catch (_) {}
    return 'DevPro';
  }

  function setStoredPlayerName(name) {
    try {
      localStorage.setItem('easypos_player_name', name);
    } catch (_) {}
  }

  function openDevProfileModal() {
    if (!modalDevProfileBackdrop) return;
    const currentName = gameState.playerName || 'DevPro';
    if (inputDevUserName) inputDevUserName.value = currentName;
    if (jvmPreviewName) jvmPreviewName.textContent = currentName;
    modalDevProfileBackdrop.style.display = 'flex';
    setTimeout(() => {
      if (inputDevUserName) {
        inputDevUserName.focus();
        inputDevUserName.select();
      }
    }, 80);
  }

  function closeDevProfileModal() {
    if (modalDevProfileBackdrop) modalDevProfileBackdrop.style.display = 'none';
  }

  function saveDevProfileName() {
    const raw = (inputDevUserName ? inputDevUserName.value : '').trim();
    const newName = (raw.length > 0 ? raw : 'DevPro').slice(0, 20);
    setStoredPlayerName(newName);
    gameState.playerName = newName;

    if (mavenProfileUserLabel) mavenProfileUserLabel.textContent = newName;
    if (jvmPreviewName) jvmPreviewName.textContent = newName;

    // Send update to server if connected
    if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
      gameState.ws.send(JSON.stringify({
        type: 'UPDATE_NAME',
        name: newName
      }));
    }

    // Update Astro Party slot label in lobby lounge if currently joined
    if (typeof astroLobby !== 'undefined' && astroLobby.currentRoom && astroLobby.currentRoom.mySlot >= 0) {
      const mySlot = astroLobby.currentRoom.mySlot;
      if (astroLobby.currentRoom.slots && astroLobby.currentRoom.slots[mySlot]) {
        astroLobby.currentRoom.slots[mySlot].name = `${newName} (${['Cyan', 'Magenta', 'Green', 'Yellow'][mySlot]})`;
        if (typeof renderAstroLounge === 'function') renderAstroLounge();
      }
    }

    // Synchronize pilot / Astro player configs and HUD
    if (typeof ASTRO_PLAYER_CONFIGS !== 'undefined' && ASTRO_PLAYER_CONFIGS[0]) {
      ASTRO_PLAYER_CONFIGS[0].name = newName;
    }
    if (typeof astroOnlineState !== 'undefined' && astroOnlineState.slotNames && astroOnlineState.mySlot >= 0) {
      const mySlot = astroOnlineState.mySlot;
      const colors = ['Cyan', 'Magenta', 'Green', 'Yellow'];
      astroOnlineState.slotNames[mySlot] = `${newName} (${colors[mySlot]})`;
    }
    if (typeof updateAstroHudUI === 'function') {
      updateAstroHudUI();
    }

    if (createRoomName && (!createRoomName.value || createRoomName.value.startsWith('Phòng của '))) {
      createRoomName.value = `Phòng của ${newName}`;
    }

    // Update Caro status if applicable
    if (typeof updateGameStatusUI === 'function') {
      updateGameStatusUI();
    }

    closeDevProfileModal();
    showToastNotification('Maven Profile Properties', `Đã lưu định danh dev-user: user.name = "${newName}"`);
  }

  // Bind Maven toolbar & tree actions
  if (btnMavenReload) {
    btnMavenReload.addEventListener('click', () => {
      showToastNotification('Maven', 'Đã tải lại cấu hình dự án Maven (Profiles: [dev, api-docs])');
    });
  }

  if (btnMavenCollapseAll) {
    btnMavenCollapseAll.addEventListener('click', () => {
      if (mavenProfilesChildren) mavenProfilesChildren.style.display = 'none';
      if (mavenEasyposChildren) mavenEasyposChildren.style.display = 'none';
      const arrowP = mavenProfilesNode ? mavenProfilesNode.querySelector('.tree-arrow') : null;
      if (arrowP) arrowP.textContent = '▶';
      const arrowE = mavenEasyposNode ? mavenEasyposNode.querySelector('.tree-arrow') : null;
      if (arrowE) arrowE.textContent = '▶';
    });
  }

  if (btnMavenSettings) {
    btnMavenSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      openDevProfileModal();
    });
  }

  if (mavenDevUserNode) {
    mavenDevUserNode.addEventListener('click', (e) => {
      e.stopPropagation();
      openDevProfileModal();
    });
    mavenDevUserNode.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      openDevProfileModal();
    });
  }

  if (mavenProfilesNode) {
    mavenProfilesNode.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      openDevProfileModal();
    });
    mavenProfilesNode.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      openDevProfileModal();
    });
  }

  if (inputDevUserName) {
    inputDevUserName.addEventListener('input', () => {
      const v = inputDevUserName.value.trim();
      if (jvmPreviewName) jvmPreviewName.textContent = v || 'DevPro';
    });
    inputDevUserName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveDevProfileName();
      else if (e.key === 'Escape') closeDevProfileModal();
    });
  }

  if (btnSaveProfileModal) btnSaveProfileModal.addEventListener('click', saveDevProfileName);
  if (btnCancelProfileModal) btnCancelProfileModal.addEventListener('click', closeDevProfileModal);
  if (btnCloseProfileModal) btnCloseProfileModal.addEventListener('click', closeDevProfileModal);
  if (modalDevProfileBackdrop) {
    modalDevProfileBackdrop.addEventListener('click', (e) => {
      if (e.target === modalDevProfileBackdrop) closeDevProfileModal();
    });
  }

  btnClearLogs.addEventListener('click', () => {
    consoleLogs.innerHTML = '<div class="log-line log-finished">Process finished with exit code -1</div>';
    chatLogsStream.innerHTML = '';
  });

  // =========================================================
  // 8. INFINITE CARO CANVAS & GAME ENGINE
  // =========================================================
  const gameState = {
    playMode: 'SOLO', // 'SOLO' (1 máy: X luân phiên O) vs 'LAN' (Qua mạng)
    ws: null,
    roomId: 'dev-room-1',
    playerName: getStoredPlayerName(),
    myRole: 'X',
    currentTurn: 'X', // 'X' or 'O'
    winner: null,
    winningLine: null,
    scores: { X: 0, O: 0 },
    moves: new Map(),
    moveList: [],
    lastMove: null,

    // Infinite Canvas
    cellSize: 38,
    zoom: 1.0,
    originX: 0,
    originY: 0,
    hoveredCell: null,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialOriginX: 0,
    initialOriginY: 0,
    hasMovedSignificantly: false
  };

  if (mavenProfileUserLabel) mavenProfileUserLabel.textContent = gameState.playerName;
  if (jvmPreviewName) jvmPreviewName.textContent = gameState.playerName;

  if (chatLogsStream && chatLogsStream.children.length === 0) {
    const initLine = document.createElement('div');
    initLine.className = 'log-line';
    initLine.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString('vi-VN', { hour12: false })}]</span> <span class="log-info">[SecurityMonitor]</span> : <span style="color:#8ac0ff;">Kênh chat nội bộ đã kích hoạt. Bạn có thể trò chuyện với mọi người trong mạng LAN/Internet tại đây!</span>`;
    chatLogsStream.appendChild(initLine);
  }

  function showToastNotification(title, message) {
    notifTitle.textContent = title;
    notifBody.textContent = message;
    ijNotification.style.display = 'block';
    setTimeout(() => { ijNotification.style.display = 'none'; }, 4000);
  }

  function resizeCanvas() {
    if (caroBoardView.style.display === 'none') return;
    const rect = caroBoardView.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    renderBoard();
  }

  function centerBoard() {
    const rect = caroBoardView.getBoundingClientRect();
    gameState.originX = rect.width / 2;
    gameState.originY = rect.height / 2;
    renderBoard();
  }

  function screenToBoard(sx, sy) {
    const cell = gameState.cellSize * gameState.zoom;
    return {
      x: Math.floor((sx - gameState.originX) / cell),
      y: Math.floor((sy - gameState.originY) / cell)
    };
  }

  function boardToScreen(bx, by) {
    const cell = gameState.cellSize * gameState.zoom;
    return {
      x: gameState.originX + bx * cell,
      y: gameState.originY + by * cell
    };
  }

  // Local Win Checker for 5-in-a-row
  function checkWinLocally(movesMap, lastX, lastY, player) {
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

  function renderBoard() {
    if (caroBoardView.style.display === 'none') return;
    const rect = caroBoardView.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Dark editor background #1e1f22
    ctx.fillStyle = '#1e1f22';
    ctx.fillRect(0, 0, w, h);

    const cell = gameState.cellSize * gameState.zoom;
    const minBx = Math.floor((-gameState.originX) / cell) - 1;
    const maxBx = Math.ceil((w - gameState.originX) / cell) + 1;
    const minBy = Math.floor((-gameState.originY) / cell) - 1;
    const maxBy = Math.ceil((h - gameState.originY) / cell) + 1;

    // Grid Lines
    ctx.lineWidth = 1;
    for (let x = minBx; x <= maxBx; x++) {
      const sx = Math.floor(gameState.originX + x * cell) + 0.5;
      ctx.strokeStyle = (x === 0) ? '#3d4450' : ((x % 5 === 0) ? '#2d3036' : '#24262a');
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, h);
      ctx.stroke();

      if (x % 5 === 0 && gameState.zoom >= 0.7) {
        ctx.fillStyle = '#494d55';
        ctx.font = '10px "JetBrains Mono", Consolas, monospace';
        ctx.fillText(x.toString(), sx + 3, 14);
      }
    }

    for (let y = minBy; y <= maxBy; y++) {
      const sy = Math.floor(gameState.originY + y * cell) + 0.5;
      ctx.strokeStyle = (y === 0) ? '#3d4450' : ((y % 5 === 0) ? '#2d3036' : '#24262a');
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
      ctx.stroke();

      if (y % 5 === 0 && gameState.zoom >= 0.7) {
        ctx.fillStyle = '#494d55';
        ctx.font = '10px "JetBrains Mono", Consolas, monospace';
        ctx.fillText(y.toString(), 4, sy - 3);
      }
    }

    // Origin (0,0) accent
    const origin = boardToScreen(0, 0);
    ctx.fillStyle = '#3574f026';
    ctx.fillRect(origin.x, origin.y, cell, cell);

    // Hover ghost
    if (gameState.hoveredCell && !gameState.winner) {
      const canHover = (gameState.playMode === 'SOLO') || (gameState.currentTurn === gameState.myRole);
      if (canHover) {
        const { x, y } = gameState.hoveredCell;
        if (!gameState.moves.has(`${x},${y}`)) {
          drawStone(x, y, gameState.currentTurn, true);
        }
      }
    }

    // Placed stones
    for (const m of gameState.moveList) {
      if (m.x >= minBx - 1 && m.x <= maxBx + 1 && m.y >= minBy - 1 && m.y <= maxBy + 1) {
        const isLast = gameState.lastMove && gameState.lastMove.x === m.x && gameState.lastMove.y === m.y;
        drawStone(m.x, m.y, m.player, false, isLast, m.order);
      }
    }

    // Winning line
    if (gameState.winningLine && gameState.winningLine.length >= 5) {
      drawWinningLine(gameState.winningLine);
    }

    ctx.restore();
    hudZoom.textContent = `Zoom: ${Math.round(gameState.zoom * 100)}%`;
  }

  function drawStone(bx, by, player, isGhost = false, isLast = false, order = null) {
    const cell = gameState.cellSize * gameState.zoom;
    const sx = gameState.originX + bx * cell;
    const sy = gameState.originY + by * cell;
    const cx = sx + cell / 2;
    const cy = sy + cell / 2;
    const radius = cell * 0.38;

    ctx.save();
    if (isGhost) ctx.globalAlpha = 0.35;

    if (isLast && !isGhost) {
      ctx.fillStyle = 'rgba(229, 192, 123, 0.15)';
      ctx.fillRect(sx + 1, sy + 1, cell - 2, cell - 2);
      ctx.strokeStyle = '#e5c07b';
      ctx.lineWidth = 2;
      ctx.strokeRect(sx + 1.5, sy + 1.5, cell - 3, cell - 3);
    }

    if (player === 'X') {
      ctx.strokeStyle = isGhost ? '#56a8f5' : '#3574f0';
      ctx.lineWidth = Math.max(2, Math.round(cell * 0.1));
      ctx.lineCap = 'round';
      const pad = radius * 0.75;
      ctx.beginPath();
      ctx.moveTo(cx - pad, cy - pad);
      ctx.lineTo(cx + pad, cy + pad);
      ctx.moveTo(cx + pad, cy - pad);
      ctx.lineTo(cx - pad, cy + pad);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#f9826c';
      ctx.lineWidth = Math.max(2, Math.round(cell * 0.1));
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.8, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (!isGhost && order && gameState.zoom >= 0.75 && cell >= 30) {
      ctx.fillStyle = isLast ? '#e5c07b' : '#7a7e85';
      ctx.font = '9px "JetBrains Mono", Consolas, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(order.toString(), sx + cell - 3, sy + cell - 2);
    }
    ctx.restore();
  }

  function drawWinningLine(cells) {
    const cell = gameState.cellSize * gameState.zoom;
    ctx.save();
    ctx.strokeStyle = '#57965c';
    ctx.lineWidth = Math.max(4, Math.round(cell * 0.14));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    cells.forEach((c, idx) => {
      const cx = gameState.originX + (c.x + 0.5) * cell;
      const cy = gameState.originY + (c.y + 0.5) * cell;
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
    ctx.restore();
  }

  // Mouse Interactions on Caro Canvas
  caroBoardView.addEventListener('mousedown', (e) => {
    gameState.isDragging = true;
    gameState.dragStartX = e.clientX;
    gameState.dragStartY = e.clientY;
    gameState.initialOriginX = gameState.originX;
    gameState.initialOriginY = gameState.originY;
    gameState.hasMovedSignificantly = false;
    caroBoardView.classList.add('panning');
  });

  window.addEventListener('mousemove', (e) => {
    const rect = caroBoardView.getBoundingClientRect();
    const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

    if (gameState.isDragging) {
      const dx = e.clientX - gameState.dragStartX;
      const dy = e.clientY - gameState.dragStartY;
      if (Math.hypot(dx, dy) > 5) gameState.hasMovedSignificantly = true;
      gameState.originX = gameState.initialOriginX + dx;
      gameState.originY = gameState.initialOriginY + dy;
      renderBoard();
    }

    if (isInside && caroBoardView.style.display !== 'none') {
      const { x, y } = screenToBoard(e.clientX - rect.left, e.clientY - rect.top);
      gameState.hoveredCell = { x, y };
      hudCoord.textContent = `Pos: (${x}, ${y})`;
      renderBoard();
    } else {
      if (gameState.hoveredCell) {
        gameState.hoveredCell = null;
        renderBoard();
      }
    }
  });

  window.addEventListener('mouseup', (e) => {
    if (!gameState.isDragging) return;
    gameState.isDragging = false;
    caroBoardView.classList.remove('panning');

    if (!gameState.hasMovedSignificantly && caroBoardView.style.display !== 'none') {
      const rect = caroBoardView.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const { x, y } = screenToBoard(e.clientX - rect.left, e.clientY - rect.top);
        attemptPlaceMove(x, y);
      }
    }
  });

  caroBoardView.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = caroBoardView.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const newZoom = Math.min(Math.max(gameState.zoom * factor, 0.35), 3.0);

    if (newZoom !== gameState.zoom) {
      gameState.originX = mouseX - (mouseX - gameState.originX) * (newZoom / gameState.zoom);
      gameState.originY = mouseY - (mouseY - gameState.originY) * (newZoom / gameState.zoom);
      gameState.zoom = newZoom;
      renderBoard();
    }
  }, { passive: false });

  // PLACE MOVE LOGIC: SUPPORTS 1-MÁY (X LUÂN PHIÊN O) VÀ LAN
  function attemptPlaceMove(x, y) {
    if (gameState.winner) {
      showToastNotification('Trace Completed', 'Bấm nút Reset để bắt đầu lại ván mới!');
      return;
    }

    if (gameState.moves.has(`${x},${y}`)) return;

    // CHẾ ĐỘ 1 MÁY: LƯỢT NÀY ĐÁNH X, LƯỢT SAU ĐÁNH O
    if (gameState.playMode === 'SOLO') {
      const player = gameState.currentTurn; // 'X' or 'O'
      const moveData = {
        x,
        y,
        player,
        order: gameState.moveList.length + 1,
        time: Date.now()
      };
      gameState.moves.set(`${x},${y}`, moveData);
      gameState.moveList.push(moveData);
      gameState.lastMove = moveData;

      // Kiểm tra 5 ô thắng hàng
      const winResult = checkWinLocally(gameState.moves, x, y, player);
      if (winResult.won) {
        gameState.winner = player;
        gameState.winningLine = winResult.winningLine;
        gameState.scores[player] = (gameState.scores[player] || 0) + 1;
        showToastNotification('Chiến thắng! 🏆', `Quân ${player} đã thắng với 5 ô thẳng hàng!`);
      } else {
        // Luân phiên lượt tiếp theo: X -> O -> X -> O
        gameState.currentTurn = (player === 'X') ? 'O' : 'X';
      }

      updateGameStatusUI();
      renderBoard();
      return;
    }

    // CHẾ ĐỘ QUA MẠNG (LAN/NGROK)
    if (gameState.myRole !== 'X' && gameState.myRole !== 'O') {
      showToastNotification('Khán giả', 'Bạn đang ở chế độ xem. Hai người chơi đã vào vị trí!');
      return;
    }
    if (gameState.currentTurn !== gameState.myRole) {
      showToastNotification('Chưa đến lượt', `Hiện đang là lượt của đối thủ (${gameState.currentTurn}).`);
      return;
    }

    if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
      gameState.ws.send(JSON.stringify({ type: 'PLACE_MOVE', x, y }));
    }
  }

  // HUD Buttons
  hudCenterBtn.addEventListener('click', centerBoard);
  hudLastMoveBtn.addEventListener('click', () => {
    if (gameState.lastMove) {
      const rect = caroBoardView.getBoundingClientRect();
      const cell = gameState.cellSize * gameState.zoom;
      gameState.originX = rect.width / 2 - (gameState.lastMove.x + 0.5) * cell;
      gameState.originY = rect.height / 2 - (gameState.lastMove.y + 0.5) * cell;
      renderBoard();
    } else {
      centerBoard();
    }
  });

  hudRematchBtn.addEventListener('click', () => {
    if (gameState.playMode === 'SOLO') {
      gameState.moves.clear();
      gameState.moveList = [];
      gameState.lastMove = null;
      gameState.winner = null;
      gameState.winningLine = null;
      gameState.currentTurn = 'X';
      updateGameStatusUI();
      centerBoard();
      return;
    }
    if (gameState.ws) gameState.ws.send(JSON.stringify({ type: 'REMATCH_VOTE' }));
  });

  hudUndoBtn.addEventListener('click', () => {
    if (gameState.playMode === 'SOLO') {
      if (gameState.moveList.length === 0 || gameState.winner) return;
      const last = gameState.moveList.pop();
      gameState.moves.delete(`${last.x},${last.y}`);
      gameState.lastMove = gameState.moveList.length > 0 ? gameState.moveList[gameState.moveList.length - 1] : null;
      gameState.currentTurn = last.player; // Revert turn
      updateGameStatusUI();
      renderBoard();
      return;
    }
    if (gameState.ws) gameState.ws.send(JSON.stringify({ type: 'UNDO_REQUEST' }));
  });

  // =========================================================
  // 8.1 CARO / XO LOBBY & ROOM MANAGEMENT SYSTEM
  // =========================================================
  const caroLobby = {
    rooms: [],
    currentRoom: null, // { roomId, roomName, hasPassword, yourRole, isHost, players, currentTurn, scores }
    selectedCreateRole: 'X',
    pendingJoinRoomId: null,
    inBoard: false
  };

  function requestCaroRoomsList() {
    if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
      gameState.ws.send(JSON.stringify({ type: 'CARO_GET_ROOMS_LIST' }));
    }
  }

  function handleSwitchToCaroFile() {
    if (gameState.playMode === 'SOLO') {
      hideCaroLobby();
      return;
    }
    if (!caroLobby.currentRoom || !caroLobby.inBoard) {
      showCaroLobby();
      requestCaroRoomsList();
    }
  }

  function showCaroLobby() {
    if (caroLobbyOverlay) caroLobbyOverlay.style.display = 'flex';
    if (modalCaroCreateRoomBackdrop) modalCaroCreateRoomBackdrop.style.display = 'none';
    if (modalCaroPasswordBackdrop) modalCaroPasswordBackdrop.style.display = 'none';
    if (btnCaroLeaveRoom) btnCaroLeaveRoom.style.display = 'none';
    caroLobby.inBoard = false;
  }

  function hideCaroLobby() {
    if (caroLobbyOverlay) caroLobbyOverlay.style.display = 'none';
    if (modalCaroCreateRoomBackdrop) modalCaroCreateRoomBackdrop.style.display = 'none';
    if (modalCaroPasswordBackdrop) modalCaroPasswordBackdrop.style.display = 'none';
    if (btnCaroLeaveRoom) btnCaroLeaveRoom.style.display = (gameState.playMode === 'LAN') ? 'inline-block' : 'none';
    caroLobby.inBoard = true;
    renderBoard();
  }

  function renderCaroRoomsTable(roomsToRender) {
    if (!caroRoomsTableBody) return;
    const list = roomsToRender || caroLobby.rooms || [];
    const query = (inputCaroLobbySearch ? inputCaroLobbySearch.value : '').toLowerCase().trim();
    const filtered = query ? list.filter(r => (r.name || '').toLowerCase().includes(query) || (r.id || '').toLowerCase().includes(query) || (r.hostName || '').toLowerCase().includes(query)) : list;

    if (caroLobbyRoomCount) caroLobbyRoomCount.textContent = `Tổng cộng: ${filtered.length} phòng cờ`;

    if (filtered.length === 0) {
      caroRoomsTableBody.innerHTML = `<tr><td colspan="8" class="table-empty">Chưa có phòng cờ nào. Hãy bấm "➕ Tạo Phòng Mới" để thách đấu!</td></tr>`;
      return;
    }

    caroRoomsTableBody.innerHTML = filtered.map(r => {
      const lockBadge = r.hasPassword ? '<span class="astro-badge badge-locked">🔒 Có Pass</span>' : '<span class="astro-badge badge-public">🔓 Công Khai</span>';
      let stateBadge = '<span class="astro-badge badge-waiting">⏳ Chờ Đấu</span>';
      if (r.state === 'PLAYING') stateBadge = '<span class="astro-badge badge-playing">⚔️ Đang Đấu</span>';
      else if (r.state === 'READY') stateBadge = '<span class="astro-badge badge-public">👥 Đủ 2 Người</span>';
      else if (r.state === 'FINISHED') stateBadge = '<span class="astro-badge badge-waiting">🏆 Đã Thắng</span>';

      const xName = r.playerX ? `<span style="color:#3574f0;font-weight:600;">${escapeAstroHtml(r.playerX)}</span>` : '<span style="color:#7e889b;font-style:italic;">Trống</span>';
      const oName = r.playerO ? `<span style="color:#ff5252;font-weight:600;">${escapeAstroHtml(r.playerO)}</span>` : '<span style="color:#7e889b;font-style:italic;">Trống</span>';
      const isFull = r.hasX && r.hasO;

      return `
        <tr>
          <td>
            <span class="room-table-name">${escapeAstroHtml(r.name)}</span>
            <span class="room-table-id">#${escapeAstroHtml(r.id)}</span>
          </td>
          <td>${escapeAstroHtml(r.hostName || 'Chủ phòng')}</td>
          <td>${xName}</td>
          <td>${oName}</td>
          <td>${r.spectatorCount || 0}</td>
          <td>${lockBadge}</td>
          <td>${stateBadge}</td>
          <td>
            <button class="astro-btn astro-btn-primary btn-join-caro-row" data-id="${escapeAstroHtml(r.id)}" data-locked="${r.hasPassword ? '1' : '0'}" data-name="${escapeAstroHtml(r.name)}">
              ${isFull ? '👁️ Xem' : '🚀 Vào Bàn'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    caroRoomsTableBody.querySelectorAll('.btn-join-caro-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.id;
        const isLocked = btn.dataset.locked === '1';
        const roomName = btn.dataset.name;
        handleCaroJoinClick(roomId, isLocked, roomName);
      });
    });
  }

  function handleCaroJoinClick(roomId, isLocked, roomName) {
    if (isLocked) {
      caroLobby.pendingJoinRoomId = roomId;
      if (caroPasswordPromptRoomName) caroPasswordPromptRoomName.textContent = `Phòng cờ "${roomName}" yêu cầu mật khẩu:`;
      if (inputCaroRoomPassword) inputCaroRoomPassword.value = '';
      if (modalCaroPasswordBackdrop) modalCaroPasswordBackdrop.style.display = 'flex';
      setTimeout(() => inputCaroRoomPassword && inputCaroRoomPassword.focus(), 100);
    } else {
      joinCaroRoom(roomId, '');
    }
  }

  function joinCaroRoom(roomId, password, preferredRole = 'X') {
    if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) {
      showToastNotification('Lỗi mạng', 'Chưa kết nối tới máy chủ.');
      return;
    }
    gameState.playMode = 'LAN';
    if (hudModeBtn) hudModeBtn.textContent = 'Mode: Qua Mạng (LAN/Ngrok)';
    gameState.ws.send(JSON.stringify({
      type: 'CARO_JOIN_ROOM',
      roomId,
      password: password || '',
      preferredRole,
      playerName: gameState.playerName
    }));
  }

  // Bind Caro UI Event Listeners
  if (btnOpenCaroCreateRoom) {
    btnOpenCaroCreateRoom.addEventListener('click', () => {
      if (createCaroRoomName) createCaroRoomName.value = `Phòng Cờ của ${gameState.playerName || 'DevPro'}`;
      if (createCaroRoomPassword) createCaroRoomPassword.value = '';
      caroLobby.selectedCreateRole = 'X';
      if (createCaroRolePicker) {
        createCaroRolePicker.querySelectorAll('.color-pick-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.role === 'X');
        });
      }
      if (modalCaroCreateRoomBackdrop) modalCaroCreateRoomBackdrop.style.display = 'flex';
      setTimeout(() => createCaroRoomName && createCaroRoomName.focus(), 100);
    });
  }

  if (btnCloseCaroCreateModal) btnCloseCaroCreateModal.addEventListener('click', () => modalCaroCreateRoomBackdrop.style.display = 'none');
  if (btnCancelCaroCreateModal) btnCancelCaroCreateModal.addEventListener('click', () => modalCaroCreateRoomBackdrop.style.display = 'none');

  if (createCaroRolePicker) {
    createCaroRolePicker.querySelectorAll('.color-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        createCaroRolePicker.querySelectorAll('.color-pick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        caroLobby.selectedCreateRole = btn.dataset.role || 'X';
      });
    });
  }

  if (btnConfirmCaroCreateRoom) {
    btnConfirmCaroCreateRoom.addEventListener('click', () => {
      const name = (createCaroRoomName ? createCaroRoomName.value : `Phòng Cờ của ${gameState.playerName}`).trim();
      const password = (createCaroRoomPassword ? createCaroRoomPassword.value : '').trim();
      const preferredRole = caroLobby.selectedCreateRole || 'X';

      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.playMode = 'LAN';
        if (hudModeBtn) hudModeBtn.textContent = 'Mode: Qua Mạng (LAN/Ngrok)';
        gameState.ws.send(JSON.stringify({
          type: 'CARO_CREATE_ROOM',
          name,
          password,
          preferredRole,
          playerName: gameState.playerName
        }));
      }
      if (modalCaroCreateRoomBackdrop) modalCaroCreateRoomBackdrop.style.display = 'none';
    });
  }

  if (btnCaroQuickPlay) {
    btnCaroQuickPlay.addEventListener('click', () => {
      const openRoom = caroLobby.rooms.find(r => !r.hasPassword && (!r.hasX || !r.hasO));
      if (openRoom) {
        joinCaroRoom(openRoom.id, '');
      } else {
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.playMode = 'LAN';
          if (hudModeBtn) hudModeBtn.textContent = 'Mode: Qua Mạng (LAN/Ngrok)';
          gameState.ws.send(JSON.stringify({
            type: 'CARO_CREATE_ROOM',
            name: `Phòng Cờ #${Math.floor(Math.random() * 900 + 100)}`,
            password: '',
            preferredRole: 'X',
            playerName: gameState.playerName
          }));
        }
      }
    });
  }

  if (btnCaroSoloMode) {
    btnCaroSoloMode.addEventListener('click', () => {
      gameState.playMode = 'SOLO';
      if (hudModeBtn) hudModeBtn.textContent = 'Mode: 1 Máy (X & O)';
      hideCaroLobby();
      updateGameStatusUI();
      showToastNotification('Chế độ 1 Máy', 'Đã chuyển sang chế độ 1 máy: Lượt này đánh X, lượt sau đánh O!');
    });
  }

  if (btnRefreshCaroRooms) {
    btnRefreshCaroRooms.addEventListener('click', () => {
      requestCaroRoomsList();
      showToastNotification('Làm mới', 'Đang cập nhật danh sách phòng cờ...');
    });
  }

  if (inputCaroLobbySearch) {
    inputCaroLobbySearch.addEventListener('input', () => {
      renderCaroRoomsTable();
    });
  }

  if (btnCloseCaroPasswordModal) btnCloseCaroPasswordModal.addEventListener('click', () => modalCaroPasswordBackdrop.style.display = 'none');
  if (btnCancelCaroPasswordModal) btnCancelCaroPasswordModal.addEventListener('click', () => modalCaroPasswordBackdrop.style.display = 'none');
  if (btnConfirmJoinCaroPasswordRoom) {
    btnConfirmJoinCaroPasswordRoom.addEventListener('click', () => {
      const pwd = (inputCaroRoomPassword ? inputCaroRoomPassword.value : '').trim();
      if (caroLobby.pendingJoinRoomId) {
        joinCaroRoom(caroLobby.pendingJoinRoomId, pwd);
      }
      if (modalCaroPasswordBackdrop) modalCaroPasswordBackdrop.style.display = 'none';
    });
  }
  if (inputCaroRoomPassword) {
    inputCaroRoomPassword.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && btnConfirmJoinCaroPasswordRoom) {
        btnConfirmJoinCaroPasswordRoom.click();
      }
    });
  }

  if (btnCaroLobbyToggle) {
    btnCaroLobbyToggle.addEventListener('click', () => {
      if (caroLobbyOverlay && caroLobbyOverlay.style.display !== 'none') {
        hideCaroLobby();
      } else {
        showCaroLobby();
        requestCaroRoomsList();
      }
    });
  }

  if (btnCaroLeaveRoom) {
    btnCaroLeaveRoom.addEventListener('click', () => {
      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({ type: 'CARO_LEAVE_ROOM' }));
      }
      caroLobby.currentRoom = null;
      showCaroLobby();
      requestCaroRoomsList();
    });
  }

  if (btnCaroSwitchRole) {
    btnCaroSwitchRole.addEventListener('click', () => {
      if (gameState.playMode === 'SOLO') {
        showToastNotification('Chế độ 1 Máy', 'Bạn đang chơi trên 1 máy, hai người tự luân phiên đánh X và O.');
        return;
      }
      if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) return;
      const targetRole = (gameState.myRole === 'X') ? 'O' : 'X';
      gameState.ws.send(JSON.stringify({
        type: 'CARO_SWITCH_ROLE',
        targetRole
      }));
    });
  }

  // Mode Switcher Button: 1 Máy (X luân phiên O) vs LAN
  hudModeBtn.addEventListener('click', () => {
    if (gameState.playMode === 'SOLO') {
      gameState.playMode = 'LAN';
      hudModeBtn.textContent = 'Mode: Qua Mạng (LAN/Ngrok)';
      showToastNotification('Chế độ', 'Đã chuyển sang chế độ chơi qua mạng LAN/Ngrok.');
      showCaroLobby();
      requestCaroRoomsList();
    } else {
      gameState.playMode = 'SOLO';
      hudModeBtn.textContent = 'Mode: 1 Máy (X & O)';
      hideCaroLobby();
      showToastNotification('Chế độ', 'Đã chuyển sang chế độ 1 máy: Lượt này đánh X, lượt sau đánh O!');
    }
    updateGameStatusUI();
  });

  // =========================================================
  // 9. WEBSOCKET NETWORKING & CHAT
  // =========================================================
  function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    gameState.ws = new WebSocket(wsUrl);

    gameState.ws.onopen = () => {
      if (gameState.playerName) {
        gameState.ws.send(JSON.stringify({
          type: 'UPDATE_NAME',
          name: gameState.playerName
        }));
      }

      if (activeFileName === 'JwtSecurityFilter.java') {
        if (typeof requestAstroRoomsList === 'function') {
          requestAstroRoomsList();
        }
      } else if (activeFileName === 'SecurityFilterChainService.java') {
        if (typeof requestCaroRoomsList === 'function') {
          requestCaroRoomsList();
        }
      }
    };

    gameState.ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        handleServerMessage(data);
      } catch (_) {}
    };

    gameState.ws.onclose = () => {
      setTimeout(connectWebSocket, 3000);
    };
  }

  function sendSocketMessage(msg) {
    if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
      try {
        gameState.ws.send(JSON.stringify(msg));
        return true;
      } catch (err) {
        console.warn('sendSocketMessage error:', err);
        return false;
      }
    } else {
      console.warn('WebSocket not open, attempting reconnection...', msg);
      if (!gameState.ws || gameState.ws.readyState === WebSocket.CLOSED) {
        connectWebSocket();
      }
      return false;
    }
  }

  function handleServerMessage(data) {
    if (data.type === 'NAME_UPDATED') {
      if (data.name) {
        gameState.playerName = data.name;
        if (mavenProfileUserLabel) mavenProfileUserLabel.textContent = data.name;
        if (jvmPreviewName) jvmPreviewName.textContent = data.name;
      }
      return;
    }

    if (data.type === 'CHAT_MESSAGE') {
      const chatLine = document.createElement('div');
      chatLine.className = 'log-line';
      const sender = escapeAstroHtml(data.sender || 'DevPro');
      const timeStr = data.time || new Date().toLocaleTimeString('vi-VN', { hour12: false });
      const text = escapeAstroHtml(data.text || '');
      chatLine.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-info">[${sender}]</span> : ${text}`;
      if (chatLogsStream) {
        chatLogsStream.appendChild(chatLine);
        chatLogsStream.scrollTop = chatLogsStream.scrollHeight;
      }
      if (tabRunEasypos && tabRunEasypos.classList.contains('active') && tabRunCaro) {
        let dot = tabRunCaro.querySelector('.chat-unread-dot');
        if (!dot) {
          dot = document.createElement('span');
          dot.className = 'chat-unread-dot';
          dot.textContent = ' ●';
          dot.style.color = '#56a8f5';
          dot.style.fontSize = '12px';
          tabRunCaro.appendChild(dot);
        }
      }
      return;
    }

    if (data.type && data.type.startsWith('ASTRO_')) {
      handleAstroServerMessage(data);
      return;
    }

    if (data.type && data.type.startsWith('BVN_')) {
      if (typeof handleBvnServerMessage === 'function') {
        handleBvnServerMessage(data);
      }
      return;
    }

    if (data.type === 'CARO_ROOMS_LIST') {
      caroLobby.rooms = data.rooms || [];
      renderCaroRoomsTable();
      return;
    }

    if (data.type === 'CARO_ROOM_JOINED') {
      caroLobby.currentRoom = {
        id: data.roomId,
        name: data.roomName || data.roomId,
        hasPassword: !!data.hasPassword,
        isHost: !!data.isHost
      };
      gameState.playMode = 'LAN';
      if (hudModeBtn) hudModeBtn.textContent = 'Mode: Qua Mạng (LAN/Ngrok)';
      gameState.myRole = data.yourRole;
      gameState.currentTurn = data.currentTurn;
      gameState.winner = data.winner;
      gameState.winningLine = data.winningLine;
      gameState.scores = data.scores || { X: 0, O: 0 };
      gameState.moves.clear();
      gameState.moveList = data.moves || [];
      for (const m of gameState.moveList) gameState.moves.set(`${m.x},${m.y}`, m);
      gameState.lastMove = data.lastMove;
      hideCaroLobby();
      updateGameStatusUI();
      renderBoard();
      const roleName = data.yourRole === 'X' ? 'Quân X' : (data.yourRole === 'O' ? 'Quân O' : 'Khán giả');
      showToastNotification('Đã vào phòng cờ', `Phòng: ${data.roomName || data.roomId} | Bạn: ${roleName}`);
      return;
    }

    if (data.type === 'CARO_ROLE_CHANGED') {
      gameState.myRole = data.yourRole;
      updateGameStatusUI();
      const roleName = data.yourRole === 'X' ? 'Quân X' : (data.yourRole === 'O' ? 'Quân O' : 'Khán giả');
      showToastNotification('Đổi quân cờ', `Bạn hiện đang cầm: ${roleName}`);
      return;
    }

    if (data.type === 'CARO_ROLES_UPDATED') {
      if (data.yourRole) gameState.myRole = data.yourRole;
      updateGameStatusUI();
      return;
    }

    if (data.type === 'CARO_LEFT_ROOM') {
      caroLobby.currentRoom = null;
      showCaroLobby();
      requestCaroRoomsList();
      updateGameStatusUI();
      return;
    }

    if (gameState.playMode === 'SOLO') return; // Ignore online moves when in local solo mode

    switch (data.type) {
      case 'ROOM_STATE':
        if (data.roomId) {
          caroLobby.currentRoom = {
            id: data.roomId,
            name: data.roomName || data.roomId,
            hasPassword: !!data.hasPassword,
            isHost: !!data.isHost
          };
          hideCaroLobby();
        }
        gameState.myRole = data.yourRole;
        gameState.currentTurn = data.currentTurn;
        gameState.winner = data.winner;
        gameState.winningLine = data.winningLine;
        gameState.scores = data.scores || { X: 0, O: 0 };
        gameState.moves.clear();
        gameState.moveList = data.moves || [];
        for (const m of gameState.moveList) gameState.moves.set(`${m.x},${m.y}`, m);
        gameState.lastMove = data.lastMove;
        updateGameStatusUI();
        renderBoard();
        break;

      case 'USER_JOINED':
        showToastNotification('Người chơi mới', `${data.name || 'Người chơi'} đã vào bàn (${data.role === 'X' ? 'Quân X' : (data.role === 'O' ? 'Quân O' : 'Khán giả')})`);
        updateGameStatusUI();
        break;

      case 'MOVE_MADE':
        const m = data.move;
        gameState.moves.set(`${m.x},${m.y}`, m);
        gameState.moveList.push(m);
        gameState.lastMove = m;
        gameState.currentTurn = data.nextTurn;
        gameState.winner = data.winner;
        gameState.winningLine = data.winningLine;
        gameState.scores = data.scores;
        if (gameState.winner) {
          showToastNotification('Chiến thắng! 🏆', `Player ${gameState.winner} đã thắng với 5 ô thẳng hàng!`);
        }
        updateGameStatusUI();
        renderBoard();
        break;

      case 'GAME_RESET':
        gameState.moves.clear();
        gameState.moveList = [];
        gameState.lastMove = null;
        gameState.winner = null;
        gameState.winningLine = null;
        gameState.currentTurn = data.currentTurn;
        gameState.scores = data.scores;
        showToastNotification('Ván mới', `Bàn cờ đã dọn sạch. Lượt: ${gameState.currentTurn}`);
        updateGameStatusUI();
        centerBoard();
        break;

      case 'UNDO_APPLIED':
        const undone = data.undoneMove;
        gameState.moves.delete(`${undone.x},${undone.y}`);
        gameState.moveList = gameState.moveList.filter(item => !(item.x === undone.x && item.y === undone.y));
        gameState.lastMove = gameState.moveList.length > 0 ? gameState.moveList[gameState.moveList.length - 1] : null;
        gameState.currentTurn = data.currentTurn;
        updateGameStatusUI();
        renderBoard();
        break;

      case 'ERROR':
        showToastNotification('Thông báo', data.message);
        break;
    }
  }

  function updateGameStatusUI() {
    if (hudTurn) {
      hudTurn.textContent = `Lượt: ${gameState.currentTurn}`;
    }

    if (caroHudRoomName) {
      if (gameState.playMode === 'SOLO') {
        caroHudRoomName.textContent = 'Phòng: 1 Máy (Local)';
      } else if (caroLobby.currentRoom) {
        caroHudRoomName.textContent = `Phòng: ${caroLobby.currentRoom.name || caroLobby.currentRoom.id}${caroLobby.currentRoom.hasPassword ? ' 🔒' : ''}`;
      } else {
        caroHudRoomName.textContent = 'Phòng: Đại Sảnh';
      }
    }

    if (caroHudRole) {
      if (gameState.playMode === 'SOLO') {
        caroHudRole.textContent = 'Bạn: X & O (1 Máy)';
        caroHudRole.style.color = '#3574f0';
      } else {
        const roleLabel = gameState.myRole === 'X' ? 'Quân X' : (gameState.myRole === 'O' ? 'Quân O' : 'Khán giả');
        caroHudRole.textContent = `Bạn: ${roleLabel}`;
        caroHudRole.style.color = gameState.myRole === 'X' ? '#3574f0' : (gameState.myRole === 'O' ? '#ff5252' : '#8c9099');
      }
    }

    if (btnCaroLeaveRoom) {
      btnCaroLeaveRoom.style.display = (gameState.playMode === 'LAN' && caroLobby.currentRoom && caroLobby.inBoard) ? 'inline-block' : 'none';
    }

    if (btnCaroSwitchRole) {
      btnCaroSwitchRole.style.display = (gameState.playMode === 'LAN') ? 'inline-block' : 'none';
    }

    if (gameState.playMode === 'SOLO') {
      sideRoleText.textContent = `Mode: 1 Máy (X & O)`;
      sideTurnText.textContent = `Lượt: ${gameState.currentTurn}`;
    } else {
      sideRoleText.textContent = `Quân: ${gameState.myRole ? (gameState.myRole === 'X' ? 'Quân X' : 'Quân O') : 'Khán giả'}`;
      sideTurnText.textContent = `Lượt: ${gameState.currentTurn}${gameState.currentTurn === gameState.myRole ? ' (BẠN)' : ''}`;
    }
  }

  // Chat send
  function sendChat() {
    const text = (txtChatInput ? txtChatInput.value : '').trim();
    if (!text) return;
    if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) {
      showToastNotification('Chưa kết nối', 'Máy chủ đang kết nối lại, vui lòng thử lại sau giây lát...');
      return;
    }
    gameState.ws.send(JSON.stringify({
      type: 'SEND_CHAT',
      text,
      sender: gameState.playerName || 'DevPro'
    }));
    txtChatInput.value = '';
  }
  btnSendChat.addEventListener('click', sendChat);
  txtChatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  // Copy Buttons
  btnSideCopyNgrok.addEventListener('click', () => {
    navigator.clipboard.writeText(sideNgrokUrl.value).then(() => {
      btnSideCopyNgrok.textContent = '✓';
      setTimeout(() => btnSideCopyNgrok.textContent = 'Copy', 1500);
      showToastNotification('Copied', 'Đã sao chép đường dẫn Endpoint.');
    });
  });

  btnSideCopyLan.addEventListener('click', () => {
    navigator.clipboard.writeText(sideLanUrl.value).then(() => {
      btnSideCopyLan.textContent = '✓';
      setTimeout(() => btnSideCopyLan.textContent = 'Copy', 1500);
      showToastNotification('Copied', 'Đã sao chép địa chỉ Local.');
    });
  });

  async function fetchServerInfo() {
    try {
      const res = await fetch('/api/server-info');
      const data = await res.json();
      if (data.onlineUrl) sideNgrokUrl.value = data.onlineUrl;
      if (data.lanIps && data.lanIps.length > 0) {
        sideLanUrl.value = `http://${data.lanIps[0].address}${data.port === 80 ? '' : ':' + data.port}`;
      }
    } catch (_) {}
  }

  // =========================================================
  // 10. RETRO ARCADE ASTRO PARTY ENGINE (ONLINE & LOCAL LAN)
  // =========================================================
  const astroAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playAstroTone(freq, type, duration, endFreq = null, vol = 0.1) {
    if (!astroAudioCtx) return;
    try {
      if (astroAudioCtx.state === 'suspended') astroAudioCtx.resume();
      const osc = astroAudioCtx.createOscillator();
      const gain = astroAudioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, astroAudioCtx.currentTime);
      if (endFreq !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, endFreq), astroAudioCtx.currentTime + duration);
      }
      gain.gain.setValueAtTime(vol, astroAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, astroAudioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(astroAudioCtx.destination);
      osc.start();
      osc.stop(astroAudioCtx.currentTime + duration);
    } catch (_) {}
  }

  function astroSfxLaser() { playAstroTone(880, 'sawtooth', 0.12, 110, 0.15); }
  function astroSfxExplosion() {
    if (!astroAudioCtx) return;
    try {
      if (astroAudioCtx.state === 'suspended') astroAudioCtx.resume();
      const bufferSize = astroAudioCtx.sampleRate * 0.25;
      const buffer = astroAudioCtx.createBuffer(1, bufferSize, astroAudioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = astroAudioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = astroAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, astroAudioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, astroAudioCtx.currentTime + 0.25);
      const gain = astroAudioCtx.createGain();
      gain.gain.setValueAtTime(0.3, astroAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, astroAudioCtx.currentTime + 0.25);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(astroAudioCtx.destination);
      noise.start();
    } catch (_) {}
  }
  function astroSfxBounce() { playAstroTone(520, 'sine', 0.08, 260, 0.12); }
  function astroSfxBreak() { playAstroTone(300, 'square', 0.1, 80, 0.15); }
  function astroSfxRoundWin() { playAstroTone(440, 'triangle', 0.4, 880, 0.2); }
  function astroSfxPickup() {
    playAstroTone(587, 'sine', 0.08, 880, 0.18);
    setTimeout(() => playAstroTone(880, 'sine', 0.12, 1174, 0.2), 80);
  }
  function astroSfxBlade() { playAstroTone(740, 'triangle', 0.15, 180, 0.22); }
  function astroSfxBladeClash() { playAstroTone(400, 'square', 0.1, 800, 0.25); }
  function astroSfxBombDrop() { playAstroTone(300, 'sine', 0.06, 150, 0.15); }
  function astroSfxBombBoom() {
    astroSfxExplosion();
    triggerAstroScreenShake(0.35, 18);
  }
  function astroSfxMegaLaser() { playAstroTone(1320, 'sawtooth', 0.25, 220, 0.28); }

  const ASTRO_V_WIDTH = 800;
  const ASTRO_V_HEIGHT = 600;
  const ASTRO_SHIP_SPEED = 135; // 135 px/sec: lướt mượt mà, nhạy bén, triệt tiêu cảm giác trễ
  const ASTRO_TURN_STEP = 15 * (Math.PI / 180); // Xoay nhẹ góc 15 độ (~0.2618 rad) mỗi lần nhấn tức thì
  const ASTRO_BULLET_SPEED = 460; // 460 px/sec
  const ASTRO_BULLET_MAX_DIST = ASTRO_V_WIDTH * 1.5; // 1200 px
  const ASTRO_BULLET_MAX_LIFE = 2.5; // sec
  const ASTRO_PILOT_SPEED = 40; // px/sec
  const ASTRO_PILOT_ROT_SPEED = 5.2; // rad/sec
  const ASTRO_POINTS_TO_WIN = 5;

  const ASTRO_MAP_TYPES = [
    { id: 'CLASSIC', name: 'Cổ Điển' },
    { id: 'CROSS', name: 'Pháo Đài' },
    { id: 'MAZE', name: 'Mê Cung' },
    { id: 'OPEN', name: 'Vũ Trụ Mở' },
    { id: 'MATRIX', name: 'Cột Đá' },
    { id: 'RANDOM', name: 'Ngẫu Nhiên' }
  ];
  let astroCurrentMapIdx = 0;

  const ASTRO_PLAYER_CONFIGS = [
    { id: 1, name: gameState.playerName || 'DevPro', color: '#00f0ff', glow: '#00f0ff', rotateKey: 'ArrowLeft', shootKey: 'ArrowRight' },
    { id: 2, name: 'P2', color: '#ff007f', glow: '#ff007f', rotateKey: 'KeyA', shootKey: 'KeyD' },
    { id: 3, name: 'P3', color: '#00ff66', glow: '#00ff66', rotateKey: 'KeyG', shootKey: 'KeyH' },
    { id: 4, name: 'P4', color: '#ffff00', glow: '#ffff00', rotateKey: 'KeyJ', shootKey: 'KeyK' }
  ];

  // ONLINE & OFFLINE GAME STATE
  const astroOnlineState = {
    mode: 'BOT', // 'BOT' (Đấu Với Máy) | 'ONLINE' (LAN/Ngrok) | 'LOCAL' (1 Máy 2-4P)
    mySlot: 0,
    slotNames: [`${gameState.playerName || 'DevPro'} (Cyan)`, 'AI Bot (Magenta)', 'P3 (Green)', 'P4 (Yellow)'],
    slotsInfo: [],
    spectatorsCount: 0,
    serverState: 'MENU',
    serverScores: [0, 0, 0, 0],
    serverPlayers: [],
    serverBullets: [],
    serverLaserBeams: [],
    serverBlocks: [],
    serverDrops: [],
    serverBombs: [],
    roundTimer: 0,
    roundWinnerText: '',
    matchWinnerText: ''
  };

  const astroKeysDown = new Set();
  const astroKeysJustPressed = new Set();

  function isAstroActive() {
    if (document.activeElement === codeInputTextarea || (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'))) {
      return false;
    }
    return activeFileName === 'JwtSecurityFilter.java' && !showSecurityCode && astroBoardView && astroBoardView.style.display !== 'none';
  }

  window.addEventListener('keydown', (e) => {
    if (!isAstroActive()) return;

    if (e.code === 'BracketLeft') {
      let cur = (typeof astroZoomScale === 'number') ? astroZoomScale : 0.85;
      astroZoomScale = Math.max(0.35, Math.round((cur - 0.08) * 100) / 100);
      updateAstroViewUI();
      resizeAstroCanvas();
      showToastNotification('Thu phóng', `Zoom: ${Math.round(astroZoomScale * 100)}%`);
      e.preventDefault();
      return;
    }
    if (e.code === 'BracketRight') {
      let cur = (typeof astroZoomScale === 'number') ? astroZoomScale : 0.85;
      astroZoomScale = Math.min(2.0, Math.round((cur + 0.08) * 100) / 100);
      updateAstroViewUI();
      resizeAstroCanvas();
      showToastNotification('Thu phóng', `Zoom: ${Math.round(astroZoomScale * 100)}%`);
      e.preventDefault();
      return;
    }

    const gameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter', 'KeyA', 'KeyD', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'Digit2', 'Digit3', 'Digit4'];
    if (gameKeys.includes(e.code)) {
      if (!astroKeysDown.has(e.code)) {
        astroKeysJustPressed.add(e.code);
      }
      astroKeysDown.add(e.code);
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', (e) => {
    astroKeysDown.delete(e.code);
  });

  const astroParticles = [];
  let astroScreenShakeTime = 0;
  let astroScreenShakeIntensity = 0;

  function spawnAstroParticles(x, y, count, color, minSpd = 40, maxSpd = 260, size = 2.5, life = 0.5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = minSpd + Math.random() * (maxSpd - minSpd);
      astroParticles.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        size: size * (0.6 + Math.random() * 0.8),
        maxLife: life * (0.6 + Math.random() * 0.8),
        life: 0
      });
    }
  }

  function triggerAstroScreenShake(time = 0.2, intensity = 9) {
    astroScreenShakeTime = time;
    astroScreenShakeIntensity = intensity;
  }

  // =========================================================
  // 10.1 ASTRO PARTY LOBBY, ROOMS & COLOR/MAP SELECTOR
  // =========================================================
  const astroLobby = {
    rooms: [],
    currentRoom: null, // { id, name, hasPassword, hostSlot, mapType, state, mySlot, isHost, slots: [], scores: [], mode: 'PVP' }
    selectedCreateSlot: 0,
    selectedCreateMap: 'CLASSIC',
    selectedCreateMode: 'PVP',
    selectedCreateBotCount: 3,
    pendingJoinRoomId: null,
    inBattle: false
  };

  function escapeAstroHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function requestAstroRoomsList() {
    if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
      gameState.ws.send(JSON.stringify({ type: 'ASTRO_GET_ROOMS_LIST' }));
    }
  }

  function handleSwitchToAstroFile() {
    if (!astroLobby.currentRoom || !astroLobby.inBattle) {
      if (astroLobby.currentRoom) {
        showAstroLounge();
      } else {
        showAstroLobby();
        requestAstroRoomsList();
      }
    }
  }

  function showAstroLobby() {
    if (astroLobbyOverlay) astroLobbyOverlay.style.display = 'flex';
    if (astroRoomLoungeOverlay) astroRoomLoungeOverlay.style.display = 'none';
    if (modalCreateRoomBackdrop) modalCreateRoomBackdrop.style.display = 'none';
    if (modalPasswordBackdrop) modalPasswordBackdrop.style.display = 'none';
    if (btnAstroBackLounge) btnAstroBackLounge.style.display = 'none';
    astroLobby.inBattle = false;
  }

  function showAstroLounge() {
    if (astroLobbyOverlay) astroLobbyOverlay.style.display = 'none';
    if (astroRoomLoungeOverlay) astroRoomLoungeOverlay.style.display = 'flex';
    if (modalCreateRoomBackdrop) modalCreateRoomBackdrop.style.display = 'none';
    if (modalPasswordBackdrop) modalPasswordBackdrop.style.display = 'none';
    if (btnAstroBackLounge) btnAstroBackLounge.style.display = 'none';
    astroLobby.inBattle = false;
    renderAstroLounge();
  }

  function showAstroBattle() {
    if (astroLobbyOverlay) astroLobbyOverlay.style.display = 'none';
    if (astroRoomLoungeOverlay) astroRoomLoungeOverlay.style.display = 'none';
    if (modalCreateRoomBackdrop) modalCreateRoomBackdrop.style.display = 'none';
    if (modalPasswordBackdrop) modalPasswordBackdrop.style.display = 'none';
    if (btnAstroBackLounge) btnAstroBackLounge.style.display = 'inline-flex';
    astroLobby.inBattle = true;
  }

  function renderAstroRoomsTable(roomsToRender) {
    if (!astroRoomsTableBody) return;
    const list = roomsToRender || astroLobby.rooms || [];
    const query = (inputLobbySearch ? inputLobbySearch.value : '').toLowerCase().trim();
    const filtered = query ? list.filter(r => (r.name || '').toLowerCase().includes(query) || (r.id || '').toLowerCase().includes(query) || (r.hostName || '').toLowerCase().includes(query)) : list;

    if (lobbyRoomCount) lobbyRoomCount.textContent = `Tổng cộng: ${filtered.length} phòng`;

    if (filtered.length === 0) {
      astroRoomsTableBody.innerHTML = `<tr><td colspan="8" class="table-empty">Không tìm thấy phòng nào. Bấm "➕ Tạo Phòng Mới" để tạo ngay!</td></tr>`;
      return;
    }

    astroRoomsTableBody.innerHTML = filtered.map(r => {
      const lockBadge = r.hasPassword ? '<span class="astro-badge badge-locked">🔒 Có Pass</span>' : '<span class="astro-badge badge-public">🔓 Công Khai</span>';
      const stateBadge = r.state === 'PLAYING' ? '<span class="astro-badge badge-playing">⚔️ Đang Chiến</span>' : '<span class="astro-badge badge-waiting">⏳ Chờ Đấu</span>';
      const modeBadge = (r.mode === 'BOT') ? '<span class="astro-badge badge-pve">🤖 Đấu Máy</span>' : '<span class="astro-badge badge-pvp">👥 Đấu Người</span>';
      const isFull = r.playerCount >= 4;
      const mapName = ASTRO_MAP_TYPES.find(m => m.id === r.mapType)?.name || r.mapType || 'Cổ Điển';

      return `
        <tr>
          <td>
            <span class="room-table-name">${escapeAstroHtml(r.name)}</span>
            <span class="room-table-id">#${escapeAstroHtml(r.id)}</span>
          </td>
          <td>${escapeAstroHtml(r.hostName || 'Chủ phòng')}</td>
          <td>${modeBadge}</td>
          <td>🗺️ ${escapeAstroHtml(mapName)}</td>
          <td><strong>${r.playerCount}</strong>/4</td>
          <td>${lockBadge}</td>
          <td>${stateBadge}</td>
          <td>
            <button class="astro-btn astro-btn-primary btn-join-room-row" data-id="${escapeAstroHtml(r.id)}" data-locked="${r.hasPassword ? '1' : '0'}" data-name="${escapeAstroHtml(r.name)}">
              ${isFull ? '👁️ Xem' : '🚀 Vào Phòng'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    astroRoomsTableBody.querySelectorAll('.btn-join-room-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.id;
        const isLocked = btn.dataset.locked === '1';
        const roomName = btn.dataset.name;
        handleJoinRoomClick(roomId, isLocked, roomName);
      });
    });
  }

  function handleJoinRoomClick(roomId, isLocked, roomName) {
    if (isLocked) {
      astroLobby.pendingJoinRoomId = roomId;
      if (passwordPromptRoomName) passwordPromptRoomName.textContent = `Phòng "${roomName}" có mật khẩu bảo vệ:`;
      if (inputRoomPassword) inputRoomPassword.value = '';
      if (modalPasswordBackdrop) modalPasswordBackdrop.style.display = 'flex';
      setTimeout(() => inputRoomPassword && inputRoomPassword.focus(), 100);
    } else {
      joinAstroRoom(roomId, '');
    }
  }

  function joinAstroRoom(roomId, password) {
    if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) {
      showToastNotification('Lỗi mạng', 'Chưa kết nối tới máy chủ.');
      return;
    }
    gameState.ws.send(JSON.stringify({
      type: 'ASTRO_JOIN_ROOM',
      roomId,
      password: password || '',
      playerName: gameState.playerName
    }));
  }

  function renderAstroLounge() {
    const room = astroLobby.currentRoom;
    if (!room || !astroRoomLoungeOverlay) return;

    if (loungeRoomName) loungeRoomName.textContent = room.name || 'Phòng Chiến Đấu';
    if (loungeRoomId) loungeRoomId.textContent = `#${room.id}`;
    if (loungeLockBadge) {
      if (room.hasPassword) {
        loungeLockBadge.className = 'astro-badge badge-locked';
        loungeLockBadge.textContent = '🔒 Có Pass';
      } else {
        loungeLockBadge.className = 'astro-badge badge-public';
        loungeLockBadge.textContent = '🔓 Công Khai';
      }
    }

    const isPvP = (room.mode !== 'BOT');
    if (loungeModeBadge) {
      loungeModeBadge.className = isPvP ? 'astro-badge badge-pvp' : 'astro-badge badge-pve';
      loungeModeBadge.textContent = isPvP ? '👥 Đấu Với Người (PvP)' : '🤖 Đấu Với Máy (PvE)';
    }

    const isHost = (room.hostSlot === room.mySlot);
    const hostName = (room.slots && room.slots[room.hostSlot]) ? (room.slots[room.hostSlot].name || 'Chủ phòng').replace(/\s\((Cyan|Magenta|Green|Yellow)\)$/, '') : 'Chủ phòng';

    if (btnLoungeToggleMode) {
      if (isHost) {
        btnLoungeToggleMode.style.display = 'inline-block';
        btnLoungeToggleMode.innerHTML = isPvP ? '🤖 Chuyển Sang Đấu Máy' : '👥 Chuyển Sang Đấu Người';
      } else {
        btnLoungeToggleMode.style.display = 'none';
      }
    }

    if (mapSelectionHint) {
      mapSelectionHint.textContent = isHost ? '(Bạn là Chủ phòng: Bấm vào map để đổi bản đồ)' : `(Chủ phòng [${hostName}] có quyền chọn bản đồ)`;
    }

    // 1. RENDER 4 COLOR SLOTS
    const colorNames = ['Cyan (Xanh Ngọc)', 'Magenta (Hồng Tím)', 'Green (Xanh Lá)', 'Yellow (Vàng)'];
    const colors = ['#00f0ff', '#ff007f', '#00ff66', '#ffff00'];
    const rgbColors = ['0, 240, 255', '255, 0, 127', '0, 255, 102', '255, 255, 0'];

    if (colorSlotsGrid) {
      colorSlotsGrid.innerHTML = [0, 1, 2, 3].map(slotIdx => {
        const slotData = room.slots ? room.slots[slotIdx] : null;
        const isMySlot = (room.mySlot === slotIdx);
        const isOccupied = slotData && slotData.connected;
        const isBot = slotData && slotData.isBot;
        const isSlotHost = (room.hostSlot === slotIdx);

        let occupantText = 'Trống (Click để chọn)';
        let badgeHtml = '<span class="slot-status-badge slot-badge-empty">Trống</span>';
        let actionBtnHtml = '';

        if (isMySlot) {
          occupantText = `${gameState.playerName || 'Bạn'} ${isSlotHost ? '⭐ (Host)' : ''}`;
          badgeHtml = `<span class="slot-status-badge slot-badge-you">BẠN ĐANG CHỌN ${isSlotHost ? '• CHỦ PHÒNG' : ''}</span>`;
        } else if (isOccupied) {
          const clean = (slotData.name || 'Người chơi').replace(/\s\((Cyan|Magenta|Green|Yellow)\)$/, '');
          occupantText = `${clean} ${isSlotHost ? '⭐ (Host)' : ''}`;
          badgeHtml = `<span class="slot-status-badge slot-badge-you" style="background:#26384a; color:#60a5fa;">Người chơi</span>`;
        } else if (isBot) {
          occupantText = 'AI Bot';
          badgeHtml = '<span class="slot-status-badge slot-badge-bot">🤖 Bot AI</span>';
          if (isHost) {
            actionBtnHtml = `<button class="slot-action-btn btn-toggle-bot-slot" data-slot="${slotIdx}">✕ Xóa Bot</button>`;
          }
        } else {
          if (isHost) {
            actionBtnHtml = `<button class="slot-action-btn btn-toggle-bot-slot" data-slot="${slotIdx}">+ Thêm Bot</button>`;
          }
        }

        return `
          <div class="color-slot-card ${isMySlot ? 'my-slot' : ''}" data-slot="${slotIdx}" style="--slot-color:${colors[slotIdx]}; --slot-rgb:${rgbColors[slotIdx]};">
            <div class="slot-ship-preview">
              <div class="slot-ship-icon"></div>
            </div>
            <div class="slot-info-col">
              <span class="slot-color-title">${colorNames[slotIdx]}</span>
              <span class="slot-player-name">${escapeAstroHtml(occupantText)}</span>
              ${badgeHtml}
              ${actionBtnHtml}
            </div>
          </div>
        `;
      }).join('');

      colorSlotsGrid.querySelectorAll('.color-slot-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('btn-toggle-bot-slot')) return;
          const targetSlot = Number(card.dataset.slot);
          if (targetSlot === room.mySlot) return;

          const slotData = room.slots ? room.slots[targetSlot] : null;
          if (slotData && slotData.connected && !slotData.isBot) {
            showToastNotification('Màu đã có người', 'Màu này đang được người chơi khác sử dụng.');
            return;
          }

          if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
            gameState.ws.send(JSON.stringify({
              type: 'ASTRO_SELECT_COLOR',
              slot: targetSlot,
              playerName: gameState.playerName
            }));
          }
        });
      });

      colorSlotsGrid.querySelectorAll('.btn-toggle-bot-slot').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetSlot = Number(btn.dataset.slot);
          if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
            gameState.ws.send(JSON.stringify({
              type: 'ASTRO_TOGGLE_BOT',
              slot: targetSlot
            }));
          }
        });
      });
    }

    // 2. RENDER 6 MAP CARDS
    const mapDefs = [
      { id: 'CLASSIC', name: 'Cổ Điển', icon: '🏛️', desc: '4 trụ kim loại phản xạ' },
      { id: 'CROSS', name: 'Chữ Thập', icon: '✝️', desc: 'Pháo đài chia 4 góc' },
      { id: 'MAZE', name: 'Mê Cung', icon: '🌀', desc: 'Tường gạch vũ trụ' },
      { id: 'OPEN', name: 'Không Gian', icon: '🌌', desc: 'Trống trải, tự do đấu súng' },
      { id: 'MATRIX', name: 'Ma Trận Hộp', icon: '🧱', desc: 'Hộp quà vật phẩm phủ kín' },
      { id: 'RANDOM', name: 'Ngẫu Nhiên', icon: '🎲', desc: 'Đổi map bất ngờ mỗi ván' }
    ];

    if (mapsSelectionGrid) {
      mapsSelectionGrid.innerHTML = mapDefs.map(m => {
        const isActive = (room.mapType === m.id);
        return `
          <div class="map-card ${isActive ? 'active' : ''}" data-id="${m.id}">
            <span class="map-active-indicator">✓</span>
            <span class="map-card-icon">${m.icon}</span>
            <span class="map-card-name">${escapeAstroHtml(m.name)}</span>
            <span class="map-card-desc">${escapeAstroHtml(m.desc)}</span>
          </div>
        `;
      }).join('');

      mapsSelectionGrid.querySelectorAll('.map-card').forEach(card => {
        card.addEventListener('click', () => {
          const mapId = card.dataset.id;
          if (!isHost) {
            showToastNotification('Chỉ Chủ Phòng', `Chỉ chủ phòng [${hostName}] mới có quyền chọn bản đồ!`);
            return;
          }
          if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
            gameState.ws.send(JSON.stringify({
              type: 'ASTRO_SET_MAP',
              mapType: mapId
            }));
          }
        });
      });
    }

    // 3. RENDER FOOTER & START BUTTON
    if (btnStartGame) {
      const isPvP = (room.mode !== 'BOT');
      const humanCount = room.slots ? room.slots.filter(s => s && s.connected && !s.isBot).length : 1;
      const botCount = room.slots ? room.slots.filter(s => s && s.isBot).length : 0;
      const totalCombatants = humanCount + botCount;

      if (isHost) {
        if (isPvP && humanCount < 2) {
          btnStartGame.disabled = true;
          btnStartGame.classList.add('disabled');
          btnStartGame.innerHTML = '⏳ ĐANG ĐỢI NGƯỜI CHƠI THỨ 2...';
          if (loungeStatusMsg) loungeStatusMsg.textContent = '👥 Chế độ Đấu Với Người: Cần ít nhất 2 người chơi thật để xuất kích! (Hoặc bấm [Chuyển Sang Đấu Máy] phía trên để bắn với Bot)';
        } else {
          btnStartGame.disabled = false;
          btnStartGame.classList.remove('disabled');
          btnStartGame.innerHTML = `🚀 BẮT ĐẦU CHIẾN ĐẤU (${isPvP ? humanCount + '/4 Người' : 'Đấu Với Máy'})`;
          if (loungeStatusMsg) loungeStatusMsg.textContent = `⭐ Bạn là Chủ phòng. Sẵn sàng với ${totalCombatants} phi thuyền!`;
        }
      } else {
        btnStartGame.disabled = true;
        btnStartGame.classList.add('disabled');
        btnStartGame.innerHTML = '⏳ ĐANG ĐỢI CHỦ PHÒNG...';
        if (loungeStatusMsg) loungeStatusMsg.textContent = `⏳ Đang đợi Chủ phòng [${hostName}] nhấn Bắt đầu trận chiến...`;
      }
    }
  }

  // BIND LOBBY & MODAL EVENT LISTENERS
  if (createAstroModePicker) {
    createAstroModePicker.querySelectorAll('.mode-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        createAstroModePicker.querySelectorAll('.mode-pick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        astroLobby.selectedCreateMode = btn.dataset.mode || 'PVP';
        if (groupAstroBotCount) {
          groupAstroBotCount.style.display = (astroLobby.selectedCreateMode === 'BOT') ? 'flex' : 'none';
        }
      });
    });
  }

  if (btnOpenCreateRoom) {
    btnOpenCreateRoom.addEventListener('click', () => {
      if (createRoomName) createRoomName.value = `Phòng của ${gameState.playerName || 'Phi Công'}`;
      if (createRoomPassword) createRoomPassword.value = '';
      astroLobby.selectedCreateSlot = 0;
      astroLobby.selectedCreateMode = 'PVP';
      if (createAstroModePicker) {
        createAstroModePicker.querySelectorAll('.mode-pick-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === 'PVP');
        });
      }
      if (groupAstroBotCount) groupAstroBotCount.style.display = 'none';
      if (createColorPicker) {
        createColorPicker.querySelectorAll('.color-pick-btn').forEach(b => {
          b.classList.toggle('active', Number(b.dataset.slot) === 0);
        });
      }
      if (modalCreateRoomBackdrop) modalCreateRoomBackdrop.style.display = 'flex';
      setTimeout(() => createRoomName && createRoomName.focus(), 100);
    });
  }

  if (btnCloseCreateRoomModal) btnCloseCreateRoomModal.addEventListener('click', () => modalCreateRoomBackdrop.style.display = 'none');
  if (btnCancelCreateRoom) btnCancelCreateRoom.addEventListener('click', () => modalCreateRoomBackdrop.style.display = 'none');

  if (createColorPicker) {
    createColorPicker.querySelectorAll('.color-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        createColorPicker.querySelectorAll('.color-pick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        astroLobby.selectedCreateSlot = Number(btn.dataset.slot);
      });
    });
  }

  if (btnConfirmCreateRoom) {
    btnConfirmCreateRoom.addEventListener('click', () => {
      const name = (createRoomName ? createRoomName.value : `Phòng của ${gameState.playerName || 'Phi Công'}`).trim();
      const password = (createRoomPassword ? createRoomPassword.value : '').trim();
      const mapType = createRoomMap ? createRoomMap.value : 'CLASSIC';
      const preferredSlot = astroLobby.selectedCreateSlot;
      const mode = astroLobby.selectedCreateMode || 'PVP';
      const botCount = createAstroBotCount ? Number(createAstroBotCount.value) : 3;

      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({
          type: 'ASTRO_CREATE_ROOM',
          name,
          password,
          mode,
          botCount,
          mapType,
          preferredSlot,
          playerName: gameState.playerName
        }));
      }
      if (modalCreateRoomBackdrop) modalCreateRoomBackdrop.style.display = 'none';
    });
  }

  if (btnQuickPlay) {
    btnQuickPlay.addEventListener('click', () => {
      const openRoom = astroLobby.rooms.find(r => !r.hasPassword && r.playerCount < 4);
      if (openRoom) {
        joinAstroRoom(openRoom.id, '');
      } else {
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.ws.send(JSON.stringify({
            type: 'ASTRO_CREATE_ROOM',
            name: `Phòng Nhanh #${Math.floor(Math.random() * 900 + 100)}`,
            password: '',
            mapType: 'CLASSIC',
            preferredSlot: 0,
            playerName: gameState.playerName
          }));
        }
      }
    });
  }

  if (btnSoloBotPlay) {
    btnSoloBotPlay.addEventListener('click', () => {
      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({
          type: 'ASTRO_CREATE_ROOM',
          name: `Đấu Với Bot AI`,
          password: '',
          mapType: 'CLASSIC',
          preferredSlot: 0,
          withBots: true,
          playerName: gameState.playerName
        }));
      }
    });
  }

  if (btnRefreshRooms) {
    btnRefreshRooms.addEventListener('click', () => {
      requestAstroRoomsList();
      showToastNotification('Làm mới', 'Đang cập nhật danh sách phòng...');
    });
  }

  if (inputLobbySearch) {
    inputLobbySearch.addEventListener('input', () => {
      renderAstroRoomsTable();
    });
  }

  if (btnClosePasswordModal) btnClosePasswordModal.addEventListener('click', () => modalPasswordBackdrop.style.display = 'none');
  if (btnCancelPasswordModal) btnCancelPasswordModal.addEventListener('click', () => modalPasswordBackdrop.style.display = 'none');
  if (btnConfirmJoinPasswordRoom) {
    btnConfirmJoinPasswordRoom.addEventListener('click', () => {
      const pwd = (inputRoomPassword ? inputRoomPassword.value : '').trim();
      if (astroLobby.pendingJoinRoomId) {
        joinAstroRoom(astroLobby.pendingJoinRoomId, pwd);
      }
      if (modalPasswordBackdrop) modalPasswordBackdrop.style.display = 'none';
    });
  }
  if (inputRoomPassword) {
    inputRoomPassword.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && btnConfirmJoinPasswordRoom) {
        btnConfirmJoinPasswordRoom.click();
      }
    });
  }

  if (btnLeaveRoom) {
    btnLeaveRoom.addEventListener('click', () => {
      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({ type: 'ASTRO_LEAVE_ROOM' }));
      }
      astroLobby.currentRoom = null;
      showAstroLobby();
      requestAstroRoomsList();
    });
  }

  if (btnLoungeToggleMode) {
    btnLoungeToggleMode.addEventListener('click', () => {
      if (!astroLobby.currentRoom || astroLobby.currentRoom.hostSlot !== astroLobby.currentRoom.mySlot) {
        showToastNotification('Chỉ Chủ Phòng', 'Chỉ chủ phòng mới có quyền đổi chế độ!');
        return;
      }
      if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) return;
      const targetMode = (astroLobby.currentRoom.mode === 'BOT') ? 'PVP' : 'BOT';
      gameState.ws.send(JSON.stringify({
        type: 'ASTRO_SET_ROOM_MODE',
        mode: targetMode,
        botCount: 3
      }));
    });
  }

  if (btnStartGame) {
    btnStartGame.addEventListener('click', () => {
      if (!astroLobby.currentRoom || astroLobby.currentRoom.hostSlot !== astroLobby.currentRoom.mySlot) {
        return;
      }
      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({ type: 'ASTRO_START' }));
      }
    });
  }

  if (btnAstroBackLounge) {
    btnAstroBackLounge.addEventListener('click', () => {
      if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
        gameState.ws.send(JSON.stringify({ type: 'ASTRO_BACK_TO_LOUNGE' }));
      }
      showAstroLounge();
    });
  }

  if (btnAstroLobbyToggle) {
    btnAstroLobbyToggle.addEventListener('click', () => {
      if (astroLobby.currentRoom) {
        if (astroLobby.inBattle) {
          showAstroLounge();
        } else {
          showAstroBattle();
        }
      } else {
        showAstroLobby();
        requestAstroRoomsList();
      }
    });
  }

  // Handle Online Server Messages
  function handleAstroServerMessage(data) {
    switch (data.type) {
      case 'ASTRO_ROOMS_LIST':
        astroLobby.rooms = data.rooms || [];
        renderAstroRoomsTable();
        break;

      case 'ASTRO_ROOM_JOINED':
        astroLobby.currentRoom = data.room;
        astroOnlineState.mySlot = data.room.mySlot;
        if (data.room.slots) {
          astroOnlineState.slotsInfo = data.room.slots;
          astroOnlineState.slotNames = data.room.slots.map((s, i) => s.name || `P${i+1}`);
        }
        astroCurrentMapIdx = Math.max(0, ASTRO_MAP_TYPES.findIndex(m => m.id === data.room.mapType));
        if (data.room.state === 'PLAYING') {
          showAstroBattle();
        } else {
          showAstroLounge();
        }
        updateAstroHudUI();
        break;

      case 'ASTRO_ROOM_UPDATE':
        if (astroLobby.currentRoom && astroLobby.currentRoom.id === data.room.id) {
          const mySlot = astroLobby.currentRoom.mySlot;
          const isHost = (data.room.hostSlot === mySlot);
          astroLobby.currentRoom = {
            ...data.room,
            mySlot,
            isHost
          };
          if (data.room.slots) {
            astroOnlineState.slotsInfo = data.room.slots;
            astroOnlineState.slotNames = data.room.slots.map((s, i) => s.name || `P${i+1}`);
          }
          astroCurrentMapIdx = Math.max(0, ASTRO_MAP_TYPES.findIndex(m => m.id === data.room.mapType));
          if (data.room.state === 'PLAYING') {
            if (!astroLobby.inBattle) showAstroBattle();
          } else if (data.room.state === 'LOBBY') {
            if (astroLobby.inBattle) {
              showAstroLounge();
            } else {
              renderAstroLounge();
            }
          } else {
            renderAstroLounge();
          }
          updateAstroHudUI();
        }
        break;

      case 'ASTRO_SLOT_CHANGED':
        if (astroLobby.currentRoom) {
          astroLobby.currentRoom.mySlot = data.mySlot;
          astroLobby.currentRoom.isHost = data.isHost;
          astroOnlineState.mySlot = data.mySlot;
          renderAstroLounge();
          updateAstroHudUI();
        }
        break;

      case 'ASTRO_LEFT_ROOM':
        astroLobby.currentRoom = null;
        astroLobby.inBattle = false;
        showAstroLobby();
        requestAstroRoomsList();
        break;

      case 'ASTRO_ERROR':
        showToastNotification('Phòng Chiến Đấu', data.message);
        break;

      case 'ASTRO_WELCOME':
        astroOnlineState.mySlot = data.slot;
        astroOnlineState.slotNames = data.slotNames || astroOnlineState.slotNames;
        astroOnlineState.serverState = data.state || 'MENU';
        astroOnlineState.serverScores = data.scores || [0, 0, 0, 0];
        updateAstroHudUI();
        break;

      case 'ASTRO_PLAYERS_UPDATE':
        astroOnlineState.slotsInfo = data.slots || [];
        if (data.slots) {
          astroOnlineState.slotNames = data.slots.map((s, i) => s.name || `P${i+1}`);
        }
        astroOnlineState.spectatorsCount = data.spectatorsCount || 0;
        updateAstroHudUI();
        break;

      case 'ASTRO_STATE':
        astroOnlineState.serverState = data.state;
        astroOnlineState.serverScores = data.scores || [0, 0, 0, 0];
        if (data.state === 'PLAYING' && astroLobby.currentRoom && !astroLobby.inBattle) {
          showAstroBattle();
        }
        astroOnlineState.serverPlayers = data.players || [];
        astroOnlineState.serverBullets = data.bullets || [];
        astroOnlineState.serverLaserBeams = data.laserBeams || [];
        astroOnlineState.serverBlocks = data.blocks || [];
        astroOnlineState.serverDrops = data.drops || [];
        astroOnlineState.serverBombs = data.bombs || [];
        astroOnlineState.roundTimer = data.roundTimer;
        astroOnlineState.roundWinnerText = data.roundWinnerText;
        astroOnlineState.matchWinnerText = data.matchWinnerText;

        if (data.events && Array.isArray(data.events)) {
          data.events.forEach(ev => {
            switch (ev.type) {
              case 'LASER':
                astroSfxLaser();
                spawnAstroParticles(ev.x, ev.y, 4, ASTRO_PLAYER_CONFIGS[ev.slot]?.color || '#00f0ff', 50, 180, 2, 0.15);
                break;
              case 'MEGA_LASER':
                astroSfxMegaLaser();
                triggerAstroScreenShake(0.35, 14);
                if (ev.x1 !== undefined && ev.x2 !== undefined) {
                  for (let i = 0; i < 8; i++) {
                    const r = Math.random();
                    const px = ev.x1 + (ev.x2 - ev.x1) * r;
                    const py = ev.y1 + (ev.y2 - ev.y1) * r;
                    spawnAstroParticles(px, py, 4, '#ffff00', 60, 220, 3, 0.3);
                  }
                } else if (ev.x !== undefined && ev.y !== undefined) {
                  spawnAstroParticles(ev.x, ev.y, 16, '#ffff00', 80, 260, 3, 0.35);
                }
                break;
              case 'EXPLOSION':
                astroSfxExplosion();
                triggerAstroScreenShake(0.2, 10);
                const col = ASTRO_PLAYER_CONFIGS[ev.slot]?.color || '#ffffff';
                spawnAstroParticles(ev.x, ev.y, 28, col, 40, 280, 3.5, 0.8);
                spawnAstroParticles(ev.x, ev.y, 14, '#ffffff', 80, 320, 2, 0.5);
                break;
              case 'BOUNCE':
                astroSfxBounce();
                spawnAstroParticles(ev.x, ev.y, 6, '#88aaff', 40, 160, 2, 0.2);
                break;
              case 'BREAK':
                astroSfxBreak();
                spawnAstroParticles(ev.x, ev.y, 16, '#778899', 50, 200, 3, 0.4);
                break;
              case 'PILOT_DEATH':
                astroSfxExplosion();
                spawnAstroParticles(ev.x, ev.y, 20, '#ffffff', 60, 220, 2.5, 0.6);
                break;
              case 'ROUND_WIN':
                astroSfxRoundWin();
                break;
              case 'PICKUP':
                astroSfxPickup();
                const pCol = ASTRO_PLAYER_CONFIGS[ev.slot]?.color || '#ffff00';
                spawnAstroParticles(ev.x, ev.y, 18, pCol, 50, 220, 3, 0.45);
                break;
              case 'BOMB_DROP':
                astroSfxBombDrop();
                spawnAstroParticles(ev.x, ev.y, 5, '#ff4400', 20, 60, 2, 0.25);
                break;
              case 'BOMB_EXPLODE':
                astroSfxBombBoom();
                spawnAstroParticles(ev.x, ev.y, 45, '#ff3300', 60, 350, 4.5, 0.9);
                spawnAstroParticles(ev.x, ev.y, 25, '#ffcc00', 100, 380, 3, 0.6);
                spawnAstroParticles(ev.x, ev.y, 15, '#ffffff', 120, 420, 2, 0.4);
                break;
              case 'BLADE_KILL':
                astroSfxBlade();
                triggerAstroScreenShake(0.2, 12);
                spawnAstroParticles(ev.x, ev.y, 32, '#00f0ff', 60, 300, 3.5, 0.7);
                break;
              case 'BLADE_CLASH':
                astroSfxBladeClash();
                spawnAstroParticles(ev.x, ev.y, 14, '#ffdd44', 60, 200, 3, 0.35);
                break;
            }
          });
        }
        break;
    }
  }

  // Send input to online server
  let lastSentRotate = false;
  function sendAstroOnlineInputs(isRotating, rotateStep, justShoot) {
    if (!gameState.ws || gameState.ws.readyState !== WebSocket.OPEN) return;
    if (isRotating !== lastSentRotate || rotateStep || justShoot) {
      lastSentRotate = isRotating;
      gameState.ws.send(JSON.stringify({
        type: 'ASTRO_INPUT',
        rotate: isRotating,
        rotateStep: rotateStep,
        shoot: justShoot
      }));
    }
  }

  function updateAstroHudUI() {
    if (btnAstroMap) {
      btnAstroMap.textContent = `🗺️ Map: ${ASTRO_MAP_TYPES[astroCurrentMapIdx].name} ▾`;
    }
    if (!btnAstroMode) return;
    const currentName = gameState.playerName || 'DevPro';
    if (astroOnlineState.mode === 'BOT') {
      btnAstroMode.textContent = 'Mode: Đấu Với Máy (AI Bot)';
      btnAstroMode.classList.add('hud-mode-btn');
      astroHudSlot.textContent = `Bạn: ${currentName} (Cyan)`;
      astroHudSlot.style.color = '#00f0ff';
      astroHudPlayers.textContent = '1 vs AI Bot';
    } else if (astroOnlineState.mode === 'ONLINE') {
      btnAstroMode.textContent = 'Mode: Online (LAN/Ngrok)';
      btnAstroMode.classList.add('hud-mode-btn');

      if (astroOnlineState.mySlot >= 0 && astroOnlineState.mySlot < 4) {
        const colors = ['Cyan', 'Hồng', 'Xanh Lá', 'Vàng'];
        astroHudSlot.textContent = `Bạn: ${currentName} (${colors[astroOnlineState.mySlot]})`;
        astroHudSlot.style.color = ASTRO_PLAYER_CONFIGS[astroOnlineState.mySlot].color;
      } else {
        astroHudSlot.textContent = `Bạn: Khán giả`;
        astroHudSlot.style.color = '#88aacc';
      }

      if (astroLobby.currentRoom) {
        const isPvP = (astroLobby.currentRoom.mode !== 'BOT');
        const humanCount = astroLobby.currentRoom.slots ? astroLobby.currentRoom.slots.filter(s => s && s.connected && !s.isBot).length : 1;
        const botCount = astroLobby.currentRoom.slots ? astroLobby.currentRoom.slots.filter(s => s && s.isBot).length : 0;
        if (isPvP) {
          astroHudPlayers.textContent = `PvP: ${humanCount}/4 Người`;
        } else {
          astroHudPlayers.textContent = `PvE: 1 vs ${botCount} Bot AI`;
        }
      } else {
        const connectedCount = astroOnlineState.slotsInfo.filter(s => s && s.connected).length || 1;
        astroHudPlayers.textContent = `Phòng: ${connectedCount}/4 Người`;
      }
    } else {
      btnAstroMode.textContent = 'Mode: 1 Máy (Local)';
      btnAstroMode.classList.remove('hud-mode-btn');
      astroHudSlot.textContent = `P1: ${currentName} (Cyan)`;
      astroHudSlot.style.color = '#00f0ff';
      astroHudPlayers.textContent = `Players: [${astroPlayerCount}] (Bấm 2/3/4)`;
    }
  }

  // Common Entity Drawing Helpers
  function drawAstroBlock(b) {
    if (b.dead) return;
    astroCtx.save();
    if (b.isPhasePortal) {
      // ĐOẠN ĐI XUYÊN TƯỜNG (Cổng Hư Không): Cổng năng lượng neon trong suốt có sóng chuyển động
      const pulse = 0.5 + Math.sin(Date.now() * 0.006 + (b.x + b.y) * 0.05) * 0.25;
      astroCtx.fillStyle = `rgba(0, 240, 255, ${0.12 + pulse * 0.15})`;
      astroCtx.fillRect(b.x + 2, b.y + 2, b.size - 4, b.size - 4);

      astroCtx.strokeStyle = '#00f0ff';
      astroCtx.shadowColor = '#00f0ff';
      astroCtx.shadowBlur = 8;
      astroCtx.lineWidth = 1.5;
      astroCtx.setLineDash([4, 4]);
      astroCtx.strokeRect(b.x + 2, b.y + 2, b.size - 4, b.size - 4);
      astroCtx.setLineDash([]);

      // Sóng năng lượng chuyển động trong cổng
      astroCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      astroCtx.lineWidth = 1;
      const rippleY = b.y + ((Date.now() * 0.04) % b.size);
      astroCtx.beginPath();
      astroCtx.moveTo(b.x + 4, rippleY);
      astroCtx.lineTo(b.x + b.size - 4, rippleY);
      astroCtx.stroke();
    } else if (b.isIndestructible) {
      // Kim loại bất hoại: Màu xám đậm, đan chéo thép kim loại
      astroCtx.fillStyle = '#1c2028';
      astroCtx.strokeStyle = '#44556a';
      astroCtx.lineWidth = 2;
      astroCtx.fillRect(b.x, b.y, b.size, b.size);
      astroCtx.strokeRect(b.x, b.y, b.size, b.size);

      astroCtx.strokeStyle = '#687e9c';
      astroCtx.lineWidth = 1.5;
      astroCtx.beginPath();
      astroCtx.moveTo(b.x + 6, b.y + 6);
      astroCtx.lineTo(b.x + b.size - 6, b.y + b.size - 6);
      astroCtx.moveTo(b.x + b.size - 6, b.y + 6);
      astroCtx.lineTo(b.x + 6, b.y + b.size - 6);
      astroCtx.stroke();
    } else {
      // Hộp vỡ (bắn nổ được - có rơi quà!): Viền sọc cam/vàng đặc trưng
      astroCtx.fillStyle = '#2b221a';
      astroCtx.strokeStyle = '#e67e22';
      astroCtx.lineWidth = 1.5;
      astroCtx.fillRect(b.x, b.y, b.size, b.size);
      astroCtx.strokeRect(b.x, b.y, b.size, b.size);

      astroCtx.strokeStyle = '#d35400';
      astroCtx.lineWidth = 1;
      astroCtx.strokeRect(b.x + 6, b.y + 6, b.size - 12, b.size - 12);

      astroCtx.font = 'bold 9px monospace';
      astroCtx.fillStyle = '#f39c12';
      astroCtx.textAlign = 'center';
      astroCtx.fillText('📦', b.x + b.size / 2, b.y + b.size / 2 + 3);
    }
    astroCtx.restore();
  }

  function drawAstroShip(x, y, angle, color, glow, leftBlade = false, rightBlade = false, bombsCount = 0, laserCharges = 0) {
    astroCtx.save();
    astroCtx.translate(x, y);
    astroCtx.rotate(angle);

    // 1. VẼ SONG KIẾM 2 BÊN (Nếu có trang bị)
    if (leftBlade) {
      astroCtx.save();
      astroCtx.strokeStyle = '#00f0ff';
      astroCtx.shadowColor = '#00f0ff';
      astroCtx.shadowBlur = 14;
      astroCtx.lineWidth = 3;
      astroCtx.beginPath();
      astroCtx.moveTo(-10, -9);
      astroCtx.lineTo(16, -18);
      astroCtx.stroke();

      astroCtx.strokeStyle = '#ffffff';
      astroCtx.lineWidth = 1.5;
      astroCtx.beginPath();
      astroCtx.moveTo(-7, -9);
      astroCtx.lineTo(14, -17);
      astroCtx.stroke();
      astroCtx.restore();
    }
    if (rightBlade) {
      astroCtx.save();
      astroCtx.strokeStyle = '#00f0ff';
      astroCtx.shadowColor = '#00f0ff';
      astroCtx.shadowBlur = 14;
      astroCtx.lineWidth = 3;
      astroCtx.beginPath();
      astroCtx.moveTo(-10, 9);
      astroCtx.lineTo(16, 18);
      astroCtx.stroke();

      astroCtx.strokeStyle = '#ffffff';
      astroCtx.lineWidth = 1.5;
      astroCtx.beginPath();
      astroCtx.moveTo(-7, 9);
      astroCtx.lineTo(14, 17);
      astroCtx.stroke();
      astroCtx.restore();
    }

    // 2. THÂN TÀU CHIẾN
    astroCtx.strokeStyle = color;
    astroCtx.shadowColor = glow || color;
    astroCtx.shadowBlur = 12;
    astroCtx.lineWidth = 2.5;
    astroCtx.fillStyle = '#05070a';

    astroCtx.beginPath();
    astroCtx.moveTo(15, 0);       // Nose
    astroCtx.lineTo(-12, -10);   // Left Wing
    astroCtx.lineTo(-7, 0);      // Thruster Inset
    astroCtx.lineTo(-12, 10);    // Right Wing
    astroCtx.closePath();
    astroCtx.fill();
    astroCtx.stroke();

    astroCtx.fillStyle = '#ffffff';
    astroCtx.beginPath();
    astroCtx.arc(1, 0, 2.5, 0, Math.PI * 2);
    astroCtx.fill();

    // 3. HIỂN THỊ KHO VŨ KHÍ BOM HOẶC LASER
    if (bombsCount > 0) {
      astroCtx.fillStyle = '#ff4400';
      astroCtx.shadowColor = '#ff4400';
      astroCtx.shadowBlur = 8;
      for (let i = 0; i < bombsCount; i++) {
        astroCtx.beginPath();
        astroCtx.arc(-8 - i * 5, 0, 2.5, 0, Math.PI * 2);
        astroCtx.fill();
      }
    }
    if (laserCharges > 0) {
      astroCtx.fillStyle = '#ffff00';
      astroCtx.shadowColor = '#ffff00';
      astroCtx.shadowBlur = 10;
      astroCtx.fillRect(4, -1.5, 8, 3);
    }

    astroCtx.restore();
  }

  function drawAstroPilot(x, y, angle, color) {
    astroCtx.save();
    astroCtx.translate(x, y);
    astroCtx.rotate(angle);

    astroCtx.fillStyle = '#ffffff';
    astroCtx.shadowColor = '#ffffff';
    astroCtx.shadowBlur = 6;
    astroCtx.beginPath();
    astroCtx.arc(0, 0, 5, 0, Math.PI * 2);
    astroCtx.fill();

    astroCtx.fillStyle = color;
    astroCtx.fillRect(1, -2, 3, 4);

    astroCtx.restore();
  }

  function drawAstroBullet(x, y, vx, vy, color, isLaser = false) {
    astroCtx.save();
    if (isLaser) {
      // SIÊU LASER XUYÊN ĐỊA HÌNH
      astroCtx.strokeStyle = '#ffff00';
      astroCtx.shadowColor = '#ff0055';
      astroCtx.shadowBlur = 18;
      astroCtx.lineWidth = 5;
      astroCtx.beginPath();
      const tailLen = 32;
      const speed = Math.hypot(vx, vy) || 1;
      const nx = (vx / speed) * tailLen;
      const ny = (vy / speed) * tailLen;
      astroCtx.moveTo(x, y);
      astroCtx.lineTo(x - nx, y - ny);
      astroCtx.stroke();

      astroCtx.strokeStyle = '#ffffff';
      astroCtx.lineWidth = 2;
      astroCtx.beginPath();
      astroCtx.moveTo(x, y);
      astroCtx.lineTo(x - nx, y - ny);
      astroCtx.stroke();
    } else {
      // Đạn thường
      astroCtx.strokeStyle = color;
      astroCtx.shadowColor = color;
      astroCtx.shadowBlur = 10;
      astroCtx.lineWidth = 3;
      astroCtx.beginPath();
      const tailLen = 14;
      const speed = Math.hypot(vx, vy) || 1;
      const nx = (vx / speed) * tailLen;
      const ny = (vy / speed) * tailLen;
      astroCtx.moveTo(x, y);
      astroCtx.lineTo(x - nx, y - ny);
      astroCtx.stroke();

      astroCtx.fillStyle = '#ffffff';
      astroCtx.beginPath();
      astroCtx.arc(x, y, 2.5, 0, Math.PI * 2);
      astroCtx.fill();
    }
    astroCtx.restore();
  }

  function drawAstroBomb(b) {
    astroCtx.save();
    const progress = Math.min(1, Math.max(0, 1 - (b.timer / b.maxTimer)));

    // 1. Vòng biên nguy hiểm cố định 120px (Dashed red ring)
    astroCtx.strokeStyle = 'rgba(255, 30, 0, 0.45)';
    astroCtx.lineWidth = 1.5;
    astroCtx.setLineDash([6, 6]);
    astroCtx.beginPath();
    astroCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    astroCtx.stroke();
    astroCtx.setLineDash([]);

    // 2. Vòng sóng xung kích mở rộng từ tâm ra 120px
    astroCtx.strokeStyle = `rgba(255, 60, 0, ${0.25 + progress * 0.65})`;
    astroCtx.lineWidth = 2.5;
    astroCtx.beginPath();
    astroCtx.arc(b.x, b.y, Math.max(8, b.radius * progress), 0, Math.PI * 2);
    astroCtx.stroke();

    // 3. Quả bom nhấp nháy đỏ rực, tần số nhấp nháy tăng dần khi sắp nổ
    const blinkSpeed = 0.01 + progress * 0.045;
    const blink = Math.sin(Date.now() * blinkSpeed) > 0;
    astroCtx.fillStyle = blink ? '#ff1100' : '#440a00';
    astroCtx.shadowColor = '#ff2200';
    astroCtx.shadowBlur = 14;
    astroCtx.beginPath();
    astroCtx.arc(b.x, b.y, 9, 0, Math.PI * 2);
    astroCtx.fill();
    astroCtx.strokeStyle = '#ffffff';
    astroCtx.lineWidth = 1.5;
    astroCtx.stroke();

    // 4. Biểu tượng bom và số giây đếm ngược
    astroCtx.font = 'bold 9px monospace';
    astroCtx.fillStyle = '#ffffff';
    astroCtx.textAlign = 'center';
    astroCtx.fillText('💣', b.x, b.y + 3);

    const secondsLeft = Math.max(0, b.timer).toFixed(1);
    astroCtx.font = 'bold 11px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = blink ? '#ffff00' : '#ff4444';
    astroCtx.shadowColor = '#ff0000';
    astroCtx.shadowBlur = 6;
    astroCtx.fillText(`${secondsLeft}s`, b.x, b.y - 14);

    astroCtx.restore();
  }

  function drawAstroLaserBeam(b) {
    astroCtx.save();
    const alpha = Math.min(1, Math.max(0, b.life / b.maxLife));
    astroCtx.globalAlpha = alpha;

    // 1. Hào quang Neon ngoài (Outer Bloom)
    astroCtx.strokeStyle = '#ff0055';
    astroCtx.shadowColor = '#ffff00';
    astroCtx.shadowBlur = 28;
    astroCtx.lineWidth = 18;
    astroCtx.lineCap = 'round';
    astroCtx.beginPath();
    astroCtx.moveTo(b.x1, b.y1);
    astroCtx.lineTo(b.x2, b.y2);
    astroCtx.stroke();

    // 2. Dải năng lượng điện tử (Mid Electric Beam)
    astroCtx.strokeStyle = '#ffea00';
    astroCtx.shadowColor = '#ffea00';
    astroCtx.shadowBlur = 16;
    astroCtx.lineWidth = 8;
    astroCtx.beginPath();
    astroCtx.moveTo(b.x1, b.y1);
    astroCtx.lineTo(b.x2, b.y2);
    astroCtx.stroke();

    // 3. Lõi Laser siêu nhiệt (Core Hot White Beam)
    astroCtx.strokeStyle = '#ffffff';
    astroCtx.shadowColor = '#ffffff';
    astroCtx.shadowBlur = 8;
    astroCtx.lineWidth = 3;
    astroCtx.beginPath();
    astroCtx.moveTo(b.x1, b.y1);
    astroCtx.lineTo(b.x2, b.y2);
    astroCtx.stroke();

    // 4. Khẩu flare đầu nòng
    astroCtx.fillStyle = '#ffffff';
    astroCtx.shadowColor = '#ffff00';
    astroCtx.shadowBlur = 20;
    astroCtx.beginPath();
    astroCtx.arc(b.x1, b.y1, 8, 0, Math.PI * 2);
    astroCtx.fill();

    astroCtx.restore();
  }

  function drawAstroDrop(d) {
    astroCtx.save();
    const bob = Math.sin(Date.now() * 0.006 + d.x) * 3;
    const dy = d.y + bob;

    let glowColor = '#00f0ff';
    let icon = '⚔️';
    if (d.type === 'BOMB') { glowColor = '#ff5500'; icon = '💣'; }
    else if (d.type === 'LASER') { glowColor = '#ffff00'; icon = '⚡'; }

    astroCtx.fillStyle = 'rgba(10, 20, 35, 0.85)';
    astroCtx.strokeStyle = glowColor;
    astroCtx.shadowColor = glowColor;
    astroCtx.shadowBlur = 12;
    astroCtx.lineWidth = 2;

    const sz = 24;
    astroCtx.fillRect(d.x - sz / 2, dy - sz / 2, sz, sz);
    astroCtx.strokeRect(d.x - sz / 2, dy - sz / 2, sz, sz);

    astroCtx.font = '13px sans-serif';
    astroCtx.textAlign = 'center';
    astroCtx.fillText(icon, d.x, dy + 4.5);
    astroCtx.restore();
  }

  function drawPilotLabel(x, y, name, color, isYou = false) {
    if (!name) return;
    astroCtx.save();
    astroCtx.font = isYou ? 'bold 11px "JetBrains Mono", Consolas, monospace' : '10px "JetBrains Mono", Consolas, monospace';
    astroCtx.fillStyle = isYou ? '#ffffff' : color;
    astroCtx.shadowColor = color;
    astroCtx.shadowBlur = isYou ? 10 : 5;
    astroCtx.textAlign = 'center';
    const text = isYou ? `▲ ${name} (BẠN)` : name;
    astroCtx.fillText(text, x, y);
    astroCtx.restore();
  }

  function drawYouIndicator(x, y, color) {
    drawPilotLabel(x, y, gameState.playerName || 'BẠN', color, true);
  }

  // DRAW ONLINE MODE
  function drawAstroOnline() {
    astroCtx.save();

    if (astroScreenShakeTime > 0) {
      const ox = (Math.random() - 0.5) * astroScreenShakeIntensity;
      const oy = (Math.random() - 0.5) * astroScreenShakeIntensity;
      astroCtx.translate(ox, oy);
    }

    astroCtx.fillStyle = '#000000';
    astroCtx.fillRect(0, 0, ASTRO_V_WIDTH, ASTRO_V_HEIGHT);

    // Grid
    astroCtx.strokeStyle = '#0e1218';
    astroCtx.lineWidth = 1;
    for (let x = 0; x < ASTRO_V_WIDTH; x += 40) {
      astroCtx.beginPath(); astroCtx.moveTo(x, 0); astroCtx.lineTo(x, ASTRO_V_HEIGHT); astroCtx.stroke();
    }
    for (let y = 0; y < ASTRO_V_HEIGHT; y += 40) {
      astroCtx.beginPath(); astroCtx.moveTo(0, y); astroCtx.lineTo(ASTRO_V_WIDTH, y); astroCtx.stroke();
    }

    // Blocks
    astroOnlineState.serverBlocks.forEach(b => drawAstroBlock(b));

    // Thính (Drops) & Bombs
    astroOnlineState.serverDrops.forEach(d => drawAstroDrop(d));
    astroOnlineState.serverBombs.forEach(b => drawAstroBomb(b));

    // Mega Laser Beams (Tia Laser Xuyên Suốt Bản Đồ)
    if (astroOnlineState.serverLaserBeams) {
      astroOnlineState.serverLaserBeams.forEach(b => drawAstroLaserBeam(b));
    }

    // Particles
    astroParticles.forEach(p => {
      astroCtx.save();
      const alpha = 1 - (p.life / p.maxLife);
      astroCtx.globalAlpha = Math.max(0, alpha);
      astroCtx.fillStyle = p.color;
      astroCtx.shadowColor = p.color;
      astroCtx.shadowBlur = 6;
      astroCtx.beginPath();
      astroCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      astroCtx.fill();
      astroCtx.restore();
    });

    // Bullets
    astroOnlineState.serverBullets.forEach(b => {
      const cfg = ASTRO_PLAYER_CONFIGS[b.slot] || { color: '#ffffff' };
      drawAstroBullet(b.x, b.y, b.vx, b.vy, cfg.color, b.isLaser);
    });

    // Players (Ships & Ejected Living Pilots with Names)
    astroOnlineState.serverPlayers.forEach(p => {
      const cfg = ASTRO_PLAYER_CONFIGS[p.slot] || { color: '#ffffff', glow: '#ffffff' };
      const rawSlotName = (astroOnlineState.slotNames && astroOnlineState.slotNames[p.slot])
        ? astroOnlineState.slotNames[p.slot].replace(/\s\((Cyan|Magenta|Green|Yellow)\)$/, '')
        : (p.slot === astroOnlineState.mySlot ? (gameState.playerName || 'DevPro') : cfg.name);
      const isMe = (p.slot === astroOnlineState.mySlot);

      if (p.isDestroyed) {
        if (p.pilot && !p.pilot.dead) {
          drawAstroPilot(p.pilot.x, p.pilot.y, p.pilot.angle, cfg.color);
          drawPilotLabel(p.pilot.x, p.pilot.y - 12, rawSlotName, cfg.color, isMe);
        }
      } else {
        drawAstroShip(p.x, p.y, p.angle, cfg.color, cfg.glow, p.leftBlade, p.rightBlade, p.bombsCount, p.laserCharges);
        drawPilotLabel(p.x, p.y - 18, rawSlotName, cfg.color, isMe);
      }
    });

    // Top HUD Scores
    if (astroOnlineState.serverState !== 'MENU') {
      astroCtx.save();
      astroCtx.font = 'bold 17px "JetBrains Mono", Courier, monospace';
      const activeCount = Math.max(2, astroOnlineState.serverPlayers.length);
      for (let i = 0; i < activeCount; i++) {
        const cfg = ASTRO_PLAYER_CONFIGS[i];
        const sc = astroOnlineState.serverScores[i] || 0;
        let displayName = (astroOnlineState.slotNames && astroOnlineState.slotNames[i])
          ? astroOnlineState.slotNames[i].replace(/\s\((Cyan|Magenta|Green|Yellow)\)$/, '')
          : (i === astroOnlineState.mySlot ? (gameState.playerName || 'DevPro') : cfg.name);

        astroCtx.fillStyle = cfg.color;
        astroCtx.shadowColor = cfg.color;
        astroCtx.shadowBlur = (i === astroOnlineState.mySlot) ? 16 : 8;
        const xPos = 60 + i * (ASTRO_V_WIDTH - 120) / (activeCount - 1);
        astroCtx.textAlign = 'center';
        astroCtx.fillText(`${displayName}: ${sc}`, xPos, 34);
      }
      astroCtx.restore();
    }

    // Menus
    if (astroOnlineState.serverState === 'MENU') {
      drawAstroOnlineMenu();
    } else if (astroOnlineState.serverState === 'ROUND_OVER') {
      drawAstroRoundOver();
    } else if (astroOnlineState.serverState === 'MATCH_OVER') {
      drawAstroMatchOver();
    }

    astroCtx.restore();
  }

  function drawAstroOnlineMenu() {
    astroCtx.save();
    astroCtx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    astroCtx.fillRect(0, 0, ASTRO_V_WIDTH, ASTRO_V_HEIGHT);

    // Title
    astroCtx.font = 'bold 44px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#00f0ff';
    astroCtx.shadowColor = '#00f0ff';
    astroCtx.shadowBlur = 24;
    astroCtx.textAlign = 'center';
    astroCtx.fillText('ASTRO PARTY ONLINE', ASTRO_V_WIDTH / 2, 140);

    astroCtx.font = 'bold 15px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ff007f';
    astroCtx.shadowColor = '#ff007f';
    astroCtx.shadowBlur = 12;
    astroCtx.fillText('ĐẤU PHI THUYỀN QUA MẠNG LAN & NGROK (MỖI NGƯỜI 1 MÁY)', ASTRO_V_WIDTH / 2, 175);

    // Slots status card
    astroCtx.font = '14.5px "JetBrains Mono", Courier, monospace';
    astroCtx.shadowBlur = 0;
    const colors = ['#00f0ff', '#ff007f', '#00ff66', '#ffff00'];
    const names = ['P1 (Cyan)', 'P2 (Magenta)', 'P3 (Green)', 'P4 (Yellow)'];

    for (let i = 0; i < 4; i++) {
      const slotInfo = astroOnlineState.slotsInfo[i];
      const isMe = (i === astroOnlineState.mySlot);
      let statusText = '[TRỐNG]';
      if (slotInfo && slotInfo.isBot) statusText = '[AI BOT]';
      else if (slotInfo && slotInfo.connected) statusText = isMe ? `[${gameState.playerName || 'BẠN'} - ĐÃ KẾT NỐI]` : '[ĐÃ VÀO PHÒNG]';

      astroCtx.fillStyle = colors[i];
      const slotName = slotInfo ? slotInfo.name : (isMe ? `${gameState.playerName || 'DevPro'} (${colors[i]})` : names[i]);
      const slotLabel = `${names[i]}: ${slotName} ${statusText}`;
      astroCtx.fillText(slotLabel, ASTRO_V_WIDTH / 2, 240 + i * 30);
    }

    // Controls
    astroCtx.font = '13.5px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ffffff';
    astroCtx.fillText('Phím bấm trên máy của bạn: [← hoặc A] Quay đầu | [→ hoặc D hoặc Space] Bắn', ASTRO_V_WIDTH / 2, 395);

    // Start prompt
    const blink = Math.sin(Date.now() * 0.006) > 0;
    if (blink) {
      astroCtx.font = 'bold 22px "JetBrains Mono", Courier, monospace';
      astroCtx.fillStyle = '#00ff66';
      astroCtx.shadowColor = '#00ff66';
      astroCtx.shadowBlur = 14;
      astroCtx.fillText('>>> BẤM SPACE HOẶC START ĐỂ BẮT ĐẦU TRẬN <<<', ASTRO_V_WIDTH / 2, 475);
    }

    astroCtx.font = '12px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#778899';
    astroCtx.shadowBlur = 0;
    astroCtx.fillText('Mẹo: Nhấn "+ Bot AI" để thêm bot luyện tập. Nhấn ESC bất kỳ lúc nào để ẩn game thành code Java!', ASTRO_V_WIDTH / 2, 535);

    astroCtx.restore();
  }

  function drawAstroRoundOver() {
    astroCtx.save();
    astroCtx.font = 'bold 36px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ffffff';
    astroCtx.shadowColor = '#00f0ff';
    astroCtx.shadowBlur = 20;
    astroCtx.textAlign = 'center';
    const text = astroOnlineState.mode === 'ONLINE' ? astroOnlineState.roundWinnerText : astroRoundWinnerText;
    const timer = astroOnlineState.mode === 'ONLINE' ? astroOnlineState.roundTimer : Math.ceil(astroRoundTimer);
    astroCtx.fillText(text, ASTRO_V_WIDTH / 2, ASTRO_V_HEIGHT / 2 - 10);

    astroCtx.font = '18px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#88aacc';
    astroCtx.shadowBlur = 0;
    astroCtx.fillText(`NEXT ROUND IN ${timer}s...`, ASTRO_V_WIDTH / 2, ASTRO_V_HEIGHT / 2 + 35);
    astroCtx.restore();
  }

  function drawAstroMatchOver() {
    astroCtx.save();
    astroCtx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    astroCtx.fillRect(0, 0, ASTRO_V_WIDTH, ASTRO_V_HEIGHT);

    astroCtx.font = 'bold 42px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ffff00';
    astroCtx.shadowColor = '#ffff00';
    astroCtx.shadowBlur = 25;
    astroCtx.textAlign = 'center';
    const text = astroOnlineState.mode === 'ONLINE' ? astroOnlineState.matchWinnerText : astroMatchWinnerText;
    astroCtx.fillText(text, ASTRO_V_WIDTH / 2, ASTRO_V_HEIGHT / 2 - 30);

    astroCtx.font = '20px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#00f0ff';
    astroCtx.shadowColor = '#00f0ff';
    astroCtx.shadowBlur = 10;
    astroCtx.fillText('PRESS SPACE FOR MAIN MENU', ASTRO_V_WIDTH / 2, ASTRO_V_HEIGHT / 2 + 40);
    astroCtx.restore();
  }

  // LOCAL OFFLINE MODE ENGINE (1 MÁY 2-4 NGƯỜI & VS BOT)
  function astroCircleRect(cx, cy, r, rx, ry, rw, rh) {
    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));
    const distX = cx - closestX;
    const distY = cy - closestY;
    return (distX * distX + distY * distY) < (r * r);
  }

  function astroDistToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  class AstroLocalBullet {
    constructor(playerId, x, y, angle, color) {
      this.playerId = playerId;
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * ASTRO_BULLET_SPEED;
      this.vy = Math.sin(angle) * ASTRO_BULLET_SPEED;
      this.color = color;
      this.isLaser = false;
      this.traveled = 0;
      this.life = 0;
      this.dead = false;
      this.bounces = 0;
    }

    update(dt) {
      const dx = this.vx * dt;
      const dy = this.vy * dt;
      this.x += dx;
      this.y += dy;
      this.traveled += Math.hypot(dx, dy);
      this.life += dt;
      if (this.traveled >= ASTRO_BULLET_MAX_DIST || this.life >= ASTRO_BULLET_MAX_LIFE) {
        this.dead = true;
      }
      if (this.x < 0) this.x += ASTRO_V_WIDTH;
      else if (this.x > ASTRO_V_WIDTH) this.x -= ASTRO_V_WIDTH;
      if (this.y < 0) this.y += ASTRO_V_HEIGHT;
      else if (this.y > ASTRO_V_HEIGHT) this.y -= ASTRO_V_HEIGHT;
    }
  }

  class AstroLocalLaserBeam {
    constructor(playerId, x1, y1, x2, y2, angle) {
      this.id = Math.random();
      this.playerId = playerId;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.angle = angle;
      this.life = 0.35;
      this.maxLife = 0.35;
      this.dead = false;
    }
    update(dt) {
      this.life -= dt;
      if (this.life <= 0) this.dead = true;
    }
  }

  class AstroLocalBomb {
    constructor(playerId, x, y) {
      this.id = Math.random();
      this.playerId = playerId;
      this.x = x;
      this.y = y;
      this.timer = 2.5;
      this.maxTimer = 2.5;
      this.radius = 120;
      this.dead = false;
    }
    update(dt) {
      this.timer -= dt;
      if (this.timer <= 0) this.dead = true;
    }
  }

  class AstroLocalDrop {
    constructor(x, y, type) {
      this.id = Math.random();
      this.x = x;
      this.y = y;
      this.type = type; // 'SWORD' | 'BOMB' | 'LASER'
      this.life = 25;
      this.dead = false;
    }
    update(dt) {
      this.life -= dt;
      if (this.life <= 0) this.dead = true;
    }
  }

  function generateLocalAstroBlocks(mapType = 'CLASSIC') {
    const blocks = [];
    const blockSize = 40;
    let type = mapType;
    if (type === 'RANDOM') {
      const list = ['CLASSIC', 'CROSS', 'MAZE', 'OPEN', 'MATRIX'];
      type = list[Math.floor(Math.random() * list.length)];
    }

    if (type === 'CLASSIC') {
      // 1. ĐẤU TRƯỜNG CỔ ĐIỂN
      const pillars = [
        { gx: 6, gy: 4 }, { gx: 13, gy: 4 },
        { gx: 6, gy: 10 }, { gx: 13, gy: 10 }
      ];
      pillars.forEach(p => {
        blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
      });

      for (let gy = 3; gy <= 11; gy++) {
        for (let gx = 5; gx <= 14; gx++) {
          if ((gx === 9 || gx === 10) && (gy === 4 || gy === 10)) {
            blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
          } else if ((gy === 6 || gy === 8) && (gx === 7 || gx === 12)) {
            blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
          }
        }
      }

      // 4 CỔNG XUYÊN TƯỜNG (Phase Portals)
      blocks.push({ x: 9 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 10 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 4 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 15 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

    } else if (type === 'CROSS') {
      // 2. PHÁO ĐÀI CHỮ THẬP
      const steels = [
        { gx: 8, gy: 5 }, { gx: 11, gy: 5 },
        { gx: 8, gy: 9 }, { gx: 11, gy: 9 },
        { gx: 5, gy: 4 }, { gx: 14, gy: 4 },
        { gx: 5, gy: 10 }, { gx: 14, gy: 10 }
      ];
      steels.forEach(p => {
        blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
      });

      const crates = [
        { gx: 9, gy: 5 }, { gx: 10, gy: 5 },
        { gx: 9, gy: 9 }, { gx: 10, gy: 9 },
        { gx: 7, gy: 7 }, { gx: 8, gy: 7 },
        { gx: 11, gy: 7 }, { gx: 12, gy: 7 }
      ];
      crates.forEach(p => {
        blocks.push({ x: p.gx * blockSize, y: p.gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
      });

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

      blocks.push({ x: 6 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 13 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 9 * blockSize, y: 5 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 10 * blockSize, y: 9 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

    } else if (type === 'OPEN') {
      // 4. VŨ TRỤ MỞ
      blocks.push({ x: 8 * blockSize, y: 6 * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });
      blocks.push({ x: 11 * blockSize, y: 8 * blockSize, size: blockSize, isIndestructible: true, isPhasePortal: false, dead: false });

      blocks.push({ x: 9 * blockSize, y: 4 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
      blocks.push({ x: 10 * blockSize, y: 10 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
      blocks.push({ x: 6 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });
      blocks.push({ x: 13 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: false, dead: false });

      blocks.push({ x: 3 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 16 * blockSize, y: 7 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });

    } else if (type === 'MATRIX') {
      // 5. MA TRẬN CỘT ĐÁ
      for (let my = 4; my <= 10; my += 3) {
        for (let mx = 6; mx <= 13; mx += 3.5) {
          const gx = Math.round(mx);
          const gy = Math.round(my);
          if (gx === 10 && gy === 7) {
            blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
          } else {
            const isInd = (gx === 6 || gx === 13) && (gy === 4 || gy === 10);
            blocks.push({ x: gx * blockSize, y: gy * blockSize, size: blockSize, isIndestructible: isInd, isPhasePortal: false, dead: false });
          }
        }
      }
      blocks.push({ x: 10 * blockSize, y: 4 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
      blocks.push({ x: 10 * blockSize, y: 10 * blockSize, size: blockSize, isIndestructible: false, isPhasePortal: true, dead: false });
    }

    return blocks;
  }

  class AstroLocalPilot {
    constructor(playerId, x, y, angle, color) {
      this.playerId = playerId;
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.color = color;
      this.radius = 5;
      const ejectAngle = angle + Math.PI + (Math.random() - 0.5) * 0.4;
      this.vx = Math.cos(ejectAngle) * 140;
      this.vy = Math.sin(ejectAngle) * 140;
      this.dead = false;
      this.turnFlickTimer = 0;
    }

    update(dt, isRotating, rotateStep) {
      if (this.dead) return;
      // ZERO DELAY & SIÊU MƯỢT:
      if (rotateStep) {
        this.angle = (this.angle + ASTRO_TURN_STEP) % (Math.PI * 2);
      } else if (isRotating) {
        this.angle = (this.angle + 4.8 * dt) % (Math.PI * 2);
      }

      this.vx += (Math.cos(this.angle) * ASTRO_PILOT_SPEED - this.vx) * (dt * 3.5);
      this.vy += (Math.sin(this.angle) * ASTRO_PILOT_SPEED - this.vy) * (dt * 3.5);
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      if (this.x < 0) this.x += ASTRO_V_WIDTH;
      else if (this.x > ASTRO_V_WIDTH) this.x -= ASTRO_V_WIDTH;
      if (this.y < 0) this.y += ASTRO_V_HEIGHT;
      else if (this.y > ASTRO_V_HEIGHT) this.y -= ASTRO_V_HEIGHT;
    }
  }

  class AstroLocalShip {
    constructor(config, spawnX, spawnY, spawnAngle, isBot = false) {
      this.config = config;
      this.id = config.id;
      this.x = spawnX;
      this.y = spawnY;
      this.angle = spawnAngle;
      this.radius = 13;
      this.color = config.color;
      this.glow = config.glow;
      this.recoilTime = 0;
      this.isDestroyed = false;
      this.pilot = null;
      this.isBot = isBot;
      this.botShootCooldown = 0;

      // Kho vũ khí & Power-ups
      this.leftBlade = false;
      this.rightBlade = false;
      this.bombsCount = 0;
      this.laserCharges = 0;
    }

    update(dt, isRotating, rotateStep, justShoot, activeBulletsCount, addBulletCallback, addBombCallback, addLaserBeamCallback) {
      if (this.isDestroyed) {
        if (this.pilot) this.pilot.update(dt, isRotating, rotateStep);
        return;
      }

      // ZERO DELAY & SIÊU MƯỢT MÀ:
      // 1. Nhấp phím: Góc xoay 15° tức thì ngay frame bấm phím, KHÔNG delay 1ms nào!
      if (rotateStep) {
        this.angle = (this.angle + ASTRO_TURN_STEP) % (Math.PI * 2);
        const backX = this.x - Math.cos(this.angle) * 12;
        const backY = this.y - Math.sin(this.angle) * 12;
        spawnAstroParticles(backX, backY, 3, this.color, 40, 100, 2.5, 0.2);
      } else if (isRotating) {
        // 2. Giữ phím: Lượn vòng tròn liên tục 4.8 rad/s siêu mượt mà
        this.angle = (this.angle + 4.8 * dt) % (Math.PI * 2);
        const backX = this.x - Math.cos(this.angle) * 12;
        const backY = this.y - Math.sin(this.angle) * 12;
        spawnAstroParticles(backX, backY, 1, this.color, 20, 60, 2, 0.15);
      }

      let forwardSpeed = ASTRO_SHIP_SPEED;
      if (this.recoilTime > 0) {
        forwardSpeed -= 150;
        this.recoilTime -= dt;
      }
      this.x += Math.cos(this.angle) * forwardSpeed * dt;
      this.y += Math.sin(this.angle) * forwardSpeed * dt;
      if (this.x < 0) this.x += ASTRO_V_WIDTH;
      else if (this.x > ASTRO_V_WIDTH) this.x -= ASTRO_V_WIDTH;
      if (this.y < 0) this.y += ASTRO_V_HEIGHT;
      else if (this.y > ASTRO_V_HEIGHT) this.y -= ASTRO_V_HEIGHT;

      // Bắn (Bom 2.5s / Siêu Laser Xuyên Bản Đồ / Đạn Thường)
      if (justShoot) {
        if (this.bombsCount > 0) {
          const bx = this.x - Math.cos(this.angle) * 16;
          const by = this.y - Math.sin(this.angle) * 16;
          addBombCallback(new AstroLocalBomb(this.id, bx, by));
          this.bombsCount--;
          astroSfxBombDrop();
          spawnAstroParticles(bx, by, 8, '#ff5500', 40, 120, 2.5, 0.2);
        } else if (this.laserCharges > 0) {
          // SIÊU LASER: Bắn 1 tia dài từ mũi tàu xuyên suốt tới cuối map theo đường thẳng
          const tipX = this.x + Math.cos(this.angle) * 16;
          const tipY = this.y + Math.sin(this.angle) * 16;
          const endX = tipX + Math.cos(this.angle) * 1200;
          const endY = tipY + Math.sin(this.angle) * 1200;
          if (addLaserBeamCallback) {
            addLaserBeamCallback(new AstroLocalLaserBeam(this.id, tipX, tipY, endX, endY, this.angle));
          }
          this.laserCharges--;
          this.recoilTime = 0.08;
          astroSfxMegaLaser();
          triggerAstroScreenShake(0.35, 14);
          for (let i = 0; i < 8; i++) {
            const r = Math.random();
            const px = tipX + (endX - tipX) * r;
            const py = tipY + (endY - tipY) * r;
            spawnAstroParticles(px, py, 4, '#ffff00', 60, 220, 3, 0.3);
          }
        } else if (activeBulletsCount < 3) {
          const tipX = this.x + Math.cos(this.angle) * 17;
          const tipY = this.y + Math.sin(this.angle) * 17;
          addBulletCallback(new AstroLocalBullet(this.id, tipX, tipY, this.angle, this.color, false));
          this.recoilTime = 0.05;
          astroSfxLaser();
          spawnAstroParticles(tipX, tipY, 4, this.color, 50, 180, 2, 0.15);
        }
      }
    }

    destroy() {
      if (this.isDestroyed) return;
      this.isDestroyed = true;
      this.leftBlade = false;
      this.rightBlade = false;
      this.bombsCount = 0;
      this.laserCharges = 0;
      astroSfxExplosion();
      triggerAstroScreenShake(0.2, 10);
      spawnAstroParticles(this.x, this.y, 28, this.color, 40, 280, 3.5, 0.8);
      spawnAstroParticles(this.x, this.y, 14, '#ffffff', 80, 320, 2, 0.5);
      this.pilot = new AstroLocalPilot(this.id, this.x, this.y, this.angle, this.color);
    }
  }

  let astroPlayerCount = 2;
  let astroScores = [0, 0, 0, 0];
  let astroPlayers = [];
  let astroBullets = [];
  let astroLaserBeams = [];
  let astroBlocks = [];
  let astroDrops = [];
  let astroBombs = [];
  let astroRoundTimer = 0;
  let astroRoundWinnerText = '';
  let astroMatchWinnerText = '';
  let astroLocalState = 'MENU';

  function spawnLocalPlayers() {
    astroPlayers = [];
    astroBullets = [];
    astroLaserBeams = [];
    astroDrops = [];
    astroBombs = [];
    astroBlocks = generateLocalAstroBlocks(ASTRO_MAP_TYPES[astroCurrentMapIdx].id);
    const spawns = [
      { x: 120, y: 120, angle: Math.PI * 0.25 },
      { x: 680, y: 480, angle: Math.PI * 1.25 },
      { x: 680, y: 120, angle: Math.PI * 0.75 },
      { x: 120, y: 480, angle: Math.PI * 1.75 }
    ];

    if (astroOnlineState.mode === 'BOT') {
      astroPlayers.push(new AstroLocalShip(ASTRO_PLAYER_CONFIGS[0], spawns[0].x, spawns[0].y, spawns[0].angle, false));
      astroPlayers.push(new AstroLocalShip(ASTRO_PLAYER_CONFIGS[1], spawns[1].x, spawns[1].y, spawns[1].angle, true));
    } else {
      for (let i = 0; i < astroPlayerCount; i++) {
        astroPlayers.push(new AstroLocalShip(ASTRO_PLAYER_CONFIGS[i], spawns[i].x, spawns[i].y, spawns[i].angle, false));
      }
    }
  }

  function startNewAstroMatch() {
    astroScores = [0, 0, 0, 0];
    spawnLocalPlayers();
    astroLocalState = 'PLAYING';
  }

  function updateAstroLocal(dt) {
    if (astroScreenShakeTime > 0) astroScreenShakeTime -= dt;
    for (let i = astroParticles.length - 1; i >= 0; i--) {
      const p = astroParticles[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.life += dt;
      if (p.life >= p.maxLife) astroParticles.splice(i, 1);
    }

    if (astroLocalState === 'MENU') {
      if (astroOnlineState.mode === 'LOCAL') {
        if (astroKeysJustPressed.has('Digit2') || astroKeysJustPressed.has('Numpad2')) astroPlayerCount = 2;
        if (astroKeysJustPressed.has('Digit3') || astroKeysJustPressed.has('Numpad3')) astroPlayerCount = 3;
        if (astroKeysJustPressed.has('Digit4') || astroKeysJustPressed.has('Numpad4')) astroPlayerCount = 4;
      }
      updateAstroHudUI();
      if (astroKeysJustPressed.has('Space') || astroKeysJustPressed.has('Enter')) {
        startNewAstroMatch();
      }
      astroKeysJustPressed.clear();
      return;
    }

    if (astroLocalState === 'ROUND_OVER') {
      astroRoundTimer -= dt;
      if (astroRoundTimer <= 0) {
        const maxScore = Math.max(...astroScores);
        if (maxScore >= ASTRO_POINTS_TO_WIN) {
          const winIdx = astroScores.indexOf(maxScore);
          const winnerName = (astroOnlineState.mode === 'BOT' && winIdx === 1) ? 'AI BOT' : ASTRO_PLAYER_CONFIGS[winIdx].name;
          astroMatchWinnerText = `${winnerName} WINS THE MATCH!`;
          astroLocalState = 'MATCH_OVER';
        } else {
          spawnLocalPlayers();
          astroLocalState = 'PLAYING';
        }
      }
      astroKeysJustPressed.clear();
      return;
    }

    if (astroLocalState === 'MATCH_OVER') {
      if (astroKeysJustPressed.has('Space') || astroKeysJustPressed.has('Enter')) astroLocalState = 'MENU';
      astroKeysJustPressed.clear();
      return;
    }

    // 1. Inputs (Player & AI Bot)
    if (astroOnlineState.mode === 'BOT') {
      // Human Player (P1)
      const p1 = astroPlayers[0];
      if (p1) {
        const isRotating = astroKeysDown.has('ArrowLeft') || astroKeysDown.has('KeyA');
        const rotateStep = astroKeysJustPressed.has('ArrowLeft') || astroKeysJustPressed.has('KeyA');
        const justShoot = astroKeysJustPressed.has('ArrowRight') || astroKeysJustPressed.has('KeyD') || astroKeysJustPressed.has('Space');
        const activeBullets = astroBullets.filter(b => b.playerId === p1.id && !b.dead).length;
        p1.update(dt, isRotating, rotateStep, justShoot, activeBullets, (b) => astroBullets.push(b), (bm) => astroBombs.push(bm), (beam) => astroLaserBeams.push(beam));
      }

      // AI Bot (P2)
      const bot = astroPlayers[1];
      if (bot && bot.isBot) {
        const target = p1;
        let isRotating = false;
        let rotateStep = false;
        let justShoot = false;
        if (target) {
          const tx = target.isDestroyed ? (target.pilot && !target.pilot.dead ? target.pilot.x : null) : target.x;
          const ty = target.isDestroyed ? (target.pilot && !target.pilot.dead ? target.pilot.y : null) : target.y;
          if (tx !== null && ty !== null) {
            const bx = bot.isDestroyed ? (bot.pilot ? bot.pilot.x : bot.x) : bot.x;
            const by = bot.isDestroyed ? (bot.pilot ? bot.pilot.y : bot.y) : bot.y;
            const curA = bot.isDestroyed ? (bot.pilot ? bot.pilot.angle : 0) : bot.angle;
            const targetAngle = Math.atan2(ty - by, tx - bx);
            let diff = (targetAngle - curA) % (Math.PI * 2);
            if (diff < 0) diff += Math.PI * 2;

            isRotating = diff > 0.25;
            const dist = Math.hypot(tx - bx, ty - by);
            if (!bot.isDestroyed && diff < 0.35 && dist < 420 && bot.botShootCooldown <= 0) {
              justShoot = true;
              bot.botShootCooldown = 0.35 + Math.random() * 0.35;
            }
          }
        }
        if (bot.botShootCooldown > 0) bot.botShootCooldown -= dt;
        const activeBullets = astroBullets.filter(b => b.playerId === bot.id && !b.dead).length;
        bot.update(dt, isRotating, rotateStep, justShoot, activeBullets, (b) => astroBullets.push(b), (bm) => astroBombs.push(bm), (beam) => astroLaserBeams.push(beam));
      }
    } else {
      // Local 2-4 Players
      astroPlayers.forEach(p => {
        const isRotating = astroKeysDown.has(p.config.rotateKey);
        const rotateStep = astroKeysJustPressed.has(p.config.rotateKey);
        const justShoot = astroKeysJustPressed.has(p.config.shootKey);
        const activeBullets = astroBullets.filter(b => b.playerId === p.id && !b.dead).length;
        p.update(dt, isRotating, rotateStep, justShoot, activeBullets, (b) => astroBullets.push(b), (bm) => astroBombs.push(bm), (beam) => astroLaserBeams.push(beam));
      });
    }

    // 2. Drops (Thính) Lifetime & Player Pickup
    astroDrops.forEach(d => {
      d.update(dt);
      astroPlayers.forEach(p => {
        if (p.isDestroyed || d.dead) return;
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
          astroSfxPickup();
          spawnAstroParticles(d.x, d.y, 18, '#ffffff', 50, 200, 3, 0.4);
        }
      });
    });
    astroDrops = astroDrops.filter(d => !d.dead);

    // 2b. Mega Laser Beams (Tia Laser Xuyên Suốt Toàn Bộ Bản Đồ)
    astroLaserBeams.forEach(b => {
      b.update(dt);
      // Phá nổ tức thì mọi khối hộp destructible trên đường đi của tia laser
      astroBlocks.forEach(blk => {
        if (blk.dead || blk.isPhasePortal || blk.isIndestructible) return;
        if (astroDistToSegment(blk.x + blk.size / 2, blk.y + blk.size / 2, b.x1, b.y1, b.x2, b.y2) <= blk.size * 0.65 + 8) {
          blk.dead = true;
          astroSfxBreak();
          spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#ffff00', 60, 220, 3, 0.4);
          if (Math.random() < 0.45) {
            const types = ['SWORD', 'BOMB', 'LASER'];
            astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
          }
        }
      });

      // Tiêu diệt kẻ địch nằm trên tia laser
      astroPlayers.forEach(p2 => {
        if (p2.id === b.playerId) return;
        if (!p2.isDestroyed) {
          if (astroDistToSegment(p2.x, p2.y, b.x1, b.y1, b.x2, b.y2) <= p2.radius + 10) {
            p2.destroy();
            triggerAstroScreenShake(0.35, 14);
          }
        } else if (p2.pilot && !p2.pilot.dead) {
          if (astroDistToSegment(p2.pilot.x, p2.pilot.y, b.x1, b.y1, b.x2, b.y2) <= p2.pilot.radius + 10) {
            p2.pilot.dead = true;
            astroSfxExplosion();
            spawnAstroParticles(p2.pilot.x, p2.pilot.y, 16, '#ffffff', 40, 200, 2, 0.5);
          }
        }
      });
    });
    astroLaserBeams = astroLaserBeams.filter(b => !b.dead);

    // 3. Bombs Countdown & Shockwave Detonation (Tự sát nếu trong phạm vi 120px!)
    astroBombs.forEach(b => {
      b.update(dt);
      if (b.dead) {
        astroSfxBombBoom();
        triggerAstroScreenShake(0.3, 14);
        spawnAstroParticles(b.x, b.y, 45, '#ff4400', 60, 360, 4, 0.8);
        spawnAstroParticles(b.x, b.y, 25, '#ffff00', 80, 280, 3, 0.6);

        // Phá vỡ các khối trong bán kính 120px
        astroBlocks.forEach(blk => {
          if (blk.dead || blk.isIndestructible || blk.isPhasePortal) return;
          if (Math.hypot(blk.x + blk.size / 2 - b.x, blk.y + blk.size / 2 - b.y) <= b.radius + blk.size / 2) {
            blk.dead = true;
            astroSfxBreak();
            spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
            }
          }
        });

        // Tiêu diệt TẤT CẢ phi thuyền & phi công trong bán kính (KỂ CẢ BẢN THÂN!)
        astroPlayers.forEach(p => {
          if (!p.isDestroyed) {
            if (Math.hypot(p.x - b.x, p.y - b.y) <= b.radius + p.radius) {
              p.destroy();
            }
          } else if (p.pilot && !p.pilot.dead) {
            if (Math.hypot(p.pilot.x - b.x, p.pilot.y - b.y) <= b.radius + p.pilot.radius) {
              p.pilot.dead = true;
              astroSfxExplosion();
              spawnAstroParticles(p.pilot.x, p.pilot.y, 16, '#ffffff', 40, 200, 2, 0.5);
            }
          }
        });
      }
    });
    astroBombs = astroBombs.filter(b => !b.dead);

    // 4. Song Kiếm (Dual Swords) vs Enemy & Blocks
    astroPlayers.forEach(p1 => {
      if (p1.isDestroyed) return;
      if (!p1.leftBlade && !p1.rightBlade) return;

      const bladeDist = 22;
      const leftTipX = p1.x + Math.cos(p1.angle - 0.75) * bladeDist;
      const leftTipY = p1.y + Math.sin(p1.angle - 0.75) * bladeDist;
      const rightTipX = p1.x + Math.cos(p1.angle + 0.75) * bladeDist;
      const rightTipY = p1.y + Math.sin(p1.angle + 0.75) * bladeDist;

      // Đâm vào tàu địch gây nổ tàu địch ngay tức khắc!
      astroPlayers.forEach(p2 => {
        if (p1.id === p2.id) return;
        if (!p2.isDestroyed) {
          if (p1.leftBlade && Math.hypot(p2.x - leftTipX, p2.y - leftTipY) < p2.radius + 6) {
            p2.destroy();
            astroSfxBlade();
            triggerAstroScreenShake(0.2, 8);
          } else if (p1.rightBlade && Math.hypot(p2.x - rightTipX, p2.y - rightTipY) < p2.radius + 6) {
            p2.destroy();
            astroSfxBlade();
            triggerAstroScreenShake(0.2, 8);
          }
        } else if (p2.pilot && !p2.pilot.dead) {
          if ((p1.leftBlade && Math.hypot(p2.pilot.x - leftTipX, p2.pilot.y - leftTipY) < p2.pilot.radius + 6) ||
              (p1.rightBlade && Math.hypot(p2.pilot.x - rightTipX, p2.pilot.y - rightTipY) < p2.pilot.radius + 6)) {
            p2.pilot.dead = true;
            astroSfxExplosion();
            spawnAstroParticles(p2.pilot.x, p2.pilot.y, 16, '#ffffff', 40, 200, 2, 0.5);
          }
        }
      });

      // Đâm vào chướng ngại vật -> Phá vỡ và MẤT 1 KIẾM!
      astroBlocks.forEach(blk => {
        if (blk.dead || blk.isPhasePortal) return;
        if (p1.leftBlade && astroCircleRect(leftTipX, leftTipY, 8, blk.x, blk.y, blk.size, blk.size)) {
          p1.leftBlade = false;
          astroSfxBladeClash();
          spawnAstroParticles(leftTipX, leftTipY, 12, '#00f0ff', 60, 220, 2.5, 0.3);
          if (!blk.isIndestructible) {
            blk.dead = true;
            astroSfxBreak();
            spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
            }
          }
        } else if (p1.rightBlade && astroCircleRect(rightTipX, rightTipY, 8, blk.x, blk.y, blk.size, blk.size)) {
          p1.rightBlade = false;
          astroSfxBladeClash();
          spawnAstroParticles(rightTipX, rightTipY, 12, '#00f0ff', 60, 220, 2.5, 0.3);
          if (!blk.isIndestructible) {
            blk.dead = true;
            astroSfxBreak();
            spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
            if (Math.random() < 0.45) {
              const types = ['SWORD', 'BOMB', 'LASER'];
              astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
            }
          }
        }
      });
    });

    // 5. Bullets Movement
    astroBullets.forEach(b => b.update(dt));

    // 6. Bullets vs Blocks
    astroBullets.forEach(b => {
      if (b.dead) return;
      for (const blk of astroBlocks) {
        if (blk.dead) continue;
        // CỔNG NĂNG LƯỢNG XUYÊN TƯỜNG (Phase Portal): Đạn bay xuyên qua không bị cản!
        if (blk.isPhasePortal) continue;

        if (astroCircleRect(b.x, b.y, b.isLaser ? 6 : 4, blk.x, blk.y, blk.size, blk.size)) {
          if (b.isLaser) {
            // Siêu Laser: Xuyên thẳng qua mọi địa hình, phá nổ hộp cản đường!
            if (!blk.isIndestructible) {
              blk.dead = true;
              astroSfxBreak();
              spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
              if (Math.random() < 0.45) {
                const types = ['SWORD', 'BOMB', 'LASER'];
                astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
              }
            }
          } else {
            // Đạn thường
            if (blk.isIndestructible) {
              b.dead = true;
              astroSfxBounce();
              spawnAstroParticles(b.x, b.y, 6, '#88aaff', 40, 160, 2, 0.2);
            } else {
              blk.dead = true;
              b.dead = true;
              astroSfxBreak();
              spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
              if (Math.random() < 0.45) {
                const types = ['SWORD', 'BOMB', 'LASER'];
                astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
              }
            }
            break;
          }
        }
      }
    });

    for (let i = astroBullets.length - 1; i >= 0; i--) {
      if (astroBullets[i].dead) astroBullets.splice(i, 1);
    }

    // 7. Ships & Pilots vs Blocks (NẢY & DỘI RA, ĐI XUYÊN CỔNG PHASE)
    astroPlayers.forEach(p => {
      const targetObj = p.isDestroyed ? (p.pilot && !p.pilot.dead ? p.pilot : null) : p;
      if (!targetObj) return;

      for (const blk of astroBlocks) {
        if (blk.dead) continue;
        // CỔNG NĂNG LƯỢNG XUYÊN TƯỜNG (Phase Portal): Người và phi công đi xuyên qua tự do!
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

          // Húc vào ô item (!isIndestructible): CHỈ nổ khi tàu đang có kiếm, nếu không có kiếm thì nảy dội êm ái
          if (!blk.isIndestructible && !p.isDestroyed) {
            if (p.leftBlade || p.rightBlade) {
              blk.dead = true;
              if (p.leftBlade) p.leftBlade = false;
              else if (p.rightBlade) p.rightBlade = false;
              astroSfxBladeClash();
              astroSfxBreak();
              spawnAstroParticles(closestX, closestY, 14, '#00f0ff', 60, 220, 2.5, 0.35);
              spawnAstroParticles(blk.x + blk.size / 2, blk.y + blk.size / 2, 16, '#778899', 50, 200, 3, 0.4);
              if (Math.random() < 0.45) {
                const types = ['SWORD', 'BOMB', 'LASER'];
                astroDrops.push(new AstroLocalDrop(blk.x + blk.size / 2, blk.y + blk.size / 2, types[Math.floor(Math.random() * types.length)]));
              }
            } else {
              // Không có kiếm: húc vào chỉ bị nảy dội êm ái, KHÔNG làm nổ ô item
              astroSfxBounce();
              spawnAstroParticles(closestX, closestY, 4, '#88aaff', 30, 100, 2, 0.15);
            }
          } else {
            astroSfxBounce();
            spawnAstroParticles(closestX, closestY, 4, '#88aaff', 30, 100, 2, 0.15);
          }
        }
      }
    });

    // 8. Bullets vs Ships & Pilots
    astroBullets.forEach(b => {
      if (b.dead) return;
      astroPlayers.forEach(p => {
        if (!p.isDestroyed) {
          if (Math.hypot(b.x - p.x, b.y - p.y) < p.radius + 3) {
            if (!b.isLaser) b.dead = true;
            p.destroy();
          }
        } else if (p.pilot && !p.pilot.dead) {
          if (Math.hypot(b.x - p.pilot.x, b.y - p.pilot.y) < p.pilot.radius + 3) {
            if (!b.isLaser) b.dead = true;
            p.pilot.dead = true;
            astroSfxExplosion();
            spawnAstroParticles(p.pilot.x, p.pilot.y, 16, '#ffffff', 40, 200, 2, 0.5);
          }
        }
      });
    });

    // 9. Ships Ramming Living Enemy Pilots
    astroPlayers.forEach(p1 => {
      if (p1.isDestroyed) return;
      astroPlayers.forEach(p2 => {
        if (p1.id === p2.id) return;
        if (p2.pilot && !p2.pilot.dead) {
          if (Math.hypot(p1.x - p2.pilot.x, p1.y - p2.pilot.y) < p1.radius + p2.pilot.radius) {
            p2.pilot.dead = true;
            astroSfxExplosion();
            spawnAstroParticles(p2.pilot.x, p2.pilot.y, 20, p2.color, 60, 220, 2.5, 0.6);
          }
        }
      });
    });

    // 10. Alive Check & Round End
    const alive = astroPlayers.filter(p => !p.isDestroyed || (p.pilot && !p.pilot.dead));
    if (alive.length <= 1) {
      astroLocalState = 'ROUND_OVER';
      astroRoundTimer = 2.5;
      astroSfxRoundWin();
      if (alive.length === 1) {
        astroScores[alive[0].id - 1]++;
        const winnerName = (astroOnlineState.mode === 'BOT' && alive[0].isBot) ? 'AI BOT' : alive[0].config.name;
        astroRoundWinnerText = `${winnerName} WINS THE ROUND!`;
      } else {
        astroRoundWinnerText = 'DRAW ROUND!';
      }
    }

    astroKeysJustPressed.clear();
  }

  function drawAstroLocal() {
    astroCtx.save();
    if (astroScreenShakeTime > 0) {
      const ox = (Math.random() - 0.5) * astroScreenShakeIntensity;
      const oy = (Math.random() - 0.5) * astroScreenShakeIntensity;
      astroCtx.translate(ox, oy);
    }
    astroCtx.fillStyle = '#000000';
    astroCtx.fillRect(0, 0, ASTRO_V_WIDTH, ASTRO_V_HEIGHT);

    // Grid
    astroCtx.strokeStyle = '#0e1218';
    astroCtx.lineWidth = 1;
    for (let x = 0; x < ASTRO_V_WIDTH; x += 40) {
      astroCtx.beginPath(); astroCtx.moveTo(x, 0); astroCtx.lineTo(x, ASTRO_V_HEIGHT); astroCtx.stroke();
    }
    for (let y = 0; y < ASTRO_V_HEIGHT; y += 40) {
      astroCtx.beginPath(); astroCtx.moveTo(0, y); astroCtx.lineTo(ASTRO_V_WIDTH, y); astroCtx.stroke();
    }

    // Blocks (Indestructible, Destructible, Phase Portals)
    astroBlocks.forEach(b => drawAstroBlock(b));

    // Thính (Drops), Bombs & Laser Beams
    astroDrops.forEach(d => drawAstroDrop(d));
    astroBombs.forEach(b => drawAstroBomb(b));
    astroLaserBeams.forEach(b => drawAstroLaserBeam(b));

    // Particles
    astroParticles.forEach(p => {
      astroCtx.save();
      const alpha = 1 - (p.life / p.maxLife);
      astroCtx.globalAlpha = Math.max(0, alpha);
      astroCtx.fillStyle = p.color;
      astroCtx.shadowColor = p.color;
      astroCtx.shadowBlur = 6;
      astroCtx.beginPath();
      astroCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      astroCtx.fill();
      astroCtx.restore();
    });

    // Bullets & Lasers
    astroBullets.forEach(b => drawAstroBullet(b.x, b.y, b.vx, b.vy, b.color, b.isLaser));

    // Players with Weapons
    astroPlayers.forEach((p, i) => {
      const isMe = (i === 0);
      const pName = isMe ? (gameState.playerName || 'DevPro') : ((astroOnlineState.mode === 'BOT' && i === 1) ? 'AI Bot' : (p.config ? p.config.name : `P${i+1}`));
      if (p.isDestroyed) {
        if (p.pilot && !p.pilot.dead) {
          drawAstroPilot(p.pilot.x, p.pilot.y, p.pilot.angle, p.color);
          drawPilotLabel(p.pilot.x, p.pilot.y - 12, pName, p.color, isMe);
        }
      } else {
        drawAstroShip(p.x, p.y, p.angle, p.color, p.glow, p.leftBlade, p.rightBlade, p.bombsCount, p.laserCharges);
        drawPilotLabel(p.x, p.y - 18, pName, p.color, isMe);
      }
    });

    // Score HUD
    if (astroLocalState !== 'MENU') {
      astroCtx.save();
      astroCtx.font = 'bold 17px "JetBrains Mono", Courier, monospace';
      for (let i = 0; i < astroPlayerCount; i++) {
        const cfg = ASTRO_PLAYER_CONFIGS[i];
        let displayName = (i === 0) ? (gameState.playerName || 'DevPro') : ((astroOnlineState.mode === 'BOT' && i === 1) ? 'AI Bot' : cfg.name);
        astroCtx.fillStyle = cfg.color;
        astroCtx.shadowColor = cfg.color;
        astroCtx.shadowBlur = (i === 0) ? 14 : 8;
        const xPos = 60 + i * (ASTRO_V_WIDTH - 120) / (astroPlayerCount - 1);
        astroCtx.textAlign = 'center';
        astroCtx.fillText(`${displayName}: ${astroScores[i]}`, xPos, 34);
      }
      astroCtx.restore();
    }

    if (astroLocalState === 'MENU') {
      drawAstroLocalMenu();
    } else if (astroLocalState === 'ROUND_OVER') {
      drawAstroRoundOver();
    } else if (astroLocalState === 'MATCH_OVER') {
      drawAstroMatchOver();
    }

    astroCtx.restore();
  }

  function drawAstroLocalMenu() {
    astroCtx.save();
    astroCtx.fillStyle = 'rgba(0, 0, 0, 0.82)';
    astroCtx.fillRect(0, 0, ASTRO_V_WIDTH, ASTRO_V_HEIGHT);

    astroCtx.font = 'bold 44px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#00f0ff';
    astroCtx.shadowColor = '#00f0ff';
    astroCtx.shadowBlur = 24;
    astroCtx.textAlign = 'center';
    astroCtx.fillText('ASTRO PARTY', ASTRO_V_WIDTH / 2, 125);

    const isBot = (astroOnlineState.mode === 'BOT');
    astroCtx.font = 'bold 15px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ff007f';
    astroCtx.shadowColor = '#ff007f';
    astroCtx.shadowBlur = 12;
    astroCtx.fillText(isBot ? 'CHẾ ĐỘ: ĐẤU VỚI MÁY (SOLO VS AI BOT)' : 'CHẾ ĐỘ: 1 MÁY LOCAL (2-4 NGƯỜI CHƠI CHUNG BÀN PHÍM)', ASTRO_V_WIDTH / 2, 158);

    astroCtx.font = 'bold 16px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ffffff';
    astroCtx.shadowBlur = 0;
    astroCtx.fillText(`BẢN ĐỒ HIỆN TẠI: [${ASTRO_MAP_TYPES[astroCurrentMapIdx].name}] (Bấm nút Map trên HUD để đổi)`, ASTRO_V_WIDTH / 2, 195);

    // Bảng giới thiệu Thính & Vũ khí mới
    astroCtx.font = 'bold 13.5px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#00f0ff';
    astroCtx.fillText('🎁 HỘP VỠ RƠI THÍNH (45%): ⚔️ Song Kiếm | 💣 Bom hẹn giờ 2.5s | ⚡ Siêu Laser xuyên bản đồ', ASTRO_V_WIDTH / 2, 230);
    astroCtx.font = '12px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#ffdd44';
    astroCtx.fillText('⚡ SIÊU LAZER: Bắn 1 tia dài xuyên thủng mọi địa hình từ mũi tàu tới cuối bản đồ!', ASTRO_V_WIDTH / 2, 255);
    astroCtx.fillStyle = '#ff5533';
    astroCtx.fillText('💣 BOM HẸN GIỜ: 2.5s đếm ngược & vòng cảnh báo 120px - chú ý thoát ra kẻo nổ tan xác cả bản thân!', ASTRO_V_WIDTH / 2, 280);

    if (isBot) {
      astroCtx.font = '13.5px "JetBrains Mono", Courier, monospace';
      astroCtx.fillStyle = '#00f0ff';
      astroCtx.fillText(`BẠN: ${gameState.playerName || 'DevPro'} (Cyan)   vs   ĐỐI THỦ: AI Bot (Magenta)`, ASTRO_V_WIDTH / 2, 320);
      astroCtx.fillStyle = '#aaccff';
      astroCtx.fillText('🎮 PHÍM: [A hoặc ←] Nhấp lướt 15° mượt mà (Giữ để quay liên tục) | [D/→/Space] Bắn', ASTRO_V_WIDTH / 2, 350);
      astroCtx.fillStyle = '#00ffaa';
      astroCtx.fillText('🛡️ TÍNH NĂNG: Hộp quà phải BẮN mới nổ (Húc vào chỉ nổ khi có Kiếm) | Đạn đập tường kim loại sẽ biến mất!', ASTRO_V_WIDTH / 2, 380);
    } else {
      astroCtx.font = 'bold 15px "JetBrains Mono", Courier, monospace';
      astroCtx.fillStyle = '#ffffff';
      astroCtx.fillText(`CHỌN SỐ NGƯỜI CHƠI: [${astroPlayerCount}] (Bấm phím 2, 3, hoặc 4)`, ASTRO_V_WIDTH / 2, 315);
      astroCtx.font = '13px "JetBrains Mono", Courier, monospace';
      const controls = [
        `P1 [${gameState.playerName || 'DevPro'} - CYAN]: [←] Xoay mượt | [→] Bắn`,
        'P2 (MAGENTA): [A] Xoay mượt | [D] Bắn',
        'P3 (GREEN)  : [G] Xoay mượt | [H] Bắn',
        'P4 (YELLOW) : [J] Xoay mượt | [K] Bắn'
      ];
      for (let i = 0; i < 4; i++) {
        astroCtx.fillStyle = i < astroPlayerCount ? ASTRO_PLAYER_CONFIGS[i].color : '#444444';
        astroCtx.fillText(controls[i], ASTRO_V_WIDTH / 2, 345 + i * 24);
      }
    }

    const blink = Math.sin(Date.now() * 0.006) > 0;
    if (blink) {
      astroCtx.font = 'bold 22px "JetBrains Mono", Courier, monospace';
      astroCtx.fillStyle = '#00ff66';
      astroCtx.shadowColor = '#00ff66';
      astroCtx.shadowBlur = 14;
      astroCtx.fillText('>>> BẤM SPACE HOẶC START ĐỂ BẮT ĐẦU <<<', ASTRO_V_WIDTH / 2, 480);
    }

    astroCtx.font = '12px "JetBrains Mono", Courier, monospace';
    astroCtx.fillStyle = '#778899';
    astroCtx.shadowBlur = 0;
    astroCtx.fillText('Mẹo: Nhấn ESC hoặc F2 bất kỳ lúc nào để giấu game tức thì thành code Java!', ASTRO_V_WIDTH / 2, 535);

    astroCtx.restore();
  }

  function resizeAstroCanvas() {
    if (!astroBoardView || !astroCanvas) return;
    const rect = astroBoardView.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const padW = (astroViewMode === 'MINI') ? 12 : 24;
    const padH = (astroViewMode === 'MINI') ? 16 : 32;
    const fitScale = Math.min((rect.width - padW) / ASTRO_V_WIDTH, (rect.height - padH) / ASTRO_V_HEIGHT);

    let scale;
    if (astroZoomScale === 'FIT') {
      scale = fitScale;
    } else if (typeof astroZoomScale === 'number') {
      scale = astroZoomScale;
    } else {
      scale = fitScale;
    }

    const clampedScale = Math.max(0.25, Math.min(scale, 2.5));
    astroCanvas.style.width = `${Math.floor(ASTRO_V_WIDTH * clampedScale)}px`;
    astroCanvas.style.height = `${Math.floor(ASTRO_V_HEIGHT * clampedScale)}px`;
  }

  const astroCtx = astroCanvas ? astroCanvas.getContext('2d') : null;

  // Rigid 60FPS Game Loop with Delta Time
  let astroLastTime = performance.now();
  function astroGameLoop(currentTime) {
    let dt = (currentTime - astroLastTime) / 1000;
    astroLastTime = currentTime;
    if (dt > 0.05) dt = 0.05;

    if (isAstroActive()) {
      if (astroOnlineState.mode === 'ONLINE') {
        // Read local keyboard input
        const isRotating = astroKeysDown.has('ArrowLeft') || astroKeysDown.has('KeyA');
        const rotateStep = astroKeysJustPressed.has('ArrowLeft') || astroKeysJustPressed.has('KeyA');
        const justShoot = astroKeysJustPressed.has('ArrowRight') || astroKeysJustPressed.has('KeyD') || astroKeysJustPressed.has('Space');
        sendAstroOnlineInputs(isRotating, rotateStep, justShoot);

        if (astroOnlineState.serverState === 'MENU' && (astroKeysJustPressed.has('Space') || astroKeysJustPressed.has('Enter'))) {
          if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
            gameState.ws.send(JSON.stringify({ type: 'ASTRO_START' }));
          }
        }

        // Particle updates
        for (let i = astroParticles.length - 1; i >= 0; i--) {
          const p = astroParticles[i];
          p.x += p.vx * dt; p.y += p.vy * dt; p.life += dt;
          if (p.life >= p.maxLife) astroParticles.splice(i, 1);
        }
        if (astroScreenShakeTime > 0) astroScreenShakeTime -= dt;

        drawAstroOnline();
        astroKeysJustPressed.clear();
      } else {
        updateAstroLocal(dt);
        drawAstroLocal();
      }
    }

    requestAnimationFrame(astroGameLoop);
  }

  requestAnimationFrame(astroGameLoop);

  // HUD Buttons Interaction
  if (btnAstroMode) {
    btnAstroMode.addEventListener('click', () => {
      if (astroOnlineState.mode === 'BOT') {
        astroOnlineState.mode = 'ONLINE';
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.ws.send(JSON.stringify({ type: 'ASTRO_JOIN', roomId: 'astro-default', name: gameState.playerName }));
        }
        showToastNotification('Chế độ', 'Đã chuyển sang: Online (LAN/Ngrok) - Mỗi người chơi trên máy tính riêng!');
      } else if (astroOnlineState.mode === 'ONLINE') {
        astroOnlineState.mode = 'LOCAL';
        spawnLocalPlayers();
        showToastNotification('Chế độ', 'Đã chuyển sang: 1 Máy (Local) - 2-4 người trên 1 bàn phím.');
      } else {
        astroOnlineState.mode = 'BOT';
        spawnLocalPlayers();
        showToastNotification('Chế độ', 'Đã chuyển sang: Đấu Với Máy (AI Bot).');
      }
      updateAstroHudUI();
    });
  }

  if (btnAstroMap) {
    btnAstroMap.addEventListener('click', () => {
      astroCurrentMapIdx = (astroCurrentMapIdx + 1) % ASTRO_MAP_TYPES.length;
      const selectedMap = ASTRO_MAP_TYPES[astroCurrentMapIdx];
      btnAstroMap.textContent = `🗺️ Map: ${selectedMap.name} ▾`;

      if (astroOnlineState.mode === 'ONLINE') {
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.ws.send(JSON.stringify({ type: 'ASTRO_SET_MAP', mapType: selectedMap.id }));
        }
      } else {
        astroBlocks = generateLocalAstroBlocks(selectedMap.id);
        if (astroLocalState === 'PLAYING') {
          spawnLocalPlayers();
        }
      }
      showToastNotification('Bản đồ', `Đã chọn Map: ${selectedMap.name}`);
    });
  }

  if (btnAstroAddBot) {
    btnAstroAddBot.addEventListener('click', () => {
      if (astroOnlineState.mode === 'ONLINE') {
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.ws.send(JSON.stringify({ type: 'ASTRO_TOGGLE_BOT', slot: 1 }));
          showToastNotification('AI Bot', 'Đã thay đổi thiết lập AI Bot trong phòng online.');
        }
      } else if (astroOnlineState.mode === 'BOT') {
        showToastNotification('AI Bot', 'Đang ở chế độ Đấu Với Máy (1 vs AI Bot)!');
      } else {
        astroOnlineState.mode = 'BOT';
        spawnLocalPlayers();
        updateAstroHudUI();
        showToastNotification('AI Bot', 'Đã chuyển sang chế độ Đấu Với Máy (AI Bot)!');
      }
    });
  }

  if (btnAstroReset) {
    btnAstroReset.addEventListener('click', () => {
      if (astroOnlineState.mode === 'ONLINE') {
        if (gameState.ws && gameState.ws.readyState === WebSocket.OPEN) {
          gameState.ws.send(JSON.stringify({ type: 'ASTRO_START' }));
          showToastNotification('Astro Party', 'Đã bắt đầu / đặt lại ván đấu qua mạng.');
        }
      } else {
        startNewAstroMatch();
        showToastNotification('Astro Party', 'Đã đặt lại ván đấu mới.');
      }
    });
  }

  if (btnAstroBossKey) {
    btnAstroBossKey.addEventListener('click', toggleBossMode);
  }

  // View Mode & Zoom Controllers
  function updateAstroViewUI() {
    if (btnAstroViewMode) {
      if (astroViewMode === 'SPLIT') {
        btnAstroViewMode.textContent = '⊞ Chia Đôi: 50/50';
        btnAstroViewMode.classList.add('hud-mode-btn');
      } else if (astroViewMode === 'MINI') {
        btnAstroViewMode.textContent = '◱ Góc Nhỏ: Mini';
        btnAstroViewMode.classList.remove('hud-mode-btn');
      } else {
        btnAstroViewMode.textContent = '🗖 Toàn Màn Hình';
        btnAstroViewMode.classList.remove('hud-mode-btn');
      }
    }
    if (btnAstroZoom) {
      if (astroZoomScale === 'FIT') {
        btnAstroZoom.textContent = '🔍 Zoom: Fit';
      } else {
        btnAstroZoom.textContent = `🔍 Zoom: ${Math.round(astroZoomScale * 100)}%`;
      }
    }
    if (btnCaroSplit) {
      btnCaroSplit.textContent = (caroViewMode === 'SPLIT') ? '⊞ Chia Đôi: 50/50' : '🗖 Toàn Màn Hình';
      btnCaroSplit.classList.toggle('hud-mode-btn', caroViewMode === 'SPLIT');
    }
  }

  if (btnAstroViewMode) {
    btnAstroViewMode.addEventListener('click', () => {
      if (astroViewMode === 'SPLIT') {
        astroViewMode = 'FULL';
        showToastNotification('Chế độ', 'Đã chuyển sang: Toàn Màn Hình (Full View).');
      } else if (astroViewMode === 'FULL') {
        astroViewMode = 'MINI';
        showToastNotification('Chế độ', 'Đã chuyển sang: Cửa Sổ Góc Nhỏ (Mini PiP góc dưới phải).');
      } else {
        astroViewMode = 'SPLIT';
        showToastNotification('Chế độ', 'Đã chuyển sang: Chia Đôi (1 bên Code Java, 1 bên Game).');
      }
      updateAstroViewUI();
      renderEditorContent(activeFileName);
    });
  }

  const astroZoomPresets = ['FIT', 0.5, 0.7, 0.85, 1.0, 1.25];
  if (btnAstroZoom) {
    btnAstroZoom.addEventListener('click', () => {
      let nextIdx = 0;
      if (astroZoomScale === 'FIT') nextIdx = 1;
      else {
        const idx = astroZoomPresets.indexOf(astroZoomScale);
        nextIdx = (idx >= 0) ? (idx + 1) % astroZoomPresets.length : 0;
      }
      astroZoomScale = astroZoomPresets[nextIdx];
      updateAstroViewUI();
      resizeAstroCanvas();
      const label = astroZoomScale === 'FIT' ? 'Auto Fit (Tự động)' : `${Math.round(astroZoomScale * 100)}%`;
      showToastNotification('Thu phóng', `Kích thước màn hình: ${label}`);
    });
  }

  if (btnCaroSplit) {
    btnCaroSplit.addEventListener('click', () => {
      caroViewMode = (caroViewMode === 'SPLIT') ? 'FULL' : 'SPLIT';
      updateAstroViewUI();
      renderEditorContent(activeFileName);
      showToastNotification('Chế độ Caro', caroViewMode === 'SPLIT' ? 'Đã chia đôi màn hình với Code Java.' : 'Đã mở rộng toàn màn hình.');
    });
  }

  // Ctrl + Mouse Wheel for Smooth Zooming
  if (astroBoardView) {
    astroBoardView.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = astroBoardView.getBoundingClientRect();
        const fitScale = Math.min((rect.width - 24) / ASTRO_V_WIDTH, (rect.height - 30) / ASTRO_V_HEIGHT);
        let cur = (typeof astroZoomScale === 'number') ? astroZoomScale : fitScale;
        if (e.deltaY < 0) {
          cur = Math.min(2.0, cur + 0.08);
        } else {
          cur = Math.max(0.35, cur - 0.08);
        }
        astroZoomScale = Math.round(cur * 100) / 100;
        updateAstroViewUI();
        resizeAstroCanvas();
      }
    }, { passive: false });

    // Focus outside code textarea when clicking on game area
    astroBoardView.addEventListener('mousedown', () => {
      if (document.activeElement && document.activeElement === codeInputTextarea) {
        codeInputTextarea.blur();
      }
    });
  }

  // Draggable Splitter Logic
  let isDraggingSplitter = false;
  if (editorSplitter) {
    editorSplitter.addEventListener('mousedown', (e) => {
      isDraggingSplitter = true;
      editorSplitter.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingSplitter || !editorBodyArea) return;
      const bodyRect = editorBodyArea.getBoundingClientRect();
      if (bodyRect.width <= 0) return;
      const offsetX = e.clientX - bodyRect.left;
      let newRatio = offsetX / bodyRect.width;
      newRatio = Math.max(0.2, Math.min(0.8, newRatio));
      splitRatio = newRatio;
      codeEditorView.style.width = `${Math.floor(splitRatio * 100)}%`;
      resizeAstroCanvas();
      resizeCanvas();
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingSplitter) {
        isDraggingSplitter = false;
        editorSplitter.classList.remove('dragging');
        document.body.style.cursor = '';
      }
    });
  }

  // =========================================================
  // 10. BLEACH VS NARUTO 3.3 (BVN) LOGIC & NETPLAY
  // =========================================================
  const btnBvnLobbyToggle = document.getElementById('btnBvnLobbyToggle');
  const btnBvnSplit = document.getElementById('btnBvnSplit');
  const btnBvnFullscreen = document.getElementById('btnBvnFullscreen');
  const bvnHudRoomName = document.getElementById('bvnHudRoomName');
  const bvnHudRole = document.getElementById('bvnHudRole');
  const btnBvnSwitchRole = document.getElementById('btnBvnSwitchRole');
  const btnBvnToggleControls = document.getElementById('btnBvnToggleControls');
  const btnBvnKeyGuide = document.getElementById('btnBvnKeyGuide');
  const btnBvnReset = document.getElementById('btnBvnReset');
  const btnBvnLeaveRoom = document.getElementById('btnBvnLeaveRoom');
  const btnBvnBossKey = document.getElementById('btnBvnBossKey');
  const bvnGameWrapper = document.getElementById('bvnGameWrapper');
  const bvnGameIframe = document.getElementById('bvnGameIframe');
  const bvnPlayerContainer = bvnGameIframe;
  const bvnRemoteVideo = document.getElementById('bvnRemoteVideo');

  // BVN Lobby & Modals
  const bvnLobbyOverlay = document.getElementById('bvnLobbyOverlay');
  const btnOpenBvnCreateRoom = document.getElementById('btnOpenBvnCreateRoom');
  const btnBvnQuickPlay = document.getElementById('btnBvnQuickPlay');
  const btnBvnSoloMode = document.getElementById('btnBvnSoloMode');
  const btnRefreshBvnRooms = document.getElementById('btnRefreshBvnRooms');
  const btnCloseBvnLobby = document.getElementById('btnCloseBvnLobby');
  const inputBvnLobbySearch = document.getElementById('inputBvnLobbySearch');
  const bvnLobbyRoomCount = document.getElementById('bvnLobbyRoomCount');
  const bvnRoomsTableBody = document.getElementById('bvnRoomsTableBody');

  const modalBvnCreateRoomBackdrop = document.getElementById('modalBvnCreateRoomBackdrop');
  const btnCloseBvnCreateModal = document.getElementById('btnCloseBvnCreateModal');
  const createBvnRoomName = document.getElementById('createBvnRoomName');
  const createBvnRoomPassword = document.getElementById('createBvnRoomPassword');
  const btnCancelBvnCreateModal = document.getElementById('btnCancelBvnCreateModal');
  const btnConfirmBvnCreateRoom = document.getElementById('btnConfirmBvnCreateRoom');
  const createBvnRolePicker = document.getElementById('createBvnRolePicker');
  const createBvnControlsPicker = document.getElementById('createBvnControlsPicker');

  const modalBvnPasswordBackdrop = document.getElementById('modalBvnPasswordBackdrop');
  const btnCloseBvnPasswordModal = document.getElementById('btnCloseBvnPasswordModal');
  const btnCancelBvnPasswordModal = document.getElementById('btnCancelBvnPasswordModal');
  const btnConfirmJoinBvnPasswordRoom = document.getElementById('btnConfirmJoinBvnPasswordRoom');
  const inputBvnRoomPassword = document.getElementById('inputBvnRoomPassword');
  const bvnPasswordPromptRoomName = document.getElementById('bvnPasswordPromptRoomName');

  const modalBvnKeyGuideBackdrop = document.getElementById('modalBvnKeyGuideBackdrop');
  const btnCloseBvnKeyGuide = document.getElementById('btnCloseBvnKeyGuide');
  const btnAckBvnKeyGuide = document.getElementById('btnAckBvnKeyGuide');

  const bvnState = {
    mode: 'LOCAL', // 'LOCAL' (1 Máy) | 'ONLINE'
    role: 1,       // 1 (Máy 1 / P1) | 2 (Máy 2 / P2) | 'SPECTATOR'
    controls: 'LETTER', // 'LETTER' (WASD + JKLUIO) | 'NUMBER' (Arrows + 123456)
    roomId: null,
    roomName: 'Phòng 1 Máy (Offline)',
    isHost: true,
    isRuffleLoaded: false,
    peerConnection: null,
    dataChannel: null,
    pendingJoinRoomId: null
  };
  let bvnRufflePlayer = null;
  let bvnRoomsList = [];

  // Key Mappings for BVN
  const BVN_LETTER_KEYS = {
    'KeyW': 'UP',
    'KeyS': 'DOWN',
    'KeyA': 'LEFT',
    'KeyD': 'RIGHT',
    'KeyJ': 'ATTACK',
    'KeyK': 'JUMP',
    'KeyL': 'DASH',
    'KeyU': 'SKILL',
    'KeyI': 'ULTI',
    'KeyO': 'ASSIST'
  };

  const BVN_NUMBER_KEYS = {
    'ArrowUp': 'UP',
    'ArrowDown': 'DOWN',
    'ArrowLeft': 'LEFT',
    'ArrowRight': 'RIGHT',
    'Digit1': 'ATTACK', 'Numpad1': 'ATTACK',
    'Digit2': 'JUMP', 'Numpad2': 'JUMP',
    'Digit3': 'DASH', 'Numpad3': 'DASH',
    'Digit4': 'SKILL', 'Numpad4': 'SKILL',
    'Digit5': 'ULTI', 'Numpad5': 'ULTI',
    'Digit6': 'ASSIST', 'Numpad6': 'ASSIST'
  };

  const BVN_P1_KEYS = {
    'UP': { key: 'w', code: 'KeyW', keyCode: 87 },
    'DOWN': { key: 's', code: 'KeyS', keyCode: 83 },
    'LEFT': { key: 'a', code: 'KeyA', keyCode: 65 },
    'RIGHT': { key: 'd', code: 'KeyD', keyCode: 68 },
    'ATTACK': { key: 'j', code: 'KeyJ', keyCode: 74 },
    'JUMP': { key: 'k', code: 'KeyK', keyCode: 75 },
    'DASH': { key: 'l', code: 'KeyL', keyCode: 76 },
    'SKILL': { key: 'u', code: 'KeyU', keyCode: 85 },
    'ULTI': { key: 'i', code: 'KeyI', keyCode: 73 },
    'ASSIST': { key: 'o', code: 'KeyO', keyCode: 79 }
  };

  const BVN_P2_KEYS = {
    'UP': { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 },
    'DOWN': { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
    'LEFT': { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
    'RIGHT': { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
    'ATTACK': { key: '1', code: 'Numpad1', keyCode: 97 },
    'JUMP': { key: '2', code: 'Numpad2', keyCode: 98 },
    'DASH': { key: '3', code: 'Numpad3', keyCode: 99 },
    'SKILL': { key: '4', code: 'Numpad4', keyCode: 100 },
    'ULTI': { key: '5', code: 'Numpad5', keyCode: 101 },
    'ASSIST': { key: '6', code: 'Numpad6', keyCode: 102 }
  };

  function dispatchBvnEvent(targetInfo, isDown) {
    if (!targetInfo) return;
    const iframe = document.getElementById('bvnGameIframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({
          type: 'BVN_DISPATCH_KEY',
          key: targetInfo.key,
          code: targetInfo.code,
          keyCode: targetInfo.keyCode,
          isDown: isDown
        }, '*');
      } catch (_) {}
    }
  }

  function initBvnGameIfNeeded() {
    const iframe = document.getElementById('bvnGameIframe');
    if (!iframe) return;
    if (!iframe.src || iframe.src === 'about:blank' || iframe.getAttribute('data-loaded') !== '1') {
      iframe.setAttribute('data-loaded', '1');
      iframe.src = '/bleach-vs-naruto-3.3/index.html';
    }
  }

  const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  async function startBvnHostStream() {
    if (!bvnRufflePlayer) return;
    try {
      const canvas = bvnRufflePlayer.shadowRoot ? bvnRufflePlayer.shadowRoot.querySelector('canvas') : bvnRufflePlayer.querySelector('canvas');
      if (!canvas || typeof canvas.captureStream !== 'function') return;

      const stream = canvas.captureStream(60);
      const pc = new RTCPeerConnection(rtcConfig);
      bvnState.peerConnection = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      const dc = pc.createDataChannel('bvn-inputs');
      bvnState.dataChannel = dc;
      dc.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          handleBvnRemoteInput(msg);
        } catch (_) {}
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          sendSocketMessage({ type: 'BVN_SIGNAL', data: { candidate: e.candidate } });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendSocketMessage({ type: 'BVN_SIGNAL', data: { sdp: offer } });
    } catch (err) {
      console.warn('WebRTC Host Stream error:', err);
    }
  }

  async function startBvnGuestStream() {
    try {
      const pc = new RTCPeerConnection(rtcConfig);
      bvnState.peerConnection = pc;

      pc.ondatachannel = (e) => {
        bvnState.dataChannel = e.channel;
      };

      pc.ontrack = (e) => {
        if (bvnRemoteVideo) {
          bvnRemoteVideo.srcObject = e.streams[0];
          bvnRemoteVideo.style.display = 'block';
          bvnPlayerContainer.style.display = 'none';
          if (bvnLoadingOverlay) bvnLoadingOverlay.style.display = 'none';
        }
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          sendSocketMessage({ type: 'BVN_SIGNAL', data: { candidate: e.candidate } });
        }
      };

      // Fallback: If after 4s video doesn't play, load Ruffle locally
      setTimeout(() => {
        if (bvnRemoteVideo && bvnRemoteVideo.style.display === 'none') {
          initBvnGameIfNeeded();
          bvnPlayerContainer.style.display = 'flex';
        }
      }, 4000);
    } catch (err) {
      console.warn('WebRTC Guest Stream error:', err);
      initBvnGameIfNeeded();
      bvnPlayerContainer.style.display = 'flex';
    }
  }

  async function handleBvnSignal(data) {
    const pc = bvnState.peerConnection;
    if (!pc) return;
    try {
      if (data.sdp) {
        if (data.sdp.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          sendSocketMessage({ type: 'BVN_SIGNAL', data: { sdp: answer } });
        } else if (data.sdp.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        }
      } else if (data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } catch (err) {
      console.warn('handleBvnSignal error:', err);
    }
  }

  function handleBvnRemoteInput(msg) {
    if (!msg || !msg.action) return;
    const targetMap = (Number(msg.role) === 2) ? BVN_P2_KEYS : BVN_P1_KEYS;
    const targetInfo = targetMap[msg.action];
    if (targetInfo) {
      dispatchBvnEvent(targetInfo, msg.isDown);
    }
  }

  function handleBvnKey(e, isDown) {
    if (!e || !e.isTrusted) return; // Prevent any recursion!
    if (activeFileName !== 'SecurityConfiguration.java' || showSecurityCode) return;
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;

    // LOCAL MODE (1 Máy): Support both P1 (WASD) and P2 (Arrows/123456)
    if (bvnState.mode === 'LOCAL') {
      if (BVN_LETTER_KEYS[e.code]) {
        const action = BVN_LETTER_KEYS[e.code];
        dispatchBvnEvent(BVN_P1_KEYS[action], isDown);
        if (e.preventDefault) e.preventDefault();
        return;
      }
      if (BVN_NUMBER_KEYS[e.code]) {
        const action = BVN_NUMBER_KEYS[e.code];
        dispatchBvnEvent(BVN_P2_KEYS[action], isDown);
        if (e.preventDefault) e.preventDefault();
        return;
      }
      return;
    }

    // ONLINE MODE: Player uses their chosen control scheme
    let action = null;
    if (bvnState.controls === 'LETTER') {
      action = BVN_LETTER_KEYS[e.code];
    } else {
      action = BVN_NUMBER_KEYS[e.code];
    }

    if (action) {
      if (e.preventDefault) e.preventDefault();
      const payload = { role: bvnState.role, action, isDown };

      // Send via WebRTC DataChannel if open
      if (bvnState.dataChannel && bvnState.dataChannel.readyState === 'open') {
        try { bvnState.dataChannel.send(JSON.stringify(payload)); } catch (_) {}
      }
      // Send via WebSocket relay
      sendSocketMessage({ type: 'BVN_INPUT', role: bvnState.role, action, isDown });

      // If this machine is Host (running Ruffle locally)
      if (bvnState.isHost) {
        const targetMap = (Number(bvnState.role) === 2) ? BVN_P2_KEYS : BVN_P1_KEYS;
        dispatchBvnEvent(targetMap[action], isDown);
      }
    }
  }

  window.addEventListener('keydown', (e) => handleBvnKey(e, true));
  window.addEventListener('keyup', (e) => handleBvnKey(e, false));

  // Bridge keys & actions forwarded from within the iframe
  window.addEventListener('message', (e) => {
    if (!e.data) return;
    if (e.data.type === 'BVN_BOSS_KEY') {
      toggleBossMode();
      return;
    }
    if (e.data.type === 'BVN_TOGGLE_FULLSCREEN') {
      toggleBvnFullscreen();
      return;
    }
    if (e.data.type === 'BVN_IFRAME_KEY') {
      handleBvnKey({ code: e.data.code, key: e.data.key, isTrusted: true, preventDefault: () => {} }, e.data.isDown);
    }
  });

  function updateBvnViewUI() {
    if (btnBvnSplit) {
      btnBvnSplit.textContent = (bvnViewMode === 'SPLIT') ? '⊞ Chia Đôi: 50/50' : '🗖 Tràn Cửa Sổ IDE';
    }
    if (bvnHudRoomName) {
      bvnHudRoomName.textContent = `Phòng: ${bvnState.roomName || '1 Máy (Offline)'}`;
    }
    if (bvnHudRole) {
      if (bvnState.mode === 'LOCAL') {
        bvnHudRole.textContent = 'Bạn: Máy 1 & Máy 2 (1 Máy)';
        bvnHudRole.style.color = '#e5a440';
      } else if (bvnState.role === 1) {
        bvnHudRole.textContent = 'Bạn: Máy 1 (P1)';
        bvnHudRole.style.color = '#e5a440';
      } else if (bvnState.role === 2) {
        bvnHudRole.textContent = 'Bạn: Máy 2 (P2)';
        bvnHudRole.style.color = '#3574f0';
      } else {
        bvnHudRole.textContent = 'Bạn: Khán Giả';
        bvnHudRole.style.color = '#8c93a0';
      }
    }
    if (btnBvnToggleControls) {
      btnBvnToggleControls.textContent = (bvnState.controls === 'LETTER') ? '⌨ Phím: Chữ (WASD) ▾' : '🔢 Phím: Số (Mũi tên) ▾';
    }
    if (btnBvnLeaveRoom) {
      btnBvnLeaveRoom.style.display = (bvnState.mode === 'ONLINE') ? 'inline-block' : 'none';
    }
  }

  function handleSwitchToBvnFile() {
    initBvnGameIfNeeded();
    updateBvnViewUI();
  }

  function handleBvnServerMessage(data) {
    switch (data.type) {
      case 'BVN_ROOMS_LIST': {
        bvnRoomsList = data.rooms || [];
        renderBvnRoomsTable();
        break;
      }
      case 'BVN_WELCOME': {
        bvnState.mode = 'ONLINE';
        bvnState.role = data.slot;
        bvnState.roomId = data.roomId;
        bvnState.roomName = data.roomName || bvnState.roomName || `Phòng #${data.roomId}`;
        bvnState.isHost = !!data.isHost;
        if (data.controls) bvnState.controls = data.controls;

        if (bvnLobbyOverlay) bvnLobbyOverlay.style.display = 'none';
        if (modalBvnCreateRoomBackdrop) modalBvnCreateRoomBackdrop.style.display = 'none';
        if (modalBvnPasswordBackdrop) modalBvnPasswordBackdrop.style.display = 'none';

        initBvnGameIfNeeded();
        if (bvnPlayerContainer) bvnPlayerContainer.style.display = 'flex';
        if (bvnRemoteVideo) bvnRemoteVideo.style.display = 'none';

        updateBvnViewUI();
        const roleText = (bvnState.role === 1 ? 'Máy 1 (P1)' : (bvnState.role === 2 ? 'Máy 2 (P2)' : 'Khán Giả'));
        showToastNotification('Vào phòng thành công', `${bvnState.roomName} — Bạn: ${roleText}`);
        break;
      }
      case 'BVN_ROOM_UPDATE': {
        if (data.room && bvnState.roomId === data.room.id) {
          bvnState.roomName = data.room.name;
          const otherSlot = (bvnState.role === 1 ? 2 : 1);
          if (data.room.slots && data.room.slots[otherSlot]) {
            showToastNotification('Đối thủ đã vào', `${data.room.slotNames[otherSlot] || 'Đối thủ'} đã tham gia phòng đấu!`);
          }
          updateBvnViewUI();
        }
        break;
      }
      case 'BVN_REMOTE_INPUT': {
        handleBvnRemoteInput(data);
        break;
      }
      case 'BVN_SIGNAL': {
        handleBvnSignal(data.data);
        break;
      }
      case 'BVN_LEFT_ROOM': {
        bvnState.mode = 'LOCAL';
        bvnState.role = 1;
        bvnState.roomId = null;
        bvnState.roomName = 'Phòng 1 Máy (Offline)';
        bvnState.isHost = true;
        if (bvnState.peerConnection) {
          try { bvnState.peerConnection.close(); } catch (_) {}
          bvnState.peerConnection = null;
        }
        if (bvnPlayerContainer) bvnPlayerContainer.style.display = 'flex';
        if (bvnRemoteVideo) bvnRemoteVideo.style.display = 'none';
        initBvnGameIfNeeded();
        updateBvnViewUI();
        break;
      }
      case 'BVN_ERROR': {
        alert(data.message || 'Lỗi thao tác phòng!');
        break;
      }
    }
  }

  function renderBvnRoomsTable() {
    if (!bvnRoomsTableBody) return;
    const query = (inputBvnLobbySearch && inputBvnLobbySearch.value) ? inputBvnLobbySearch.value.trim().toLowerCase() : '';
    const filtered = bvnRoomsList.filter(r => {
      if (!query) return true;
      return (r.name && r.name.toLowerCase().includes(query)) || (r.id && r.id.toLowerCase().includes(query));
    });

    if (bvnLobbyRoomCount) {
      bvnLobbyRoomCount.textContent = `${filtered.length} phòng đang mở`;
    }

    if (filtered.length === 0) {
      bvnRoomsTableBody.innerHTML = `<tr><td colspan="8" class="table-empty">Không tìm thấy phòng phù hợp. Hãy nhấn <strong>Tạo Phòng Mới</strong>!</td></tr>`;
      return;
    }

    bvnRoomsTableBody.innerHTML = filtered.map(r => {
      const lockIcon = r.hasPassword ? '🔒 Có pass' : '🔓 Tự do';
      const p1Text = r.player1 ? `<span style="color:#e5a440;font-weight:600;">${escapeAstroHtml(r.player1)}</span> (${r.controls1 === 'NUMBER' ? 'Số' : 'Chữ'})` : '<span style="color:#6c707e;">Trống</span>';
      const p2Text = r.player2 ? `<span style="color:#3574f0;font-weight:600;">${escapeAstroHtml(r.player2)}</span> (${r.controls2 === 'NUMBER' ? 'Số' : 'Chữ'})` : '<span style="color:#6c707e;">Trống</span>';
      const stateBadge = (r.playerCount >= 2) ? '<span class="status-badge badge-full">Đang Đấu</span>' : '<span class="status-badge badge-waiting">Đang Đợi</span>';

      return `
        <tr>
          <td><strong>${escapeAstroHtml(r.name)}</strong></td>
          <td>${escapeAstroHtml(r.hostName)}</td>
          <td>${p1Text}</td>
          <td>${p2Text}</td>
          <td>${r.spectatorCount || 0}</td>
          <td>${lockIcon}</td>
          <td>${stateBadge}</td>
          <td>
            <button class="astro-btn astro-btn-xs astro-btn-primary btn-join-bvn-room" data-room-id="${r.id}" data-has-pass="${r.hasPassword ? '1' : '0'}">
              ${(r.playerCount >= 2) ? 'Xem' : 'Vào Đấu'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    bvnRoomsTableBody.querySelectorAll('.btn-join-bvn-room').forEach(btn => {
      btn.addEventListener('click', () => {
        const rId = btn.dataset.roomId;
        const hasPass = btn.dataset.hasPass === '1';
        if (hasPass) {
          bvnState.pendingJoinRoomId = rId;
          if (bvnPasswordPromptRoomName) bvnPasswordPromptRoomName.textContent = `Phòng #${rId} có mật khẩu bảo vệ.`;
          if (inputBvnRoomPassword) inputBvnRoomPassword.value = '';
          if (modalBvnPasswordBackdrop) modalBvnPasswordBackdrop.style.display = 'flex';
          if (inputBvnRoomPassword) inputBvnRoomPassword.focus();
        } else {
          sendSocketMessage({
            type: 'BVN_JOIN_ROOM',
            roomId: rId,
            password: '',
            preferredRole: bvnState.role,
            controls: bvnState.controls,
            playerName: gameState.playerName || 'DevPro'
          });
        }
      });
    });
  }

  // BVN Event Listeners
  if (btnBvnLobbyToggle) {
    btnBvnLobbyToggle.addEventListener('click', () => {
      if (bvnLobbyOverlay) {
        bvnLobbyOverlay.style.display = 'flex';
        sendSocketMessage({ type: 'BVN_LIST_ROOMS' });
      }
    });
  }

  if (btnCloseBvnLobby) {
    btnCloseBvnLobby.addEventListener('click', () => {
      if (bvnLobbyOverlay) bvnLobbyOverlay.style.display = 'none';
    });
  }

  if (btnRefreshBvnRooms) {
    btnRefreshBvnRooms.addEventListener('click', () => {
      sendSocketMessage({ type: 'BVN_LIST_ROOMS' });
    });
  }

  if (inputBvnLobbySearch) {
    inputBvnLobbySearch.addEventListener('input', renderBvnRoomsTable);
  }

  if (btnOpenBvnCreateRoom) {
    btnOpenBvnCreateRoom.addEventListener('click', () => {
      if (modalBvnCreateRoomBackdrop) modalBvnCreateRoomBackdrop.style.display = 'flex';
      if (createBvnRoomName) createBvnRoomName.value = `Phòng Võ Đài ${gameState.playerName || 'DevPro'}`;
    });
  }

  if (btnCloseBvnCreateModal || btnCancelBvnCreateModal) {
    const closeCreate = () => { if (modalBvnCreateRoomBackdrop) modalBvnCreateRoomBackdrop.style.display = 'none'; };
    if (btnCloseBvnCreateModal) btnCloseBvnCreateModal.addEventListener('click', closeCreate);
    if (btnCancelBvnCreateModal) btnCancelBvnCreateModal.addEventListener('click', closeCreate);
  }

  if (createBvnRolePicker) {
    createBvnRolePicker.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        createBvnRolePicker.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  if (createBvnControlsPicker) {
    createBvnControlsPicker.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        createBvnControlsPicker.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  if (btnConfirmBvnCreateRoom) {
    btnConfirmBvnCreateRoom.addEventListener('click', () => {
      const roomName = (createBvnRoomName && createBvnRoomName.value.trim()) || 'Phòng Bleach vs Naruto';
      const password = (createBvnRoomPassword && createBvnRoomPassword.value.trim()) || '';
      let chosenRole = 1;
      let chosenControls = 'LETTER';

      if (createBvnRolePicker) {
        const activeBtn = createBvnRolePicker.querySelector('.color-pick-btn.active');
        if (activeBtn) chosenRole = Number(activeBtn.dataset.role) || 1;
      }
      if (createBvnControlsPicker) {
        const activeBtn = createBvnControlsPicker.querySelector('.color-pick-btn.active');
        if (activeBtn) chosenControls = activeBtn.dataset.controls || 'LETTER';
      }

      bvnState.role = chosenRole;
      bvnState.controls = chosenControls;

      sendSocketMessage({
        type: 'BVN_CREATE_ROOM',
        roomName,
        password,
        preferredRole: chosenRole,
        controls: chosenControls,
        playerName: gameState.playerName || 'DevPro'
      });
    });
  }

  if (btnConfirmJoinBvnPasswordRoom) {
    btnConfirmJoinBvnPasswordRoom.addEventListener('click', () => {
      if (!bvnState.pendingJoinRoomId) return;
      const pwd = (inputBvnRoomPassword && inputBvnRoomPassword.value.trim()) || '';
      sendSocketMessage({
        type: 'BVN_JOIN_ROOM',
        roomId: bvnState.pendingJoinRoomId,
        password: pwd,
        preferredRole: bvnState.role,
        controls: bvnState.controls,
        playerName: gameState.playerName || 'DevPro'
      });
    });
  }

  if (btnCloseBvnPasswordModal || btnCancelBvnPasswordModal) {
    const closePass = () => { if (modalBvnPasswordBackdrop) modalBvnPasswordBackdrop.style.display = 'none'; };
    if (btnCloseBvnPasswordModal) btnCloseBvnPasswordModal.addEventListener('click', closePass);
    if (btnCancelBvnPasswordModal) btnCancelBvnPasswordModal.addEventListener('click', closePass);
  }

  if (btnBvnSoloMode) {
    btnBvnSoloMode.addEventListener('click', () => {
      if (bvnState.mode === 'ONLINE') {
        sendSocketMessage({ type: 'BVN_LEAVE_ROOM' });
      }
      bvnState.mode = 'LOCAL';
      bvnState.role = 1;
      bvnState.roomId = null;
      bvnState.roomName = 'Phòng 1 Máy (Offline)';
      if (bvnLobbyOverlay) bvnLobbyOverlay.style.display = 'none';
      if (bvnPlayerContainer) bvnPlayerContainer.style.display = 'flex';
      if (bvnRemoteVideo) bvnRemoteVideo.style.display = 'none';
      initBvnGameIfNeeded();
      updateBvnViewUI();
    });
  }

  if (btnBvnQuickPlay) {
    btnBvnQuickPlay.addEventListener('click', () => {
      const openRoom = bvnRoomsList.find(r => r.playerCount < 2 && !r.hasPassword);
      if (openRoom) {
        sendSocketMessage({
          type: 'BVN_JOIN_ROOM',
          roomId: openRoom.id,
          password: '',
          preferredRole: 2,
          controls: bvnState.controls,
          playerName: gameState.playerName || 'DevPro'
        });
      } else {
        sendSocketMessage({
          type: 'BVN_CREATE_ROOM',
          roomName: `Phòng Nhanh ${gameState.playerName || 'DevPro'}`,
          password: '',
          preferredRole: 1,
          controls: bvnState.controls,
          playerName: gameState.playerName || 'DevPro'
        });
      }
    });
  }

  if (btnBvnSwitchRole) {
    btnBvnSwitchRole.addEventListener('click', () => {
      if (bvnState.mode === 'LOCAL') {
        bvnState.role = (bvnState.role === 1 ? 2 : 1);
        updateBvnViewUI();
      } else {
        sendSocketMessage({ type: 'BVN_SWITCH_ROLE' });
      }
    });
  }

  if (btnBvnToggleControls) {
    btnBvnToggleControls.addEventListener('click', () => {
      bvnState.controls = (bvnState.controls === 'LETTER') ? 'NUMBER' : 'LETTER';
      updateBvnViewUI();
      if (bvnState.mode === 'ONLINE') {
        sendSocketMessage({ type: 'BVN_SET_CONTROLS', controls: bvnState.controls });
      }
    });
  }

  if (btnBvnKeyGuide) {
    btnBvnKeyGuide.addEventListener('click', () => {
      if (modalBvnKeyGuideBackdrop) modalBvnKeyGuideBackdrop.style.display = 'flex';
    });
  }

  if (btnCloseBvnKeyGuide || btnAckBvnKeyGuide) {
    const closeKeyGuide = () => { if (modalBvnKeyGuideBackdrop) modalBvnKeyGuideBackdrop.style.display = 'none'; };
    if (btnCloseBvnKeyGuide) btnCloseBvnKeyGuide.addEventListener('click', closeKeyGuide);
    if (btnAckBvnKeyGuide) btnAckBvnKeyGuide.addEventListener('click', closeKeyGuide);
  }

  if (btnBvnSplit) {
    btnBvnSplit.addEventListener('click', () => {
      bvnViewMode = (bvnViewMode === 'SPLIT') ? 'FULL' : 'SPLIT';
      renderEditorContent(activeFileName);
      updateBvnViewUI();
    });
  }

  // BVN Fullscreen Controller
  function toggleBvnFullscreen() {
    const container = document.getElementById('bvnBoardView') || document.getElementById('bvnGameWrapper');
    if (!container) return;

    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (!isFs) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(err => console.warn('BVN Fullscreen error:', err));
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.warn('BVN Exit fullscreen error:', err));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  function handleBvnFullscreenChange() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (btnBvnFullscreen) {
      if (isFs) {
        btnBvnFullscreen.textContent = '🗗 Thoát Toàn Màn Hình';
        btnBvnFullscreen.classList.add('active');
        btnBvnFullscreen.title = 'Thoát chế độ Toàn Màn Hình máy tính (nhấn lại hoặc ESC)';
      } else {
        btnBvnFullscreen.textContent = '⛶ Toàn Màn Hình';
        btnBvnFullscreen.classList.remove('active');
        btnBvnFullscreen.title = 'Bật chế độ Toàn Màn Hình máy tính (Fullscreen F11)';
      }
    }
    const bvnBoard = document.getElementById('bvnBoardView');
    if (bvnBoard) {
      if (isFs) {
        bvnBoard.classList.add('is-fullscreen');
      } else {
        bvnBoard.classList.remove('is-fullscreen');
      }
    }
  }

  document.addEventListener('fullscreenchange', handleBvnFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleBvnFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleBvnFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleBvnFullscreenChange);

  if (btnBvnFullscreen) {
    btnBvnFullscreen.addEventListener('click', toggleBvnFullscreen);
  }

  // F11 shortcut to toggle BVN Fullscreen when playing Bleach vs Naruto
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F11' && activeFileName === 'SecurityConfiguration.java' && !showSecurityCode) {
      e.preventDefault();
      toggleBvnFullscreen();
    }
  });

  // Double-click on HUD background to toggle Fullscreen
  const bvnHudBar = document.querySelector('.bvn-floating-hud');
  if (bvnHudBar) {
    bvnHudBar.addEventListener('dblclick', (e) => {
      if (e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT')) return;
      toggleBvnFullscreen();
    });
  }

  if (btnBvnReset) {
    btnBvnReset.addEventListener('click', () => {
      const iframe = document.getElementById('bvnGameIframe');
      if (iframe) {
        iframe.src = '/bleach-vs-naruto-3.3/index.html?t=' + Date.now();
      }
    });
  }

  if (btnBvnLeaveRoom) {
    btnBvnLeaveRoom.addEventListener('click', () => {
      sendSocketMessage({ type: 'BVN_LEAVE_ROOM' });
    });
  }

  if (btnBvnBossKey) {
    btnBvnBossKey.addEventListener('click', toggleBossMode);
  }

  // =========================================================
  // 11. INITIALIZATION
  // =========================================================
  function init() {
    renderTabs();
    switchToFile('RsInOutWardManagementServiceImpl.java');
    centerBoard();
    resizeAstroCanvas();
    fetchServerInfo();
    connectWebSocket();
    updateGameStatusUI();
    updateAstroHudUI();
    updateAstroViewUI();

    window.addEventListener('resize', () => {
      resizeCanvas();
      resizeAstroCanvas();
    });
  }

  window.addEventListener('DOMContentLoaded', init);

})();
