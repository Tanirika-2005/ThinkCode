@echo off
REM startup.bat - Script to start the Bus ETA SMS Service on Windows

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo Please edit .env with your actual API keys and configuration
)

REM Start the application
echo Starting Bus ETA SMS Service...
python app.py

REM Keep the window open
pause