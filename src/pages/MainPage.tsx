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

      {/* Hero section - BOLD MINIMAL LAYOUT */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 'clamp(650px, 75vh, 900px)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle moving gradient spotlight */}
          <div 
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite',
            }}
          />
        </div>

        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 md:py-20">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col items-start justify-center space-y-8 sm:space-y-10 md:space-y-12">
              
              {/* Main Title - Left aligned, stacked with animations */}
              <div className="space-y-3 sm:space-y-4 content-reveal content-reveal-delay-1">
                <h1 
                  className="font-black text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] text-white tracking-tighter leading-[0.85]"
                  style={{
                    filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.7))',
                    animation: 'textGlow 4s ease-in-out infinite',
                  }}
                >
                  RECRENT
                </h1>
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <h2 
                    className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white/60 tracking-wide drop-shadow-[0_5px_25px_rgba(0,0,0,0.6)]"
                    style={{
                      animation: 'fadeSlideIn 1s ease-out 0.3s both',
                    }}
                  >
                    SHOP
                  </h2>
                </div>
              </div>

              {/* Two column layout for description and CTA */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
                
                {/* Left - Subtitle */}
                <div className="content-reveal content-reveal-delay-2">
                  <div className="content-reveal content-reveal-delay-3 flex justify-start">
                  <button
                    onClick={navigateToCatalog}
                    className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 bg-white text-black rounded-2xl transition-all duration-300 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <span className="relative z-10 font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
                      Открыть каталог
                    </span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 sm:mb-12 content-reveal content-reveal-delay-1">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                  Хиты продаж
                </h2>
                <p className="text-white/70 text-sm sm:text-base">Самые популярные товары нашего магазина</p>
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {popularProducts.map((product, index) => (
                <div key={product.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index + 1, 4)}`}>
                  <ProductCard
                    {...product}
                    size="medium"
                    onProductClick={() => navigateToProduct(product)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile "View All" Button */}
            <div className="sm:hidden mt-8 text-center">
              <button
                onClick={navigateToCatalog}
                className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-200 border border-white/20"
              >
                <span className="font-semibold">Смотреть всё</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                Только что поступило
              </h2>
              <p className="text-white/70 text-sm sm:text-base">Свежие пополнения нашего каталога</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {ALL_PRODUCTS
                .filter(p => p.addedDate && new Date(p.addedDate) > new Date('2025-09-01'))
                .slice(0, 4)
                .map((product, index) => (
                  <div key={product.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index + 1, 4)}`}>
                    <ProductCard
                      {...product}
                      size="medium"
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
