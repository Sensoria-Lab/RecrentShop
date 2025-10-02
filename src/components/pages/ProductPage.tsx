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
        <main className="flex-1 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-12">
          {/* Product section */}
          <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-16 mb-6 sm:mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start justify-between">
              {/* Product info - left side */}
              <div className="flex-1 max-w-3xl w-full lg:w-auto">
                {/* Title and rating */}
                <div className="mb-6 sm:mb-8 md:mb-12">
                  <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    <DecryptedText
                      text={`${productData?.title || 'Коврик для мыши'} ${productData?.subtitle || '"geoid-white"'}`}
                      duration={900}
                      delay={400}
                      className="text-white font-manrope font-bold"
                      showAnimation={false}
                    />
                  </h1>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <StarRating rating={productData?.rating || 5} />
                    <span className="text-white font-manrope font-medium text-base sm:text-lg md:text-xl">({productData?.reviewCount || 29})</span>
                  </div>
                </div>

                {/* Product options using pre-made selectors */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-6 sm:mb-8 md:mb-12">
                  {/* Colors */}
                  <div className="space-y-3">
                    <div className="flex gap-2 sm:gap-3">
                      {colorOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedColor(option.id)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 transition-all ${
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
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-white font-manrope font-bold text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                    {productData?.price || '3000 р.'}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-stretch sm:items-center">
                    <button 
                      onClick={handleAddToCart}
                      disabled={flyingToCart}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl transition-all duration-200 ${
                        flyingToCart ? 'scale-95 opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      {flyingToCart ? 'Добавление...' : 'В корзину'}
                    </button>
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  </div>
                </div>
              </div>

              {/* Product images - right side */}
              <div className="flex-shrink-0 w-full lg:w-[580px]">
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 md:p-8">
                  {/* Main image with navigation arrows */}
                  <div className="mb-4 sm:mb-6 md:mb-8 relative flex items-center">
                    {/* Left arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors mr-2 sm:mr-4 flex-shrink-0"
                      aria-label="Previous image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
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
                        className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-contain rounded-xl transition-all duration-300"
                      />
                    </div>

                    {/* Right arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors ml-2 sm:ml-4 flex-shrink-0"
                      aria-label="Next image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/20 mb-4 sm:mb-6 md:mb-8"></div>

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
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {/* Description */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-12">
              <h3 className="text-white font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Описание</h3>
              <div className="w-32 sm:w-40 md:w-48 h-px bg-white/40 mb-4 sm:mb-6"></div>
              <div className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg leading-relaxed space-y-3 sm:space-y-4">
                <p>{descriptions[selectedType as keyof typeof descriptions].main}</p>
                {descriptions[selectedType as keyof typeof descriptions].details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Characteristics */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-12">
                <h3 className="text-white font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Характеристики</h3>
                <div className="w-48 sm:w-64 md:w-80 h-px bg-white/40 mb-4 sm:mb-6"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Материал покрытия</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">{descriptions[selectedType as keyof typeof descriptions].material}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Материал основания</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Резина</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Цвет</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">{colorNames[selectedColor as keyof typeof colorNames]}</span>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-12">
                <h3 className="text-white font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Размеры</h3>
                <div className="w-32 sm:w-36 md:w-44 h-px bg-white/40 mb-4 sm:mb-6"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Толщина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">4 мм</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Длина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">{dimensions[selectedSize as keyof typeof dimensions].length}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                    <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">Ширина</span>
                    <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">{dimensions[selectedSize as keyof typeof dimensions].width}</span>
                  </div>
                </div>
              </div>

              {/* Article */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-12">
                <h3 className="text-white font-manrope font-semibold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Артикул</h3>
                <div className="w-32 sm:w-36 md:w-44 h-px bg-white/40 mb-4 sm:mb-6"></div>
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
                  <span className="text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">№</span>
                  <span className="text-white/80 sm:text-white font-manrope font-medium text-sm sm:text-base md:text-lg lg:text-xl">110</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-10 lg:p-12">
            <h3 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 text-center">Отзывы</h3>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Review 1 */}
              <div className="bg-black/40 p-4 sm:p-6 md:p-10 lg:p-12 rounded-xl border-b border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white font-manrope font-bold text-3xl">Никита Литвиненко</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white font-manrope font-medium text-xl mb-6 leading-relaxed">
                  приехал быстро (буквально 3-4 дня с учетом праздников), коврик огромен, даже неожиданно огромен, качество 15/10, исполнение принта 25/10, за такую цену чуть ли не лучшее предложение на рынке ковров, спасибо за такое прекрасное исполнение!
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-blue-100 rounded-xl"></div>
                    <div className="w-20 h-20 bg-green-100 rounded-xl"></div>
                    <div className="w-20 h-20 bg-red-100 rounded-xl"></div>
                  </div>
                  <span className="text-white font-manrope font-medium text-xl">09.11.2025</span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-black/40 p-12 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white font-manrope font-bold text-3xl">Даниилс Ушаковс</h4>
                  <StarRating rating={5} />
                </div>
                <p className="text-white font-manrope font-medium text-xl mb-6 leading-relaxed">
                  Коврик - огонь! Единственный вопрос, не нашел нигде, как его правильно стирать, чтобы не повредить поверхность?
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-blue-100 rounded-xl"></div>
                    <div className="w-20 h-20 bg-green-100 rounded-xl"></div>
                    <div className="w-20 h-20 bg-red-100 rounded-xl"></div>
                  </div>
                  <span className="text-white font-manrope font-medium text-xl">09.11.2025</span>
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
