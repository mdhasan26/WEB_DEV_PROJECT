@echo off
title WebDev Local Server

echo ===================================
echo Starting your WebDev Project...
echo ===================================

:: Install dependencies if they are missing
if not exist "node_modules\" (
    echo Installing required packages...
    call npm install
)

:: Wait 2 seconds, then open the browser automatically
timeout /t 2 /nobreak > NUL
start http://localhost:5173/

:: Start the Vite development server
echo Launching server...
call npm run dev

pause