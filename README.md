# SaeJaeDang (새재당) Cafe Website

A modern, responsive web application for SaeJaeDang cafe, showcasing traditional Korean bakery items including cafe bread and traditional rice cakes (떡). Built with React, TypeScript, and Express.

## Design Philosophy

The website combines **traditional Korean aesthetics** with **modern web design**, featuring:
- Warm, earthy color palette (browns, golds, beiges)
- Korean serif font (Noto Serif KR) for authentic feel
- Clean, responsive layout inspired by the SaeJaeDang Instagram profile
- Focus on visual presentation of bakery items

## Project Structure

```text
cafe/
├── frontend/           # React TypeScript frontend
│   ├── public/
│   │   └── images/    # Product images
│   └── src/
│       ├── components/
│       │   ├── Header.tsx      # Navigation and branding
│       │   ├── Gallery.tsx     # Product gallery with filtering
│       │   ├── About.tsx       # About section
│       │   └── Contact.tsx     # Contact info and social links
│       ├── App.tsx             # Main application component
│       ├── App.css             # Global styles
│       └── index.css           # Base styles and typography
│
└── backend/            # Express TypeScript backend
    └── src/
        └── server.ts           # API server with endpoints

```

## Features

### Frontend
- **Responsive Design**: Mobile-first approach, works on all devices
- **Product Gallery**: Dynamic grid with category filtering
- **Interactive UI**: Hover effects, smooth animations, and transitions
- **API Integration**: Fetches data from backend API
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus styles

### Backend
- **RESTful API**: Clean, documented endpoints
- **TypeScript**: Type-safe server code
- **CORS Enabled**: Ready for cross-origin requests
- **Modular Design**: Easy to extend with database integration

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **CSS3** with custom properties
- **Google Fonts** (Noto Serif KR)

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **CORS** for API access

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the cafe directory**
   ```bash
   cd /home/conorhan/cafe
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You need to run both frontend and backend servers:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
The backend API will run on `http://localhost:5000`

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000` and automatically open in your browser.

### Production Build

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
```
The optimized production build will be in the `frontend/build/` directory.

## API Endpoints

### Base URL: `http://localhost:5000`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/items` | GET | Get all cafe items |
| `/api/items?category={category}` | GET | Filter items by category |
| `/api/items/:id` | GET | Get specific item by ID |
| `/api/info` | GET | Get cafe information |
| `/api/categories` | GET | Get all categories |

### Example Response

```json
{
  "id": 1,
  "name": "단팥빵",
  "nameEn": "Red Bean Bread",
  "category": "bread",
  "description": "전통 방식으로 만든 부드러운 단팥빵",
  "descriptionEn": "Traditional soft red bean bread",
  "price": 3500,
  "image": "/images/redbean-bread.jpg"
}
```

## Customization

### Adding New Products

Edit `backend/src/server.ts` and add items to the `cafeItems` array:

```typescript
{
  id: 6,
  name: '새로운 빵',
  nameEn: 'New Bread',
  category: 'bread',
  description: '설명',
  descriptionEn: 'Description',
  price: 4500,
  image: '/images/new-bread.jpg'
}
```

### Updating Cafe Information

Modify the `cafeInfo` object in `backend/src/server.ts`:

```typescript
const cafeInfo = {
  name: '새재당',
  nameEn: 'SaeJaeDang',
  tagline: 'Your tagline here',
  // ... other fields
};
```

### Changing Colors

The color palette is defined in `frontend/src/index.css`:

```css
/* Color Palette:
  Primary Brown: #3a2a1a
  Accent Gold: #d4a574
  Light Beige: #f5f0e8
  ... */
```

### Adding Images

1. Place product images in `frontend/public/images/`
2. Update the image paths in the backend data
3. Images will be served at `http://localhost:3000/images/filename.jpg`

## Component Overview

### Header Component
- Displays cafe logo and name
- Navigation menu with smooth scrolling
- Sticky header that follows scroll

### Gallery Component
- Grid layout of products
- Category filtering (All, Bread, Rice Cake, Traditional)
- Fetches data from backend API
- Hover effects and animations
- Fallback to placeholder data if API unavailable

### About Component
- Cafe introduction and story
- Feature highlights with icons
- Visual brand card

### Contact Component
- Location, phone, email information
- Instagram social link
- Business hours
- Footer with copyright

## Future Extensions

The codebase is structured for easy expansion:

### Backend
- Add database integration (MongoDB, PostgreSQL)
- Implement authentication for admin panel
- Add endpoints for:
  - Newsletter subscription
  - Contact form submissions
  - Online ordering
  - Reservation system

### Frontend
- Add shopping cart functionality
- Implement image carousel for products
- Add multi-language support (i18n)
- Create admin dashboard
- Add customer reviews/ratings

Example contact form endpoint (TODO in `server.ts`):
```typescript
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  // Handle contact form submission
  // Send email, save to database, etc.
});
```

## Design Reference

The design is inspired by the SaeJaeDang Instagram profile:
- Instagram: [@saejaedang](https://www.instagram.com/saejaedang/)
- Warm, inviting aesthetic
- Focus on product photography
- Traditional Korean elements with modern presentation

## Color Palette

```text
Primary Brown:   #3a2a1a (Text, headings)
Secondary Brown: #5a4a3a (Secondary text)
Accent Gold:     #d4a574 (Buttons, highlights)
Gold Dark:       #c19563 (Hover states)
Light Beige:     #f5f0e8 (Backgrounds)
Lighter Beige:   #faf7f2 (Alternative backgrounds)
Text Muted:      #8b7355 (Subtle text)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for SaeJaeDang cafe.

## Contact

For questions or support, please visit:
- Instagram: [@saejaedang](https://www.instagram.com/saejaedang/)
- Email: info@saejaedang.com
