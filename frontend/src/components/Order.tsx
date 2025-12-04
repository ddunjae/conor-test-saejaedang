import React, { useState, useEffect } from 'react';
import './Order.css';

interface CafeItem {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

interface OrderItem {
  item: CafeItem;
  quantity: number;
}

/**
 * Order Component
 * Handles delivery/shipping orders for SaeJaeDang products
 */
const Order: React.FC = () => {
  const [items, setItems] = useState<CafeItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    message: ''
  });

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  // Add item to cart
  const addToCart = (item: CafeItem) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }

    setShowCart(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  // Update quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ));
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, cartItem) =>
      total + (cartItem.item.price * cartItem.quantity), 0
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('장바구니에 상품을 추가해주세요.');
      return;
    }

    // TODO: Send order to backend
    console.log('Order submitted:', {
      items: cart,
      customer: orderForm,
      total: calculateTotal()
    });

    alert('주문이 접수되었습니다! 곧 연락드리겠습니다.');

    // Reset form
    setCart([]);
    setOrderForm({
      name: '',
      phone: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      message: ''
    });
  };

  return (
    <section id="order" className="order">
      <div className="order-container">
        <h2 className="section-title">택배 주문</h2>
        <p className="section-subtitle">전국 어디서나 새재당의 신선한 빵과 떡을 만나보세요</p>

        {/* Product Selection */}
        <div className="order-content">
          <div className="products-section">
            <h3 className="subsection-title">상품 선택</h3>
            <div className="products-grid">
              {items.map(item => (
                <div key={item.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://via.placeholder.com/300x200/d4a574/ffffff?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </div>
                  <div className="product-details">
                    <h4 className="product-name">{item.name}</h4>
                    <p className="product-name-en">{item.nameEn}</p>
                    <p className="product-price">₩{item.price.toLocaleString()}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className={`cart-section ${showCart ? 'show' : ''}`}>
            <div className="cart-header">
              <h3 className="subsection-title">장바구니</h3>
              <span className="cart-count">{cart.length}개 상품</span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>🛒</p>
                <p>장바구니가 비어있습니다</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(cartItem => (
                    <div key={cartItem.item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{cartItem.item.name}</h4>
                        <p className="cart-item-price">
                          ₩{cartItem.item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{cartItem.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(cartItem.item.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>상품 금액</span>
                    <span>₩{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>배송비</span>
                    <span>₩3,000</span>
                  </div>
                  <div className="summary-row total">
                    <span>총 결제금액</span>
                    <span>₩{(calculateTotal() + 3000).toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Form */}
        {cart.length > 0 && (
          <div className="order-form-section">
            <h3 className="subsection-title">배송 정보</h3>
            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">이름 *</label>
                  <input
                    type="text"
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    required
                    placeholder="받는 분 성함"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">연락처 *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                    required
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">우편번호 *</label>
                <input
                  type="text"
                  id="zipCode"
                  value={orderForm.zipCode}
                  onChange={(e) => setOrderForm({...orderForm, zipCode: e.target.value})}
                  required
                  placeholder="12345"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">주소 *</label>
                <input
                  type="text"
                  id="address"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  required
                  placeholder="서울특별시 강남구 테헤란로 123"
                />
              </div>

              <div className="form-group">
                <label htmlFor="detailAddress">상세 주소</label>
                <input
                  type="text"
                  id="detailAddress"
                  value={orderForm.detailAddress}
                  onChange={(e) => setOrderForm({...orderForm, detailAddress: e.target.value})}
                  placeholder="아파트 동/호수, 건물명 등"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">배송 메시지</label>
                <textarea
                  id="message"
                  value={orderForm.message}
                  onChange={(e) => setOrderForm({...orderForm, message: e.target.value})}
                  rows={3}
                  placeholder="배송 시 요청사항을 입력해주세요"
                />
              </div>

              <button type="submit" className="submit-order-btn">
                주문하기 (₩{(calculateTotal() + 3000).toLocaleString()})
              </button>
            </form>

            <div className="order-notice">
              <h4>📦 배송 안내</h4>
              <ul>
                <li>배송비는 전국 일률 3,000원입니다</li>
                <li>주문 접수 후 2-3일 내 배송됩니다</li>
                <li>신선도 유지를 위해 아이스팩과 함께 배송됩니다</li>
                <li>제품 특성상 배송 후 환불/교환이 어려우니 신중히 주문해주세요</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;
