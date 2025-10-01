import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectorGroup from '../ui/SelectorGroup';
import Header from '../shared/Header';
import DecryptedText from '../shared/DecryptedText';


// Star rating component
const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={i < rating ? "#8B5CF6" : "none"}
        stroke={i < rating ? "#8B5CF6" : "rgba(255, 255, 255, 0.4)"}
        strokeWidth="1.5"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ))}
  </div>
);


// Quantity selector component
const QuantitySelector: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-10 bg-gray-800 rounded-xl px-5 py-4">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="text-white font-manrope font-semibold text-2xl hover:text-gray-300 transition-colors"
      >
        -
      </button>
      <span className="text-white font-manrope font-semibold text-2xl min-w-[2rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="text-white font-manrope font-semibold text-2xl hover:text-gray-300 transition-colors"
      >
        +
      </button>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.productData;
  
  // Use product data if provided, otherwise use default values
  const defaultImages = [
    '/013_l_black_02.webp',
    '/013_l_black_04.webp',
    '/013_l_black_05.webp',
    '/61.webp'
  ];

  const productImages = productData?.image ? [productData.image] : defaultImages;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('xl');
  const [selectedType, setSelectedType] = useState('speed');

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main layout container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header />
          </div>
        </div>

        {/* Main content with increased padding */}
        <main className="flex-1 px-20 py-12">
          {/* Product section */}
          <div className="bg-black/40 backdrop-blur rounded-xl p-16 mb-12">
            <div className="flex gap-16 items-start justify-between">
              {/* Product info - left side */}
              <div className="flex-1 max-w-3xl">
                {/* Title and rating */}
                <div className="mb-12">
                  <h1 className="text-white font-manrope font-bold text-5xl lg:text-6xl mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    <DecryptedText
                      text={`${productData?.title || 'Коврик для мыши'} ${productData?.subtitle || '"geoid-white"'}`}
                      duration={900}
                      delay={400}
                      className="text-white font-manrope font-bold"
                      showAnimation={false}
                    />
                  </h1>
                  <div className="flex items-center gap-3">
                    <StarRating rating={productData?.rating || 5} />
                    <span className="text-white font-manrope font-medium text-xl">({productData?.reviewCount || 29})</span>
                  </div>
                </div>

                {/* Product options using pre-made selectors */}
                <div className="space-y-8 mb-12">
                  {/* Colors */}
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      {colorOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedColor(option.id)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
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
                <div className="space-y-6">
                  <div className="text-white font-manrope font-bold text-5xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                    {productData?.price || '3000 р.'}
                  </div>
                  <div className="flex gap-10 items-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-manrope font-semibold text-2xl px-10 py-4 rounded-xl transition-colors">
                      В корзину
                    </button>
                    <QuantitySelector />
                  </div>
                </div>
              </div>

              {/* Product images - right side */}
              <div className="flex-shrink-0 w-[580px]">
                <div className="bg-white/5 rounded-xl p-8">
                  {/* Main image with navigation arrows */}
                  <div className="mb-8 relative flex items-center">
                    {/* Left arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors mr-4 flex-shrink-0"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>

                    {/* Image container */}
                    <div className="flex-1">
                      <img
                        src={productImages[selectedImage]}
                        alt="Product"
                        className="w-full h-96 object-contain rounded-xl"
                      />
                    </div>

                    {/* Right arrow - outside image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1)}
                      className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors ml-4 flex-shrink-0"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/20 mb-8"></div>

                  {/* Thumbnail images */}
                  <div className="flex gap-4 justify-center">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-white'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Description */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-12">
              <h3 className="text-white font-manrope font-semibold text-4xl mb-4">Описание</h3>
              <div className="w-48 h-px bg-white/40 mb-6"></div>
              <div className="text-white font-manrope font-medium text-lg leading-relaxed space-y-4">
                <p>Гладкая и равномерная текстура обеспечивает стабильное скольжение и плавные точные движения</p>
                <p>Коврик ложится ровно сразу из коробки</p>
                <p>Прорезиненное основание обеспечивает плотное прилегание к любой поверхности</p>
                <p>Коврик имеет прошитые края, что заметно увеличивает срок службы</p>
                <p>Материал жаккард обеспечивает быстрое скольжение и устойчивость к износу. Новое покрытие более скоростное, чем полиэстер, но, несмотря на высокую скорость начальных движений, имеет хорошую останавливающую способность.</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-8">
              {/* Characteristics */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-12">
                <h3 className="text-white font-manrope font-semibold text-4xl mb-4">Характеристики</h3>
                <div className="w-80 h-px bg-white/40 mb-6"></div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Материал покрытия</span>
                    <span className="text-white font-manrope font-medium text-xl">Полиэстер</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Материал основания</span>
                    <span className="text-white font-manrope font-medium text-xl">Резина</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Цвет</span>
                    <span className="text-white font-manrope font-medium text-xl">Белый</span>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-12">
                <h3 className="text-white font-manrope font-semibold text-4xl mb-4">Размеры</h3>
                <div className="w-44 h-px bg-white/40 mb-6"></div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Толщина</span>
                    <span className="text-white font-manrope font-medium text-xl">4 мм</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Длина</span>
                    <span className="text-white font-manrope font-medium text-xl">930 мм</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-manrope font-medium text-xl">Ширина</span>
                    <span className="text-white font-manrope font-medium text-xl">430 мм</span>
                  </div>
                </div>
              </div>

              {/* Article */}
              <div className="bg-black/40 backdrop-blur rounded-xl p-12">
                <h3 className="text-white font-manrope font-semibold text-4xl mb-4">Артикул</h3>
                <div className="w-44 h-px bg-white/40 mb-6"></div>
                <div className="flex justify-between">
                  <span className="text-white font-manrope font-medium text-xl">№</span>
                  <span className="text-white font-manrope font-medium text-xl">110</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-black/40 backdrop-blur rounded-xl p-12">
            <h3 className="text-white font-manrope font-bold text-5xl mb-8 text-center">Отзывы</h3>

            <div className="space-y-8">
              {/* Review 1 */}
              <div className="bg-black/40 p-12 rounded-xl border-b border-white/20">
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
