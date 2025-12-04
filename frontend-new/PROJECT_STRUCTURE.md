# Saejaedang Frontend - Project Structure

## Overview
Traditional Korean dessert café website with modern React + TypeScript + Tailwind CSS implementation.

**Design Philosophy**: Korean traditional architecture aesthetics with soft curves, traditional color palette, and decorative ornaments.

---

## Folder Structure

```
frontend-new/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx              # Main navigation (public + admin)
│   │   │   └── KoreanOrnament.tsx      # SVG decorative components
│   │   ├── public/
│   │   │   ├── Hero.tsx                # Homepage hero section
│   │   │   ├── About.tsx               # About section (brand story)
│   │   │   ├── Products.tsx            # Product listing with filters
│   │   │   ├── ProductCard.tsx         # Individual product card
│   │   │   └── Footer.tsx              # Site footer
│   │   └── admin/
│   │       ├── AdminLogin.tsx          # Admin authentication page
│   │       ├── OrderList.tsx           # Order management table
│   │       └── OrderDetail.tsx         # Order detail modal
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces
│   ├── data/
│   │   └── mockData.ts                 # Mock products & orders
│   └── pages/
│       ├── PublicPage.tsx              # Main public-facing page
│       └── AdminPage.tsx               # Admin dashboard page
├── tailwind.config.js                   # Tailwind custom config
└── package.json
```

---

## Design System

### Color Palette

**Main Brand Colors (Teal/Green)**
- `saejaedang-deep`: #0e3d39 - Darkest teal
- `saejaedang-primary`: #1d5c52 - Main brand color
- `saejaedang-medium`: #19322e - Dark subdued
- `saejaedang-light`: #446b5a - Lighter teal

**Traditional Korean Accents**
- `hanok-ivory`: #f0e6d2 - Soft ivory (traditional paper)
- `hanok-beige`: #e3c892 - Warm beige (clay)
- `hanok-gold`: #b37a42 - Golden accent (bronze)
- `hanok-sand`: #d4c5a9 - Sand tone

**Semantic Colors**
- `korean-paper`: #faf8f3 - Background paper texture
- `korean-ink`: #2d2d2d - Text color
- `korean-red`: #c73e3a - Traditional red accent

### Typography
- **Display Font**: Gowun Batang (serif) - For headings
- **Korean Font**: Noto Serif KR (serif) - For Korean text
- **Sans Font**: Noto Sans KR (sans-serif) - For UI elements

### Border Radius
- `rounded-hanok`: 0.75rem - Soft curves
- `rounded-ceramic`: 2rem - Pottery-like curves

### Shadows
- `shadow-hanok`: Soft teal shadow
- `shadow-ceramic`: Deeper teal shadow
- `shadow-paper`: Light subtle shadow

### Animations
- `animate-fade-in`: Fade in effect
- `animate-slide-up`: Slide up from bottom
- `animate-float`: Floating motion

---

## Component Guide

### Common Components

#### **Header.tsx**
Dual-mode navigation header for public and admin interfaces.

**Props:**
- `isAdmin?: boolean` - Switch between public/admin navigation

**Features:**
- Responsive mobile menu
- Korean/English bilingual labels
- Logo with gradient background
- Corner ornament decorations

#### **KoreanOrnament.tsx**
Three SVG ornament components for traditional Korean decorative patterns.

**Components:**
1. `KoreanOrnament` - Cloud pattern (구름무늬)
2. `LotusOrnament` - Lotus petal design (연꽃무늬)
3. `CornerFrame` - Decorative corner frames

**Props:**
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- `size?: 'sm' | 'md' | 'lg'`
- `color?: string`
- `className?: string`

---

### Public Components

#### **Hero.tsx**
Homepage hero section with Korean aesthetic design.

**Features:**
- Two-column layout (text + product showcase)
- Animated subtitle badge
- Feature badges (전통 제조법, 당일 생산, 품질 보증)
- Product card with ornaments
- CTA buttons

#### **About.tsx**
Brand story and café introduction section.

**Features:**
- Three story cards (tradition, quality, location)
- Statistics display (3대, 48시간, 100%, 당일)
- Decorative ornaments
- Gradient background effects

#### **Products.tsx**
Product listing page with category filtering.

**Props:**
- `products: Product[]` - Array of products
- `onAddToCart: (product: Product) => void` - Add to cart callback

**Features:**
- Category filter (전체/빵/떡)
- Product grid layout
- Empty state handling
- CTA for bulk orders

#### **ProductCard.tsx**
Individual product display card.

**Props:**
- `product: Product` - Product data
- `onAddToCart?: (product: Product) => void` - Add to cart callback

**Features:**
- Product image placeholder
- Korean/English names
- Category badge
- Availability status
- "인기" (popular) badge for featured items
- Add to cart button

