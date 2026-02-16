@echo off
REM Match Matrix - Automated Setup Script (Windows)
REM Run with: setup.bat

setlocal enabledelayedexpansion

echo ========================================
echo  Match Matrix - Automated Setup
echo ========================================
echo.

REM Check Python
echo [*] Checking prerequisites...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Python is not installed
    echo Please install Python 3.10+ from python.org
    pause
    exit /b 1
)
echo [OK] Python found

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed
    echo Please install Node.js 18+ from nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js found

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm is not installed
    pause
    exit /b 1
)
echo [OK] npm found

echo.
echo ========================================
echo  Setting up Backend (Django)
echo ========================================

REM Navigate to backend
cd backend

REM Create virtual environment
echo [*] Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo [*] Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo [*] Upgrading pip...
python -m pip install --upgrade pip --quiet

REM Install dependencies
echo [*] Installing Python dependencies (1-2 minutes)...
pip install -r ..\requirements.txt --quiet

echo [OK] Python dependencies installed

REM Check for .env file
if not exist .env (
    echo.
    echo [!] No .env file found
    echo Creating .env from template...
    copy ..\env.example .env
    echo.
    echo [!] IMPORTANT: Edit backend\.env and add your Supabase DATABASE_URL
    echo    Example: DATABASE_URL=postgresql://postgres:password@host:5432/postgres
    echo.
    pause
)

REM Run migrations
echo [*] Running database migrations...
python manage.py makemigrations
python manage.py migrate

echo [OK] Backend setup complete!

REM Go back to root
cd ..

echo.
echo ========================================
echo  Setting up Frontend (React + Vite)
echo ========================================

REM Navigate to frontend
cd frontend

REM Install dependencies
echo [*] Installing Node dependencies (1-2 minutes)...
call npm install

echo [OK] Frontend setup complete!

REM Go back to root
cd ..

echo.
echo ========================================
echo [OK] Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo For more help, see:
echo   - README.md (main documentation)
echo   - QUICKSTART.md (quick setup guide)
echo   - VSCODE_SETUP.md (VS Code configuration)
echo   - TESTING_GUIDE.md (testing checklist)
echo.
echo Happy Coding!
echo.
pause
