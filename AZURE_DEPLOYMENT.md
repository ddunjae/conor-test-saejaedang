# Azure VM Deployment Guide for SaeJaeDang Cafe

## ✅ Pre-Deployment Verification

**Backend Status**: ✅ Running on port 5000
**Frontend Status**: Ready for build
**Database**: MongoDB integration ready
**All APIs Tested**: ✅ Working

---

## Option 1: Quick Deploy to Existing Azure VM

### Step 1: Connect to Your Azure VM

```bash
# If you have an existing Azure VM
ssh username@your-vm-ip

# Or use Azure CLI
az vm show --resource-group your-rg --name your-vm-name
```

### Step 2: Install Dependencies on VM

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be 18.x or higher
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Install MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Install Nginx
sudo apt-get install -y nginx
```

### Step 3: Upload Project to VM

```bash
# From your local machine
cd /home/conorhan/cafe

# Create a tarball (excluding node_modules)
tar --exclude='node_modules' --exclude='.git' --exclude='dist' --exclude='build' \
    -czf saejaedang-cafe.tar.gz .

# Upload to VM (replace with your VM details)
scp saejaedang-cafe.tar.gz username@your-vm-ip:/home/username/

# On the VM
cd /home/username
tar -xzf saejaedang-cafe.tar.gz -C saejaedang-cafe
cd saejaedang-cafe
```

### Step 4: Setup Backend on VM

```bash
cd /home/username/saejaedang-cafe/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env
# Update these values:
# NODE_ENV=production
# MONGODB_URI=mongodb://localhost:27017/saejaedang
# FRONTEND_URL=http://your-vm-ip  (or your domain)

# Build TypeScript
npm run build

# Test the build
node dist/server.js
# Press Ctrl+C after confirming it works

# Start with PM2
pm2 start dist/server.js --name saejaedang-api
pm2 save
pm2 startup
# Run the command PM2 outputs

# Check status
pm2 status
pm2 logs saejaedang-api
```

### Step 5: Setup Frontend on VM

```bash
cd /home/username/saejaedang-cafe/frontend

# Install dependencies
npm install

# Update API URL for production
# Edit src/components/Gallery.tsx, Order.tsx
# Replace 'http://localhost:5000' with 'http://your-vm-ip:5000'
# Or use environment variable

# Build production bundle
npm run build

# The build folder now contains static files
ls -la build/
```

### Step 6: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/saejaedang

# Add this configuration:
```

```nginx
server {
    listen 80;
    server_name your-vm-ip-or-domain;

    # Frontend - serve React build
    root /home/username/saejaedang-cafe/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API - proxy to Node.js
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/saejaedang /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl status nginx
```

### Step 7: Configure Azure Firewall

```bash
# Using Azure CLI
az vm open-port --resource-group your-rg --name your-vm-name --port 80
az vm open-port --resource-group your-rg --name your-vm-name --port 443

# Or in Azure Portal:
# 1. Go to your VM
# 2. Click "Networking"
# 3. Add inbound port rules for 80 (HTTP) and 443 (HTTPS)
```

### Step 8: Test Deployment

```bash
# From your local machine or browser
curl http://your-vm-ip/
# Should return the React app HTML

curl http://your-vm-ip/api/items
# Should return JSON with products

# Open in browser
http://your-vm-ip
# Should see the full SaeJaeDang cafe website
```

---

## Option 2: Deploy New Azure VM from Scratch

### Step 1: Create Azure VM

```bash
# Login to Azure
az login

# Create resource group
az group create --name saejaedang-rg --location eastus

# Create VM
az vm create \
  --resource-group saejaedang-rg \
  --name saejaedang-vm \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Get the public IP
az vm show --resource-group saejaedang-rg --name saejaedang-vm --show-details \
  --query publicIps -o tsv

# Open ports
az vm open-port --resource-group saejaedang-rg --name saejaedang-vm --port 80 --priority 1000
az vm open-port --resource-group saejaedang-rg --name saejaedang-vm --port 443 --priority 1001
```

### Step 2: Follow Steps from Option 1

After creating the VM, follow Steps 1-8 from Option 1 above.

---

## Option 3: Deploy with Docker (Advanced)

### Backend Dockerfile

```dockerfile
# Save as backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

### Frontend Dockerfile

```dockerfile
# Save as frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
# Save as docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: saejaedang-mongodb
    restart: always
    volumes:
      - mongodb_data:/data/db
    networks:
      - saejaedang-network

  backend:
    build: ./backend
    container_name: saejaedang-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/saejaedang
      - PORT=5000
    depends_on:
      - mongodb
    networks:
      - saejaedang-network

  frontend:
    build: ./frontend
    container_name: saejaedang-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - saejaedang-network

volumes:
  mongodb_data:

networks:
  saejaedang-network:
    driver: bridge
```

### Deploy with Docker

```bash
# On the VM
cd /home/username/saejaedang-cafe

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Build and start
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f

# Access the site
curl http://your-vm-ip
```

---

## SSL/HTTPS Setup with Let's Encrypt

### Install Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

### Get SSL Certificate

```bash
# Make sure you have a domain pointing to your VM IP
# Then run:
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts
# Certbot will automatically configure Nginx for HTTPS

