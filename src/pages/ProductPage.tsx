import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer, Modal } from '../shared/components';
import { SelectorGroup, Breadcrumbs, DecryptedText, StarRating, QuantitySelector, ProductCard, ProductCarousel, ReviewCard, SwipeableGallery } from 'features/products/components';
import { useDeviceDetection } from '../shared/hooks';
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
  const { isMobile } = useDeviceDetection();
  
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
  const specificationsRef = useRef<HTMLDivElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
  const [specificationsHeight, setSpecificationsHeight] = useState<number | null>(null);
  
  // UX Enhancement: Visual feedback when user tries to add incomplete product
  const [showValidationError, setShowValidationError] = useState(false);
  
  // Состояние для отзывов
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(2);
  const displayedReviews = REVIEWS.slice(0, displayedReviewsCount);
  const showMoreReviews = hasMoreReviews(displayedReviewsCount);
  
  const handleLoadMoreReviews = () => {
    setDisplayedReviewsCount(prev => Math.min(prev + 2, REVIEWS.length));
  };

  // Используем хук для получения правильных изображений
  const productImages = useProductImages(productData, selectedSize, selectedColor);

  // Используем утилиты для проверки типа продукта
  const isClothingProduct = isClothing(productData);
  const isProMousepadProduct = isProMousepad(productData);
  
  // Получаем путь к таблице размеров для одежды
  const getSizeChartPath = () => {
    const baseUrl = process.env.PUBLIC_URL || '';
    
    if (!isClothingProduct || !productData?.clothingType) {
      return `${baseUrl}/images/size-chart.png`;
    }
    
    const clothingTypeMap: Record<string, { folder: string; filename: string }> = {
      'hoodie': { folder: 'hoodies', filename: 'size.png' },
      'tshirt': { folder: 'tshirts', filename: 'size.png' },
      'sleeve': { folder: 'sleeves', filename: 'size.webp' }
    };
    
    const config = clothingTypeMap[productData.clothingType];
    if (config) {
      return `${baseUrl}/images/products/clothing/${config.folder}/${config.filename}`;
    }
    
    return `${baseUrl}/images/size-chart.png`;
  };
  
  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current && specificationsHeight !== null) {
        const isOverflow = descriptionRef.current.scrollHeight > specificationsHeight;
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
  }, [selectedType, selectedColor, isClothingProduct, isProMousepadProduct, specificationsHeight]);

  // Отслеживаем изменение высоты блока характеристик
  useEffect(() => {
    const measureSpecifications = () => {
      if (specificationsRef.current) {
        const height = specificationsRef.current.getBoundingClientRect().height;
        setSpecificationsHeight(height);
      }
    };

    measureSpecifications();

    const resizeObserver = new ResizeObserver(measureSpecifications);
    if (specificationsRef.current) {
      resizeObserver.observe(specificationsRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [selectedType, selectedColor, selectedSize, selectedClothingSize, isClothingProduct, isProMousepadProduct]);

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
  
  // Validate if all required parameters are selected
  // UX Critical: Prevents users from adding incomplete products to cart
  const isAddToCartEnabled = useMemo(() => {
    if (isClothingProduct) {
      // Clothing requires: color AND size
      return selectedColor !== '' && selectedClothingSize !== '';
    } else if (isProMousepadProduct) {
      // Pro mousepad only requires: type (no color/size selection)
      return selectedType !== '';
    } else {
      // Regular mousepad requires: color, size AND type
      return selectedColor !== '' && selectedSize !== '' && selectedType !== '';
    }
  }, [isClothingProduct, isProMousepadProduct, selectedColor, selectedClothingSize, selectedSize, selectedType]);

  // Wrapper для handleAddToCart с правильными параметрами
  const handleAddToCartClick = () => {
    // UX: Show visual feedback if validation fails
    if (!isAddToCartEnabled) {
      setShowValidationError(true);
      // Auto-hide error after 3 seconds
      setTimeout(() => setShowValidationError(false), 3000);
      
      // Scroll to product options to help user understand what's missing
      const optionsElement = document.getElementById('product-options');
      if (optionsElement) {
        optionsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    const sizeToAdd = isClothingProduct ? selectedClothingSize : selectedSize;
    addToCart(productData, quantity, sizeToAdd, selectedColor, selectedType);
    setQuantity(1);
    setShowValidationError(false);
  };

  // Sticky button visibility state
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      // Show sticky button when scrolled past the main add to cart button
      const threshold = 800; // Adjust based on your layout
      setShowStickyButton(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <PageContainer showBreadcrumbs={false}>
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="pt-6 sm:pt-8 md:pt-10 pb-24 sm:pb-16 md:pb-20">
          {/* Product section */}
          <div className="border border-white/20 rounded-lg sm:rounded-xl mb-6 sm:mb-8 md:mb-10 content-reveal">
            {/* Breadcrumbs */}
            <div className="px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-3 sm:pb-4">
              <Breadcrumbs />
            </div>

            <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:items-stretch">
              {/* Product images - top on mobile, right on desktop */}
              {/* UX Enhancement: Balanced layout with larger, high-quality product images */}
              {/* Design Strategy: flex-1 allows natural sizing while min-w ensures minimum visibility */}
              <div className="w-full lg:flex-1 lg:min-w-[520px] lg:max-w-[700px] lg:order-2 flex flex-col">
                <div className="rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-white/10 bg-white/[0.02] h-full flex flex-col">
                  {/* Mobile: Swipeable Gallery */}
                  {/* UX: Mobile users get larger touch-friendly swipeable gallery */}
                  {isMobile ? (
                    <div className="h-[400px] sm:h-[450px]">
                      <SwipeableGallery
                        images={productImages}
                        currentIndex={selectedImage}
                        onIndexChange={setSelectedImage}
                        altPrefix="Product image"
                      />
                    </div>
                  ) : (
                    /* Desktop: Optimized Gallery Layout */
                    /* UX: Maintains aspect ratio and visual hierarchy without breaking structure */
                    <>
                      {/* Main image with zoom on hover */}
                      <div className="mb-4 sm:mb-5 md:mb-6 relative group">
                        {/* Image container with aspect ratio preservation and zoom effect */}
                        <div 
                          className="relative w-full aspect-[4/3] bg-black/20 rounded-lg sm:rounded-xl overflow-hidden cursor-crosshair"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            const img = e.currentTarget.querySelector('img');
                            if (img) {
                              img.style.transformOrigin = `${x}% ${y}%`;
                            }
                          }}
                        >
                          <Img
                            id="product-main-image"
                            key={`${selectedSize}-${selectedColor}-${selectedImage}`}
                            src={productImages[selectedImage]}
                            alt="Product"
                            loading="eager"
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-150"
                          />
                          
                          {/* Navigation arrows - positioned over image */}
                          <button
                            onClick={() => setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 sm:p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Previous image"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-5 sm:h-5">
                              <path d="M15 18l-6-6 6-6"/>
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 sm:p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Next image"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-5 sm:h-5">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 sm:mb-5 md:mb-6"></div>

                      {/* Thumbnail images - compact and responsive */}
                      <div className="flex gap-2 sm:gap-2.5 md:gap-3 justify-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        {productImages.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImage === index
                                ? 'border-white shadow-lg shadow-white/20 scale-105'
                                : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30 hover:scale-105'
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
                    </>
                  )}
                </div>
              </div>

              {/* Product info - left side on desktop, below images on mobile */}
              <div className="flex-1 max-w-3xl w-full lg:w-auto lg:order-1 flex flex-col h-full">
                {/* Upper content - title, rating, options */}
                <div className="flex-1">
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
                {/* UX: ID for smooth scroll when validation fails */}
                <div id="product-options" className="space-y-4 mb-5 sm:mb-6">
                  {/* Validation Error Message */}
                  {showValidationError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 animate-in fade-in slide-in-from-top duration-300">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-red-400 font-manrope font-semibold text-sm sm:text-base">
                            Выберите все параметры товара
                          </p>
                          <p className="text-red-300/80 font-manrope text-xs sm:text-sm mt-1">
                            {isClothingProduct 
                              ? 'Необходимо выбрать цвет и размер'
                              : isProMousepadProduct
                              ? 'Необходимо выбрать тип поверхности'
                              : 'Необходимо выбрать цвет, размер и тип поверхности'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Colors - не показываем для Pro коврика */}
                  {!isProMousepadProduct && (
                    <div className={`space-y-2 sm:space-y-2.5 transition-all duration-300 ${showValidationError && selectedColor === '' ? 'ring-2 ring-red-500/50 rounded-lg p-2' : ''}`}>
                      <p className={`font-manrope font-medium text-xs sm:text-sm mb-1.5 ${showValidationError && selectedColor === '' ? 'text-red-400' : 'text-white/60'}`}>
                        Цвет {showValidationError && selectedColor === '' && <span className="text-red-400">*</span>}
                      </p>
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
                    <div className={`space-y-3 transition-all duration-300 ${showValidationError && selectedClothingSize === '' ? 'ring-2 ring-red-500/50 rounded-lg p-2' : ''}`}>
                      {/* Для одежды размеры XS-2XL */}
                      <SelectorGroup
                        title={showValidationError && selectedClothingSize === '' ? "Размер *" : "Размер"}
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
                    <div className={`transition-all duration-300 ${showValidationError && selectedSize === '' ? 'ring-2 ring-red-500/50 rounded-lg p-2' : ''}`}>
                      <SelectorGroup
                        title={showValidationError && selectedSize === '' ? "Размер *" : "Размер"}
                        options={SIZE_OPTIONS}
                        selectedValue={selectedSize}
                        onChange={setSelectedSize}
                        size="md"
                        allowDeselect={false}
                      />
                    </div>
                  )}

                  {/* Types - только для ковриков (и Pro, и обычных) */}
                  {!isClothingProduct && (
                    <div className={`transition-all duration-300 ${showValidationError && selectedType === '' ? 'ring-2 ring-red-500/50 rounded-lg p-2' : ''}`}>
                      <SelectorGroup
                        title={showValidationError && selectedType === '' ? "Тип поверхности *" : "Тип поверхности"}
                        options={TYPE_OPTIONS}
                        selectedValue={selectedType}
                        onChange={setSelectedType}
                        size="md"
                        allowDeselect={false}
                      />
                    </div>
                  )}
                </div>
                </div>

                {/* Bottom section - Price and Actions (pinned to bottom) */}
                <div className="mt-auto">
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
                    {/* Add to cart button - compact width with validation */}
                    <button 
                      onClick={handleAddToCartClick}
                      disabled={flyingToCart || !isAddToCartEnabled}
                      className={`bg-blue-600 text-white font-manrope font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
                        flyingToCart || !isAddToCartEnabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95'
                      }`}
                      title={!isAddToCartEnabled ? 'Выберите все параметры товара' : ''}
                    >
                      <span>{flyingToCart ? 'Добавление...' : 'В корзину'}</span>
                    </button>

                    {/* Quantity selector - same height as button */}
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  </div>
                </div>
                </div>
                {/* End of bottom section */}
              </div>
            </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 md:gap-7 mb-3 sm:mb-5 md:mb-7 lg:items-start">
            {/* Description */}
            <div 
              className="border border-white/20 rounded-lg sm:rounded-xl flex flex-col p-6 sm:p-7 md:p-8"
              style={{ 
                height: specificationsHeight ? `${specificationsHeight}px` : 'auto'
              }}
            >
              <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Описание</h3>
              <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
              <div 
                ref={descriptionRef}
                className="text-white/90 font-manrope font-normal text-xs sm:text-sm leading-relaxed space-y-2 flex-1 overflow-hidden"
                style={{
                  maxHeight: isDescriptionOverflowing && specificationsHeight 
                    ? `${specificationsHeight - 140}px` // Вычитаем отступы, заголовок и кнопку
                    : 'none'
                }}
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
            <div 
              ref={specificationsRef}
              className="border border-white/20 rounded-lg sm:rounded-xl p-6 sm:p-7 md:p-8"
            >
              <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
                Характеристики {!isClothingProduct && '& Размеры'}
              </h3>
              <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
              
              <div className="space-y-4">
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
              <img
                src={getSizeChartPath()}
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

        {/* Mobile Sticky Add to Cart Button */}
        {isMobile && showStickyButton && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl pb-safe animate-in slide-in-from-bottom duration-300">
            <div className="px-4 py-3 flex items-center gap-3">
              {/* Product info - compact */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">
                  {productData?.title}
                </h3>
                <p className="text-white/70 text-xs truncate">
                  {productData?.price}
                </p>
              </div>

              {/* Quantity selector - compact */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white/70 active:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-white font-semibold text-sm min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white/70 active:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Add to cart button with validation */}
              <button
                onClick={handleAddToCartClick}
                disabled={flyingToCart || !isAddToCartEnabled}
                className="min-h-[48px] px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center"
                title={!isAddToCartEnabled ? 'Выберите все параметры товара' : ''}
              >
                <span>
                  {flyingToCart ? 'Добавление...' : 'В корзину'}
                </span>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;
