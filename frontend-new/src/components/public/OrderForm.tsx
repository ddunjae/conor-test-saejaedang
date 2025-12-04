import React, { useState } from 'react';
import { Product, OrderItem, CustomerInfo } from '../../types';
import { CornerFrame } from '../common/KoreanOrnament';

interface OrderFormProps {
  products: Product[];
}

export const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [customerInfo, setCustomerInfo] = useState<Partial<CustomerInfo>>({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      province: '',
    },
    deliveryNote: '',
  });
  const [orderStep, setOrderStep] = useState<'products' | 'delivery' | 'confirm'>('products');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 수량 변경
  const updateQuantity = (productId: string, quantity: number) => {
    const newItems = new Map(selectedItems);
    if (quantity <= 0) {
      newItems.delete(productId);
    } else {
      newItems.set(productId, quantity);
    }
    setSelectedItems(newItems);
  };

  // 총 금액 계산
  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  };

  // 선택된 제품 정보 가져오기
  const getSelectedProducts = (): OrderItem[] => {
    const items: OrderItem[] = [];
    selectedItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        items.push({
          productId: product.id,
          productName: product.name,
          productNameKo: product.nameKo,
          quantity,
          price: product.price,
        });
      }
    });
    return items;
  };

  // 주문 제출
  const handleSubmitOrder = async () => {
    if (!agreedToTerms) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }

    const orderData = {
      items: getSelectedProducts(),
      customer: customerInfo,
      totalAmount: calculateTotal(),
    };

    console.log('주문 데이터:', orderData);
    alert('주문이 접수되었습니다! 곧 연락드리겠습니다.');

    // 초기화
    setSelectedItems(new Map());
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      address: { street: '', city: '', postalCode: '', province: '' },
      deliveryNote: '',
    });
    setOrderStep('products');
    setAgreedToTerms(false);
  };

  // 카테고리별 제품 그룹화
  const groupedProducts = {
    bread: products.filter(p => p.category === 'bread' && p.isAvailable),
    ricecake: products.filter(p => p.category === 'ricecake' && p.isAvailable),
  };

  return (
    <div className="min-h-screen bg-korean-paper py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-saejaedang-deep mb-4">
            주문하기
          </h1>
          <p className="text-lg text-saejaedang-medium">
            새재당의 정성스러운 간식을 주문해보세요
          </p>
          <CornerFrame position="top-left" size="md" className="opacity-20" />
          <CornerFrame position="top-right" size="md" className="opacity-20" />
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {['products', 'delivery', 'confirm'].map((step, index) => {
              const stepLabels = { products: '제품 선택', delivery: '배송 정보', confirm: '주문 확인' };
              const isActive = orderStep === step;
              const isCompleted =
                (step === 'products' && (orderStep === 'delivery' || orderStep === 'confirm')) ||
                (step === 'delivery' && orderStep === 'confirm');

              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-hanok text-hanok-ivory shadow-hanok'
                          : isCompleted
                          ? 'bg-saejaedang-primary text-hanok-ivory'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${isActive ? 'text-saejaedang-primary' : 'text-saejaedang-light'}`}>
                      {stepLabels[step as keyof typeof stepLabels]}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`w-16 h-1 ${isCompleted ? 'bg-saejaedang-primary' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step 1: 제품 선택 */}
        {orderStep === 'products' && (
          <div className="space-y-8">
            {/* 게이트웨이빵 */}
            <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <h2 className="text-2xl font-display font-bold text-saejaedang-deep mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-gradient-hanok flex items-center justify-center text-hanok-ivory text-sm mr-3">
                  🍞
                </span>
                게이트웨이빵
              </h2>
              <div className="space-y-4">
                {groupedProducts.bread.map(product => {
                  const quantity = selectedItems.get(product.id) || 0;
                  return (
                    <div key={product.id} className="flex items-center justify-between p-4 rounded-hanok hover:bg-hanok-ivory/30 transition-colors border border-saejaedang-light/10">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-saejaedang-deep">{product.nameKo}</h3>
                        <p className="text-sm text-saejaedang-light mt-1">{product.descriptionKo}</p>
                        <p className="text-lg font-bold text-saejaedang-primary mt-2">
                          ₩ {product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 ml-6">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity === 0}
                          className="w-10 h-10 rounded-full bg-saejaedang-light/20 hover:bg-saejaedang-light/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold text-saejaedang-deep"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-saejaedang-deep">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-10 h-10 rounded-full bg-gradient-hanok hover:shadow-hanok transition-all flex items-center justify-center font-bold text-hanok-ivory"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 오메기떡 */}
            <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <h2 className="text-2xl font-display font-bold text-saejaedang-deep mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-gradient-hanok flex items-center justify-center text-hanok-ivory text-sm mr-3">
                  🍡
                </span>
                오메기떡
              </h2>
              <div className="space-y-4">
                {groupedProducts.ricecake.map(product => {
                  const quantity = selectedItems.get(product.id) || 0;
                  return (
                    <div key={product.id} className="flex items-center justify-between p-4 rounded-hanok hover:bg-hanok-ivory/30 transition-colors border border-saejaedang-light/10">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-saejaedang-deep">{product.nameKo}</h3>
                        <p className="text-sm text-saejaedang-light mt-1">{product.descriptionKo}</p>
                        <p className="text-lg font-bold text-saejaedang-primary mt-2">
                          ₩ {product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 ml-6">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity === 0}
                          className="w-10 h-10 rounded-full bg-saejaedang-light/20 hover:bg-saejaedang-light/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold text-saejaedang-deep"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-saejaedang-deep">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-10 h-10 rounded-full bg-gradient-hanok hover:shadow-hanok transition-all flex items-center justify-center font-bold text-hanok-ivory"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 주문 요약 */}
            {selectedItems.size > 0 && (
              <div className="bg-gradient-hanok text-hanok-ivory rounded-ceramic p-6 shadow-hanok">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">선택한 제품</h3>
                  <span className="text-2xl font-bold">₩ {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="space-y-2 mb-6 border-t border-hanok-ivory/20 pt-4">
                  {getSelectedProducts().map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.productNameKo} × {item.quantity}</span>
                      <span>₩ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setOrderStep('delivery')}
                  className="w-full py-3 bg-hanok-ivory text-saejaedang-primary rounded-hanok font-bold hover:shadow-ceramic transition-all"
                >
                  배송 정보 입력하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: 배송 정보 */}
        {orderStep === 'delivery' && (
          <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
            <h2 className="text-2xl font-display font-bold text-saejaedang-deep mb-6">
              배송 정보 입력
            </h2>

            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  이름 <span className="text-korean-red">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                  required
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  전화번호 <span className="text-korean-red">*</span>
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                  required
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                />
              </div>

              {/* 주소 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                    우편번호 <span className="text-korean-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address?.postalCode}
                    onChange={(e) => setCustomerInfo({
                      ...customerInfo,
                      address: { ...customerInfo.address!, postalCode: e.target.value }
                    })}
                    placeholder="12345"
                    className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                    시/도 <span className="text-korean-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address?.province}
                    onChange={(e) => setCustomerInfo({
                      ...customerInfo,
                      address: { ...customerInfo.address!, province: e.target.value }
                    })}
                    placeholder="경상북도"
                    className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  시/군/구 <span className="text-korean-red">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.address?.city}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    address: { ...customerInfo.address!, city: e.target.value }
                  })}
                  placeholder="문경시"
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  상세 주소 <span className="text-korean-red">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.address?.street}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    address: { ...customerInfo.address!, street: e.target.value }
                  })}
                  placeholder="새재로 123번길 45"
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none"
                  required
                />
              </div>

              {/* 배송 메모 */}
              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  배송 메모
                </label>
                <textarea
                  value={customerInfo.deliveryNote}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryNote: e.target.value })}
                  placeholder="문 앞에 놓아주세요"
                  rows={3}
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all outline-none resize-none"
                />
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setOrderStep('products')}
                className="flex-1 py-3 border-2 border-saejaedang-light/30 text-saejaedang-medium rounded-hanok font-medium hover:bg-hanok-ivory/30 transition-all"
              >
                이전
              </button>
              <button
                onClick={() => {
                  if (!customerInfo.name || !customerInfo.phone || !customerInfo.address?.street) {
                    alert('필수 항목을 모두 입력해주세요.');
                    return;
                  }
                  setOrderStep('confirm');
                }}
                className="flex-1 py-3 bg-gradient-hanok text-hanok-ivory rounded-hanok font-bold hover:shadow-hanok transition-all"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 주문 확인 */}
        {orderStep === 'confirm' && (
          <div className="space-y-6">
            {/* 주문 제품 */}
            <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <h2 className="text-2xl font-display font-bold text-saejaedang-deep mb-6">
                주문 제품
              </h2>
              <div className="space-y-3">
                {getSelectedProducts().map(item => (
                  <div key={item.productId} className="flex justify-between items-center p-4 rounded-hanok bg-hanok-ivory/30">
                    <div>
                      <p className="font-bold text-saejaedang-deep">{item.productNameKo}</p>
                      <p className="text-sm text-saejaedang-light">수량: {item.quantity}개</p>
                    </div>
                    <p className="font-bold text-saejaedang-primary">
                      ₩ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-saejaedang-light/20 flex justify-between items-center">
                <span className="text-xl font-bold text-saejaedang-deep">총 금액</span>
                <span className="text-3xl font-bold text-saejaedang-primary">
                  ₩ {calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <h2 className="text-2xl font-display font-bold text-saejaedang-deep mb-6">
                배송 정보
              </h2>
              <div className="space-y-3 text-saejaedang-medium">
                <div className="flex">
                  <span className="w-24 font-medium text-saejaedang-deep">이름:</span>
                  <span>{customerInfo.name}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium text-saejaedang-deep">전화번호:</span>
                  <span>{customerInfo.phone}</span>
                </div>
                {customerInfo.email && (
                  <div className="flex">
                    <span className="w-24 font-medium text-saejaedang-deep">이메일:</span>
                    <span>{customerInfo.email}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="w-24 font-medium text-saejaedang-deep">주소:</span>
                  <div>
                    <p>({customerInfo.address?.postalCode}) {customerInfo.address?.province} {customerInfo.address?.city}</p>
                    <p>{customerInfo.address?.street}</p>
                  </div>
                </div>
                {customerInfo.deliveryNote && (
                  <div className="flex">
                    <span className="w-24 font-medium text-saejaedang-deep">배송메모:</span>
                    <span>{customerInfo.deliveryNote}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-saejaedang-light/40 text-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20"
                />
                <span className="text-sm text-saejaedang-medium">
                  개인정보 수집 및 이용에 동의합니다.
                  <span className="text-korean-red">*</span>
                  <br />
                  <span className="text-xs text-saejaedang-light">
                    주문 처리를 위해 이름, 전화번호, 주소 정보가 수집됩니다.
                  </span>
                </span>
              </label>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-4">
              <button
                onClick={() => setOrderStep('delivery')}
                className="flex-1 py-4 border-2 border-saejaedang-light/30 text-saejaedang-medium rounded-hanok font-medium hover:bg-hanok-ivory/30 transition-all"
              >
                이전
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={!agreedToTerms}
                className="flex-1 py-4 bg-gradient-hanok text-hanok-ivory rounded-hanok font-bold hover:shadow-hanok transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                주문 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
