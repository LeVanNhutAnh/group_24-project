@echo off
echo ========================================
echo   STARTING BACKEND SERVER
echo ========================================
echo.

cd /d "%~dp0"

if not exist ".env" (
    echo ERROR: File .env khong ton tai!
    echo Vui long tao file .env theo huong dan trong ENV_SETUP.txt
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server...
echo Backend running at: http://localhost:3000
echo.
call npm run dev

pause

