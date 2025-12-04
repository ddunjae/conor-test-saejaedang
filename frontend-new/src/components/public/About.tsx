import React from 'react';
import { CornerFrame, LotusOrnament } from '../common/KoreanOrnament';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-korean-paper overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-paper-texture"></div>
      <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-hanok-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-saejaedang-primary/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-saejaedang-light/20 shadow-paper mb-6">
            <div className="w-2 h-2 rounded-full bg-hanok-gold animate-pulse"></div>
            <span className="text-sm text-saejaedang-deep font-medium">
              Our Story
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-display font-bold text-saejaedang-deep mb-4">
            새재당 이야기
          </h2>
          <p className="text-lg text-saejaedang-light max-w-2xl mx-auto leading-relaxed">
            문경 새재의 전통을 이어가는 우리의 여정
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Story Card 1 */}
            <div className="relative bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <CornerFrame position="top-left" size="sm" className="opacity-30" />

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-hanok flex items-center justify-center shadow-hanok">
                  <svg className="w-6 h-6 text-hanok-ivory" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-saejaedang-deep mb-3">
                    전통 제조법의 계승
                  </h3>
                  <p className="text-saejaedang-light leading-relaxed">
                    문경 새재를 넘나들던 행인들에게 힘을 북돋아 주던 게이트웨이빵.
                    3대째 이어온 전통 발효 방식과 손맛을 그대로 보존하여,
                    옛 맛을 현대에 전합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="relative bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <CornerFrame position="top-right" size="sm" className="opacity-30" />

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hanok-beige flex items-center justify-center shadow-hanok">
                  <svg className="w-6 h-6 text-saejaedang-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-saejaedang-deep mb-3">
                    정성과 품질
                  </h3>
                  <p className="text-saejaedang-light leading-relaxed">
                    매일 아침 직접 반죽하고 발효하여 당일 생산한 신선한 제품만을 판매합니다.
                    엄선된 국내산 재료와 정성스러운 손길로 만든 건강한 맛을 약속드립니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="relative bg-white rounded-ceramic p-8 shadow-paper border border-saejaedang-light/10">
              <CornerFrame position="bottom-left" size="sm" className="opacity-30" />

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hanok-gold/20 flex items-center justify-center shadow-hanok">
                  <svg className="w-6 h-6 text-hanok-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-saejaedang-deep mb-3">
                    문경 새재의 맛
                  </h3>
                  <p className="text-saejaedang-light leading-relaxed">
                    경상북도 문경시에 위치한 새재당은 문경새재 제1관문 근처에서
                    지역의 특색을 담은 전통 간식을 만들고 있습니다.
                    문경을 방문하시는 모든 분들께 특별한 추억을 선사합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Main feature card */}
              <div className="relative bg-gradient-to-br from-hanok-ivory to-hanok-beige rounded-[2rem] p-10 shadow-ceramic border-2 border-hanok-gold/20">
                <LotusOrnament position="top-right" size="md" color="#b37a42" />
                <LotusOrnament position="bottom-left" size="md" color="#1d5c52" />

                <div className="relative space-y-6">
                  {/* Decorative top */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-hanok shadow-ceramic mb-4">
                      <span className="text-3xl text-hanok-ivory font-display">새</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-saejaedang-deep">
                      전통의 가치
                    </h3>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-hanok p-4 text-center border border-saejaedang-light/10">
                      <div className="text-3xl font-bold text-saejaedang-primary mb-1">3대</div>
                      <div className="text-sm text-saejaedang-light font-medium">가업 계승</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-hanok p-4 text-center border border-saejaedang-light/10">
                      <div className="text-3xl font-bold text-saejaedang-primary mb-1">48시간</div>
                      <div className="text-sm text-saejaedang-light font-medium">자연 발효</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-hanok p-4 text-center border border-saejaedang-light/10">
                      <div className="text-3xl font-bold text-saejaedang-primary mb-1">100%</div>
                      <div className="text-sm text-saejaedang-light font-medium">국내산 재료</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-hanok p-4 text-center border border-saejaedang-light/10">
                      <div className="text-3xl font-bold text-saejaedang-primary mb-1">당일</div>
                      <div className="text-sm text-saejaedang-light font-medium">신선 제조</div>
                    </div>
                  </div>

                  {/* Traditional pattern decoration */}
                  <div className="flex justify-center space-x-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-hanok-gold"></div>
                    <div className="w-2 h-2 rounded-full bg-saejaedang-primary"></div>
                    <div className="w-2 h-2 rounded-full bg-hanok-gold"></div>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-hanok border border-hanok-gold/20 transform -rotate-3">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏔️</div>
                  <p className="text-sm font-bold text-saejaedang-deep">문경 새재</p>
                  <p className="text-xs text-saejaedang-light">Mungyeong Saejae</p>
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
