import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  productId: number;
  name: string;
  nameEn: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    phone: string;
    zipCode: string;
    address: string;
    detailAddress: string;
    deliveryMessage?: string;
  };
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: { type: Number, required: true },
        name: { type: String, required: true },
        nameEn: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    customerInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      detailAddress: {
        type: String,
        required: true,
        trim: true,
      },
      deliveryMessage: {
        type: String,
        trim: true,
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
      default: 3000,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
OrderSchema.pre('save', async function() {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `ORD-${dateStr}-${randomStr}`;
  }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
