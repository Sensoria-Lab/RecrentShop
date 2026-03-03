'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import { PageContainer } from '@/src/components/layout';
import { Button } from '@/src/components/ui';
import { QuantitySelector, SelectorGroup, ReviewsSection } from '@/src/components/products';
import { useAddToCart } from '@/src/hooks';
import { ALL_PRODUCTS } from '@/src/lib/products';
import { REVIEWS } from '@/src/lib/reviews';
import type { Product } from '@/src/types';
import { CLOTHING_SIZE_OPTIONS, SIZE_OPTIONS } from '@/src/constants/selectorOptions';
import { ROUTES } from '@/src/constants/routes';
import {
  PRODUCT_DESCRIPTIONS,
  getClothingDescription,
  MOUSEPAD_DIMENSIONS,
  COLOR_NAMES,
} from '@/src/constants/productDescriptions';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function getProductDescription(product: Product) {
  if (product.category === 'clothing') {
    return { type: 'clothing', text: getClothingDescription(product.color) };
  }
  if (product.category === 'mousepads') {
    const col = (product.collection ?? '').toLowerCase();
    if (col.includes('pro speed'))   return { type: 'mousepad', desc: PRODUCT_DESCRIPTIONS.pro.speed };
    if (col.includes('pro balance')) return { type: 'mousepad', desc: PRODUCT_DESCRIPTIONS.pro.balance };
    if (col.includes('balance'))     return { type: 'mousepad', desc: PRODUCT_DESCRIPTIONS.regular.balance };
    return { type: 'mousepad', desc: PRODUCT_DESCRIPTIONS.regular.speed };
  }
  return null;
}

