import React, { useState } from 'react';
import { CornerFrame } from './KoreanOrnament';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicNavItems = [
    { label: '소개', labelEn: 'About', href: '#about' },
    { label: '제품', labelEn: 'Products', href: '#products' },
    { label: '주문', labelEn: 'Order', href: '#order' },
    { label: '문의', labelEn: 'Contact', href: '#contact' },
  ];

  const adminNavItems = [
    { label: '주문 목록', href: '/admin/orders' },
    { label: '제품 관리', href: '/admin/products' },
    { label: '설정', href: '/admin/settings' },
  ];

  const navItems = isAdmin ? adminNavItems : publicNavItems;

  return (
    <header className="relative bg-korean-paper border-b border-saejaedang-light/20">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-hanok"></div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              {/* Logo circle with ornament */}
              <div className="w-12 h-12 rounded-full bg-gradient-hanok flex items-center justify-center shadow-hanok group-hover:shadow-ceramic transition-shadow duration-300">
                <span className="text-hanok-ivory font-display text-xl font-bold">
                  새
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-hanok-gold animate-pulse"></div>
            </div>

            {/* Brand name */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-display text-saejaedang-primary font-bold tracking-tight">
                새재당
              </h1>
              <p className="text-xs text-saejaedang-light font-sans tracking-wider">
                SAEJAEDANG
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-saejaedang-deep hover:text-saejaedang-primary transition-colors duration-200 group"
              >
                <span className="relative z-10">
                  {item.label}
                  {!isAdmin && item.labelEn && (
                    <span className="block text-[10px] text-saejaedang-light/60 uppercase tracking-wider">
                      {item.labelEn}
                    </span>
                  )}
                </span>
                <span className="absolute inset-0 bg-hanok-ivory rounded-hanok scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></span>
              </a>
            ))}

            {!isAdmin && (
              <button className="ml-4 px-6 py-2.5 bg-gradient-hanok text-hanok-ivory rounded-ceramic hover:shadow-ceramic transition-all duration-300 font-medium text-sm">
                주문하기
              </button>
            )}

            {isAdmin && (
              <button className="ml-4 px-4 py-2 text-sm text-saejaedang-light hover:text-korean-red transition-colors duration-200">
                로그아웃
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-saejaedang-primary hover:bg-hanok-ivory transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-saejaedang-light/20 animate-slide-up">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-saejaedang-deep hover:bg-hanok-ivory rounded-hanok transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {!isAdmin && item.labelEn && (
                    <span className="block text-xs text-saejaedang-light/60 uppercase tracking-wider mt-0.5">
                      {item.labelEn}
                    </span>
                  )}
                </a>
              ))}
              {!isAdmin && (
                <button className="w-full mt-4 px-6 py-3 bg-gradient-hanok text-hanok-ivory rounded-ceramic hover:shadow-ceramic transition-all duration-300 font-medium">
                  주문하기
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Corner ornaments */}
      <CornerFrame position="top-left" size="sm" className="opacity-30" />
      <CornerFrame position="top-right" size="sm" className="opacity-30" />
    </header>
  );
};

export default Header;
