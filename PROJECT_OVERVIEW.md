# SaeJaeDang Cafe Website - Project Overview

## Quick Start

### Easiest Way (Recommended)
```bash
cd /home/conorhan/cafe
./start.sh
```

This will automatically:
1. Install dependencies (if needed)
2. Start the backend server on port 5000
3. Start the frontend development server on port 3000
4. Open the website in your browser

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## What Was Built

### A Complete Full-Stack Web Application

**Frontend (React + TypeScript)**
- Modern, responsive single-page application
- Four main sections: Header, Gallery, About, Contact
- Warm, traditional-modern aesthetic inspired by SaeJaeDang Instagram
- Mobile-first responsive design

**Backend (Express + TypeScript)**
- RESTful API server
- Sample data for cafe items (breads and rice cakes)
- CORS-enabled for frontend communication
- Ready for database integration

## Design Highlights

### Color Scheme
Warm, inviting colors that evoke traditional Korean aesthetics:
- **Browns** (#3a2a1a, #5a4a3a) - Primary text
- **Gold** (#d4a574, #c19563) - Accents and highlights
- **Beige** (#f5f0e8, #faf7f2) - Backgrounds

### Typography
- **Noto Serif KR** - Korean serif font for authentic feel
- Hierarchical sizing for clear content structure
- Readable line heights and spacing

### Visual Features
- Smooth hover animations
- Category filtering for products
- Responsive grid layouts
- Custom scrollbar styling
- Instagram-inspired clean aesthetic

## Project Structure

```text
cafe/
├── frontend/               # React TypeScript app
│   ├── public/
│   │   └── images/        # Product images (to be added)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx         # Logo, nav, sticky header
│   │   │   ├── Header.css
│   │   │   ├── Gallery.tsx        # Product grid with filters
│   │   │   ├── Gallery.css
│   │   │   ├── About.tsx          # Cafe story and features
│   │   │   ├── About.css
│   │   │   ├── Contact.tsx        # Contact info, hours, footer
│   │   │   └── Contact.css
│   │   ├── App.tsx                # Main component
│   │   ├── App.css                # Global styles
│   │   └── index.css              # Base styles, fonts
│   └── package.json
│
├── backend/                # Express TypeScript API
│   ├── src/
│   │   └── server.ts              # API endpoints
│   ├── tsconfig.json
│   └── package.json
│
├── README.md               # Full documentation
├── start.sh                # Quick start script
└── PROJECT_OVERVIEW.md     # This file
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Health check |
| `GET /api/items` | All products |
| `GET /api/items?category=bread` | Filter by category |
| `GET /api/items/:id` | Single product |
| `GET /api/info` | Cafe information |
| `GET /api/categories` | Available categories |

## Components Explained

### Header Component
- Cafe logo in circular gold badge
- Cafe name and tagline
- Navigation links (Gallery, About, Contact)
- Sticky positioning - follows user scroll
- Smooth scroll to sections

### Gallery Component
- Product grid with 3-column layout (responsive)
- Category filters: All, Bread, Rice Cake, Traditional
- Hover effects on product cards
- Displays: image, name (Korean + English), description, price
- Fetches data from backend API
- Fallback to placeholder data if API unavailable

### About Component
- Left side: Visual brand card with pattern
- Right side: Cafe story and description
- Three feature highlights:
  - 수제 빵 (Handmade Bread)
  - 전통 떡 (Traditional Rice Cakes)
  - 엄선된 재료 (Selected Ingredients)

### Contact Component
- Contact cards: Location, Phone, Email
- Instagram social link with icon
- Business hours display
- Footer with copyright

## Technology Choices

### Why React + TypeScript?
- **React**: Component-based, reusable, fast
- **TypeScript**: Type safety, better IDE support, fewer bugs
- **Create React App**: Quick setup, best practices built-in

### Why Express + TypeScript?
- **Express**: Popular, simple, flexible
- **TypeScript**: Consistent with frontend, type-safe APIs
- **Easy to extend**: Add database, authentication later

### Why CSS (not framework)?
- **Full control**: Custom design matching Instagram aesthetic
- **Better learning**: Understand fundamentals
- **No bloat**: Only the styles needed
- **Easy to maintain**: Clear class naming

## Next Steps for Development

### Immediate Enhancements
1. **Add Real Images**
   - Place actual product photos in `frontend/public/images/`
   - Update image paths in backend data

2. **Add More Products**
   - Edit `backend/src/server.ts`
   - Add items to `cafeItems` array

3. **Customize Content**
   - Update cafe info in `cafeInfo` object
   - Change descriptions, contact info

### Future Features

**Short Term:**
- Contact form functionality
- Newsletter subscription
- Image carousel for products
- Loading states and error handling

**Long Term:**
- Database integration (MongoDB/PostgreSQL)
- Admin panel for managing products
- Online ordering system
- Customer reviews/ratings
- Multi-language support (Korean/English toggle)
- Image upload for admin
- Analytics integration

## Design Inspiration

Based on [@saejaedang](https://www.instagram.com/saejaedang/) Instagram:
- Clean, minimal layout
- Focus on product photography
- Warm, inviting color palette
- Traditional meets modern aesthetic
- Professional yet approachable

## File Comments

All code files include:
- **Header comments** explaining purpose
- **Inline comments** for complex logic
- **TODO comments** for future enhancements
- **TypeScript types** for type safety

## Responsive Design

Mobile breakpoints:
- `768px` - Tablet and below
- `968px` - Medium screens

Features:
- Flexible grid layouts
- Stacking columns on mobile
- Touch-friendly buttons and links
- Readable text sizes on all devices

## Performance Considerations

- Lazy loading ready (add React.lazy when needed)
- Optimized images (use WebP, proper sizing)
- Minimal dependencies
- Efficient re-renders with React best practices

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meet WCAG standards

## Browser Support

Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment Ready

**Frontend:**
```bash
cd frontend
npm run build
# Deploy 'build' folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3 + CloudFront
```

**Backend:**
```bash
cd backend
npm run build
npm start
# Deploy to:
# - Heroku
# - AWS EC2
# - Azure App Service
# - DigitalOcean
```

## Support

For questions or issues:
- Check README.md for detailed documentation
- Review component files for inline comments
- Inspect browser console for API errors

---

**Created:** December 2024
**Stack:** React, TypeScript, Express, Node.js
**Design:** Traditional Korean + Modern Web