type Tab = 'description' | 'specs' | 'reviews';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { handleAddToCart, flyingToCart } = useAddToCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [imgTransitioning, setImgTransitioning] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  /* ── Load product ────────────────────────────────────── */
  useEffect(() => {
    const id = params?.id;
    if (!id) return;
    try {
      const stored = sessionStorage.getItem('productData');
      if (stored) {
        const parsed: Product = JSON.parse(stored);
        if (String(parsed.id) === String(id)) { setProduct(parsed); return; }
      }
    } catch {}
    const found = ALL_PRODUCTS.find(p => String(p.id) === String(id));
    if (found) setProduct(found);
    else router.replace('/not-found');
  }, [params?.id, router]);

  /* ── Entrance animation ─────────────────────────────── */
  useEffect(() => {
    if (!product) return;
    if (contentRef.current) {
      gsap.fromTo(
        Array.from(contentRef.current.children),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'expo.out', clearProps: 'transform' }
      );
    }
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' });
    }
  }, [product]);

  /* ── Image nav ──────────────────────────────────────── */
  const productImages = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];

  const goToImage = useCallback((next: number) => {
    if (!productImages.length || imgTransitioning) return;
    const clamped = ((next % productImages.length) + productImages.length) % productImages.length;
    if (clamped === activeImage) return;
    setImgTransitioning(true);
    setImgLoaded(false);
    setActiveImage(clamped);
    setTimeout(() => setImgTransitioning(false), 350);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImage, imgTransitioning, productImages.length]);

  /* ── Keyboard arrow nav ─────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goToImage(activeImage - 1);
      if (e.key === 'ArrowRight') goToImage(activeImage + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeImage, goToImage]);

  /* ── Tab switch with animation ──────────────────────── */
  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    if (tabContentRef.current) {
      gsap.to(tabContentRef.current, {
        opacity: 0, y: 6, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(tabContentRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.25, ease: 'expo.out' }
          );
        }
      });
    } else {
      setActiveTab(tab);
    }
  };

  /* ── Add to cart ───────────────────────────────────── */
  const handleAdd = () => {
    if (!product) return;
    handleAddToCart(product, quantity, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const formatPrice = (price: string) =>
    price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  const sizeOptions = product?.category === 'clothing' ? CLOTHING_SIZE_OPTIONS : SIZE_OPTIONS;

  const getDisplayCategory = () => {
    if (!product) return '';
    if (product.category === 'clothing' && product.clothingType) {
      const map: Record<string, string> = { hoodie: 'Худи', tshirt: 'Футболка', sleeve: 'Рукав' };
      return map[product.clothingType] || product.clothingType;
    }
    return product.category === 'mousepads' ? 'Коврик' : 'Одежда';
  };

  /* ── Loading ─────────────────────────────────────────── */
  if (!product) {
    return (
      <PageContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border border-[#EAE2E6]/10 border-t-[#EAE2E6]/50 rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  const desc = getProductDescription(product);
  const dimensions = product.category === 'mousepads' && product.productSize
    ? MOUSEPAD_DIMENSIONS[product.productSize as keyof typeof MOUSEPAD_DIMENSIONS]
    : null;
  const colorName = product.color
    ? (COLOR_NAMES[product.color as keyof typeof COLOR_NAMES] ?? product.color)
    : null;

  type MousepadDesc = typeof PRODUCT_DESCRIPTIONS.regular.speed;
  const specs: { label: string; value: string }[] = [
    product.productSize ? { label: 'Размер', value: product.productSize } : null,
    dimensions ? { label: 'Длина', value: dimensions.length } : null,
    dimensions ? { label: 'Ширина', value: dimensions.width } : null,
    product.collection ? { label: 'Коллекция', value: product.collection } : null,
    colorName ? { label: 'Цвет', value: colorName } : null,
    { label: 'Категория', value: getDisplayCategory() },
    desc?.type === 'mousepad' && (desc as { type: string; desc: MousepadDesc }).desc?.material
      ? { label: 'Материал', value: (desc as { type: string; desc: MousepadDesc }).desc.material }
      : null,
    desc?.type === 'mousepad' && (desc as { type: string; desc: MousepadDesc & { base?: string } }).desc?.base
      ? { label: 'Основание', value: (desc as { type: string; desc: MousepadDesc & { base?: string } }).desc.base! }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const tabLabels: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Описание' },
    { id: 'specs', label: 'Характеристики' },
    { id: 'reviews', label: `Отзывы (${REVIEWS.length})` },
  ];

  return (
    <PageContainer>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-28 sm:pb-20">
        <div className="max-w-[1400px] mx-auto">

          {/* ─── Breadcrumb ─────────────────────────────────────────── */}
          <div className="mb-8 md:mb-10">
            <nav className="flex items-center gap-2 font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25">
              <button onClick={() => router.push(ROUTES.HOME)} className="hover:text-[#EAE2E6]/50 transition-colors duration-150">Главная</button>
              <span>/</span>
              <button onClick={() => router.push(ROUTES.CATALOG)} className="hover:text-[#EAE2E6]/50 transition-colors duration-150">Каталог</button>
              <span>/</span>
              <span className="text-[#EAE2E6]/40">{product.subtitle}</span>
            </nav>
          </div>

          {/* ─── Product Layout ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-16 xl:gap-20 items-start">

            {/* ── Image gallery ── */}
            <div ref={imgRef} className="flex flex-col gap-3" style={{ opacity: 0 }}>

              {/* Main image with arrow controls */}
              <div
                className="relative overflow-hidden bg-[#EAE2E6]/[0.03] border border-[#EAE2E6]/[0.08] group/gallery"
                style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.5)', maxHeight: '520px', minHeight: '280px', height: '52vw' }}
              >
                {/* Shimmer skeleton */}
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EAE2E6]/[0.03] via-[#EAE2E6]/[0.07] to-[#EAE2E6]/[0.03] animate-pulse z-10 pointer-events-none" />
                )}

                {/* Main image */}
                <img
                  key={activeImage}
                  src={productImages[activeImage]}
                  alt={`${product.subtitle} — фото ${activeImage + 1}`}
                  className="w-full h-full object-contain"
                  style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />

                {/* Stock badge */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#191516]/80 backdrop-blur-sm border border-[#34d399]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  <span className="font-jetbrains text-[8px] tracking-[0.2em] uppercase text-[#34d399]">В наличии</span>
                </div>

                {/* Arrow controls — shown on hover when images > 1 */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => goToImage(activeImage - 1)}
                      aria-label="Предыдущее фото"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                        w-9 h-9 flex items-center justify-center
                        bg-[#191516]/60 backdrop-blur-sm border border-[#EAE2E6]/15
                        opacity-0 group-hover/gallery:opacity-100
                        hover:bg-[#EAE2E6]/15 hover:border-[#EAE2E6]/35
                        focus:outline-none focus-visible:opacity-100
                        transition-all duration-200"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      onClick={() => goToImage(activeImage + 1)}
                      aria-label="Следующее фото"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                        w-9 h-9 flex items-center justify-center
                        bg-[#191516]/60 backdrop-blur-sm border border-[#EAE2E6]/15
                        opacity-0 group-hover/gallery:opacity-100
                        hover:bg-[#EAE2E6]/15 hover:border-[#EAE2E6]/35
                        focus:outline-none focus-visible:opacity-100
                        transition-all duration-200"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>

                    {/* Pill dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                      {productImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToImage(i)}
                          aria-label={`Фото ${i + 1}`}
                          className="focus:outline-none"
                          style={{
                            width: i === activeImage ? 16 : 6,
                            height: 4,
                            background: i === activeImage ? '#EAE2E6' : 'rgba(234,226,230,0.3)',
                            borderRadius: 2,
                            transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s ease',
                          }}
                        />
                      ))}
                    </div>

                    {/* Frame counter */}
                    <div className="absolute bottom-3 left-3 z-20 font-jetbrains text-[8px] tracking-[0.2em] text-[#EAE2E6]/35 tabular-nums">
                      {activeImage + 1}&thinsp;/&thinsp;{productImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => goToImage(i)}
                      className="flex-shrink-0 w-16 h-16 overflow-hidden border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#EAE2E6]/40"
                      style={{
                        borderColor: activeImage === i ? 'rgba(234,226,230,0.5)' : 'rgba(234,226,230,0.08)',
                        opacity: activeImage === i ? 1 : 0.45,
                        transform: activeImage === i ? 'scale(1)' : 'scale(0.97)',
                        transition: 'border-color 0.2s, opacity 0.2s, transform 0.2s',
                      }}
                    >
                      <img src={img} alt={`${product.subtitle} ${i + 1}`} className="w-full h-full object-cover object-center" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product details ── */}
            <div ref={contentRef} className="space-y-6 md:space-y-8">

              {/* Category / collection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block font-jetbrains text-[8px] tracking-[0.25em] uppercase text-[#EAE2E6]/40 border border-[#EAE2E6]/[0.12] px-2.5 py-1">
                    {getDisplayCategory()}{product.collection ? ` / ${product.collection}` : ''}
                  </span>
                </div>
                <h1
                  className="font-manrope font-black text-[#EAE2E6] tracking-tight leading-[0.88]"
                  style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)' }}
                >
                  {product.subtitle}
                </h1>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-2.5 mt-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
                          fill={s <= Math.round(product.rating) ? '#EAE2E6' : 'none'}
                          stroke={s <= Math.round(product.rating) ? '#EAE2E6' : 'rgba(234,226,230,0.2)'}
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-manrope font-semibold text-[#EAE2E6]/70 text-sm">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviewCount > 0 && (
                      <button
                        onClick={() => switchTab('reviews')}
                        className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/25 hover:text-[#EAE2E6]/50 transition-colors duration-150"
                      >
                        {product.reviewCount}&nbsp;{product.reviewCount === 1 ? 'отзыв' : product.reviewCount < 5 ? 'отзыва' : 'отзывов'}&nbsp;→
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="border-t border-b border-[#EAE2E6]/[0.07] py-5 flex items-baseline gap-3">
                <p className="font-manrope font-black text-[#EAE2E6] tabular-nums"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}>
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Size selector */}
              {(product.category === 'mousepads' || product.category === 'clothing') && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/35">
                      Размер{selectedSize && <span className="text-[#EAE2E6]/60 ml-2">{selectedSize}</span>}
                    </p>
                    {product.category === 'clothing' && (
                      <button
                        onClick={() => router.push(ROUTES.SUPPORT)}
                        className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/25 hover:text-[#EAE2E6]/50 transition-colors duration-150"
                      >
                        Таблица размеров →
                      </button>
                    )}
                  </div>
                  <SelectorGroup options={sizeOptions} selectedValue={selectedSize} onChange={setSelectedSize} allowDeselect />
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-3 flex-wrap">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAdd}
                  disabled={flyingToCart}
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {added ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Добавлено
                    </>
                  ) : (
                    <>В корзину</>
                  )}
                </Button>
              </div>

              {/* Delivery perks */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    ),
                    label: 'Быстрая отправка', sub: '1–3 рабочих дня'
                  },
                  {
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                    label: 'Гарантия качества', sub: 'Обмен при дефектах'
                  },
                ].map(item => (
                  <div key={item.label} className="p-3.5 border border-[#EAE2E6]/[0.07] bg-[#EAE2E6]/[0.02] flex items-start gap-3">
                    <span className="mt-0.5 text-[#EAE2E6]/35 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-manrope text-[#EAE2E6]/70 text-xs font-semibold mb-0.5">{item.label}</p>
                      <p className="font-jetbrains text-[9px] tracking-[0.1em] text-[#EAE2E6]/25">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Tabs: Description / Specs / Reviews ──────────────────── */}
          <div className="mt-16 md:mt-24 border-t border-[#EAE2E6]/[0.07]">

            {/* Tab bar */}
            <div className="flex items-end gap-0 border-b border-[#EAE2E6]/[0.07]">
              {tabLabels.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className={`relative px-5 py-4 font-jetbrains text-[10px] tracking-[0.2em] uppercase
                    transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#EAE2E6]/30
                    ${activeTab === id ? 'text-[#EAE2E6]' : 'text-[#EAE2E6]/30 hover:text-[#EAE2E6]/60'}`}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#EAE2E6] origin-left transition-transform duration-250"
                    style={{ transform: activeTab === id ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div ref={tabContentRef} className="pt-8 md:pt-12">

              {/* ── Description ──────────────────────────────────────── */}
              {activeTab === 'description' && (
                <div className="max-w-2xl space-y-6">
                  {desc?.type === 'mousepad' && (() => {
                    const d = (desc as { type: string; desc: typeof PRODUCT_DESCRIPTIONS.regular.speed }).desc;
                    return (
                      <>
                        <p className="font-manrope text-[#EAE2E6]/70 text-base leading-[1.85]">{d.main}</p>
                        <ul className="space-y-3">
                          {d.details.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-[7px] w-1 h-1 rounded-full bg-[#EAE2E6]/30 flex-shrink-0" />
                              <p className="font-manrope text-[#EAE2E6]/55 text-sm leading-[1.8]">{point}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                  {desc?.type === 'clothing' && (
                    <div className="font-manrope text-[#EAE2E6]/60 text-sm leading-[1.9] whitespace-pre-line">
                      {(desc as { type: string; text: string }).text}
                    </div>
                  )}
                  {!desc && (
                    <p className="font-manrope text-[#EAE2E6]/35 text-sm">Описание отсутствует.</p>
                  )}
                </div>
              )}

              {/* ── Specs ────────────────────────────────────────────── */}
              {activeTab === 'specs' && (
                <div className="max-w-lg border border-[#EAE2E6]/[0.07] divide-y divide-[#EAE2E6]/[0.05]">
                  {specs.map(spec => (
                    <div key={spec.label} className="flex items-center justify-between px-5 py-3.5">
                      <span className="font-jetbrains text-[10px] tracking-[0.18em] uppercase text-[#EAE2E6]/30">{spec.label}</span>
                      <span className="font-manrope text-[#EAE2E6]/65 text-sm font-medium capitalize">{spec.value}</span>
                    </div>
                  ))}
                  {specs.length === 0 && (
                    <p className="px-5 py-4 font-manrope text-[#EAE2E6]/35 text-sm">Нет данных.</p>
                  )}
                </div>
              )}

              {/* ── Reviews ──────────────────────────────────────────── */}
              {activeTab === 'reviews' && (
                <ReviewsSection reviews={REVIEWS} title="Отзывы покупателей" compact />
              )}
            </div>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