#### **Footer.tsx**
Site footer with links and contact information.

**Features:**
- Brand section with logo
- Quick links navigation
- Contact information (address, phone, email)
- Privacy policy links
- Corner ornaments

---

### Admin Components

#### **AdminLogin.tsx**
Admin authentication page.

**Props:**
- `onLogin: (username: string, password: string) => void` - Login callback

**Features:**
- Username/password fields
- Error message display
- Loading state
- "Remember me" checkbox
- Korean traditional design styling

#### **OrderList.tsx**
Order management table with filtering and sorting.

**Props:**
- `orders: Order[]` - Array of orders
- `onViewOrder: (order: Order) => void` - View order callback
- `onUpdateStatus: (orderId: string, status: Order['status']) => void` - Update status callback

**Features:**
- Search by order number, customer name, phone
- Status filter (대기/확인/준비중/배송중/완료/취소)
- Sort by date or amount
- Responsive table design
- Empty state handling

#### **OrderDetail.tsx**
Order detail modal with status updates.

**Props:**
- `order: Order` - Order data
- `onUpdateStatus: (orderId: string, status: Order['status']) => void` - Update status callback
- `onClose: () => void` - Close modal callback

**Features:**
- Full order information display
- Customer details
- Order items with quantities
- Status update dropdown
- Tracking number input
- Admin notes textarea
- Print functionality
- Save/cancel actions

---

## TypeScript Types

### **Product Interface**
```typescript
interface Product {
  id: string;
  name: string;              // English name
  nameKo: string;            // Korean name
  category: 'bread' | 'ricecake';
  description: string;       // English description
  descriptionKo: string;     // Korean description
  price: number;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
}
```

### **Order Interface**
```typescript
interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: CustomerInfo;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'card' | 'transfer' | 'cash';
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingNumber?: string;
  notes?: string;
}
```

### **OrderItem Interface**
```typescript
interface OrderItem {
  productId: string;
  productName: string;
  productNameKo: string;
  quantity: number;
  price: number;
}
```

### **CustomerInfo Interface**
```typescript
interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    province: string;
  };
  deliveryNote?: string;
}
```

---

## Mock Data

**Location**: `src/data/mockData.ts`

### Products
- 6 sample products (3 breads, 3 rice cakes)
- Includes featured items and out-of-stock items
- Korean and English names/descriptions

### Orders
- 5 sample orders with different statuses
- Various payment methods and customer locations
- Complete order histories with timestamps

---

## Implementation Guide

### 1. Setup
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Install Required Fonts
Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet">
```

### 3. Create Page Components

**PublicPage.tsx** - Combine all public components:
```typescript
import { Header } from './components/common/Header';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Products } from './components/public/Products';
import { Footer } from './components/public/Footer';
import { mockProducts } from './data/mockData';

export const PublicPage = () => {
  const handleAddToCart = (product: Product) => {
    // Implement cart logic
  };

  return (
    <>
      <Header isAdmin={false} />
      <Hero />
      <About />
      <Products products={mockProducts} onAddToCart={handleAddToCart} />
      <Footer />
    </>
  );
};
```

**AdminPage.tsx** - Admin dashboard:
```typescript
import { useState } from 'react';
import { Header } from './components/common/Header';
import { OrderList } from './components/admin/OrderList';
import { OrderDetail } from './components/admin/OrderDetail';
import { mockOrders } from './data/mockData';

export const AdminPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    // Implement status update logic
  };

  return (
    <>
      <Header isAdmin={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OrderList
          orders={mockOrders}
          onViewOrder={handleViewOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onUpdateStatus={handleUpdateStatus}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};
```

### 4. Routing Setup
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicPage } from './pages/PublicPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLogin } from './components/admin/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Next Steps (Backend Integration)

1. **API Endpoints**
   - `GET /api/products` - Fetch all products
   - `POST /api/orders` - Create new order
   - `GET /api/orders` - Fetch all orders (admin)
   - `PATCH /api/orders/:id` - Update order status (admin)
   - `POST /api/admin/login` - Admin authentication

2. **State Management**
   - Consider React Context or Redux for cart management
   - Admin authentication state
   - Order status real-time updates

3. **Image Management**
   - Upload product images
   - Serve from CDN or static server
   - Update `Product.image` URLs

4. **Payment Integration**
   - Integrate payment gateway (Toss, Inicis, etc.)
   - Handle payment callbacks
   - Update `paymentStatus` accordingly

---

## Design Reference
Review design inspiration: https://uxpilot.ai/s/90c7815c6dc5990a9541e62b00ac21d9

---

## Notes
- All components are fully responsive (mobile-first)
- Bilingual support (Korean primary, English secondary)
- Korean traditional aesthetic with modern UX
- Print-friendly order detail page
- Accessibility considered in form inputs and navigation
