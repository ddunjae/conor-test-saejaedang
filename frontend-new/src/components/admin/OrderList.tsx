import React, { useState } from 'react';
import { Order, OrderFilters } from '../../types';

interface OrderListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onViewOrder, onUpdateStatus }) => {
  const [filters, setFilters] = useState<OrderFilters>({
    status: [],
    searchQuery: '',
  });

  const [sortField, setSortField] = useState<'createdAt' | 'totalAmount'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Status options
  const statusOptions = [
    { value: 'pending', label: '대기', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: '확인', color: 'bg-blue-100 text-blue-800' },
    { value: 'preparing', label: '준비중', color: 'bg-purple-100 text-purple-800' },
    { value: 'shipped', label: '배송중', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'delivered', label: '완료', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: '취소', color: 'bg-red-100 text-red-800' },
  ];

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Status filter
      if (filters.status && filters.status.length > 0 && !filters.status.includes(order.status)) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.phone.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === 'totalAmount') {
        comparison = a.totalAmount - b.totalAmount;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleStatusToggle = (status: Order['status']) => {
    setFilters(prev => {
      const currentStatuses = prev.status || [];
      const newStatuses = currentStatuses.includes(status)
        ? currentStatuses.filter(s => s !== status)
        : [...currentStatuses, status];

      return { ...prev, status: newStatuses };
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption : { label: status, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-saejaedang-deep">
            주문 관리
          </h2>
          <p className="text-sm text-saejaedang-light mt-1">
            총 {filteredOrders.length}개의 주문
          </p>
        </div>

        <button className="px-6 py-3 bg-gradient-hanok text-hanok-ivory rounded-hanok hover:shadow-hanok transition-all duration-200 font-medium text-sm">
          주문 내보내기
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-ceramic p-6 shadow-paper border border-saejaedang-light/10 space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-saejaedang-deep mb-2">
            검색
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="주문번호, 고객명, 전화번호로 검색..."
              className="w-full pl-10 pr-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-saejaedang-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-saejaedang-deep mb-2">
            주문 상태
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusToggle(status.value as Order['status'])}
                className={`px-4 py-2 rounded-hanok text-sm font-medium transition-all duration-200 ${
                  filters.status?.includes(status.value as Order['status'])
                    ? status.color + ' ring-2 ring-offset-2 ring-saejaedang-primary'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-saejaedang-deep mb-2">
              정렬 기준
            </label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none"
            >
              <option value="createdAt">주문일시</option>
              <option value="totalAmount">주문금액</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-saejaedang-deep mb-2">
              정렬 방향
            </label>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as any)}
              className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none"
            >
              <option value="desc">내림차순</option>
              <option value="asc">오름차순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-ceramic shadow-paper border border-saejaedang-light/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-hanok-ivory border-b border-saejaedang-light/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">주문번호</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">고객명</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">연락처</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">주문일시</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">금액</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">상태</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-saejaedang-deep">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-saejaedang-light/10">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);

                  return (
                    <tr key={order.id} className="hover:bg-hanok-ivory/30 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-medium text-saejaedang-deep">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-saejaedang-medium">
                        {order.customer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-saejaedang-medium">
                        {order.customer.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-saejaedang-medium">
                        {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-saejaedang-primary">
                        ₩ {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="text-sm text-saejaedang-primary hover:text-saejaedang-deep font-medium transition-colors duration-200"
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <svg className="w-12 h-12 text-saejaedang-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                      </svg>
                      <p className="text-saejaedang-light">조건에 맞는 주문이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
