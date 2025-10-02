import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SelectorGroup from '../ui/SelectorGroup';
import Header from '../shared/Header';
import DecryptedText from '../shared/DecryptedText';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';
import StarRating from '../shared/StarRating';
import QuantitySelector from '../ui/QuantitySelector';
import { ALL_PRODUCTS } from '../../data/products';

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
  
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('xl');
  const [selectedType, setSelectedType] = useState('speed');
  const [selectedClothingSize, setSelectedClothingSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [flyingToCart, setFlyingToCart] = useState(false);

  // Динамические изображения в зависимости от размера и цвета
  const productImages = useMemo(() => {
    // Если нет данных продукта, используем дефолтные изображения
    if (!productData) {
      const mainImage = '/images/products/mousepads/xl/mousepad-geoid-black.webp';
      return [mainImage, mainImage, mainImage];
    }

    // Для ковриков - динамически формируем пути на основе размера и цвета
    if (productData.category === 'mousepads') {
      // Пробуем найти соответствующие изображения
      // Для коврика Pro Speed используем специальную папку
      if (productData.subtitle?.includes('Pro Speed')) {
        return [
          '/images/products/mousepads/pro/control.webp',
          '/images/products/mousepads/pro/control_2.webp',
          '/images/products/mousepads/pro/control_3.webp'
        ];
      }
      
      // Для logo-blue ковриков
      if (productData.subtitle?.includes('logo-blue')) {
        if (selectedSize === 'xl') {
          return [
            '/images/products/mousepads/xl/xl_blue/lxl_01_1.webp',
            '/images/products/mousepads/xl/xl_blue/lxl_02_1.webp',
            '/images/products/mousepads/xl/xl_blue/xl_01_2.webp',
            '/images/products/mousepads/xl/xl_blue/xl_02_2.webp'
          ];
        } else {
          return [
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_01.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_02.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_03.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_04.webp'
          ];
        }
      }
      
      // Для обычных geoid ковриков
      if (selectedSize === 'xl') {
        if (selectedColor === 'red') {
          return [
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_01.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_02.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_03.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_04.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            '/images/products/mousepads/xl/xl_white_geoid/11.webp',
            '/images/products/mousepads/xl/xl_white_geoid/4_4.webp',
            '/images/products/mousepads/xl/xl_white_geoid/5_4.webp'
          ];
        } else {
          // black по умолчанию
          return [
            '/images/products/mousepads/xl/xl_black_geoid/114_001.webp',
            '/images/products/mousepads/xl/xl_black_geoid/114_002.webp',
            '/images/products/mousepads/xl/xl_black_geoid/114_003.webp'
          ];
        }
      } else {
        // Size L
        if (selectedColor === 'red') {
          return [
            '/images/products/mousepads/l/l_red/109_l_logo-red_01.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_02.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_03.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_04.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            '/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_02.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_04.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_05.webp'
          ];
        } else {
          // black по умолчанию
          return [
            '/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_02.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_04.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_05.webp'
          ];
        }
      }
    }
    
    // Для одежды и рукавов используем статический массив из данных
    if (productData.images && productData.images.length > 0) {
      return productData.images;
    }
    
    // Иначе используем основное изображение
    const mainImage = productData.image;
    return [mainImage, mainImage, mainImage];
  }, [productData, selectedSize, selectedColor]);

  // Инициализация селекторов на основе данных продукта
  useEffect(() => {
    if (productData) {
      // Устанавливаем размер из данных продукта
      if (productData.productSize) {
        const sizeMap: { [key: string]: string } = {
          'XL': 'xl',
          'L': 'l',
          'M': 'l',
          'S': 'l'
        };
        setSelectedSize(sizeMap[productData.productSize] || 'xl');
      }
      
      // Устанавливаем цвет из данных продукта
      if (productData.color) {
        setSelectedColor(productData.color);
        
        // Для одежды также устанавливаем размер
        if (productData.category === 'clothing' && productData.productSize) {
          setSelectedClothingSize(productData.productSize);
        }
      }
    }
  }, [productData]);

  // Сбрасываем индекс изображения при смене размера или цвета
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedSize, selectedColor]);

  // Опции для селекторов
  const colorOptions = [
    { id: 'black', label: 'Черный', color: '#000000' },
    { id: 'white', label: 'Белый', color: '#FFFFFF' },
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

  const clothingSizeOptions = [
    { id: 'XS', label: 'XS' },
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: '2XL', label: '2XL' }
  ];

  // Определяем, является ли продукт одеждой
  const isClothing = productData?.category === 'clothing';
  
  // Определяем, является ли продукт Pro ковриком (poron base)
  const isProMousepad = productData?.subtitle?.toLowerCase().includes('poron');

  // Динамическое описание в зависимости от выбранного типа
  const descriptions = useMemo(() => ({
    speed: {
      main: 'Одна из самых быстрых тканей на рынке. Гладкая поверхность обеспечивает глайд без каких либо усилий.',
      details: [
        'Мягкая подложка из порона дает дополнительный контроль при давлении на мышь, а также плотное прилегание к любому столу.',
        'Шов по краям расположен ниже уровня поверхности, что позволяет никак не ощущать его рукой и многократно увеличивает срок службы.',
        'Лучше всего подойдет для динамичных игр, в которых важен трекинг, таких как Apex Legends, Warzone, Marvel Rivals и т.д.'
      ],
      material: 'Ткань с покрытием (Speed)',
      base: 'Poron (мягкая пена)'
    },
    balance: {
      main: 'Гладкая поверхность с улучшенным контролем. Сбалансированное сочетание скорости и точности.',
      details: [
        'Мягкая подложка из порона дает дополнительный контроль при давлении на мышь, а также плотное прилегание к любому столу.',
        'Шов по краям расположен ниже уровня поверхности, что позволяет никак не ощущать его рукой и многократно увеличивает срок службы.',
        'Идеально подходит для тактических шутеров и игр, требующих высокой точности прицеливания.'
      ],
      material: 'Ткань с покрытием (Control)',
      base: 'Poron (мягкая пена)'
    }
  }), []);

  // Описание для обычных ковриков (не Pro)
  const regularMousepadDescriptions = useMemo(() => ({
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

  // Описание для одежды
  const clothingDescription = `Материал футер 3-х нитк., начес.

Цвет: ${selectedColor === 'black' ? 'черный' : 'белый'}

На фото размер худи-оверсайз: L. Рост Дмитрия: 185 см, вес 80 кг.

(Размер изделия может отличаться от размерной сетки на несколько сантиметров, в меньшую или большую сторону!)

Требуется ручная стирка перед использованием изделия! Правила ухода на этикетке и на нашем сайте!

Для создания худи-оверсайз проделана очень большая работа!

Уделялось внимание каждой детали!

Что получилось в итоге:

Для производства использовался материал: футер 3-х ниточный, с начесом европейского качества-пенье!

Мы сделали трехсоставной капюшон, он дублирован основной тканью, выглядит объемным и удобным!

Добавили манжеты кашкорсе, для лучшей фиксации!

Все изделие прошито мелким стяжком!

Сделали дополнительные отсрочки швов (горловой шов, шов втачивания рукава, в местах где пришивается кашкорсе)

Принт на рукав, грудь и спину наносился методом шелкографии!

Ну и в финале упаковали в индивидуальную упаковку-пакет на скотч клапане и наклеили маркировку с наименованием изделия, размером и правилами по уходу!`;

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
                  {/* Colors - не показываем для Pro коврика */}
                  {!isProMousepad && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex gap-1.5 sm:gap-2 md:gap-2.5">
                        {isClothing ? (
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
                          colorOptions.map((option) => (
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
                  {isClothing ? (
                    // Для одежды размеры XS-2XL
                    <SelectorGroup
                      options={clothingSizeOptions}
                      selectedValue={selectedClothingSize}
                      onChange={setSelectedClothingSize}
                      size="md"
                      allowDeselect={false}
                    />
                  ) : !isProMousepad && (
                    // Для обычных ковриков размеры XL/L
                    <SelectorGroup
                      options={sizeOptions}
                      selectedValue={selectedSize}
                      onChange={setSelectedSize}
                      size="md"
                      allowDeselect={false}
                    />
                  )}

                  {/* Types - только для ковриков (и Pro, и обычных) */}
                  {!isClothing && (
                    <SelectorGroup
                      options={typeOptions}
                      selectedValue={selectedType}
                      onChange={setSelectedType}
                      size="md"
                      allowDeselect={false}
                    />
                  )}
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
                {isClothing ? (
                  // Описание для одежды
                  <p className="whitespace-pre-line">{clothingDescription}</p>
                ) : isProMousepad ? (
                  // Описание для Pro ковриков
                  <>
                    <p>{descriptions[selectedType as keyof typeof descriptions].main}</p>
                    {descriptions[selectedType as keyof typeof descriptions].details.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </>
                ) : (
                  // Описание для обычных ковриков
                  <>
                    <p>{regularMousepadDescriptions[selectedType as keyof typeof regularMousepadDescriptions].main}</p>
                    {regularMousepadDescriptions[selectedType as keyof typeof regularMousepadDescriptions].details.map((detail, index) => (
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
                  {isClothing ? (
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
                  ) : isProMousepad ? (
                    // Характеристики для Pro ковриков
                    <>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал покрытия</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{descriptions[selectedType as keyof typeof descriptions].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал основания</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{descriptions[selectedType as keyof typeof descriptions].base}</span>
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
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{regularMousepadDescriptions[selectedType as keyof typeof regularMousepadDescriptions].material}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Материал основания</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Резина</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-1">
                        <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Цвет</span>
                        <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{colorNames[selectedColor as keyof typeof colorNames]}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Dimensions - только для ковриков */}
              {!isClothing && (
                <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-8 lg:p-10">
                  <h3 className="text-white font-manrope font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Размеры</h3>
                  <div className="w-24 sm:w-28 md:w-36 h-px bg-white/40 mb-3 sm:mb-5"></div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Толщина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepad ? '3.5 мм' : '4 мм'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Длина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepad ? '500 мм' : dimensions[selectedSize as keyof typeof dimensions].length}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">Ширина</span>
                      <span className="text-white/80 sm:text-white font-manrope font-medium text-xs sm:text-sm md:text-base lg:text-lg">{isProMousepad ? '430 мм' : dimensions[selectedSize as keyof typeof dimensions].width}</span>
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
      </div>
    </div>
  );
};

export default ProductPage;
