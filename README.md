# 🎮 Caro Vô Hạn Ô (Connect LAN) – Giao diện IntelliJ IDEA (Chơi Trộm Mode)

Một phiên bản game Caro (Gomoku) vô hạn ô, hỗ trợ chơi qua **mạng LAN (Wi-Fi nội bộ)**, với giao diện được ngụy trang giống hệt **IntelliJ IDEA (Dark Darcula / New UI)** để có thể mở và chơi trực tiếp ngay trong IntelliJ hoặc trình duyệt web.

---

## ✨ Tính Năng Nổi Bật

1. **Bàn Cờ Vô Hạn Ô (Infinite Grid)**:
   - Tự do phóng to/thu nhỏ (lăn chuột giữa) từ 35% đến 300%.
   - Kéo chuột (giữ chuột trái hoặc phải) để di chuyển tự do khắp bàn cờ không giới hạn.
   - Nút **"⌖ Center"** và **"🎯 Last"** giúp tìm lại vị trí chiến trường nhanh chóng.
   - Tự động đánh dấu nước đi gần nhất và vẽ đường thẳng phát sáng màu xanh khi đạt 5 ô liên tiếp.

2. **Chế Độ 1 Máy (Tự Đánh Luân Phiên X rồi tới O)**:
   - **Lượt này đánh X, lượt sau đánh O**: Bấm chuột đặt quân X, lượt tiếp theo tự động chuyển sang O, rồi lại X...
   - Có thể tự chơi 1 mình luyện tập hoặc 2 người ngồi chung 1 máy tính chơi với nhau cực kỳ tiện lợi mà không cần chờ kết nối mạng.
   - Nút **"Mode"** cho phép chuyển đổi tức thì giữa chế độ 1 máy và chế độ kết nối qua mạng LAN/Ngrok.

3. **Ngụy Trang Siêu Kín (Giấu Trong Thư Mục `security`)**:
   - Trò chơi được giấu hoàn toàn trong file **`security/SecurityFilterChainService.java`** với biểu tượng class Java `©` thông thường.
   - Không hề có icon game `🎮`, không có từ "Caro" hay "Game" nào lộ trên màn hình!
   - Tiêu đề tab hiển thị: `SecurityFilterChainService.java`.
   - **Phím Thoát Hiểm Boss Key (`ESC` hoặc `F2`)**: Khi có người đi qua, nhấn `ESC` lập tức biến toàn bộ màn hình thành code Java Spring Security thật 100%, con trỏ nhấp nháy sẵn để gõ phím. Bấm `ESC` lần nữa để quay lại bàn cờ!
   - Khung chat và trạng thái mạng được ngụy trang thành log kiểm toán bảo mật (`SecurityMonitor`).

---

## 🚀 Cách Chạy & Bật Trong IntelliJ IDEA

### Cách 1: Chạy trực tiếp từ thư mục
1. Nhấp đúp vào file **`start.bat`** (hoặc mở Terminal gõ `npm start`).
2. Màn hình console sẽ hiện địa chỉ cổng 80 và link Ngrok:
   ```
   ============================================================
      🚀 INTELLIJ CARO SERVER ĐÃ SẴN SÀNG (PORT 80)!
   ============================================================
   💻 Localhost:         http://localhost
   🌐 Mạng LAN:          http://192.168.1.82
   🚀 Link Ngrok Online: https://swifter-chili-game.ngrok-free.dev
   ============================================================
   ```

### Cách 2: Bật trong Trình Duyệt Tích Hợp Của IntelliJ IDEA (Built-in Browser)
1. Mở thư mục dự án `choi-trom` trong IntelliJ IDEA.
2. Mở file `public/index.html`.
3. Nhấp chuột phải vào file `index.html` > chọn **Open In** > **Browser** > chọn **Built-in Preview** (hoặc Chrome/Edge).
4. Màn hình game sẽ mở ngay trong 1 tab hoặc split window của IntelliJ!

---

## 👥 Hướng Dẫn Chơi 2 Người

### Cách 1: Chơi Qua Link Ngrok Online (Khuyên dùng - Ai cũng vào được)
1. Bật server: Nhấp đúp **`start.bat`**.
2. Bật tunnel: Nhấp đúp **`chay-ngrok.bat`** (chạy lệnh `ngrok http 80 --url https://swifter-chili-game.ngrok-free.dev`).
3. Gửi link cho bạn bè:
   👉 **`https://swifter-chili-game.ngrok-free.dev`**
4. Bạn bè ở bất kỳ đâu chỉ cần click vào link là vào phòng chơi ngay!

### Cách 2: Chơi Cùng Mạng LAN (Cùng Wi-Fi)
1. Chạy `start.bat`, gửi link LAN: `http://192.168.1.82`.
2. Nếu máy khác không vào được: Chuột phải vào file **`mo-firewall.bat`** > chọn **Run as administrator** để mở cổng qua Windows Firewall.

---

## ⌨️ Phím Tắt
- **ESC** hoặc **F2**: Bật / Tắt chế độ ngụy trang Code Java (Boss Key).
- **Lăn chuột (Scroll Wheel)**: Phóng to / Thu nhỏ bàn cờ.
- **Giữ & Kéo chuột (Drag)**: Di chuyển xem toàn bộ bàn cờ vô hạn.
- **Nhấp chuột trái**: Đặt quân cờ (nếu di chuyển chuột > 5px sẽ là kéo bàn cờ, không bị ấn nhầm).

