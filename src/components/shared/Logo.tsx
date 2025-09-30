import React from 'react';

interface LogoProps {
  onNavigate: (page: string) => void;
}

const Logo: React.FC<LogoProps> = ({ onNavigate }) => (
  <div
    onClick={() => onNavigate('main')}
    className="relative w-12 h-12 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
  >
    <img
      src="/images/ui/logo.svg"
      alt="Logo"
      className="w-full h-full object-contain"
    />
  </div>
);

export default Logo;