# Test auto-renewal
sudo certbot renew --dry-run
```

### Update Backend .env

```bash
# Edit backend/.env
FRONTEND_URL=https://yourdomain.com
```

### Restart Services

```bash
pm2 restart saejaedang-api
sudo systemctl restart nginx
```

---

## Monitoring & Maintenance

### PM2 Monitoring

```bash
# View logs
pm2 logs saejaedang-api

# Monitor in real-time
pm2 monit

# Restart after code updates
pm2 restart saejaedang-api

# View status
pm2 status
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### MongoDB Logs

```bash
# MongoDB logs
sudo tail -f /var/log/mongodb/mongodb.log

# MongoDB shell
mongo
> use saejaedang
> db.orders.find().pretty()
> db.contacts.find().pretty()
```

### System Resources

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
top

# Check running processes
pm2 status
sudo systemctl status nginx
sudo systemctl status mongodb
```

---

## Backup Strategy

### Database Backup

```bash
# Create backup script
nano /home/username/backup-mongo.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/username/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

mongodump --db saejaedang --out $BACKUP_DIR/mongo_$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -name "mongo_*" -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR/mongo_$DATE"
```

```bash
# Make executable
chmod +x /home/username/backup-mongo.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /home/username/backup-mongo.sh
```

### Application Backup

```bash
# Backup entire application
tar -czf /home/username/backups/app_$(date +%Y%m%d).tar.gz \
  /home/username/saejaedang-cafe \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='build'
```

---

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs saejaedang-api --lines 100

# Check if port is available
sudo netstat -tulpn | grep 5000

# Manually test
cd /home/username/saejaedang-cafe/backend
node dist/server.js
```

### Frontend Not Loading

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check if files exist
ls -la /home/username/saejaedang-cafe/frontend/build/
```

### MongoDB Issues

```bash
# Check MongoDB status
sudo systemctl status mongodb

# Restart MongoDB
sudo systemctl restart mongodb

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongodb.log

# Access MongoDB shell
mongo
> show dbs
> use saejaedang
> show collections
```

### CORS Errors

```bash
# Update backend .env
FRONTEND_URL=http://your-actual-domain

# Restart backend
pm2 restart saejaedang-api
```

---

## Performance Optimization

### Enable Nginx Caching

```nginx
# Add to /etc/nginx/sites-available/saejaedang

# Static file caching
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# API response caching (optional)
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;

location /api/ {
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    # ... rest of proxy configuration
}
```

### Enable Gzip Compression

```nginx
# Add to /etc/nginx/nginx.conf

gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_comp_level 6;
gzip_min_length 1000;
```

### PM2 Cluster Mode

```bash
# Use multiple CPU cores
pm2 delete saejaedang-api
pm2 start dist/server.js --name saejaedang-api -i max
pm2 save
```

---

## Quick Deployment Script

Create this script to automate deployment:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Deploying SaeJaeDang Cafe..."

# Pull latest changes (if using git)
# git pull origin main

# Backend
echo "📦 Building backend..."
cd /home/username/saejaedang-cafe/backend
npm install --production
npm run build

# Frontend
echo "🎨 Building frontend..."
cd /home/username/saejaedang-cafe/frontend
npm install
npm run build

# Restart services
echo "♻️  Restarting services..."
pm2 restart saejaedang-api
sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Visit: http://your-vm-ip"
```

---

## Cost Estimation

### Azure VM Pricing (East US)

- **Standard_B1s** (1 vCPU, 1GB RAM): ~$10/month - Minimum for testing
- **Standard_B2s** (2 vCPU, 4GB RAM): ~$30/month - **Recommended for production**
- **Standard_B2ms** (2 vCPU, 8GB RAM): ~$60/month - For higher traffic

### Additional Costs

- Public IP: ~$3/month
- Managed Disk (30GB): Included
- Bandwidth: First 5GB free, then ~$0.087/GB

**Total Estimated Cost**: $35-65/month for production-ready setup

---

## Security Checklist

- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] SSH key authentication enabled (disable password auth)
- [ ] MongoDB not exposed publicly
- [ ] Environment variables secured (.env not in git)
- [ ] SSL/HTTPS enabled
- [ ] Regular security updates scheduled
- [ ] Backups configured
- [ ] PM2 running as non-root user
- [ ] Nginx security headers configured

---

## Next Steps After Deployment

1. **Custom Domain**: Point your domain to the VM IP
2. **SSL Certificate**: Enable HTTPS with Let's Encrypt
3. **MongoDB Atlas**: Consider using managed MongoDB for better reliability
4. **CDN**: Add Azure CDN for static assets
5. **Monitoring**: Set up Azure Monitor or Application Insights
6. **Scaling**: Consider Azure Load Balancer for multiple VMs
7. **CI/CD**: Set up GitHub Actions for automatic deployment

---

**Deployment Date**: December 4, 2025
**Version**: 2.0.0
**Status**: Ready for Deployment ✅
