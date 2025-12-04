import React from 'react';
import { KoreanOrnament, LotusOrnament } from '../common/KoreanOrnament';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-korean-paper via-hanok-ivory to-korean-paper overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-paper-texture"></div>

      {/* Floating ornamental circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-saejaedang-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-hanok-gold/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Subtitle badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-saejaedang-light/20 shadow-paper">
              <div className="w-2 h-2 rounded-full bg-hanok-gold animate-pulse"></div>
              <span className="text-sm text-saejaedang-deep font-medium">
                문경 전통의 맛
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-saejaedang-deep leading-tight">
                새재당의
                <br />
                <span className="text-saejaedang-primary">정성</span>을
                <br />
                전합니다
              </h1>

              <p className="text-lg text-saejaedang-light leading-relaxed max-w-xl">
                문경 새재의 정통 게이트웨이빵과 오메기떡.
                <br />
                전통 방식 그대로, 손으로 빚은 우리의 맛을 느껴보세요.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-gradient-hanok text-hanok-ivory rounded-ceramic hover:shadow-ceramic transition-all duration-300 overflow-hidden">
                <span className="relative z-10 font-medium flex items-center space-x-2">
                  <span>제품 둘러보기</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-saejaedang-deep scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <button className="px-8 py-4 bg-white text-saejaedang-primary rounded-ceramic hover:bg-hanok-ivory border-2 border-saejaedang-light/30 hover:border-saejaedang-primary/50 transition-all duration-300 font-medium">
                새재당 이야기
              </button>
            </div>

            {/* Features badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-saejaedang-medium">
                <div className="w-8 h-8 rounded-full bg-hanok-ivory flex items-center justify-center">
                  <svg className="w-4 h-4 text-saejaedang-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="font-medium">전통 제조법</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-saejaedang-medium">
                <div className="w-8 h-8 rounded-full bg-hanok-ivory flex items-center justify-center">
                  <svg className="w-4 h-4 text-saejaedang-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
                  </svg>
                </div>
                <span className="font-medium">당일 생산</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-saejaedang-medium">
                <div className="w-8 h-8 rounded-full bg-hanok-ivory flex items-center justify-center">
                  <svg className="w-4 h-4 text-saejaedang-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="font-medium">품질 보증</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative lg:h-[500px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main product showcase card */}
              <div className="relative bg-white rounded-[2rem] p-8 shadow-ceramic border border-saejaedang-light/10">
                {/* Corner ornaments */}
                <KoreanOrnament position="top-left" size="md" color="#1d5c52" />
                <KoreanOrnament position="bottom-right" size="md" color="#b37a42" />

                {/* Placeholder for product image */}
                <div className="aspect-square rounded-ceramic bg-gradient-to-br from-hanok-beige/30 to-hanok-gold/20 flex items-center justify-center mb-6 border-2 border-dashed border-saejaedang-light/20">
                  <div className="text-center space-y-2">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-hanok flex items-center justify-center shadow-hanok">
                      <svg className="w-12 h-12 text-hanok-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </div>
                    <p className="text-sm text-saejaedang-light font-medium">
                      게이트웨이빵
                    </p>
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold text-saejaedang-deep">
                      새재 게이트웨이빵
                    </h3>
                    <span className="px-3 py-1 bg-hanok-gold/20 text-hanok-gold rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>

                  <p className="text-sm text-saejaedang-light leading-relaxed">
                    문경 새재를 넘나드는 이들을 위한 든든한 간식.
                    전통 방식으로 48시간 발효한 건강한 맛입니다.
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-saejaedang-light/10">
                    <span className="text-2xl font-bold text-saejaedang-primary">
                      ₩ 4,500
                    </span>
                    <button className="px-4 py-2 bg-saejaedang-primary text-hanok-ivory rounded-hanok hover:bg-saejaedang-deep transition-colors duration-200 text-sm font-medium">
                      담기
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -right-6 -bottom-6 bg-white rounded-2xl p-4 shadow-hanok border border-saejaedang-light/10 transform rotate-3">
                <LotusOrnament position="top-right" size="sm" color="#b37a42" />
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-hanok-beige flex items-center justify-center">
                    <span className="text-xl">🍚</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-saejaedang-deep">오메기떡</p>
                    <p className="text-xs text-saejaedang-light">제주 전통 떡</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
