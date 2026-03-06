'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from '@/src/lib/gsap';
import PageContainer from '@/src/components/layout/PageContainer';
import SEO from '@/src/components/layout/SEO';
import { OrganizationStructuredData, WebsiteStructuredData } from '@/src/components/layout/StructuredData';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/products/ProductCard';
import { ReviewsSection } from '@/src/components/products/ReviewsSection';
import Img from '@/src/components/ui/Img';
import { ROUTES } from '@/src/constants/routes';
import { ALL_PRODUCTS } from '@/src/lib/products';
import { REVIEWS } from '@/src/lib/reviews';
import { useProductNavigation } from '@/src/hooks/useProductNavigation';
import { useMobileRedirect } from '@/src/hooks/useDeviceDetection';
import { shouldReduceMotion, EASE_EDITORIAL } from '@/src/components/animations';



// Featured categories for showcase section
const FEATURED_CATEGORIES = [
  {
    id: 'mousepads',
    title: 'Коврики',
    subtitle: 'Игровые поверхности',
    count: ALL_PRODUCTS.filter(p => p.category === 'mousepads').length,
    image: '/images/products/mousepads/xl/xl_black_geoid/preview.png',
    href: '/catalog?category=mousepads'
  },
  {
    id: 'clothing',
    title: 'Одежда',
    subtitle: 'Худи и футболки',
    count: ALL_PRODUCTS.filter(p => p.category === 'clothing').length,
    image: '/images/products/clothing/hoodies/seprents_black/serpents_hoodie_black_01.webp',
    href: '/catalog?category=clothing'
  }
];

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action }) => (
  <div className="flex items-end justify-between mb-8 md:mb-12">
    <div>
      <h2
        className="font-manrope font-black text-[var(--rc-fg)] leading-[0.9] tracking-[-0.02em] text-balance"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
      >
        <span className="blur-text inline-block">{title}</span>
      </h2>
    </div>
    {action && action.href ? (
      <Link
        href={action.href}
        className="hidden sm:flex items-center gap-2 font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors duration-200 pb-1 border-b border-[var(--rc-border)] hover:border-[var(--rc-border-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)] group"
      >
        {action.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    ) : action && (
      <button
        onClick={action.onClick}
        className="hidden sm:flex items-center gap-2 font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors duration-200 pb-1 border-b border-[var(--rc-border)] hover:border-[var(--rc-border-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)] group"
      >
        {action.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    )}
  </div>
);



// Category showcase card
const CategoryCard: React.FC<{
  category: typeof FEATURED_CATEGORIES[0];
}> = ({ category }) => {
  return (
    <Link
      href={category.href}
      className="group relative w-full aspect-[16/10] overflow-hidden ring-1 ring-[var(--rc-fg)]/10 hover:ring-[var(--rc-fg)]/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)]"
    >
      {/* Background Image */}
      <Img
        src={category.image}
        alt={category.title}
        priority={true}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-[var(--rc-bg)]/50 group-hover:bg-[var(--rc-bg)]/40 transition-colors duration-300" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--rc-bg)] via-[var(--rc-bg)]/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between items-start">
        {/* Top label with index styling */}
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[var(--rc-fg)]/20" />
          <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-muted)]">
            {category.count} товаров
          </span>
        </div>

        {/* Bottom content */}
        <div className="w-full">
          <h3 className="font-manrope font-black text-[var(--rc-fg)] text-2xl md:text-3xl lg:text-4xl leading-[0.95] tracking-[-0.03em] mb-3 text-balance">
            {category.title}
          </h3>
          <p className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-secondary)] mb-5">
            {category.subtitle}
          </p>

          {/* Arrow indicator with enhanced hover */}
          <div className="inline-flex items-center gap-2 font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] group-hover:text-[var(--rc-fg)] transition-colors duration-300">
            <span>Смотреть</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Corner brackets on hover - more visible */}
      <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-4 right-4 w-full h-[1px] bg-[var(--rc-fg)]/40" />
        <div className="absolute top-4 right-4 w-[1px] h-full bg-[var(--rc-fg)]/40" />
      </div>
      <div className="absolute bottom-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-4 left-4 w-full h-[1px] bg-[var(--rc-fg)]/40" />
        <div className="absolute bottom-4 left-4 w-[1px] h-full bg-[var(--rc-fg)]/40" />
      </div>

      {/* Subtle border accent on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--rc-fg)]/10 transition-colors duration-300 pointer-events-none" />
    </Link>
  );
};

const MainPage: React.FC = () => {
  useMobileRedirect(true);

  const popularProducts = [...ALL_PRODUCTS]
    .sort((a, b) => (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0))
    .slice(0, 4);

  const newArrivals = ALL_PRODUCTS
    .filter(p => p.addedDate && new Date(p.addedDate) > new Date('2025-09-01'))
    .slice(0, 4);

  const { navigateToProduct } = useProductNavigation();

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const popularGridRef = useRef<HTMLDivElement>(null);
  const newGridRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  /* ── Entrance animations — Editorial per Design System ─ */
  useEffect(() => {
    const reduceMotion = shouldReduceMotion();

    // Hero entrance with stagger
    if (heroContentRef.current && !reduceMotion) {
      gsap.fromTo(
        Array.from(heroContentRef.current.children),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: EASE_EDITORIAL, clearProps: 'transform' }
      );
    } else if (heroContentRef.current) {
      gsap.set(Array.from(heroContentRef.current.children), { opacity: 1, y: 0 });
    }

    // Logo animation: SVG path drawing
    if (heroImgRef.current && !reduceMotion) {
      const path: SVGPathElement | null = heroImgRef.current.querySelector('.logo-path');
      if (path) {
        // Calculate exact length of the path
        const length = path.getTotalLength();

        // Setup initial drawn state (invisible fill, dashed outline matching length)
        gsap.set(heroImgRef.current, { opacity: 1, scale: 1 });
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0
        });

        // 1) Draw the outline
        // 2) Fade in the fill right after
        const tl = gsap.timeline();
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
        }).to(path, {
          fillOpacity: 1,
          duration: 0.6,
          ease: "power1.out"
        }, "-=0.4");
      }
    } else if (heroImgRef.current) {
      const path: SVGPathElement | null = heroImgRef.current.querySelector('.logo-path');
      if (path) {
        gsap.set(path, { fillOpacity: 1, strokeDashoffset: 0 });
      }
      gsap.set(heroImgRef.current, { opacity: 1, scale: 1 });
    }

    // Product grids with ScrollTrigger
    const animateGrid = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const cards = Array.from(ref.current.children);
      if (!reduceMotion) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: EASE_EDITORIAL,
            scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true }
          }
        );
      } else {
        gsap.set(cards, { opacity: 1, y: 0 });
      }
    };

    animateGrid(popularGridRef);
    animateGrid(newGridRef);
    animateGrid(categoriesRef);
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
      <section className="relative h-[calc(100dvh-68px)] flex flex-col border-b border-[var(--rc-border)] overflow-hidden">

        {/* Animated geometric grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Primary grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(var(--rc-fg) 1px, transparent 1px),
                linear-gradient(90deg, var(--rc-fg) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Decorative corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[var(--rc-fg)]" />
          <div className="absolute top-0 left-0 w-[4px] h-full bg-[var(--rc-fg)]" />
        </div>
        <div className="absolute top-4 right-4 w-12 h-12 z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[4px] bg-[var(--rc-fg)]" />
          <div className="absolute top-0 right-0 w-[4px] h-full bg-[var(--rc-fg)]" />
        </div>
        <div className="absolute bottom-4 left-4 w-12 h-12 z-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--rc-fg)]" />
          <div className="absolute bottom-0 left-0 w-[4px] h-full bg-[var(--rc-fg)]" />
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 z-10 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-[4px] bg-[var(--rc-fg)]" />
          <div className="absolute bottom-0 right-0 w-[4px] h-full bg-[var(--rc-fg)]" />
        </div>

        {/* Main content - Logo Centric Layout */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">

          {/* Main hero content */}
          <div ref={heroContentRef} className="flex flex-col items-center text-center">

            {/* MASSIVE LOGO - The Hero Accent */}
            <div
              ref={heroImgRef}
              className="relative mb-4 md:mb-6"
            >

              {/* SVG Logo */}
              <svg
                viewBox="0 0 572 543"
                className="w-[140px] h-auto sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px] relative z-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--rc-fg)" />
                    <stop offset="50%" stopColor="var(--rc-fg)" />
                    <stop offset="100%" stopColor="var(--rc-fg)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path
                  className="logo-path"
                  d="M552.73 246.385H509.635L552.621 320.768L553.332 321.999H429.509L429.271 321.589L385.812 246.385H330.722V442.603H385.885L438.028 376.025L438.274 375.711H571.646L570.655 377.025L445.907 542.494L445.661 542.82H224.772V398.24H0.179688V298.492H224.772V246.385H0.179688V148.28H224.772V102.51H0.179688V0.179688H552.73V246.385ZM329.702 99.7637V150.238H447.25V99.7637H329.702Z"
                  fill="url(#logoGradient)"
                  stroke="url(#logoGradient)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* RECRENT SHOP - Typography Stack */}
            <div className="overflow-hidden mb-2 md:mb-3">
              <h1
                className="font-manrope font-black leading-[0.85] tracking-[-0.04em] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
              >
                <span className="text-[var(--rc-fg)] block">RECRENT</span>
              </h1>
            </div>

            {/* SHOP - matching RECRENT style */}
            <div className="overflow-hidden mb-8 md:mb-12">
              <h2
                className="font-manrope font-black text-[var(--rc-fg)] leading-[0.9] tracking-[-0.03em] animate-text-shimmer text-balance"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                SHOP
              </h2>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={ROUTES.CATALOG}
                className="group relative flex items-center gap-2 bg-[var(--rc-bg-invert)] text-[var(--rc-bg)] font-jetbrains text-[10px] tracking-[0.18em] uppercase px-6 py-3 font-bold transition-colors duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-[var(--rc-bg)]"
              >
                Открыть каталог
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES SHOWCASE ── */}
      <section className="relative py-14 md:py-20 lg:py-24 border-b border-[var(--rc-border)]">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader
              title="Категории"
              action={{
                label: 'Весь каталог',
                href: ROUTES.CATALOG
              }}
            />

            <div ref={categoriesRef} className="grid md:grid-cols-2 gap-3 md:gap-4">
              {FEATURED_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section className="relative py-14 md:py-20 lg:py-24 border-b border-[var(--rc-border)]">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader
              title="Хиты"
              action={{
                label: 'Весь каталог',
                href: ROUTES.CATALOG
              }}
            />

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
              <Link
                href={ROUTES.CATALOG}
                className="w-full flex justify-center border border-[var(--rc-border)] font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] hover:border-[var(--rc-border-hover)] hover:bg-[var(--rc-fg-ghost)] py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)]"
              >
                Смотреть всё
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      {newArrivals.length > 0 && (
        <section className="relative py-14 md:py-20 lg:py-24 border-b border-[var(--rc-border)]">
          <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-[1400px] mx-auto">
              <SectionHeader
                title="Новинки"
              />

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
