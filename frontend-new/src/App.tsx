import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Products } from './components/public/Products';
import { Footer } from './components/public/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { OrderList } from './components/admin/OrderList';
import { OrderDetail } from './components/admin/OrderDetail';
import { Product, Order } from './types';
import { mockProducts, mockOrders } from './data/mockData';

// Public Page Component
const PublicPage: React.FC = () => {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // TODO: Implement cart functionality
    alert(`${product.nameKo}을(를) 장바구니에 추가했습니다!`);
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

// Admin Page Component
const AdminPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );
    console.log(`Updated order ${orderId} to status: ${status}`);
  };

  return (
    <>
      <Header isAdmin={true} />
      <div className="min-h-screen bg-korean-paper py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderList
            orders={orders}
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
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

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Main App Component
function App() {
  const handleLogin = async (username: string, password: string) => {
    // TODO: Replace with actual authentication
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('admin_authenticated', 'true');
      window.location.href = '/admin';
    } else {
      throw new Error('Invalid credentials');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
