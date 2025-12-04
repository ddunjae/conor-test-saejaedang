# Deploy New Saejaedang Design to Server 4.230.0.0

## Overview
This guide helps you deploy the new Korean traditional design for the Saejaedang website to your Azure VM.

**Target Server**: 4.230.0.0
**Design**: Korean traditional aesthetics with Tailwind CSS
**Stack**: React + TypeScript + Tailwind

---

## Prerequisites

You need SSH access to the server. Make sure you have:
- Server IP: 4.230.0.0
- SSH username and password/key
- Backend already running (if applicable)

---

## Option 1: Quick Deploy with Package (Recommended)

### Step 1: Create Deployment Package

Run from your local machine:

```bash
cd /home/conorhan/cafe
tar --exclude='frontend-new/node_modules' \
    --exclude='frontend-new/build' \
    --exclude='frontend-new/.git' \
    -czf saejaedang-new-frontend.tar.gz \
    frontend-new/ backend/
```

### Step 2: Transfer to Server

Replace `USERNAME` with your SSH username:

```bash
scp saejaedang-new-frontend.tar.gz USERNAME@4.230.0.0:~/
```

### Step 3: SSH to Server

```bash
ssh USERNAME@4.230.0.0
```

### Step 4: Extract and Setup

On the server:

```bash
# Create directory
mkdir -p ~/saejaedang
cd ~/saejaedang

# Extract files
tar -xzf ~/saejaedang-new-frontend.tar.gz

# Install frontend dependencies
cd ~/saejaedang/frontend-new
npm install

# Build for production
npm run build

# Stop old frontend if running
pm2 stop saejaedang-frontend 2>/dev/null || true
pm2 delete saejaedang-frontend 2>/dev/null || true

# Serve with PM2 using serve package
npm install -g serve
pm2 start "serve -s build -l 3000" --name saejaedang-frontend

# Save PM2 configuration
pm2 save
```

### Step 5: Setup Nginx (Optional, for port 80)

If you want to serve on port 80:

```bash
sudo apt-get update
sudo apt-get install -y nginx

# Create nginx configuration
sudo tee /etc/nginx/sites-available/saejaedang <<EOF
server {
    listen 80;
    server_name 4.230.0.0;

    root /home/USERNAME/saejaedang/frontend-new/build;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/saejaedang /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Configure Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
sudo ufw status
```

---

## Option 2: Manual Local Build + Deploy

### Step 1: Build Locally

From `/home/conorhan/cafe/frontend-new`:

```bash
cd /home/conorhan/cafe/frontend-new
npm install
npm run build
```

### Step 2: Transfer Build

```bash
scp -r build USERNAME@4.230.0.0:~/saejaedang-frontend-build/
```

### Step 3: Setup on Server

SSH to server and:

```bash
# Install serve
npm install -g serve

# Stop old process
pm2 stop saejaedang-frontend 2>/dev/null || true
pm2 delete saejaedang-frontend 2>/dev/null || true

# Start new frontend
cd ~/saejaedang-frontend-build
pm2 start "serve -s . -l 3000" --name saejaedang-frontend
pm2 save
```

---

## Verification

### Check PM2 Status
```bash
pm2 status
pm2 logs saejaedang-frontend
```

### Test Access
- **Direct**: http://4.230.0.0:3000
- **With Nginx**: http://4.230.0.0

### Test Routes
- Public page: http://4.230.0.0/
- Admin login: http://4.230.0.0/admin/login
  - Username: `admin`
  - Password: `admin123`

---

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

### PM2 Not Starting
```bash
# Check logs
pm2 logs saejaedang-frontend --lines 50

# Restart
pm2 restart saejaedang-frontend
```

### Nginx Issues
```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

### Permission Issues
```bash
# Fix build directory permissions
chmod -R 755 ~/saejaedang/frontend-new/build
```

---

## Features Deployed

✅ **Public Website**
- Hero section with Korean traditional design
- About section with brand story
- Product catalog with filtering
- Responsive mobile design
- Korean ornament decorations

✅ **Admin Dashboard**
- Secure login page
- Order management table
- Order detail modal
- Status updates
- Print-friendly layouts

✅ **Design System**
- Korean traditional color palette
- Custom fonts (Gowun Batang, Noto Serif KR)
- Soft curves and organic shapes
- Paper textures and gradients
- SVG ornaments (cloud, lotus patterns)

---

## Backend Integration

The frontend expects a backend API at `/api/*`. Make sure your backend is running on port 5000 with these endpoints:

- `GET /api/products` - Fetch all products
- `POST /api/orders` - Create new order
- `GET /api/orders` - Fetch all orders (admin)
- `PATCH /api/orders/:id` - Update order status (admin)
- `POST /api/admin/login` - Admin authentication

---

## Next Steps

1. **Update Mock Data**: Replace mock data in `src/data/mockData.ts` with real API calls
2. **Authentication**: Implement proper JWT-based authentication
3. **Cart System**: Add shopping cart state management
4. **Payment Integration**: Integrate with Korean payment gateways (Toss, Inicis)
5. **Image Upload**: Add product image management
6. **SSL Certificate**: Add HTTPS with Let's Encrypt

---

## Rollback

If you need to rollback to the old version:

```bash
pm2 stop saejaedang-frontend
pm2 start saejaedang-frontend-old
# or
pm2 restart all
```

---

## Support

**Admin Login Credentials** (Change in production!):
- Username: `admin`
- Password: `admin123`

**Project Location**:
- Local: `/home/conorhan/cafe/frontend-new`
- Server: `~/saejaedang/frontend-new`

**Documentation**:
- See `/home/conorhan/cafe/frontend-new/PROJECT_STRUCTURE.md` for complete component documentation
