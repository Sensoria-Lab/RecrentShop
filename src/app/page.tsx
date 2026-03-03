'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import { PageContainer, SEO, OrganizationStructuredData, WebsiteStructuredData, Footer } from '@/src/components/layout';
import { ProductCard, ReviewsSection } from '@/src/components/products';
import Img from '@/src/components/ui/Img';
import { ROUTES } from '@/src/constants/routes';
import { ALL_PRODUCTS } from '@/src/lib/products';
import { REVIEWS } from '@/src/lib/reviews';
import { useProductNavigation } from '@/src/hooks';
import { useMobileRedirect } from '@/src/hooks';

const TICKER_ITEMS = [
  'ИГРОВЫЕ КОВРИКИ', 'ОДЕЖДА', 'GAMING MERCH', 'РОССИЯ', 'PREMIUM QUALITY',
  'РЕКРЕНТ', 'MOUSEPADS', 'HOODIES', 'T-SHIRTS', 'FREE SHIPPING',
];

const MainPage: React.FC = () => {
  const router = useRouter();
  useMobileRedirect(true);

  const navigateToCatalog = () => router.push(ROUTES.CATALOG);

  const popularProducts = [...ALL_PRODUCTS]
    .sort((a, b) => (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0))
    .slice(0, 4);

  const newArrivals = ALL_PRODUCTS
    .filter(p => p.addedDate && new Date(p.addedDate) > new Date('2025-09-01'))
    .slice(0, 4);

  const { navigateToProduct } = useProductNavigation();
  const heroProduct = popularProducts[0];

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLDivElement>(null);
  const popularGridRef = useRef<HTMLDivElement>(null);
  const newGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance
    if (heroContentRef.current) {
      gsap.fromTo(
        Array.from(heroContentRef.current.children),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'expo.out', clearProps: 'transform' }
      );
    }
    if (heroImgRef.current) {
      gsap.fromTo(heroImgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    }
    if (mobileHeroRef.current) {
      gsap.fromTo(mobileHeroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    }
    // Product grids with ScrollTrigger
    const animateGrid = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const cards = Array.from(ref.current.children);
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } }
      );
    };
    animateGrid(popularGridRef);
    animateGrid(newGridRef);
  }, []);

  return (
    <PageContainer isMainPage={true}>
      <SEO
        title="Главная"
        description="Премиальные игровые коврики для мыши и стильная одежда от RECRENT. Высокое качество, уникальный дизайн, быстрая доставка по России."
        keywords="коврик для мыши, gaming mousepad, игровой коврик, коврик xl, коврик l, recrent, одежда, худи, футболки"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />

      {/* ── HERO ── */}
      <section className="relative h-[calc(100dvh-84px)] min-h-[520px] flex flex-col border-b border-[#EAE2E6]/[0.07] overflow-hidden">

        {/* Subtle dot-grid atmosphere on left side */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(234,226,230,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 55%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 55%)',
          }}
        />

        {/* Content grid */}
        <div className="relative z-10 flex-1 grid lg:grid-cols-[1fr_44vw] xl:grid-cols-[1fr_42vw] items-stretch">

          {/* Left: Copy */}
          <div
            ref={heroContentRef}
            className="flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 pb-10 lg:pt-0 lg:pb-0"
          >
            {/* Main heading */}
            <div className="overflow-hidden mb-5 lg:mb-7">
              <h1
                className="font-manrope font-black leading-[0.88] tracking-[-0.03em] text-[#EAE2E6]"
                style={{ fontSize: 'clamp(2.6rem, 5.4vw, 5.8rem)' }}
              >
                Игровой
                <br />
                <span className="text-[#EAE2E6]/35 select-none" aria-hidden>мерч</span>
                <br />
                без правил
              </h1>
            </div>

            {/* Sub-copy */}
            <p className="font-jetbrains text-[12px] leading-[1.8] text-[#EAE2E6]/45 max-w-[38ch] mb-7 lg:mb-10">
              Коврики и одежда Recrent — точность материалов,<br />
              честная графика, комфорт в каждой сессии.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={navigateToCatalog}
                className="group relative flex items-center gap-3 bg-[#EAE2E6] text-[#191516] font-jetbrains text-[11px] tracking-[0.18em] uppercase px-7 py-[14px] font-bold transition-all duration-200 hover:bg-white focus:outline-none"
              >
                Открыть каталог
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={navigateToCatalog}
                className="font-jetbrains text-[11px] tracking-[0.18em] uppercase text-[#EAE2E6]/55 hover:text-[#EAE2E6] transition-colors duration-200 focus:outline-none flex items-center gap-2 border border-[#EAE2E6]/20 px-7 py-[14px] hover:border-[#EAE2E6]/50"
              >
                Коллекции
              </button>
            </div>

            {/* Stats strip */}
            <div className="mt-8 lg:mt-10 pt-5 border-t border-[#EAE2E6]/[0.09] flex items-center gap-8">
              {[
                { value: `${ALL_PRODUCTS.length}+`, label: 'Товаров' },
                { value: '2', label: 'Категории' },
                { value: 'RU', label: 'Доставка' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-[5px]">
                  <span className="font-manrope font-black text-[#EAE2E6] text-xl leading-none">{value}</span>
                  <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/35">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div
            ref={heroImgRef}
            className="relative hidden lg:block border-l border-[#EAE2E6]/[0.07] overflow-hidden"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => heroProduct && navigateToProduct(heroProduct)}
              className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none group"
              aria-label={`Перейти к товару: ${heroProduct?.title}`}
            >
              <Img
                src={heroProduct?.image || '/images/products/mousepads/default.webp'}
                alt={heroProduct?.title || 'Recrent featured product'}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </button>

            {/* Dark overlay covering the full image (tones down bright photos) */}
            <div className="absolute inset-0 bg-[#191516]/45 pointer-events-none" />

            {/* Left-edge blend: fade from page background into image */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#191516] to-transparent pointer-events-none" />

            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#191516]/90 via-[#191516]/30 to-transparent pointer-events-none" />

            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#191516]/50 to-transparent pointer-events-none" />

            {/* Product badge — top-left */}
            {heroProduct && (
              <div className="absolute top-6 left-8 z-20 flex flex-col gap-1">
                <span className="font-jetbrains text-[8px] tracking-[0.38em] uppercase text-[#EAE2E6]/50 block">Хит продаж</span>
                <span className="font-manrope font-bold text-[#EAE2E6]/85 text-[13px] leading-snug max-w-[22ch] block">{heroProduct.title}</span>
              </div>
            )}

            {/* Corner bracket decoration */}
            <div className="absolute top-4 right-4 z-20 w-6 h-6 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-[1.5px] bg-[#EAE2E6]/25" />
              <div className="absolute top-0 right-0 w-[1.5px] h-full bg-[#EAE2E6]/25" />
            </div>
            <div className="absolute bottom-4 left-8 z-20 w-6 h-6 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#EAE2E6]/25" />
              <div className="absolute bottom-0 left-0 w-[1.5px] h-full bg-[#EAE2E6]/25" />
            </div>

            {/* Price tag */}
            {heroProduct?.price && (
              <div className="absolute bottom-6 right-6 z-20 bg-[#191516]/80 backdrop-blur-sm border border-[#EAE2E6]/25 px-4 py-2">
                <span className="font-jetbrains text-[11px] tracking-[0.15em] text-[#EAE2E6]">
                  {heroProduct.price}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hero image */}
        <div
          ref={mobileHeroRef}
          className="lg:hidden relative border-t border-[#EAE2E6]/[0.07] h-[55vw] max-h-[300px] overflow-hidden"
          style={{ opacity: 0 }}
        >
          <Img
            src={heroProduct?.image || '/images/products/mousepads/default.webp'}
            alt={heroProduct?.title || 'Recrent featured product'}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for mobile too */}
          <div className="absolute inset-0 bg-[#191516]/35 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#191516]/85 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#191516]/50 to-transparent" />
        </div>
      </section>


      {/* ── POPULAR PRODUCTS ── */}
      <section className="relative py-14 md:py-20 lg:py-24 border-b border-[#EAE2E6]/[0.07]">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[1400px] mx-auto">

            {/* Section header */}
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <h2 className="font-manrope font-black text-[#EAE2E6] leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
                  Хиты
                </h2>
              </div>
              <button
                onClick={navigateToCatalog}
                className="hidden sm:flex items-center gap-2 font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[#EAE2E6]/35 hover:text-[#EAE2E6] transition-colors duration-200 pb-1 border-b border-[#EAE2E6]/10 hover:border-[#EAE2E6]/40 focus:outline-none"
              >
                Весь каталог
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div ref={popularGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {popularProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    {...product}
                    size="small-catalog"
                    onProductClick={() => navigateToProduct(product)}
                  />
                </div>
              ))}
            </div>

            <div className="sm:hidden mt-6">
              <button
                onClick={navigateToCatalog}
                className="w-full border border-[#EAE2E6]/15 font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#EAE2E6]/50 hover:text-[#EAE2E6] hover:border-[#EAE2E6]/40 py-4 transition-all duration-200 focus:outline-none"
              >
                Смотреть всё
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      {newArrivals.length > 0 && (
        <section className="relative py-14 md:py-20 lg:py-24 border-b border-[#EAE2E6]/[0.07]">
          <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-[1400px] mx-auto">

              <div className="flex items-end justify-between mb-8 md:mb-12">
                <div>
                  <h2 className="font-manrope font-black text-[#EAE2E6] leading-[0.9] tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
                    Новинки
                  </h2>
                </div>
              </div>

            <div ref={newGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {newArrivals.map((product) => (
                <div key={product.id}>
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
      )}

      {/* ── REVIEWS ── */}
      <ReviewsSection reviews={REVIEWS} />

      {/* ── FOOTER ── */}
      <Footer />
    </PageContainer>
  );
};

export default MainPage;

