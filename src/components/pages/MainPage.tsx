import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import { getSortedMousepads, CLOTHING } from '../../data/products';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProductClick = (productData: any) => {
    navigate('/product', { state: { productData } });
  };

  const sortedMousepads = getSortedMousepads();
  const clothing = CLOTHING;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main layout container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-4 sm:px-8 md:px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header />
          </div>
        </div>

        {/* Main content - centered with full viewport height */}
        <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
            
            {/* Logo or Brand Name */}
            <div className="px-2">
              <h1 className="text-white font-manrope font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_40px_rgb(0_0_0_/_100%)] leading-tight">
                RECRENT SHOP
              </h1>
            </div>

            {/* CTA Button */}
            <div className="pt-6 sm:pt-8">
              <button
                onClick={() => navigate('/catalog')}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 bg-black/70 hover:bg-black/80 border-2 border-white/60 hover:border-white rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,1)] active:scale-95"
              >
                <span className="text-white font-manrope font-semibold text-sm sm:text-base md:text-xl lg:text-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%)] whitespace-nowrap">
                  Перейти в каталог
                </span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] sm:w-6 sm:h-6"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Animated scroll indicator */}
            <div className="pt-8 sm:pt-12 md:pt-16 animate-bounce hidden sm:block">
              <div className="flex flex-col items-center gap-3">
                <p className="text-white/70 font-manrope font-medium text-xs sm:text-sm uppercase tracking-widest">
                  Листай вниз
                </p>
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/70 sm:w-8 sm:h-8"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            </div>

          </div>
        </main>

        {/* Product sections below */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-8 sm:pb-12 md:pb-16">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-[1400px] mx-auto">
            {/* Mousepads Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-8">
              <SectionHeader 
                title="Коврики для мыши" 
                onShowAll={() => navigate('/catalog')}
              />
              <div className="pb-6 sm:pb-8 md:pb-12 px-2 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8">
                <ProductCarousel itemsPerView={3}>
                  {sortedMousepads.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      subtitle={product.subtitle}
                      productSize={product.productSize}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="small-catalog"
                      onAddToCart={() => {}}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>

            {/* Clothing Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-8">
              <SectionHeader 
                title="Одежда"
                onShowAll={() => navigate('/catalog')}
              />
              <div className="pb-6 sm:pb-8 md:pb-12 px-2 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8">
                <ProductCarousel itemsPerView={3}>
                  {clothing.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      subtitle={product.subtitle}
                      productColor={product.productColor}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="small-catalog"
                      onAddToCart={() => {}}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </div>
        </section>

        {/* Social links - moved to bottom */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-black/50 backdrop-blur-lg border border-white/20 sm:border-2 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
              <p className="text-white font-manrope font-bold text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider sm:tracking-widest mb-5 sm:mb-6 md:mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_0_40px_rgb(255_255_255_/_30%)] text-center">
                Следите за нами
              </p>
              
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap">
                {/* Twitch */}
                <a
                  href="https://twitch.tv/recrent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-black/80 hover:bg-purple-600/40 border border-white/40 sm:border-2 hover:border-purple-400 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)] hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/recrent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-black/80 hover:bg-blue-500/40 border border-white/40 sm:border-2 hover:border-blue-400 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.6)] hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@recrent.twitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-black/80 hover:bg-pink-600/40 border border-white/40 sm:border-2 hover:border-pink-400 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.6)] hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white group-hover:text-pink-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/c/RecrentChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-black/80 hover:bg-red-600/40 border border-white/40 sm:border-2 hover:border-red-400 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.6)] hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white group-hover:text-red-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
