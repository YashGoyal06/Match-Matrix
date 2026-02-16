#!/bin/bash

# Match Matrix - Automated Setup Script (Unix/macOS/Linux)
# Run with: bash setup.sh

set -e  # Exit on error

echo "🎯 Match Matrix - Automated Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    echo "Please install Python 3.10 or higher from python.org"
    exit 1
fi
echo -e "${GREEN}✅ Python $(python3 --version) found${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from nodejs.org"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version) found${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version) found${NC}"

echo ""
echo "🔷 Setting up Backend (Django)..."
echo "=================================="

# Navigate to backend
cd backend

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip --quiet

# Install dependencies
echo "📦 Installing Python dependencies (this may take 1-2 minutes)..."
pip install -r ../requirements.txt --quiet

echo -e "${GREEN}✅ Python dependencies installed${NC}"

# Check for .env file
if [ ! -f .env ]; then
    echo ""
    echo -e "${YELLOW}⚠️  No .env file found${NC}"
    echo "Creating .env from template..."
    cp ../.env.example .env
    echo ""
    echo -e "${YELLOW}🔑 IMPORTANT: Edit backend/.env and add your Supabase DATABASE_URL${NC}"
    echo "   Example: DATABASE_URL=postgresql://postgres:password@host:5432/postgres"
    echo ""
    read -p "Press Enter after you've updated the .env file..."
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

echo -e "${GREEN}✅ Backend setup complete!${NC}"

# Go back to root
cd ..

echo ""
echo "🔶 Setting up Frontend (React + Vite)..."
echo "========================================"

# Navigate to frontend
cd frontend

# Install dependencies
echo "📦 Installing Node dependencies (this may take 1-2 minutes)..."
npm install

echo -e "${GREEN}✅ Frontend setup complete!${NC}"

# Go back to root
cd ..

echo ""
echo "=================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=================================="
echo ""
echo "🚀 To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "📚 For more help, see:"
echo "  - README.md (main documentation)"
echo "  - QUICKSTART.md (quick setup guide)"
echo "  - VSCODE_SETUP.md (VS Code configuration)"
echo "  - TESTING_GUIDE.md (testing checklist)"
echo ""
echo -e "${BLUE}Happy Coding! 🎯✨${NC}"
