import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, SEO, OrganizationStructuredData, WebsiteStructuredData, Footer } from '../shared/components';
import { ProductCard } from 'features/products/components';
import Img from '../shared/ui/Img';
import { ROUTES } from '../core/constants/routes';
import { ALL_PRODUCTS } from '../core/data/products';
import { useProductNavigation } from 'features/products/hooks';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

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

  // Customer reviews data
  const reviews = [
    {
      name: 'Александр М.',
      rating: 5,
      text: 'Коврик XL geoid-black просто огонь! Качество на высоте, дизайн стильный. Рекомендую!',
      product: 'Коврик XL geoid-black',
      date: '2 дня назад'
    },
    {
      name: 'Мария К.',
      rating: 5,
      text: 'Заказала белый рукав с татуировкой - выглядит потрясающе! Материал приятный, сидит отлично.',
      product: 'Рукав белый geoid',
      date: '1 неделю назад'
    },
    {
      name: 'Дмитрий П.',
      rating: 5,
      text: 'Быстрая доставка, качественная упаковка. Коврик соответствует описанию. Спасибо!',
      product: 'Коврик L serpent-black',
      date: '3 недели назад'
    }
  ];

  return (
    <PageContainer isMainPage={true}>
      <SEO
        title="Главная"
        description="Премиальные игровые коврики для мыши и стильная одежда от RECRENT. Высокое качество, уникальный дизайн, быстрая доставка по России."
        keywords="коврик для мыши, gaming mousepad, игровой коврик, коврик xl, коврик l, recrent, одежда, худи, футболки"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />

      {/* Hero section - IMPROVED LAYOUT */}
  <section className="relative flex items-center" style={{ minHeight: 'clamp(600px, 70vh, 850px)' }}>
        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 lg:items-start">

              {/* Left side - Title & Description */}
              <div className="lg:col-span-5 flex flex-col justify-between" style={{ minHeight: '600px' }}>
                <div className="space-y-6 sm:space-y-8">
                  {/* Main Title */}
                  <div className="space-y-1 content-reveal content-reveal-delay-1">
                    <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                      RECRENT
                    </h1>
                    <h2 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 tracking-wide drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
                      SHOP
                    </h2>
                  </div>
                </div>

                <div className="mt-6 content-reveal content-reveal-delay-2">
                  <button
                    onClick={navigateToCatalog}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-white/8 backdrop-blur-sm border-2 border-white/80 hover:border-white hover:bg-white rounded-xl transition-all duration-250 active:scale-95 shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>

                    <span className="relative z-10 font-extrabold text-xl sm:text-2xl md:text-3xl text-white group-hover:text-black transition-colors duration-300">
                      Смотреть каталог
                    </span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="relative z-10 text-white group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>              {/* Right side - Single Large Image */}
              <div className="lg:col-span-7 flex items-start" style={{ transform: 'translateX(80px)' }}>
                <div className="relative max-w-[650px] mx-auto lg:ml-auto">
                  <div className="scroll-fade-in scroll-fade-in-delay-1" style={{ height: '600px' }}>
                    <div className="relative h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                      <Img
                        src={`${process.env.PUBLIC_URL}/images/Generated Image October 30, 2025 - 8_08PM.png`}
                        alt="Generated showcase image"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
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

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
};

export default MainPage;
