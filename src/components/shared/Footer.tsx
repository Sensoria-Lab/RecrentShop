import React from 'react';
// social links intentionally not used in footer (kept in config)

/**
 * Footer Component
 * Displays copyright, social links, and developer information
 */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto">
      <div className="w-full">
        <div className="bg-black/40 backdrop-blur-3xl rounded-none w-full shadow-xl shadow-black/30">
          <div className="flex items-center justify-between gap-4 max-w-[1400px] mx-auto px-4 py-3">
            <div className="text-white/70 font-manrope font-medium text-sm sm:text-base">
              © Recrentshop.ru 2021-{year}
            </div>

            <div className="text-white/60 font-manrope text-sm opacity-90">
              Все права защищены
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
