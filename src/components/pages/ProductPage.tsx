import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SelectorGroup from '../ui/SelectorGroup';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import DecryptedText from '../shared/DecryptedText';
import Img from '../shared/Img';
import StarRating from '../shared/StarRating';
import QuantitySelector from '../ui/QuantitySelector';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import Modal from '../shared/Modal';
import { ALL_PRODUCTS } from '../../data/products';
import { useProduct, useProductImages, useAddToCart, useProductNavigation } from '../../hooks';
import { COLOR_OPTIONS, SIZE_OPTIONS, TYPE_OPTIONS, CLOTHING_SIZE_OPTIONS } from '../../constants/selectorOptions';
import { getClothingDescription, MOUSEPAD_DIMENSIONS, COLOR_NAMES, PRODUCT_DESCRIPTIONS } from '../../constants/productDescriptions';
import { isClothing, isProMousepad } from '../../lib/productUtils';

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

  // Используем хук для получения правильных изображений
  const productImages = useProductImages(productData, selectedSize, selectedColor);

  // Используем утилиты для проверки типа продукта
  const isClothingProduct = isClothing(productData);
  const isProMousepadProduct = isProMousepad(productData);

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

  // Проверяем, нужна ли кнопка "Читать полностью" (если текст длиннее 300 символов)
  const needsReadMore = fullDescription.length > 300;

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
    addToCart(productData, quantity);
    setQuantity(1);
  };

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

        {/* Main content with increased padding */}
        <main className="flex-1 px-3 sm:px-6 md:px-10 lg:px-20 py-4 sm:py-6 md:py-10 max-w-[1400px] mx-auto w-full">
          {/* Product section */}
          <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-14 mb-4 sm:mb-6 md:mb-10">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-14 items-start justify-between">
              {/* Product images - top on mobile, right on desktop */}
              <div className="flex-shrink-0 w-full lg:w-[580px] lg:order-2 lg:h-full">
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-7 h-full flex flex-col">
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
                    <div className="flex-1">
                      <Img
                        id="product-main-image"
                        key={`${selectedSize}-${selectedColor}-${selectedImage}`}
                        src={productImages[selectedImage]}
                        alt="Product"
                        className="w-full h-40 sm:h-56 md:h-72 lg:h-80 object-contain rounded-lg sm:rounded-xl transition-all duration-300"
                      />
                    </div>

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
                  <div className="inline-flex items-center gap-2 sm:gap-2.5">
                    <StarRating rating={productData?.rating || 5} />
                    <div className="h-3.5 sm:h-4 w-px bg-white/30"></div>
                    <span className="text-white font-manrope font-semibold text-sm sm:text-base">{productData?.rating || 5}</span>
                    <span className="text-white/70 font-manrope font-medium text-xs sm:text-sm">({productData?.reviewCount || 29} отзывов)</span>
                  </div>
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
                        <span>📏</span>
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

          {/* Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 md:gap-7 mb-3 sm:mb-5 md:mb-7 lg:items-start">
            {/* Description */}
            <div className={`bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col ${isClothingProduct ? 'lg:h-[28vh]' : 'lg:h-full'}`}>
              <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Описание</h3>
              <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
              <div className={`text-white/90 font-manrope font-normal text-xs sm:text-sm leading-relaxed space-y-2 flex-1 overflow-hidden ${isClothingProduct ? 'line-clamp-[10]' : ''}`}>
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
              <button
                onClick={() => setShowFullDescription(true)}
                className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-manrope font-medium py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span className="text-base">📖</span>
                <span>Читать полностью</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Specifications */}
            <div className="space-y-3 sm:space-y-5 md:space-y-7">
              {/* Characteristics */}
              <div className={`bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col ${isClothingProduct ? 'lg:min-h-[28vh]' : ''}`}>
                <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Характеристики</h3>
                <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
                <div className={`space-y-2 sm:space-y-2.5 ${isClothingProduct ? 'flex-1 flex flex-col justify-center' : ''}`}>
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
              </div>

              {/* Dimensions - только для ковриков */}
              {!isClothingProduct && (
                <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8">
                  <h3 className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Размеры</h3>
                  <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
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
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8">
            <h3 className="text-white font-manrope font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 text-center">Отзывы</h3>

            <div className="space-y-3 sm:space-y-4">
              {/* Review 1 */}
              <div className="bg-black/40 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-b border-white/20">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <h4 className="text-white font-manrope font-semibold text-sm sm:text-base">Никита Литвиненко</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white/90 font-manrope font-normal text-xs sm:text-sm mb-3 leading-relaxed">
                  приехал быстро (буквально 3-4 дня с учетом праздников), коврик огромен, даже неожиданно огромен, качество 15/10, исполнение принта 25/10, за такую цену чуть ли не лучшее предложение на рынке ковров, спасибо за такое прекрасное исполнение!
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg"></div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg"></div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-lg"></div>
                  </div>
                  <span className="text-white/70 font-manrope font-normal text-xs sm:text-sm">09.11.2025</span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-black/40 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <h4 className="text-white font-manrope font-semibold text-sm sm:text-base">Даниилс Ушаковс</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white/90 font-manrope font-normal text-xs sm:text-sm mb-3 leading-relaxed">
                  Коврик - огонь! Единственный вопрос, не нашел нигде, как его правильно стирать, чтобы не повредить поверхность?
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg"></div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg"></div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-lg"></div>
                  </div>
                  <span className="text-white/70 font-manrope font-normal text-xs sm:text-sm">09.11.2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 mt-3 sm:mt-5 md:mt-7">
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
                      onAddToCart={() => {}}
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
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Size Chart Modal */}
        <Modal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)}>
          <div className="p-4 sm:p-6 max-w-4xl">
            <h2 className="text-white font-manrope font-bold text-xl sm:text-2xl mb-4 flex items-center gap-2">
              <span>📏</span>
              <span>Таблица размеров</span>
            </h2>
            
            {/* Size Chart Image */}
            <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
              <Img
                src="/images/size-chart.webp"
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
                        <p class="text-lg mb-2">📐</p>
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
              <p className="flex items-start gap-2">
                <span>💡</span>
                <span>Замеряйте свою одежду в расправленном виде</span>
              </p>
              <p className="flex items-start gap-2">
                <span>📐</span>
                <span>При промежуточных значениях выбирайте больший размер</span>
              </p>
              <p className="flex items-start gap-2">
                <span>❓</span>
                <span>Не уверены в размере? Напишите нам, мы поможем!</span>
              </p>
            </div>
          </div>
        </Modal>

        {/* Full Description Modal */}
        <Modal isOpen={showFullDescription} onClose={() => setShowFullDescription(false)}>
          <div className="p-4 sm:p-6 max-w-4xl">
            <h2 className="text-white font-manrope font-bold text-xl sm:text-2xl mb-4 flex items-center gap-2">
              <span>📖</span>
              <span>Описание товара</span>
            </h2>
            
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="text-white/90 font-manrope font-normal text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                {fullDescription}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductPage;
