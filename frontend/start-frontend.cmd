@echo off
echo ========================================
echo   STARTING FRONTEND SERVER
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting React app...
echo Frontend will open at: http://localhost:3001
echo.

REM Force HOST to localhost to avoid hostname resolution issues
set HOST=localhost
set PORT=3001

call npm start

pause

