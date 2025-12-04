import React from 'react';
import { CornerFrame } from '../common/KoreanOrnament';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-saejaedang-deep text-hanok-ivory overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-hanok-gold via-saejaedang-primary to-hanok-gold"></div>

      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-hanok-gold/5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-saejaedang-primary/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hanok-gold to-hanok-beige flex items-center justify-center shadow-hanok">
                <span className="text-saejaedang-deep font-display text-xl font-bold">
                  새
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">새재당</h3>
                <p className="text-xs text-hanok-sand tracking-wider">SAEJAEDANG</p>
              </div>
            </div>

            <p className="text-hanok-sand leading-relaxed mb-6 max-w-md">
              문경 새재의 전통을 이어가는 우리의 게이트웨이빵과 오메기떡.
              3대째 전해 내려오는 정성과 맛을 느껴보세요.
            </p>

            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-hanok-gold"></div>
              <div className="w-3 h-3 rounded-full bg-hanok-beige"></div>
              <div className="w-3 h-3 rounded-full bg-hanok-gold"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4 text-hanok-ivory">
              빠른 링크
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-hanok-sand hover:text-hanok-gold transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hanok-gold/50"></span>
                  <span>소개</span>
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-hanok-sand hover:text-hanok-gold transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hanok-gold/50"></span>
                  <span>제품</span>
                </a>
              </li>
              <li>
                <a
                  href="#order"
                  className="text-hanok-sand hover:text-hanok-gold transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hanok-gold/50"></span>
                  <span>주문</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-hanok-sand hover:text-hanok-gold transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hanok-gold/50"></span>
                  <span>문의</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4 text-hanok-ivory">
              연락처
            </h4>
            <ul className="space-y-3 text-hanok-sand">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-hanok-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-sm">
                  경상북도 문경시 새재로<br />
                  문경새재 제1관문 인근
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-hanok-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-sm">054-XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-hanok-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm">info@saejaedang.kr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hanok-ivory/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-hanok-sand">
              © {new Date().getFullYear()} 새재당 (Saejaedang). All rights reserved.
            </p>

            <div className="flex items-center space-x-6 text-sm text-hanok-sand">
              <a href="#" className="hover:text-hanok-gold transition-colors duration-200">
                개인정보처리방침
              </a>
              <span className="text-hanok-ivory/20">|</span>
              <a href="#" className="hover:text-hanok-gold transition-colors duration-200">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corner ornaments */}
      <CornerFrame position="bottom-left" size="md" color="#f0e6d2" className="opacity-10" />
      <CornerFrame position="bottom-right" size="md" color="#f0e6d2" className="opacity-10" />
    </footer>
  );
};

export default Footer;
