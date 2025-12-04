import React, { useState, useEffect } from 'react';
import './Gallery.css';
import LoadingSpinner from './LoadingSpinner';

interface CafeItem {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
}

/**
 * Gallery Component
 * Displays a grid of cafe items (breads and rice cakes)
 * Fetches data from the backend API
 */
const Gallery: React.FC = () => {
  const [items, setItems] = useState<CafeItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const url = activeCategory === 'all'
          ? 'http://localhost:5000/api/items'
          : `http://localhost:5000/api/items?category=${activeCategory}`;

        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        // Fallback to placeholder data if API is not available
        setItems(getPlaceholderItems());
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeCategory]);

  // Placeholder data for when backend is not running
  const getPlaceholderItems = (): CafeItem[] => {
    return [
      {
        id: 1,
        name: '단팥빵',
        nameEn: 'Red Bean Bread',
        category: 'bread',
        description: '전통 방식으로 만든 부드러운 단팥빵',
        descriptionEn: 'Traditional soft red bean bread',
        price: 3500,
        image: 'https://via.placeholder.com/400x300/d4a574/ffffff?text=단팥빵'
      },
      {
        id: 2,
        name: '크림빵',
        nameEn: 'Cream Bread',
        category: 'bread',
        description: '고소한 크림이 가득한 빵',
        descriptionEn: 'Bread filled with rich cream',
        price: 4000,
        image: 'https://via.placeholder.com/400x300/c19563/ffffff?text=크림빵'
      },
      {
        id: 3,
        name: '인절미',
        nameEn: 'Injeolmi',
        category: 'ricecake',
        description: '콩가루를 듬뿍 묻힌 쫄깃한 떡',
        descriptionEn: 'Chewy rice cake coated with soybean powder',
        price: 5000,
        image: 'https://via.placeholder.com/400x300/a8926b/ffffff?text=인절미'
      },
      {
        id: 4,
        name: '송편',
        nameEn: 'Songpyeon',
        category: 'ricecake',
        description: '계절의 맛을 담은 전통 송편',
        descriptionEn: 'Traditional half-moon shaped rice cake',
        price: 6000,
        image: 'https://via.placeholder.com/400x300/8b7355/ffffff?text=송편'
      }
    ];
  };

  const categories = [
    { id: 'all', name: '전체', nameEn: 'All' },
    { id: 'bread', name: '빵', nameEn: 'Bread' },
    { id: 'ricecake', name: '떡', nameEn: 'Rice Cake' },
    { id: 'traditional', name: '전통 과자', nameEn: 'Traditional' }
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">정성을 담은 우리의 빵과 떡</p>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {loading ? (
          <LoadingSpinner message="상품을 불러오는 중... / Loading products..." />
        ) : (
          <div className="gallery-grid">
            {items.map(item => (
              <div key={item.id} className="gallery-item">
                <div className="item-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src =
                        `https://via.placeholder.com/400x300/d4a574/ffffff?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
                  <div className="item-overlay">
                    <span className="item-category">{item.category}</span>
                  </div>
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-name-en">{item.nameEn}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">₩{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
