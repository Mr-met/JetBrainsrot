@echo off
:: Batch script to allow Port 3000 on Windows Firewall
title Mo Port 3000 Windows Firewall
cls
echo ========================================================
echo   MO CONG 3000 TREN WINDOWS FIREWALL (CHO MANG LAN)
echo ========================================================
echo.
echo Luu y: Can chay file nay voi quyen "Run as administrator"
echo.

net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Dang chay voi quyen Administrator...
    echo Dang them luat cho phep vao Firewall...
    netsh advfirewall firewall add rule name="Caro_LAN_80" dir=in action=allow protocol=TCP localport=80 profile=any
    netsh advfirewall firewall add rule name="Caro_LAN_3000" dir=in action=allow protocol=TCP localport=3000 profile=any
    echo.
    echo ========================================================
    echo   THANH CONG! Windows Firewall da mo cong 80 va 3000.
    echo   Cac may khac trong mang LAN bay gio co the vao duoc!
    echo ========================================================
) else (
    echo [CANH BAO] Ban chua chay bang Administrator!
    echo Vui long:
    echo 1. Chuot phai vao file "mo-firewall.bat"
    echo 2. Chon "Run as administrator"
    echo.
)

pause
