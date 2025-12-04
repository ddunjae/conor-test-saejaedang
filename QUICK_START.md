# Quick Start Guide - SaeJaeDang Cafe

## 🚀 Start the Application

### Option 1: Automatic (Recommended)
```bash
cd /home/conorhan/cafe
./start.sh
```

### Option 2: Manual

**Step 1 - Start Backend (Terminal 1):**
```bash
cd /home/conorhan/cafe/backend
npm install
npm run dev
```
✅ Backend running at `http://localhost:5000`

**Step 2 - Start Frontend (Terminal 2):**
```bash
cd /home/conorhan/cafe/frontend
npm install
npm start
```
✅ Frontend running at `http://localhost:3000`

## 📱 What You'll See

1. **Header** - Cafe name "새재당" with navigation
2. **Gallery** - Grid of breads and rice cakes with filters
3. **About** - Story and features of the cafe
4. **Contact** - Location, hours, Instagram link

## 🎨 Design Features

- Warm browns and gold colors
- Korean traditional aesthetic
- Responsive (works on phone, tablet, desktop)
- Smooth animations and hover effects

## 📝 Next Steps

### Add Your Own Images
1. Place images in `frontend/public/images/`
2. Update paths in `backend/src/server.ts`

### Customize Content
Edit `backend/src/server.ts`:
- Update cafe name, description
- Add/remove products
- Change contact information

### Add Features
See `README.md` and `PROJECT_OVERVIEW.md` for:
- Database integration guide
- Contact form implementation
- Admin panel ideas
- Deployment instructions

## 🛠️ Technologies Used

- **Frontend:** React + TypeScript
- **Backend:** Express + TypeScript
- **Styling:** Custom CSS with Korean fonts

## 📚 Documentation

- `README.md` - Complete documentation
- `PROJECT_OVERVIEW.md` - Project details and architecture
- `QUICK_START.md` - This file

## 🆘 Troubleshooting

**Port already in use?**
- Backend: Change `PORT` in `backend/src/server.ts`
- Frontend: Press `Y` when prompted to use different port

**Dependencies error?**
```bash
cd backend && npm install
cd ../frontend && npm install
```

**Can't connect to API?**
- Make sure backend is running on port 5000
- Check browser console for errors

## ✨ Features

✅ Responsive design
✅ Category filtering
✅ API integration
✅ Smooth animations
✅ Instagram-inspired aesthetic
✅ TypeScript type safety
✅ Clean, commented code

Enjoy building your cafe website! 🍞🍡
