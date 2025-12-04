// Product Types
export interface Product {
  id: string;
  name: string;
  nameKo: string;
  category: 'bread' | 'ricecake';
  description: string;
  descriptionKo: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  productNameKo: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
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

export interface Order {
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

// Admin Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff';
}

// Filter and Sort Types
export interface OrderFilters {
  status?: Order['status'][];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface SortOption {
  field: 'createdAt' | 'totalAmount' | 'orderNumber';
  direction: 'asc' | 'desc';
}
