import React from 'react';

interface KoreanOrnamentProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

/**
 * Traditional Korean cloud pattern (구름무늬) corner ornament
 * Inspired by dancheong decorative patterns
 */
export const KoreanOrnament: React.FC<KoreanOrnamentProps> = ({
  position = 'top-left',
  size = 'md',
  color = 'currentColor',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <div className={`absolute ${positionMap[position]} ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-20"
      >
        {/* Cloud pattern curves */}
        <path
          d="M 0,20 Q 15,10 25,15 Q 35,20 40,10 Q 45,0 55,5 L 55,0 L 0,0 Z"
          fill={color}
          className="opacity-60"
        />
        <path
          d="M 20,0 Q 10,15 15,25 Q 20,35 10,40 Q 0,45 5,55 L 0,55 L 0,0 Z"
          fill={color}
          className="opacity-60"
        />

        {/* Decorative dots */}
        <circle cx="12" cy="12" r="2" fill={color} className="opacity-80" />
        <circle cx="22" cy="8" r="1.5" fill={color} className="opacity-60" />
        <circle cx="8" cy="22" r="1.5" fill={color} className="opacity-60" />

        {/* Small curved accent */}
        <path
          d="M 30,25 Q 35,30 30,35"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-40"
          fill="none"
        />
      </svg>
    </div>
  );
};

/**
 * Simplified lotus petal ornament (연꽃무늬)
 */
export const LotusOrnament: React.FC<KoreanOrnamentProps> = ({
  position = 'top-left',
  size = 'md',
  color = 'currentColor',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <div className={`absolute ${positionMap[position]} ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-15"
      >
        {/* Lotus petals */}
        <path
          d="M 50,5 Q 30,20 25,35 Q 25,45 35,50 Q 25,55 25,65 Q 30,80 50,95 Z"
          fill={color}
        />
        <path
          d="M 5,50 Q 20,30 35,25 Q 45,25 50,35 Q 55,25 65,25 Q 80,30 95,50 Z"
          fill={color}
        />

        {/* Center circle */}
        <circle cx="50" cy="50" r="8" fill={color} className="opacity-40" />
      </svg>
    </div>
  );
};

/**
 * Decorative corner frame
 */
export const CornerFrame: React.FC<KoreanOrnamentProps> = ({
  position = 'top-left',
  size = 'md',
  color = '#1d5c52',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-[-1]',
  };

  return (
    <div className={`absolute ${positionMap[position]} ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer frame line */}
        <path
          d="M 0,0 L 0,40 Q 0,45 5,45 L 10,45"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-30"
        />
        <path
          d="M 0,0 L 40,0 Q 45,0 45,5 L 45,10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-30"
        />

        {/* Inner decorative curve */}
        <path
          d="M 5,5 L 5,25 Q 5,30 10,30 L 15,30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-20"
        />
        <path
          d="M 5,5 L 25,5 Q 30,5 30,10 L 30,15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-20"
        />
      </svg>
    </div>
  );
};

export default KoreanOrnament;
