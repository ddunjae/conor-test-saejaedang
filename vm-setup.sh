#!/bin/bash

# VM Setup Script
# Run this script ON THE VM after extracting the files

set -e

echo "🚀 SaeJaeDang Cafe - VM Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js installed: $(node --version)"
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    exit 1
else
    echo "✅ npm installed: $(npm --version)"
fi

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
    echo "✅ PM2 installed"
else
    echo "✅ PM2 already installed"
fi

# Navigate to cafe directory
cd ~/cafe

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Build frontend for production
echo ""
echo "🔨 Building frontend for production..."
npm run build
echo "✅ Frontend built"

# Stop existing PM2 processes if any
echo ""
echo "🛑 Stopping existing PM2 processes..."
pm2 stop cafe-backend 2>/dev/null || true
pm2 stop cafe-frontend 2>/dev/null || true
pm2 delete cafe-backend 2>/dev/null || true
pm2 delete cafe-frontend 2>/dev/null || true

# Start backend with PM2
echo ""
echo "🚀 Starting backend server..."
cd ~/cafe/backend
pm2 start npm --name "cafe-backend" -- run dev

# Start frontend with PM2 (serve build folder)
echo ""
echo "🚀 Starting frontend server..."
cd ~/cafe/frontend
pm2 start npm --name "cafe-frontend" -- start

# Save PM2 configuration
echo ""
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
echo ""
echo "⚙️  Setting up PM2 to start on boot..."
pm2 startup systemd -u $USER --hp $HOME | grep -v "^PM2" | sudo bash || true

# Show PM2 status
echo ""
echo "📊 PM2 Process Status:"
pm2 status

# Configure firewall
echo ""
echo "🔥 Configuring firewall..."
sudo ufw allow 3000/tcp comment 'SaeJaeDang Frontend'
sudo ufw allow 5000/tcp comment 'SaeJaeDang Backend'
echo "✅ Firewall configured"

# Get VM IP
VM_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "✨ Deployment Complete!"
echo "======================================"
echo ""
echo "🌐 Your cafe website is now running at:"
echo "   Frontend: http://$VM_IP:3000"
echo "   Backend API: http://$VM_IP:5000"
echo ""
echo "📋 Useful PM2 commands:"
echo "   pm2 status          - View process status"
echo "   pm2 logs            - View all logs"
echo "   pm2 logs cafe-backend   - View backend logs"
echo "   pm2 logs cafe-frontend  - View frontend logs"
echo "   pm2 restart all     - Restart all processes"
echo "   pm2 stop all        - Stop all processes"
echo ""
