import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, SEO, OrganizationStructuredData, WebsiteStructuredData, Footer } from '../shared/components';
import { ProductCard, ReviewsSection } from 'features/products/components';
import Img from '../shared/ui/Img';
import { ROUTES } from '../core/constants/routes';
import { ALL_PRODUCTS } from '../core/data/products';
import { REVIEWS } from '../core/data/reviews';
import { useProductNavigation } from 'features/products/hooks';
import { useMobileRedirect } from '../shared/hooks';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mobile-first: Auto-redirect to catalog on mobile devices
  useMobileRedirect(navigate, true);

  const navigateToCatalog = () => {
    navigate(ROUTES.CATALOG);
  };

  // Get popular products (top rated with most reviews)
  const popularProducts = [...ALL_PRODUCTS]
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * (a.reviewCount || 0);
      const scoreB = (b.rating || 0) * (b.reviewCount || 0);
      return scoreB - scoreA;
    })
    .slice(0, 4);

  // Use product navigation hook
  const { navigateToProduct } = useProductNavigation();

  return (
    <PageContainer isMainPage={true}>
      <SEO
        title="Главная"
        description="Премиальные игровые коврики для мыши и стильная одежда от RECRENT. Высокое качество, уникальный дизайн, быстрая доставка по России."
        keywords="коврик для мыши, gaming mousepad, игровой коврик, коврик xl, коврик l, recrent, одежда, худи, футболки"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />

      {/* Hero section - OPTIMIZED FOR MOBILE */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[650px]">
        {/* Animated background elements - HIDDEN ON MOBILE for performance */}
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle moving gradient spotlight */}
          <div 
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite',
            }}
          />
        </div>

        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col items-start justify-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
              
              {/* Main Title - SIMPLIFIED for mobile */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 content-reveal content-reveal-delay-1">
                <h1 
                  className="font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-white tracking-tighter leading-[0.85]"
                  style={{
                    filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.7))',
                  }}
                >
                  RECRENT
                </h1>
                <div className="flex items-baseline gap-2 sm:gap-4 md:gap-6">
                  <h2 
                    className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white/60 tracking-wide drop-shadow-[0_5px_25px_rgba(0,0,0,0.6)]"
                  >
                    SHOP
                  </h2>
                </div>
              </div>

              {/* CTA Button - SIMPLIFIED */}
              <div className="w-full content-reveal content-reveal-delay-2">
                <button
                  onClick={navigateToCatalog}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-black rounded-xl md:rounded-2xl transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden max-w-full sm:max-w-md"
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  <span className="relative z-10 font-black text-base sm:text-xl md:text-2xl tracking-tight">
                    Открыть каталог
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section - OPTIMIZED spacing */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 content-reveal content-reveal-delay-1">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Хиты продаж
                </h2>
                <p className="text-white/70 text-xs sm:text-sm">Самые популярные товары</p>
              </div>
              <button
                onClick={navigateToCatalog}
                className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-sm font-semibold">Смотреть всё</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Products Grid - OPTIMIZED for mobile: 2 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {popularProducts.map((product, index) => (
                <div key={product.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index + 1, 4)}`}>
                  <ProductCard
                    {...product}
                    size="small-catalog"
                    onProductClick={() => navigateToProduct(product)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile "View All" Button */}
            <div className="sm:hidden mt-6 text-center">
              <button
                onClick={navigateToCatalog}
                className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-all duration-200 border border-white/20 text-sm font-semibold"
              >
                <span>Смотреть всё</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section - OPTIMIZED */}
      <section className="relative py-8 sm:py-12 md:py-16">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Новинки
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">Свежие пополнения каталога</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {ALL_PRODUCTS
                .filter(p => p.addedDate && new Date(p.addedDate) > new Date('2025-09-01'))
                .slice(0, 4)
                .map((product, index) => (
                  <div key={product.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index + 1, 4)}`}>
                    <ProductCard
                      {...product}
                      size="small-catalog"
                      onProductClick={() => navigateToProduct(product)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection reviews={REVIEWS} />

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
};

export default MainPage;
