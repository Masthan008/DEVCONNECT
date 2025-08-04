import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md', withText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  const iconSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;
  
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg 
          viewBox="0 0 64 64" 
          className={`${iconSize} text-blue-600`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Code bracket left */}
          <path 
            d="M20 12L10 32L20 52" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Code bracket right */}
          <path 
            d="M44 12L54 32L44 52" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Connection line */}
          <path 
            d="M36 8L28 56" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Connection nodes */}
          <circle cx="16" cy="32" r="4" fill="currentColor" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
          <circle cx="48" cy="32" r="4" fill="currentColor" />
        </svg>
      </div>
      
      {withText && (
        <div className={`font-bold ${textSize}`}>
          <span className="text-blue-600">Dev</span>
          <span className="text-gray-800 dark:text-white">Connect</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;