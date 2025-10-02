import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SelectorGroup from '../ui/SelectorGroup';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import DecryptedText from '../shared/DecryptedText';
import Img from '../shared/Img';
import StarRating from '../shared/StarRating';
import QuantitySelector from '../ui/QuantitySelector';
import { ALL_PRODUCTS } from '../../data/products';
import { useProduct, useProductImages, useAddToCart } from '../../hooks';
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

  // Используем хук для получения правильных изображений
  const productImages = useProductImages(productData, selectedSize, selectedColor);

  // Используем утилиты для проверки типа продукта
  const isClothingProduct = isClothing(productData);
  const isProMousepadProduct = isProMousepad(productData);

  // Получаем описание для одежды
  const clothingDescription = getClothingDescription(selectedColor);

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
        <main className="flex-1 px-3 sm:px-6 md:px-10 lg:px-20 py-4 sm:py-6 md:py-10">
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
                  
                  {/* Rating with background card */}
                  <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:py-2 border border-white/20">
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
                      <p className="text-white/90 font-manrope font-medium text-sm sm:text-base md:text-lg">Цвет</p>
                      <div className="flex gap-2 sm:gap-2.5 md:gap-3">
                        {isClothingProduct ? (
                          // Для одежды только черный и белый
                          <>
                            <button
                              onClick={() => setSelectedColor('black')}
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ${
                                selectedColor === 'black'
                                  ? 'border-blue-500'
                                  : 'border-transparent hover:border-gray-400'
                              }`}
                              style={{ backgroundColor: '#000000' }}
                              title="Черный"
                            />
                            <button
                              onClick={() => setSelectedColor('white')}
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ${
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
                              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md sm:rounded-lg border-2 transition-all active:scale-95 ${
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
                    // Для одежды размеры XS-2XL
                    <SelectorGroup
                      title="Размер"
                      options={CLOTHING_SIZE_OPTIONS}
                      selectedValue={selectedClothingSize}
                      onChange={setSelectedClothingSize}
                      size="md"
                      allowDeselect={false}
                    />
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
                <div className="w-full h-px bg-white/20 my-5"></div>

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
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-manrope font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${
                        flyingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/30'
                      }`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 md:gap-7 mb-3 sm:mb-5 md:mb-7">
            {/* Description */}
            <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
              <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Описание</h3>
              <div className="w-24 sm:w-32 md:w-40 h-px bg-white/40 mb-3 sm:mb-5"></div>
              <div className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base leading-relaxed space-y-2 sm:space-y-3">
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
            </div>

            {/* Specifications */}
            <div className="space-y-3 sm:space-y-5 md:space-y-7">
              {/* Characteristics */}
              <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Характеристики</h3>
                <div className="w-36 sm:w-48 md:w-64 h-px bg-white/40 mb-3 sm:mb-5"></div>
                <div className="space-y-2 sm:space-y-3">
                  {isClothingProduct ? (
                    // Характеристики для одежды
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Состав материала</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Футер 3-х нитка начес</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Состав</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">80% хб + 20% пэ</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Плотность</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">330 гр/м²</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Цвет</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{selectedColor === 'black' ? 'Черный' : 'Белый'}</span>
                      </div>
                    </>
                  ) : isProMousepadProduct ? (
                    // Характеристики для Pro ковриков
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал покрытия</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал основания</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{PRODUCT_DESCRIPTIONS.pro[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.pro].base}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Цвет</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Черный</span>
                      </div>
                    </>
                  ) : (
                    // Характеристики для обычных ковриков
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал покрытия</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{PRODUCT_DESCRIPTIONS.regular[selectedType as keyof typeof PRODUCT_DESCRIPTIONS.regular].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал основания</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Резина</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Цвет</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{COLOR_NAMES[selectedColor as keyof typeof COLOR_NAMES]}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Dimensions - только для ковриков */}
              {!isClothingProduct && (
                <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                  <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Размеры</h3>
                  <div className="w-24 sm:w-28 md:w-36 h-px bg-white/40 mb-3 sm:mb-5"></div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Толщина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepadProduct ? '3.5 мм' : '4 мм'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Длина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepadProduct ? '500 мм' : MOUSEPAD_DIMENSIONS[selectedSize as keyof typeof MOUSEPAD_DIMENSIONS].length}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Ширина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepadProduct ? '430 мм' : MOUSEPAD_DIMENSIONS[selectedSize as keyof typeof MOUSEPAD_DIMENSIONS].width}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Article */}
              <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Артикул</h3>
                <div className="w-24 sm:w-28 md:w-36 h-px bg-white/40 mb-3 sm:mb-5"></div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">№</span>
                  <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">110</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
            <h3 className="text-white font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-5 md:mb-7 text-center">Отзывы</h3>

            <div className="space-y-3 sm:space-y-5 md:space-y-7">
              {/* Review 1 */}
              <div className="bg-black/40 p-3 sm:p-5 md:p-8 lg:p-10 rounded-lg sm:rounded-xl border-b border-white/20">
                <div className="flex justify-between items-center mb-3 sm:mb-5">
                  <h4 className="text-white font-manrope font-bold text-sm sm:text-base md:text-xl lg:text-2xl">Никита Литвиненко</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-5 leading-relaxed">
                  приехал быстро (буквально 3-4 дня с учетом праздников), коврик огромен, даже неожиданно огромен, качество 15/10, исполнение принта 25/10, за такую цену чуть ли не лучшее предложение на рынке ковров, спасибо за такое прекрасное исполнение!
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-100 rounded-lg sm:rounded-xl"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-100 rounded-lg sm:rounded-xl"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-100 rounded-lg sm:rounded-xl"></div>
                  </div>
                  <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">09.11.2025</span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-black/40 p-3 sm:p-5 md:p-8 lg:p-10 rounded-lg sm:rounded-xl">
                <div className="flex justify-between items-center mb-3 sm:mb-5">
                  <h4 className="text-white font-manrope font-bold text-sm sm:text-base md:text-xl lg:text-2xl">Даниилс Ушаковс</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-5 leading-relaxed">
                  Коврик - огонь! Единственный вопрос, не нашел нигде, как его правильно стирать, чтобы не повредить поверхность?
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-100 rounded-lg sm:rounded-xl"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-100 rounded-lg sm:rounded-xl"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-100 rounded-lg sm:rounded-xl"></div>
                  </div>
                  <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">09.11.2025</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
