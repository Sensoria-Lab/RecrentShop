import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import Img from '../shared/Img';
import SEO from '../shared/SEO';
import { OrganizationStructuredData, WebsiteStructuredData } from '../shared/StructuredData';
import { ROUTES } from '../../constants/routes';
import ProductCard from '../ui/ProductCard';
import { ALL_PRODUCTS } from '../../data/products';
import StarRating from '../shared/StarRating';

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
                  <div className="space-y-1">
                    <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                      RECRENT
                    </h1>
                    <h2 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 tracking-wide drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
                      SHOP
                    </h2>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 sm:gap-8">
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">500+</div>
                      <div className="text-sm text-white/70">Довольных клиентов</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">1000+</div>
                      <div className="text-sm text-white/70">Заказов</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">4.8</span>
                        <StarRating rating={5} size="sm" />
                      </div>
                      <div className="text-sm text-white/70">Средний рейтинг</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button - moved to bottom to align with image bottom */}
                <div className="mt-auto">
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
              </div>

              {/* Right side - Image Gallery */}
              <div className="lg:col-span-7 flex items-start">
                <div className="relative max-w-[650px] mx-auto lg:ml-auto">
                  {/* Layout: 2 small squares on left, 1 tall vertical rectangle on right */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-5" style={{ height: '600px' }}>

                    {/* Left column: 2 stacked square images */}
                    <div className="flex-1 flex flex-col gap-3 sm:gap-4 lg:gap-5">
                      {/* Top - White sleeve with tattoo */}
                      <div className="relative flex-1 bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                        <Img
                          src="/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_01.webp"
                          alt="White sleeve with tattoo"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Bottom - White geoid pattern mousepad */}
                      <div className="relative flex-1 bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                        <Img
                          src="/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp"
                          alt="White geoid mousepad"
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                    </div>

                    {/* Right column: 1 tall vertical image */}
                    <div className="flex-1 flex flex-col">
                      {/* Tall vertical - Black geoid XL mousepad */}
                      <div className="relative h-full bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                        <div className="w-full h-full flex items-center justify-center">
                          <Img
                            src="/images/products/mousepads/xl/xl_black_geoid/114_001.webp"
                            alt="Black XL geoid mousepad"
                            className="min-h-full min-w-full object-cover rotate-90 scale-[1.67]"
                            style={{ transformOrigin: 'center center' }}
                          />
                        </div>
                      </div>
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
            <div className="flex items-center justify-between mb-8 sm:mb-12">
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
                    onProductClick={() => navigate(ROUTES.PRODUCT)}
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

      {/* Collections Section */}
      <section id="collections" className="relative py-16 sm:py-20 md:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                Наши коллекции
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
                Уникальные дизайны, созданные для тех, кто ценит стиль и качество
              </p>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Dragons Collection */}
              <div id="dragons" className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer hover-lift">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Img
                    src="/images/products/mousepads/xl/xl_dragon_red/009_xl_logo-red_dragon_02.webp"
                    alt="Dragons Collection"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    DRAGONS
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-4">Мощь и величие драконов</p>
                  <button
                    onClick={() => navigate(ROUTES.CATALOG)}
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold group/btn"
                  >
                    <span>Смотреть коллекцию</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform duration-200">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Serpents Collection */}
              <div id="serpents" className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer hover-lift">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Img
                    src="/images/products/mousepads/l/l_black_serpent/003_l_black_serpent_01.webp"
                    alt="Serpents Collection"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    SERPENTS
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-4">Грация и загадочность змей</p>
                  <button
                    onClick={() => navigate(ROUTES.CATALOG)}
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold group/btn"
                  >
                    <span>Смотреть коллекцию</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform duration-200">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Geoid Collection */}
              <div id="geoid" className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer hover-lift">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Img
                    src="/images/products/mousepads/xl/xl_white_geoid/11.webp"
                    alt="Geoid Collection"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 bg-white/5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    GEOID
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-4">Минимализм и геометрия</p>
                  <button
                    onClick={() => navigate(ROUTES.CATALOG)}
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold group/btn"
                  >
                    <span>Смотреть коллекцию</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform duration-200">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                Отзывы клиентов
              </h2>
              <p className="text-white/70 text-sm sm:text-base">Что говорят о нас наши покупатели</p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:border-white/30 transition-all duration-300 hover-lift scroll-fade-in scroll-fade-in-delay-${Math.min(index + 1, 4)}`}
                >
                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={review.rating} size="sm" />
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm">{review.name}</div>
                        <div className="text-white/60 text-xs mt-1">{review.product}</div>
                      </div>
                      <div className="text-white/50 text-xs">{review.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default MainPage;
