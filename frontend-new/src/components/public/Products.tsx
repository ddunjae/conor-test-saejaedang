import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bread' | 'ricecake'>('all');

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: '전체', labelEn: 'All' },
    { id: 'bread', label: '빵', labelEn: 'Bread' },
    { id: 'ricecake', label: '떡', labelEn: 'Rice Cake' },
  ];

  return (
    <section id="products" className="relative py-20 lg:py-28 bg-gradient-to-br from-korean-paper via-hanok-ivory to-korean-paper overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-paper-texture"></div>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-saejaedang-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-hanok-gold/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-saejaedang-light/20 shadow-paper mb-6">
            <div className="w-2 h-2 rounded-full bg-hanok-gold animate-pulse"></div>
            <span className="text-sm text-saejaedang-deep font-medium">
              Products
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-display font-bold text-saejaedang-deep mb-4">
            우리의 제품
          </h2>
          <p className="text-lg text-saejaedang-light max-w-2xl mx-auto leading-relaxed">
            전통 방식으로 정성껏 만든 새재당의 특별한 맛
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-white rounded-ceramic p-2 shadow-paper border border-saejaedang-light/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`relative px-6 py-3 rounded-hanok text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-hanok text-hanok-ivory shadow-hanok'
                    : 'text-saejaedang-medium hover:text-saejaedang-primary hover:bg-hanok-ivory'
                }`}
              >
                <span className="relative z-10">
                  {category.label}
                  <span className="block text-[10px] opacity-70 uppercase tracking-wider">
                    {category.labelEn}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-hanok-ivory mb-4">
              <svg className="w-10 h-10 text-saejaedang-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
            </div>
            <p className="text-saejaedang-light">해당 카테고리에 제품이 없습니다.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center bg-white rounded-ceramic p-8 shadow-ceramic border border-hanok-gold/20">
            <div className="w-16 h-16 rounded-full bg-gradient-hanok flex items-center justify-center shadow-hanok mb-4">
              <svg className="w-8 h-8 text-hanok-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-saejaedang-deep mb-2">
              주문 문의
            </h3>
            <p className="text-sm text-saejaedang-light mb-4 max-w-md">
              대량 주문이나 특별 요청사항이 있으신가요?<br />
              언제든지 연락 주시면 친절히 안내해 드리겠습니다.
            </p>
            <button className="px-8 py-3 bg-gradient-hanok text-hanok-ivory rounded-ceramic hover:shadow-ceramic transition-all duration-300 font-medium">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
