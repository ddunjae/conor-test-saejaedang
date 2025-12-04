import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import Order from './models/Order';
import Contact from './models/Contact';
import Product from './models/Product';
import { orderValidation, contactValidation } from './middleware/validation';
import { sendOrderConfirmationEmail, sendContactNotificationEmail } from './utils/emailService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Sample data for SaeJaeDang cafe items
// TODO: Replace with database in production
const cafeItems = [
  {
    id: 1,
    name: '단팥빵',
    nameEn: 'Red Bean Bread',
    category: 'bread',
    description: '전통 방식으로 만든 부드러운 단팥빵',
    descriptionEn: 'Traditional soft red bean bread',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: '크림빵',
    nameEn: 'Cream Bread',
    category: 'bread',
    description: '고소한 크림이 가득한 빵',
    descriptionEn: 'Bread filled with rich cream',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: '소보로빵',
    nameEn: 'Soboro Bread',
    category: 'bread',
    description: '바삭한 소보로가 올라간 달콤한 빵',
    descriptionEn: 'Sweet bread topped with crispy streusel',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: '앙버터',
    nameEn: 'Anpan Butter',
    category: 'bread',
    description: '프랑스 빵에 단팥과 버터를 넣은 시그니처 빵',
    descriptionEn: 'French bread with red bean paste and butter',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: '인절미',
    nameEn: 'Injeolmi',
    category: 'ricecake',
    description: '콩가루를 듬뿍 묻힌 쫄깃한 떡',
    descriptionEn: 'Chewy rice cake coated with roasted soybean powder',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1563245372-a52e1da11c92?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: '송편',
    nameEn: 'Songpyeon',
    category: 'ricecake',
    description: '계절의 맛을 담은 전통 송편',
    descriptionEn: 'Traditional half-moon shaped rice cake',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1626776877530-873b74725e19?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: '백설기',
    nameEn: 'Baekseolgi',
    category: 'ricecake',
    description: '부드러운 쌀가루로 만든 하얀 떡',
    descriptionEn: 'Soft white rice cake',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1614187479000-25f471893ba0?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: '약과',
    nameEn: 'Yakgwa',
    category: 'traditional',
    description: '꿀과 참기름이 어우러진 전통 과자',
    descriptionEn: 'Traditional honey cookie',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1618897796318-bd5f23e226e5?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: '한과 세트',
    nameEn: 'Hangwa Set',
    category: 'traditional',
    description: '다양한 전통 한과를 모은 선물 세트',
    descriptionEn: 'Assorted traditional Korean sweets gift set',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400&h=300&fit=crop'
  }
];

const cafeInfo = {
  name: '새재당',
  nameEn: 'SaeJaeDang',
  tagline: '전통과 현대가 만나는 곳',
  taglineEn: 'Where tradition meets modernity',
  description: '새재당은 우리의 전통 방식을 고수하면서도 현대적인 감각을 더한 카페 베이커리입니다. 정성스럽게 만든 빵과 전통 떡을 통해 한국의 맛과 정을 전합니다.',
  descriptionEn: 'SaeJaeDang is a cafe bakery that combines traditional Korean methods with modern sensibilities. We share Korean flavors and warmth through our carefully crafted breads and traditional rice cakes.',
  contact: {
    instagram: '@saejaedang',
    instagramUrl: 'https://www.instagram.com/saejaedang/',
    email: 'info@saejaedang.com',
    phone: '+82-2-1234-5678',
    address: '서울특별시 강남구',
    addressEn: 'Gangnam-gu, Seoul, South Korea'
  }
};

// API Routes

/**
 * GET / - Health check endpoint
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'SaeJaeDang API Server',
    version: '1.0.0',
    status: 'running'
  });
});

/**
 * GET /api/items - Get all cafe items
 * Query params: category (optional) - filter by category (bread, ricecake, traditional)
 */
app.get('/api/items', (req: Request, res: Response) => {
  const { category } = req.query;

  if (category) {
    const filteredItems = cafeItems.filter(item => item.category === category);
    res.json(filteredItems);
  } else {
    res.json(cafeItems);
  }
});

/**
 * GET /api/items/:id - Get a specific cafe item by ID
 */
app.get('/api/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = cafeItems.find(item => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

/**
 * GET /api/info - Get cafe information
 */
app.get('/api/info', (req: Request, res: Response) => {
  res.json(cafeInfo);
});

/**
 * GET /api/categories - Get all available categories
 */
app.get('/api/categories', (req: Request, res: Response) => {
  const categories = [
    { id: 'bread', name: '빵', nameEn: 'Bread' },
    { id: 'ricecake', name: '떡', nameEn: 'Rice Cake' },
    { id: 'traditional', name: '전통 과자', nameEn: 'Traditional Sweets' }
  ];
  res.json(categories);
});

/**
 * POST /api/orders - Create a new order
 */
app.post('/api/orders', orderValidation, async (req: Request, res: Response) => {
  try {
    const { items, customerInfo, subtotal, shippingFee, total } = req.body;

    // Create new order
    const order = new Order({
      items,
      customerInfo,
      subtotal,
      shippingFee: shippingFee || 3000,
      total,
      status: 'pending',
    });

    await order.save();

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail(order).catch((err) =>
      console.error('Email error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/orders/:orderNumber - Get order by order number
 */
app.get('/api/orders/:orderNumber', async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/contact - Submit contact form
 */
app.post('/api/contact', contactValidation, async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save contact to database
    const contact = new Contact({
      name,
      email,
      phone,
      message,
      status: 'new',
    });

    await contact.save();

    // Send notification email (non-blocking)
    sendContactNotificationEmail(name, email, phone, message).catch((err) =>
      console.error('Email error:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon.',
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🍞 SaeJaeDang API Server running on port ${PORT}`);
  console.log(`📍 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;
