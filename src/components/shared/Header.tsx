import React from 'react';

interface HeaderProps {
  className?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onNavigate }) => {
  return (
    <header className={`bg-black/75 backdrop-blur-xl border border-black rounded-xl px-8 py-3 ${className}`}>
      <div className="flex gap-12 items-center justify-between">
        {/* Logo icon at the beginning */}
        <button
          onClick={() => onNavigate?.('main')}
          className="w-8 h-8 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/ui/logo.svg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Navigation buttons in the center */}
        <div className="flex gap-12 items-center justify-center">
          <button
            onClick={() => onNavigate?.('catalog')}
            className="font-manrope font-semibold text-lg text-white hover:text-gray-200 transition-colors duration-200"
          >
            Каталог
          </button>
          <button
            onClick={() => onNavigate?.('contacts')}
            className="font-manrope font-semibold text-lg text-white hover:text-gray-200 transition-colors duration-200"
          >
            Контакты
          </button>
          <button
            onClick={() => onNavigate?.('info')}
            className="font-manrope font-semibold text-lg text-white hover:text-gray-200 transition-colors duration-200"
          >
            Информация
          </button>
        </div>

        {/* Shopping cart icon at the end */}
        <button className="w-8 h-8 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src="/images/ui/shopping-cart.svg"
            alt="Shopping Cart"
            className="w-full h-full object-contain filter invert"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;