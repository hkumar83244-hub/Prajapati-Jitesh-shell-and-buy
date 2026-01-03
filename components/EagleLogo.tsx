
import React from 'react';

interface EagleLogoProps {
  className?: string;
  size?: number;
}

const EagleLogo: React.FC<EagleLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5Z" 
        fill="#0F172A" 
        stroke="white" 
        strokeWidth="2"
      />
      <path 
        d="M20 50C20 40 30 30 50 25C70 30 80 40 80 50C80 70 50 85 50 85C50 85 20 70 20 50Z" 
        fill="#1E40AF" 
      />
      {/* Stylized Eagle Head */}
      <path 
        d="M50 35C45 35 35 42 35 55C35 65 50 75 50 75C50 75 65 65 65 55C65 42 55 35 50 35Z" 
        fill="white" 
      />
      <path 
        d="M50 45C55 45 58 48 58 52L50 62L42 52C42 48 45 45 50 45Z" 
        fill="#3B82F6" 
      />
      <path 
        d="M50 62L46 58H54L50 62Z" 
        fill="#F59E0B" 
      />
      <circle cx="43" cy="52" r="1.5" fill="#0F172A" />
      <circle cx="57" cy="52" r="1.5" fill="#0F172A" />
      {/* Wings detail */}
      <path d="M15 45L25 50L15 55L10 50L15 45Z" fill="#3B82F6" />
      <path d="M85 45L75 50L85 55L90 50L85 45Z" fill="#3B82F6" />
    </svg>
  );
};

export default EagleLogo;
