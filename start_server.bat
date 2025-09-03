@echo off
echo 🚀 Starting Attendance Tracker Local Server...
echo.
echo This will serve your HTML file over HTTP to avoid cookie warnings
echo and provide better Firebase compatibility.
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo 💡 Please install Python from https://python.org
    echo    Make sure to check "Add to PATH" during installation
    pause
    exit /b 1
)

echo ✅ Python found, starting server...
echo.

REM Start the Python server
python start_server.py

pause
