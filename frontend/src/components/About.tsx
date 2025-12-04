import React, { useEffect, useState } from 'react';
import './About.css';

interface CafeInfo {
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
}

/**
 * About Component
 * Displays information about SaeJaeDang cafe
 */
const About: React.FC = () => {
  const [cafeInfo, setCafeInfo] = useState<CafeInfo | null>(null);

  useEffect(() => {
    const fetchCafeInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/info');
        const data = await response.json();
        setCafeInfo(data);
      } catch (error) {
        console.error('Error fetching cafe info:', error);
        // Fallback data
        setCafeInfo({
          name: '새재당',
          nameEn: 'SaeJaeDang',
          tagline: '전통과 현대가 만나는 곳',
          taglineEn: 'Where tradition meets modernity',
          description: '새재당은 우리의 전통 방식을 고수하면서도 현대적인 감각을 더한 카페 베이커리입니다. 정성스럽게 만든 빵과 전통 떡을 통해 한국의 맛과 정을 전합니다.',
          descriptionEn: 'SaeJaeDang is a cafe bakery that combines traditional Korean methods with modern sensibilities.'
        });
      }
    };

    fetchCafeInfo();
  }, []);

  if (!cafeInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          {/* Left side - Image/Visual */}
          <div className="about-visual">
            <div className="visual-card">
              <div className="visual-pattern"></div>
              <div className="visual-text">
                <h3 className="visual-title">새재당</h3>
                <p className="visual-subtitle">SaeJaeDang</p>
              </div>
            </div>
          </div>

          {/* Right side - Text Content */}
          <div className="about-text">
            <h2 className="section-title">About Us</h2>
            <p className="about-tagline">{cafeInfo.tagline}</p>

            <div className="about-description">
              <p>{cafeInfo.description}</p>
            </div>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🍞</div>
                <div className="feature-content">
                  <h4 className="feature-title">수제 빵</h4>
                  <p className="feature-description">
                    매일 아침 정성스럽게 구워내는 신선한 빵
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🍡</div>
                <div className="feature-content">
                  <h4 className="feature-title">전통 떡</h4>
                  <p className="feature-description">
                    옛 방식 그대로 만드는 우리 떡
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🌾</div>
                <div className="feature-content">
                  <h4 className="feature-title">엄선된 재료</h4>
                  <p className="feature-description">
                    국내산 우수 재료만을 사용합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
