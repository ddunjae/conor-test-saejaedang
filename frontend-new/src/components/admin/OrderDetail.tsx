import React, { useState } from 'react';
import { Order } from '../../types';
import { CornerFrame } from '../common/KoreanOrnament';

interface OrderDetailProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order, onUpdateStatus, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order.status);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [notes, setNotes] = useState(order.notes || '');

  const statusOptions = [
    { value: 'pending', label: '대기', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { value: 'confirmed', label: '확인', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { value: 'preparing', label: '준비중', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { value: 'shipped', label: '배송중', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { value: 'delivered', label: '완료', color: 'bg-green-100 text-green-800 border-green-300' },
    { value: 'cancelled', label: '취소', color: 'bg-red-100 text-red-800 border-red-300' },
  ];

  const handleSave = () => {
    onUpdateStatus(order.id, selectedStatus);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStatusBadge = statusOptions.find(s => s.value === order.status);

  return (
    <div className="fixed inset-0 bg-saejaedang-deep/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-ceramic animate-slide-up">
        <CornerFrame position="top-left" size="md" className="opacity-20" />
        <CornerFrame position="bottom-right" size="md" className="opacity-20" />

        {/* Header */}
        <div className="sticky top-0 bg-gradient-hanok text-hanok-ivory px-8 py-6 rounded-t-[2rem] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold mb-1">
              주문 상세
            </h2>
            <p className="text-sm text-hanok-sand">
              주문번호: {order.orderNumber}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Order Status */}
          <div className="bg-hanok-ivory rounded-ceramic p-6 border-2 border-saejaedang-light/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-saejaedang-deep">
                주문 상태
              </h3>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${currentStatusBadge?.color}`}>
                {currentStatusBadge?.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-saejaedang-light">주문일시:</span>
                <p className="text-saejaedang-deep font-medium mt-1">
                  {new Date(order.createdAt).toLocaleString('ko-KR')}
                </p>
              </div>
              {order.shippedAt && (
                <div>
                  <span className="text-saejaedang-light">발송일시:</span>
                  <p className="text-saejaedang-deep font-medium mt-1">
                    {new Date(order.shippedAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              )}
              {order.deliveredAt && (
                <div>
                  <span className="text-saejaedang-light">배송완료:</span>
                  <p className="text-saejaedang-deep font-medium mt-1">
                    {new Date(order.deliveredAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-ceramic p-6 border-2 border-saejaedang-light/10">
            <h3 className="text-lg font-display font-bold text-saejaedang-deep mb-4">
              고객 정보
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-saejaedang-light">이름:</span>
                <p className="text-saejaedang-deep font-medium mt-1">{order.customer.name}</p>
              </div>
              <div>
                <span className="text-saejaedang-light">연락처:</span>
                <p className="text-saejaedang-deep font-medium mt-1">{order.customer.phone}</p>
              </div>
              <div>
                <span className="text-saejaedang-light">이메일:</span>
                <p className="text-saejaedang-deep font-medium mt-1">{order.customer.email}</p>
              </div>
              <div>
                <span className="text-saejaedang-light">배송지:</span>
                <p className="text-saejaedang-deep font-medium mt-1">
                  {order.customer.address.street}, {order.customer.address.city}<br />
                  {order.customer.address.province} {order.customer.address.postalCode}
                </p>
              </div>
              {order.customer.deliveryNote && (
                <div className="md:col-span-2">
                  <span className="text-saejaedang-light">배송 메모:</span>
                  <p className="text-saejaedang-deep font-medium mt-1 bg-hanok-ivory p-3 rounded-hanok">
                    {order.customer.deliveryNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-ceramic p-6 border-2 border-saejaedang-light/10">
            <h3 className="text-lg font-display font-bold text-saejaedang-deep mb-4">
              주문 상품
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-hanok-ivory rounded-hanok">
                  <div className="flex-1">
                    <h4 className="font-medium text-saejaedang-deep">{item.productNameKo}</h4>
                    <p className="text-sm text-saejaedang-light">{item.productName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-saejaedang-light">수량: {item.quantity}개</p>
                    <p className="font-bold text-saejaedang-primary">₩ {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t-2 border-saejaedang-light/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold text-saejaedang-deep">총 금액</span>
                <span className="text-2xl font-bold text-saejaedang-primary">
                  ₩ {order.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-saejaedang-light">결제 방법:</span>
                <span className="text-saejaedang-medium font-medium">
                  {order.paymentMethod === 'card' ? '카드' : order.paymentMethod === 'transfer' ? '계좌이체' : '현금'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 text-sm">
                <span className="text-saejaedang-light">결제 상태:</span>
                <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus === 'paid' ? '결제완료' : order.paymentStatus === 'refunded' ? '환불' : '결제대기'}
                </span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-ceramic p-6 border-2 border-saejaedang-light/10">
            <h3 className="text-lg font-display font-bold text-saejaedang-deep mb-4">
              상태 업데이트
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  주문 상태 변경
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {(selectedStatus === 'shipped' || order.status === 'shipped') && (
                <div>
                  <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                    운송장 번호
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="운송장 번호를 입력하세요"
                    className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-saejaedang-deep mb-2">
                  관리자 메모
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="주문에 대한 메모를 입력하세요"
                  rows={3}
                  className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-white border-2 border-saejaedang-light/20 text-saejaedang-primary rounded-hanok hover:bg-hanok-ivory transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              <span>인쇄</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-hanok hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-hanok text-hanok-ivory rounded-hanok hover:shadow-hanok transition-all duration-200 font-medium"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
