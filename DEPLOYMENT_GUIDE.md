# SaeJaeDang Cafe - VM Deployment Guide

## 🎯 Quick Deployment Steps

### Step 1: Transfer Files to VM

From your local machine, copy the deployment package to the VM:

```bash
scp /home/conorhan/cafe/cafe-deploy.tar.gz conortest@4.218.11.239:~/
```

**Password:** `qwert12345!!`

### Step 2: SSH into the VM

```bash
ssh conortest@4.218.11.239
```

**Password:** `qwert12345!!`

### Step 3: Extract and Setup

Once logged into the VM, run these commands:

```bash
# Create cafe directory
mkdir -p ~/cafe

# Extract the package
tar -xzf cafe-deploy.tar.gz -C ~/cafe

# Make setup script executable
chmod +x ~/cafe/vm-setup.sh

# Run the automated setup script
cd ~/cafe
./vm-setup.sh
```

The setup script will automatically:
- ✅ Install Node.js (if not already installed)
- ✅ Install PM2 process manager
- ✅ Install all backend dependencies
- ✅ Install all frontend dependencies
- ✅ Build the frontend for production
- ✅ Start backend server on port 5000
- ✅ Start frontend server on port 3000
- ✅ Configure PM2 to start on system boot
- ✅ Configure firewall rules

### Step 4: Access Your Website

After deployment completes, access your cafe website at:

- **Frontend:** http://4.218.11.239:3000
- **Backend API:** http://4.218.11.239:5000

---

## 📋 Manual Deployment (Alternative)

If you prefer to deploy manually without the automated script:

### 1. Transfer Files
```bash
scp cafe-deploy.tar.gz conortest@4.218.11.239:~/
```

### 2. SSH to VM
```bash
ssh conortest@4.218.11.239
```

### 3. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Extract Files
```bash
mkdir -p ~/cafe
tar -xzf cafe-deploy.tar.gz -C ~/cafe
cd ~/cafe
```

### 5. Install Dependencies
```bash
# Backend
cd ~/cafe/backend
npm install

# Frontend
cd ~/cafe/frontend
npm install
npm run build
```

### 6. Install PM2
```bash
sudo npm install -g pm2
```

### 7. Start Services
```bash
# Start backend
cd ~/cafe/backend
pm2 start npm --name "cafe-backend" -- run dev

# Start frontend
cd ~/cafe/frontend
pm2 start npm --name "cafe-frontend" -- start
```

### 8. Configure Auto-Start
```bash
pm2 save
pm2 startup systemd -u conortest --hp /home/conortest
```

### 9. Configure Firewall
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
```

---

## 🛠️ Managing the Application

### View Application Status
```bash
pm2 status
```

### View Logs
```bash
# All logs
pm2 logs

# Backend logs only
pm2 logs cafe-backend

# Frontend logs only
pm2 logs cafe-frontend
```

### Restart Services
```bash
# Restart both
pm2 restart all

# Restart backend only
pm2 restart cafe-backend

# Restart frontend only
pm2 restart cafe-frontend
```

### Stop Services
```bash
pm2 stop all
```

### Start Services
```bash
pm2 start all
```

---

## 🔧 Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are already in use:

```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :5000

# Kill the process
sudo kill -9 <PID>
```

### PM2 Not Starting on Boot

```bash
# Re-run startup command
pm2 unstartup
pm2 startup systemd -u conortest --hp /home/conortest
pm2 save
```

### Backend Not Connecting to Frontend

Check that the backend is running and accessible:
```bash
curl http://localhost:5000/api/info
```

### Firewall Blocking Access

```bash
# Check firewall status
sudo ufw status

# Enable if disabled
sudo ufw enable

# Allow ports
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
```

---

## 📦 Package Contents

```
cafe/
├── backend/              # Express TypeScript API server
│   ├── src/
│   │   └── server.ts    # Main server file
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/            # React TypeScript application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.tsx      # Main app component
│   │   └── index.tsx    # Entry point
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── vm-setup.sh          # Automated setup script
```

---

## 🌐 API Endpoints

Once deployed, the following API endpoints are available:

- `GET /` - Health check
- `GET /api/items` - Get all cafe items
- `GET /api/items/:id` - Get specific item
- `GET /api/info` - Get cafe information
- `GET /api/categories` - Get all categories

---

## 🔐 Security Notes

1. **Change Default Passwords:** Update the VM password after initial deployment
2. **Enable UFW Firewall:** Ensure firewall is enabled with only necessary ports open
3. **SSL/TLS:** Consider adding HTTPS with Let's Encrypt for production use
4. **Environment Variables:** Store sensitive data in environment variables, not in code

---

## 📞 Support

If you encounter any issues during deployment, check:

1. PM2 logs: `pm2 logs`
2. System logs: `journalctl -xe`
3. Port availability: `sudo lsof -i :3000` and `sudo lsof -i :5000`
4. Firewall status: `sudo ufw status`

---

## ✅ Deployment Checklist

- [ ] Transfer cafe-deploy.tar.gz to VM
- [ ] SSH into VM successfully
- [ ] Extract files to ~/cafe
- [ ] Run vm-setup.sh script
- [ ] Verify backend is running (pm2 status)
- [ ] Verify frontend is running (pm2 status)
- [ ] Test frontend at http://4.218.11.239:3000
- [ ] Test API at http://4.218.11.239:5000
- [ ] Configure PM2 startup
- [ ] Configure firewall rules
- [ ] Test reboot (optional but recommended)

---

**Deployment Date:** 2025-12-04
**VM IP:** 4.218.11.239
**VM User:** conortest
