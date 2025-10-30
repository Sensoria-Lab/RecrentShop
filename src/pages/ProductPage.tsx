import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer, Modal } from '../shared/components';
import { SelectorGroup, Breadcrumbs, DecryptedText, StarRating, QuantitySelector, ProductCard, ProductCarousel, ReviewCard, ImageGalleryModal } from 'features/products/components';
import Img from '../shared/ui/Img';
import { ALL_PRODUCTS } from '../core/data/products';
import { REVIEWS, hasMoreReviews } from '../core/data/reviews';
import { useProduct, useProductImages, useProductNavigation } from 'features/products/hooks';
import { useAddToCart } from 'features/cart/hooks';
import { COLOR_OPTIONS, SIZE_OPTIONS, TYPE_OPTIONS, CLOTHING_SIZE_OPTIONS } from '../core/constants/selectorOptions';
import { getClothingDescription, MOUSEPAD_DIMENSIONS, COLOR_NAMES, PRODUCT_DESCRIPTIONS } from '../core/constants/productDescriptions';
import { isClothing, isProMousepad } from '../shared/lib/productUtils';

const ProductPage: React.FC = () => {
  const location = useLocation();
  const passedProductData = location.state?.productData;
  
  // Получаем полные данные продукта из ALL_PRODUCTS по ID
  const productData = useMemo(() => {
    if (passedProductData?.id) {
      const fullProduct = ALL_PRODUCTS.find(p => p.id === passedProductData.id);
      return fullProduct || passedProductData;
    }
    return passedProductData;
  }, [passedProductData]);
  
  // Используем кастомные хуки для управления состоянием и логикой
  const {
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    selectedType,
    setSelectedType,
    selectedClothingSize,
    setSelectedClothingSize,
    quantity,
    setQuantity
  } = useProduct(productData);

  // Состояние для модального окна таблицы размеров
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  // Состояние для модального окна описания
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Проверка переполнения описания
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
  
  // Состояние для отзывов
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(2);
  const displayedReviews = REVIEWS.slice(0, displayedReviewsCount);
  const showMoreReviews = hasMoreReviews(displayedReviewsCount);
  
  const handleLoadMoreReviews = () => {
    setDisplayedReviewsCount(prev => Math.min(prev + 2, REVIEWS.length));
  };

  // Состояние для галереи изображений
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = (images: string[], index: number = 0) => {
    setGalleryImages(images);
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  // Используем хук для получения правильных изображений
  const productImages = useProductImages(productData, selectedSize, selectedColor);

  // Используем утилиты для проверки типа продукта
  const isClothingProduct = isClothing(productData);
  const isProMousepadProduct = isProMousepad(productData);
  
  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        const isOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
        setIsDescriptionOverflowing(isOverflow);
      }
    };
    
    // Проверяем при монтировании и изменении контента
    checkOverflow();
    
    // Добавляем resize observer для отслеживания изменений
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedType, selectedColor, isClothingProduct, isProMousepadProduct]);

  // Получаем описание для одежды
  const clothingDescription = getClothingDescription(selectedColor);

  // Получаем полное описание в зависимости от типа товара
  const fullDescription = useMemo(() => {
    if (isClothingProduct) {
      return clothingDescription;
    } else if (isProMousepadProduct) {
      const desc = PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro];
      return desc.main + '\n\n' + desc.details.join('\n\n');
    } else {
      const desc = PRODUCT_DESCRIPTIONS.regular[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.regular];
      return desc.main + '\n\n' + desc.details.join('\n\n');
    }
  }, [isClothingProduct, isProMousepadProduct, clothingDescription, selectedType]);

  // Хук для навигации к другим продуктам
  const { navigateToProduct } = useProductNavigation();

  // Получаем похожие товары (той же категории, но не текущий)
  const similarProducts = useMemo(() => {
    if (!productData) return [];
    
    return ALL_PRODUCTS
      .filter(p => 
        p.id !== productData.id && // Не показываем текущий товар
        p.category === productData.category // Та же категория
      )
      .slice(0, 4); // Максимум 4 товара
  }, [productData]);

  // Динамический subtitle в зависимости от выбранного цвета (для ковриков)
  const dynamicSubtitle = useMemo(() => {
    if (!productData || isClothingProduct || isProMousepadProduct) {
      return productData?.subtitle || '';
    }
    
    // Для обычных ковриков меняем название в зависимости от цвета
    if (selectedColor === 'red') {
      return '"logo-red"';
    } else if (selectedColor === 'blue') {
      return '"logo-blue"';
    } else if (selectedColor === 'white') {
      return '"geoid-white"';
    } else {
      // black by default
      return '"geoid-black"';
    }
  }, [productData, selectedColor, isClothingProduct, isProMousepadProduct]);

  // Используем хук для добавления в корзину с анимацией
  const { handleAddToCart: addToCart, flyingToCart } = useAddToCart();
  
  // Wrapper для handleAddToCart с правильными параметрами
  const handleAddToCartClick = () => {
    const sizeToAdd = isClothingProduct ? selectedClothingSize : selectedSize;
    addToCart(productData, quantity, sizeToAdd, selectedColor, selectedType);
    setQuantity(1);
  };

  return (
    <PageContainer showBreadcrumbs={false}>
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
          {/* Product section */}
          <div className="border border-white/20 rounded-lg sm:rounded-xl mb-6 sm:mb-8 md:mb-10 content-reveal">
            {/* Breadcrumbs */}
            <div className="px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-3 sm:pb-4">
              <Breadcrumbs />
            </div>

            <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-14 items-start justify-between">
              {/* Product images - top on mobile, right on desktop */}
              <div className="flex-shrink-0 w-full lg:w-[580px] lg:order-2 lg:h-full">
                <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-7 h-full flex flex-col border border-white/10">
                  {/* Main image with navigation arrows */}
                  <div className="mb-3 sm:mb-5 md:mb-7 relative flex items-center">
                    {/* Left arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-colors mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0"
                      aria-label="Previous image"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4 md:w-5 md:h-5">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>

                    {/* Image container */}
                    <button 
                      onClick={() => openGallery(productImages, selectedImage)}
                      className="flex-1 cursor-pointer group relative"
                    >
                      <Img
                        id="product-main-image"
                        key={`${selectedSize}-${selectedColor}-${selectedImage}`}
                        src={productImages[selectedImage]}
                        alt="Product"
                        loading="eager"
                        className="w-full h-40 sm:h-56 md:h-72 lg:h-80 object-contain rounded-lg sm:rounded-xl transition-all duration-300"
                      />
                      {/* Hover overlay with zoom icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Right arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-colors ml-1.5 sm:ml-3 md:ml-4 flex-shrink-0"
                      aria-label="Next image"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4 md:w-5 md:h-5">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/20 mb-3 sm:mb-5 md:mb-7"></div>

                  {/* Thumbnail images */}
                  <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-1 items-end">
                    {productImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-white shadow-lg shadow-white/20'
                            : 'border-transparent opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Img
                          src={image}
                          alt={`Product view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product info - left side on desktop, below images on mobile */}
              <div className="flex-1 max-w-3xl w-full lg:w-auto lg:order-1">
                {/* Title and rating */}
                <div className="mb-5 sm:mb-6">
                  <h1 className="text-white font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    <DecryptedText
                      text={`${productData?.title || 'Коврик для мыши'} ${dynamicSubtitle}`}
                      duration={900}
                      delay={400}
                      className="text-white font-manrope font-bold"
                      showAnimation={false}
                    />
                  </h1>
                  
                  {/* Rating */}
                  <button
                    onClick={() => {
                      const reviewsElement = document.getElementById('reviews');
                      if (reviewsElement) {
                        reviewsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <StarRating rating={productData?.rating || 5} />
                    <div className="h-3.5 sm:h-4 w-px bg-white/30"></div>
                    <span className="text-white font-manrope font-semibold text-sm sm:text-base">{productData?.rating || 5}</span>
                    <span className="text-white/70 font-manrope font-medium text-xs sm:text-sm">({productData?.reviewCount || 29} отзывов)</span>
                  </button>
                </div>

                {/* Product options using pre-made selectors */}
                <div className="space-y-4 mb-5 sm:mb-6">
                  {/* Colors - не показываем для Pro коврика */}
                  {!isProMousepadProduct && (
                    <div className="space-y-2 sm:space-y-2.5">
                      <p className="text-white/60 font-manrope font-medium text-xs sm:text-sm mb-1.5">Цвет</p>
                      <div className="flex gap-2 sm:gap-2.5 md:gap-3">
                        {isClothingProduct ? (
                          // Для одежды только черный и белый
                          <>
                            <button
                              onClick={() => setSelectedColor('black')}
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ring-1 ring-white/20 ${
                                selectedColor === 'black'
                                  ? 'border-blue-500'
                                  : 'border-transparent hover:border-gray-400'
                              }`}
                              style={{ backgroundColor: '#000000' }}
                              title="Черный"
                            />
                            <button
                              onClick={() => setSelectedColor('white')}
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ring-1 ring-white/20 ${
                                selectedColor === 'white'
                                  ? 'border-blue-500'
                                  : 'border-transparent hover:border-gray-400'
                              }`}
                              style={{ backgroundColor: '#FFFFFF' }}
                              title="Белый"
                            />
                          </>
                        ) : (
                          // Для обычных ковриков все цвета
                          COLOR_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSelectedColor(option.id)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ring-1 ring-white/20 ${
                                selectedColor === option.id
                                  ? 'border-blue-500'
                                  : 'border-transparent hover:border-gray-400'
                              }`}
                              style={{ backgroundColor: option.color }}
                              title={option.label}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Sizes - не показываем для Pro коврика */}
                  {isClothingProduct ? (
                    <div className="space-y-3">
                      {/* Для одежды размеры XS-2XL */}
                      <SelectorGroup
                        title="Размер"
                        options={CLOTHING_SIZE_OPTIONS}
                        selectedValue={selectedClothingSize}
                        onChange={setSelectedClothingSize}
                        size="md"
                        allowDeselect={false}
                      />
                      {/* Size Chart Button - Only for clothing */}
                      <button
                        onClick={() => setShowSizeChart(true)}
                        className="text-white/70 hover:text-white font-manrope text-xs sm:text-sm
                                   transition-colors duration-200 flex items-center gap-1.5 underline decoration-dotted underline-offset-4"
                      >
                        <span>Таблица размеров</span>
                      </button>
                    </div>
                  ) : !isProMousepadProduct && (
                    // Для обычных ковриков размеры XL/L
                    <SelectorGroup
                      title="Размер"
                      options={SIZE_OPTIONS}
                      selectedValue={selectedSize}
                      onChange={setSelectedSize}
                      size="md"
                      allowDeselect={false}
                    />
                  )}

                  {/* Types - только для ковриков (и Pro, и обычных) */}
                  {!isClothingProduct && (
                    <SelectorGroup
                      title="Тип поверхности"
                      options={TYPE_OPTIONS}
                      selectedValue={selectedType}
                      onChange={setSelectedType}
                      size="md"
                      allowDeselect={false}
                    />
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent my-6"></div>

                {/* Price and Actions */}
                <div>
                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-white/60 font-manrope font-medium text-xs sm:text-sm mb-1.5">Цена</p>
                    <div className="text-white font-manrope font-bold text-3xl sm:text-4xl md:text-5xl">
                      {productData?.price || '3000 р.'}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-3">
                    {/* Add to cart button - compact width */}
                    <button 
                      onClick={handleAddToCartClick}
                      disabled={flyingToCart}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-manrope font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
                        flyingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/30'
                      }`}
                    >
                      {flyingToCart ? 'Добавление...' : 'В корзину'}
                    </button>

                    {/* Quantity selector - same height as button */}
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 md:gap-7 mb-3 sm:mb-5 md:mb-7 lg:items-stretch">
            {/* Description */}
            <div className="border border-white/20 rounded-lg sm:rounded-xl flex flex-col p-6 sm:p-7 md:p-8 lg:h-[320px]">
              <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Описание</h3>
              <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
              <div 
                ref={descriptionRef}
                className="text-white/90 font-manrope font-normal text-xs sm:text-sm leading-relaxed space-y-2 flex-1 overflow-hidden"
              >
                {isClothingProduct ? (
                  // Описание для одежды
                  <p className="whitespace-pre-line">{clothingDescription}</p>
                ) : isProMousepadProduct ? (
                  // Описание для Pro ковриков
                  <>
                    <p>{PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].main}</p>
                    {PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].details.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </>
                ) : (
                  // Описание для обычных ковриков
                  <>
                    <p>{PRODUCT_DESCRIPTIONS.regular[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.regular].main}</p>
                    {PRODUCT_DESCRIPTIONS.regular[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.regular].details.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </>
                )}
              </div>
              {isDescriptionOverflowing && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-manrope font-medium py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Показать полностью</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Specifications & Dimensions Combined */}
            <div className="border border-white/20 rounded-lg sm:rounded-xl p-6 sm:p-7 md:p-8 lg:h-[320px] flex flex-col">
              <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
                Характеристики {!isClothingProduct && '& Размеры'}
              </h3>
              <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
              
              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Characteristics Section */}
                <div className="space-y-2 sm:space-y-2.5">
                  {isClothingProduct ? (
                    // Характеристики для одежды
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Состав материала</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">Футер 3-х нитка начес</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Состав</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">80% хб + 20% пэ</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Плотность</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">330 гр/м²</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Цвет</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{selectedColor === 'black' ? 'Черный' : 'Белый'}</span>
                      </div>
                    </>
                  ) : isProMousepadProduct ? (
                    // Характеристики для Pro ковриков
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Материал покрытия</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Материал основания</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].base}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Цвет</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">Черный</span>
                      </div>
                    </>
                  ) : (
                    // Характеристики для обычных ковриков
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Материал покрытия</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{PRODUCT_DESCRIPTIONS.regular[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.regular].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Материал основания</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">Резина</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Цвет</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{COLOR_NAMES[selectedColor as keyof typeof COLOR_NAMES]}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Dimensions Section - только для ковриков */}
                {!isClothingProduct && (
                  <>
                    <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent my-4"></div>
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Толщина</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{isProMousepadProduct ? '3.5 мм' : '4 мм'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Длина</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{isProMousepadProduct ? '500 мм' : MOUSEPAD_DIMENSIONS[selectedSize as keyof typeof MOUSEPAD_DIMENSIONS].length}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm">Ширина</span>
                        <span className="text-white/80 font-manrope font-normal text-xs sm:text-sm">{isProMousepadProduct ? '430 мм' : MOUSEPAD_DIMENSIONS[selectedSize as keyof typeof MOUSEPAD_DIMENSIONS].width}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div id="reviews" className="border border-white/20 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 scroll-fade-in scroll-fade-in-delay-1">
            <h3 className="text-white font-manrope font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 text-center">Отзывы</h3>

            <div className="space-y-3 sm:space-y-4">
              {displayedReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review}
                  onPhotoClick={(photos, index) => openGallery(photos, index)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {showMoreReviews && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleLoadMoreReviews}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-manrope font-medium py-3 px-6 rounded-lg text-sm sm:text-base transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Показать еще</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="border border-white/20 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 mt-3 sm:mt-5 md:mt-7 scroll-fade-in scroll-fade-in-delay-2">
              <div className="mb-4 sm:mb-5">
                <h3 className="text-white font-manrope font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                  Похожие товары
                </h3>
                <div className="w-24 sm:w-32 md:w-40 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
              
              <div className="pb-4 sm:pb-6 md:pb-8 px-2 sm:px-4">
                <ProductCarousel itemsPerView={3}>
                  {similarProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      images={product.images}
                      title={product.title}
                      subtitle={product.subtitle}
                      productSize={product.productSize}
                      productColor={product.productColor}
                      price={product.price}
                      priceNumeric={product.priceNumeric}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      color={product.color}
                      category={product.category}
                      clothingType={product.clothingType}
                      size="small-catalog"
                      onProductClick={() => {
                        navigateToProduct(product);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          )}

          {/* Size Chart Modal */}
          <Modal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)}>
          <div className="p-4 sm:p-6 max-w-4xl">
            <h2 className="text-white font-manrope font-bold text-xl sm:text-2xl mb-4">
              Таблица размеров
            </h2>
            
            {/* Size Chart Image */}
            <div className="bg-black/40 rounded-xl overflow-hidden border border-white/10">
              <Img
                src="/images/size-chart.png"
                alt="Таблица размеров одежды"
                className="w-full h-auto"
                onError={(e) => {
                  // Если изображение не загрузилось, показываем заглушку
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full aspect-[4/3] flex items-center justify-center text-white/60 font-manrope p-8 text-center';
                    placeholder.innerHTML = `
                      <div>
                        <p class="text-sm">Таблица размеров скоро будет добавлена</p>
                        <p class="text-xs mt-2 text-white/40">Пожалуйста, свяжитесь с нами для уточнения размеров</p>
                      </div>
                    `;
                    target.parentElement.appendChild(placeholder);
                  }
                }}
              />
            </div>

            {/* Size Guide Tips */}
            <div className="mt-4 space-y-2 text-white/70 text-xs sm:text-sm font-manrope">
              <p>• Замеряйте свою одежду в расправленном виде</p>
              <p>• При промежуточных значениях выбирайте больший размер</p>
              <p>• Не уверены в размере? Напишите нам, мы поможем!</p>
            </div>
          </div>
        </Modal>

        {/* Full Description Modal */}
        <Modal isOpen={showFullDescription} onClose={() => setShowFullDescription(false)}>
          <div className="p-4 sm:p-6 max-w-4xl">
            <h2 className="text-white font-manrope font-bold text-xl sm:text-2xl mb-4">
              Описание товара
            </h2>
            
            <div className="bg-black/40 rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="text-white/90 font-manrope font-normal text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                {fullDescription}
              </div>
            </div>
          </div>
        </Modal>

        {/* Image Gallery Modal */}
        <ImageGalleryModal
          images={galleryImages}
          initialIndex={galleryInitialIndex}
          isOpen={isGalleryOpen}
          onClose={closeGallery}
          altPrefix="Изображение товара"
        />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;
