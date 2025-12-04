#!/bin/bash

# SaeJaeDang Cafe - Deployment Script
# This script deploys the cafe application to the Ubuntu VM

VM_HOST="4.218.11.239"
VM_USER="conortest"
VM_PASS="qwert12345!!"
REMOTE_DIR="/home/conortest/cafe"

echo "🚀 Starting deployment to Ubuntu VM at $VM_HOST"

# Create a deployment package
echo "📦 Creating deployment package..."
cd /home/conorhan/cafe

# Create a tarball excluding node_modules
tar -czf cafe-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='.git' \
  backend/ frontend/ package.json README.md

echo "✅ Package created: cafe-deploy.tar.gz"

echo ""
echo "📋 Next steps to deploy manually:"
echo ""
echo "1. Transfer the package to VM:"
echo "   scp cafe-deploy.tar.gz $VM_USER@$VM_HOST:~/"
echo ""
echo "2. SSH into the VM:"
echo "   ssh $VM_USER@$VM_HOST"
echo ""
echo "3. On the VM, extract and setup:"
echo "   tar -xzf cafe-deploy.tar.gz"
echo "   cd cafe"
echo ""
echo "4. Install Node.js if not installed:"
echo "   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
echo "   sudo apt-get install -y nodejs"
echo ""
echo "5. Install dependencies:"
echo "   cd backend && npm install"
echo "   cd ../frontend && npm install"
echo ""
echo "6. Build frontend for production:"
echo "   cd frontend && npm run build"
echo ""
echo "7. Install PM2 for process management:"
echo "   sudo npm install -g pm2"
echo ""
echo "8. Start backend with PM2:"
echo "   cd backend"
echo "   pm2 start npm --name 'cafe-backend' -- run dev"
echo ""
echo "9. Serve frontend with PM2:"
echo "   cd ../frontend"
echo "   pm2 start npm --name 'cafe-frontend' -- start"
echo ""
echo "10. Configure PM2 to start on boot:"
echo "    pm2 startup"
echo "    pm2 save"
echo ""
echo "11. Configure firewall:"
echo "    sudo ufw allow 3000"
echo "    sudo ufw allow 5000"
echo ""
echo "🌐 Access your site at:"
echo "   Frontend: http://$VM_HOST:3000"
echo "   Backend API: http://$VM_HOST:5000"
