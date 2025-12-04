import React from 'react';
import { Product } from '../../types';
import { KoreanOrnament } from '../common/KoreanOrnament';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-ceramic p-6 shadow-paper hover:shadow-ceramic transition-all duration-300 border border-saejaedang-light/10">
      {/* Corner ornaments */}
      <KoreanOrnament position="top-left" size="sm" color="#1d5c52" />
      <KoreanOrnament position="bottom-right" size="sm" color="#b37a42" />

      {/* Product Image */}
      <div className="relative aspect-square rounded-hanok overflow-hidden mb-4 bg-gradient-to-br from-hanok-beige/30 to-hanok-gold/20 border-2 border-dashed border-saejaedang-light/20">
        {product.image ? (
          <img
            src={product.image}
            alt={product.nameKo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-hanok flex items-center justify-center shadow-hanok">
                <svg className="w-10 h-10 text-hanok-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="px-3 py-1 bg-hanok-gold/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-sm">
              인기
            </span>
          )}
          {!product.isAvailable && (
            <span className="px-3 py-1 bg-korean-red/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-sm">
              품절
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Category Badge */}
        <div className="inline-flex items-center px-2 py-1 bg-hanok-ivory rounded-hanok">
          <span className="text-xs text-saejaedang-medium font-medium">
            {product.category === 'bread' ? '빵' : '떡'}
          </span>
        </div>

        {/* Product Name */}
        <div>
          <h3 className="text-xl font-display font-bold text-saejaedang-deep mb-1">
            {product.nameKo}
          </h3>
          <p className="text-sm text-saejaedang-light">
            {product.name}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-saejaedang-light leading-relaxed line-clamp-2">
          {product.descriptionKo}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-saejaedang-light/10">
          <div>
            <span className="text-2xl font-bold text-saejaedang-primary">
              ₩ {product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={`px-5 py-2.5 rounded-hanok text-sm font-medium transition-all duration-200 ${
              product.isAvailable
                ? 'bg-saejaedang-primary text-hanok-ivory hover:bg-saejaedang-deep hover:shadow-hanok'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.isAvailable ? '담기' : '품절'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
