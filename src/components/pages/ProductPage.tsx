import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SelectorGroup from '../ui/SelectorGroup';
import Header from '../shared/Header';
import DecryptedText from '../shared/DecryptedText';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';
import StarRating from '../shared/StarRating';
import QuantitySelector from '../ui/QuantitySelector';

const ProductPage: React.FC = () => {
  const location = useLocation();
  const productData = location.state?.productData;
  
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('xl');
  const [selectedType, setSelectedType] = useState('speed');
  const [quantity, setQuantity] = useState(1);
  const [flyingToCart, setFlyingToCart] = useState(false);

  // Динамические изображения в зависимости от размера и цвета
  const productImages = useMemo(() => {
    const colorMap: { [key: string]: string } = {
      'black': 'black',
      'gray': 'white',
      'red': 'red'
    };
    
    const colorName = colorMap[selectedColor] || 'black';
    const sizePath = selectedSize === 'xl' ? 'xl' : 'l';
    
    // Создаем массив из трех одинаковых изображений для листания
    const imagePath = `/images/products/mousepads/${sizePath}/mousepad-geoid-${colorName}.webp`;
    
    return [imagePath, imagePath, imagePath];
  }, [selectedSize, selectedColor]);

  // Сбрасываем индекс изображения при смене размера или цвета
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedSize, selectedColor]);

  // Опции для селекторов
  const colorOptions = [
    { id: 'black', label: 'Черный', color: '#000000' },
    { id: 'gray', label: 'Серый', color: '#6B7280' },
    { id: 'red', label: 'Красный', color: '#DC2626' }
  ];

  const sizeOptions = [
    { id: 'xl', label: 'XL(930x430)' },
    { id: 'l', label: 'L(500x430)' }
  ];

  const typeOptions = [
    { id: 'speed', label: 'Speed' },
    { id: 'balance', label: 'Balance' }
  ];

  // Динамическое описание в зависимости от выбранного типа
  const descriptions = useMemo(() => ({
    speed: {
      main: 'Гладкая и равномерная текстура обеспечивает стабильное скольжение и плавные точные движения',
      details: [
        'Коврик ложится ровно сразу из коробки',
        'Прорезиненное основание обеспечивает плотное прилегание к любой поверхности',
        'Коврик имеет прошитые края, что заметно увеличивает срок службы',
        'Материал жаккард обеспечивает быстрое скольжение и устойчивость к износу. Новое покрытие более скоростное, чем полиэстер, но, несмотря на высокую скорость начальных движений, имеет хорошую останавливающую способность.'
      ],
      material: 'Жаккард (Speed)'
    },
    balance: {
      main: 'Сбалансированная текстура для идеального сочетания скорости и контроля',
      details: [
        'Коврик ложится ровно сразу из коробки',
        'Прорезиненное основание обеспечивает плотное прилегание к любой поверхности',
        'Коврик имеет прошитые края, что заметно увеличивает срок службы',
        'Материал полиэстер обеспечивает оптимальный баланс между скоростью и точностью. Идеально подходит для игр, требующих точного прицеливания и быстрых реакций.'
      ],
      material: 'Полиэстер (Balance)'
    }
  }), []);

  // Динамические размеры
  const dimensions = useMemo(() => ({
    xl: { length: '930 мм', width: '430 мм' },
    l: { length: '500 мм', width: '430 мм' }
  }), []);

  // Динамический цвет
  const colorNames = useMemo(() => ({
    black: 'Черный',
    gray: 'Серый',
    red: 'Красный'
  }), []);

  // Обработчик добавления в корзину с анимацией
  const handleAddToCart = () => {
    // Запуск анимации
    setFlyingToCart(true);
    
    // Создаем летящую копию изображения
    const productImageElement = document.getElementById('product-main-image');
    const cartIcon = document.getElementById('cart-button');
    
    if (productImageElement && cartIcon) {
      const imageRect = productImageElement.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Создаем клон изображения
      const flyingImage = document.createElement('img');
      flyingImage.src = productImages[selectedImage];
      flyingImage.style.cssText = `
        position: fixed;
        left: ${imageRect.left}px;
        top: ${imageRect.top}px;
        width: ${imageRect.width}px;
        height: ${imageRect.height}px;
        z-index: 10000;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        object-fit: contain;
      `;
      
      document.body.appendChild(flyingImage);
      
      // Запускаем анимацию
      setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.width = '50px';
        flyingImage.style.height = '50px';
        flyingImage.style.opacity = '0';
      }, 10);
      
      // Удаляем элемент после анимации
      setTimeout(() => {
        document.body.removeChild(flyingImage);
        setFlyingToCart(false);
      }, 850);
    }
    
    // Добавляем товары в корзину
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${productData?.id || 'product'}-${selectedSize}-${selectedColor}-${selectedType}-${Date.now()}-${i}`,
        image: productImages[selectedImage],
        title: productData?.title || 'Коврик для мыши',
        subtitle: productData?.subtitle || '"geoid-white"',
        price: productData?.price || '3000 р.',
        selectedSize: sizeOptions.find(opt => opt.id === selectedSize)?.label,
        selectedColor: colorNames[selectedColor as keyof typeof colorNames],
        selectedType: typeOptions.find(opt => opt.id === selectedType)?.label
      });
    }
    
    setQuantity(1); // Сбросить количество
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
              <div className="flex-shrink-0 w-full lg:w-[580px] lg:order-2">
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-7">
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
                  <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center">
                    {productImages.map((image, index) => (
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
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-10">
                  <h1 className="text-white font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-2 sm:mb-3 md:mb-5 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    <DecryptedText
                      text={`${productData?.title || 'Коврик для мыши'} ${productData?.subtitle || '"geoid-white"'}`}
                      duration={900}
                      delay={400}
                      className="text-white font-manrope font-bold"
                      showAnimation={false}
                    />
                  </h1>
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <StarRating rating={productData?.rating || 5} />
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">({productData?.reviewCount || 29})</span>
                  </div>
                </div>

                {/* Product options using pre-made selectors */}
                <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  {/* Colors */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex gap-1.5 sm:gap-2 md:gap-2.5">
                      {colorOptions.map((option) => (
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
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <SelectorGroup
                    options={sizeOptions}
                    selectedValue={selectedSize}
                    onChange={setSelectedSize}
                    size="md"
                    allowDeselect={false}
                  />

                  {/* Types */}
                  <SelectorGroup
                    options={typeOptions}
                    selectedValue={selectedType}
                    onChange={setSelectedType}
                    size="md"
                    allowDeselect={false}
                  />
                </div>

                {/* Price and actions */}
                <div className="space-y-2 sm:space-y-3 md:space-y-5">
                  <div className="text-white font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                    {productData?.price || '3000 р.'}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5 lg:gap-8 items-stretch sm:items-center">
                    <button 
                      onClick={handleAddToCart}
                      disabled={flyingToCart}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-manrope font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-4 sm:px-5 md:px-7 lg:px-9 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-md sm:rounded-lg md:rounded-xl transition-all duration-200 ${
                        flyingToCart ? 'scale-95 opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      {flyingToCart ? 'Добавление...' : 'В корзину'}
                    </button>
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
                <p>{descriptions[selectedType as keyof typeof descriptions].main}</p>
                {descriptions[selectedType as keyof typeof descriptions].details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-3 sm:space-y-5 md:space-y-7">
              {/* Characteristics */}
              <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Характеристики</h3>
                <div className="w-36 sm:w-48 md:w-64 h-px bg-white/40 mb-3 sm:mb-5"></div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал покрытия</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{descriptions[selectedType as keyof typeof descriptions].material}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал основания</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Резина</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Цвет</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{colorNames[selectedColor as keyof typeof colorNames]}</span>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Размеры</h3>
                <div className="w-24 sm:w-28 md:w-36 h-px bg-white/40 mb-3 sm:mb-5"></div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Толщина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">4 мм</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Длина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{dimensions[selectedSize as keyof typeof dimensions].length}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Ширина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{dimensions[selectedSize as keyof typeof dimensions].width}</span>
                  </div>
                </div>
              </div>

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
      </div>
    </div>
  );
};

export default ProductPage;
