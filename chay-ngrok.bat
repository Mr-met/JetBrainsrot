@echo off
title Ngrok Caro LAN
cls
echo ==============================================================
echo   CHAY NGROK TUNNEL CHO CARO GAME
echo ==============================================================
echo.
echo Domain: https://swifter-chili-game.ngrok-free.dev
echo Local Port: 80
echo.

ngrok http 80 --url https://swifter-chili-game.ngrok-free.dev

pause
