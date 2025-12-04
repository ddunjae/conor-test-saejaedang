#!/bin/bash

# SaeJaeDang Cafe - VM Diagnosis and Fix Script
# Run this script ON THE VM to diagnose and fix issues

set -e

echo "=================================================="
echo "SaeJaeDang Cafe - Diagnosis & Fix"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[1/8] Checking current directory...${NC}"
pwd
ls -la ~/conor-test-saejaedang/ 2>/dev/null || echo "conor-test-saejaedang folder not found"

echo ""
echo -e "${YELLOW}[2/8] Checking PM2 status...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 status
    echo ""
    echo "PM2 Logs (last 20 lines):"
    pm2 logs --lines 20 --nostream
else
    echo -e "${RED}PM2 is not installed${NC}"
fi

echo ""
echo -e "${YELLOW}[3/8] Checking nginx status...${NC}"
sudo systemctl status nginx --no-pager || echo "Nginx status check failed"

echo ""
echo -e "${YELLOW}[4/8] Checking nginx configuration...${NC}"
sudo nginx -t

echo ""
echo -e "${YELLOW}[5/8] Checking nginx error logs (last 30 lines)...${NC}"
sudo tail -n 30 /var/log/nginx/error.log

echo ""
echo -e "${YELLOW}[6/8] Checking ports 3000 and 5000...${NC}"
echo "Port 3000:"
sudo lsof -i :3000 || echo "Nothing running on port 3000"
echo ""
echo "Port 5000:"
sudo lsof -i :5000 || echo "Nothing running on port 5000"

echo ""
echo -e "${YELLOW}[7/8] Checking Node.js and npm versions...${NC}"
node --version || echo "Node.js not installed"
npm --version || echo "npm not installed"

echo ""
echo -e "${YELLOW}[8/8] Testing local services...${NC}"
echo "Testing backend (port 5000):"
curl -s http://localhost:5000/api/info | head -n 10 || echo "Backend not responding"
echo ""
echo "Testing frontend (port 3000):"
curl -s http://localhost:3000 | head -n 10 || echo "Frontend not responding"

echo ""
echo "=================================================="
echo "Diagnosis Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Check the PM2 status above"
echo "2. Check nginx error logs above"
echo "3. If services are not running, run: cd ~/conor-test-saejaedang && npm install && pm2 start"
