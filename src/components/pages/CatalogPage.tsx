import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import Header from '../shared/Header';
import DecryptedText from '../shared/DecryptedText';
import ProductCarousel from '../ui/ProductCarousel';


// Section Header Component
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-between p-8 border-b border-white/10">
    <div className="min-w-[400px]">
      <h2 className="text-white font-manrope font-extrabold text-3xl text-left tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        <DecryptedText
          text={title}
          duration={700}
          delay={100}
          className="text-white font-manrope font-extrabold"
          showAnimation={false}
        />
      </h2>
    </div>
    <div className="flex items-center gap-3 group cursor-pointer hover:translate-x-1 transition-transform duration-300">
      <span className="text-white/80 font-manrope font-bold text-lg group-hover:text-white transition-colors">Показать все</span>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
        <svg width="16" height="12" viewBox="0 0 21 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white">
          <path d="M14 1l6 6-6 6M1 7h18"/>
        </svg>
      </div>
    </div>
  </div>
);

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleProductClick = (productData: any) => {
    navigate('/product', { state: { productData } });
  };
  // Sample product data - в реальном приложении это будет приходить из API
  const xlMousepads = [
    {
      id: 1,
      image: '/images/products/mousepads/xl/mousepad-geoid-black.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-black"',
      productSize: 'XL',
      price: '3 000 р.',
      rating: 4,
      reviewCount: 29
    },
    {
      id: 2,
      image: '/images/products/mousepads/xl/mousepad-geoid-white.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-white"',
      productSize: 'XL',
      price: '3 000 р.',
      rating: 5,
      reviewCount: 15
    },
    {
      id: 3,
      image: '/images/products/mousepads/xl/mousepad-geoid-red.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-red"',
      productSize: 'XL',
      price: '3 000 р.',
      rating: 4,
      reviewCount: 8
    },
    {
      id: 10,
      image: '/images/products/mousepads/xl/mousepad-geoid-black.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-black"',
      productSize: 'XL',
      price: '3 000 р.',
      rating: 5,
      reviewCount: 22
    }
  ];

  const lMousepads = [
    {
      id: 4,
      image: '/images/products/mousepads/l/mousepad-geoid-black.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-black"',
      productSize: 'L',
      price: '3 000 р.',
      rating: 5,
      reviewCount: 29
    },
    {
      id: 5,
      image: '/images/products/mousepads/l/mousepad-geoid-white.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-white"',
      productSize: 'L',
      price: '3 000 р.',
      rating: 4,
      reviewCount: 12
    },
    {
      id: 6,
      image: '/images/products/mousepads/l/mousepad-geoid-red.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-red"',
      productSize: 'L',
      price: '3 000 р.',
      rating: 5,
      reviewCount: 18
    },
    {
      id: 11,
      image: '/images/products/mousepads/l/mousepad-geoid-white.webp',
      title: 'Коврик для мыши',
      subtitle: '"geoid-white"',
      productSize: 'L',
      price: '3 000 р.',
      rating: 5,
      reviewCount: 25
    }
  ];

  const clothing = [
    {
      id: 7,
      image: '/images/products/clothing/hoodies/hoodie-serpents-black.webp',
      title: 'Худи-оверсайз',
      subtitle: '"Seprents"',
      productColor: 'Черный',
      price: '6 000 р.',
      rating: 5,
      reviewCount: 24
    },
    {
      id: 8,
      image: '/images/products/clothing/hoodies/hoodie-serpents-white.webp',
      title: 'Худи-оверсайз',
      subtitle: '"Seprents"',
      productColor: 'Белый',
      price: '6 000 р.',
      rating: 4,
      reviewCount: 19
    },
    {
      id: 9,
      image: '/images/products/clothing/tshirts/tshirt-serpents-black.webp',
      title: 'Футболка-оверсайз',
      subtitle: '"Seprents"',
      productColor: 'Черный',
      price: '6 000 р.',
      rating: 5,
      reviewCount: 31
    },
    {
      id: 12,
      image: '/images/products/clothing/hoodies/hoodie-serpents-black.webp',
      title: 'Худи-оверсайз',
      subtitle: '"Seprents"',
      productColor: 'Черный',
      price: '6 000 р.',
      rating: 4,
      reviewCount: 28
    }
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

        {/* Main content */}
        <main className="flex-1 px-20 py-12">
          {/* Page Title - removed */}

          {/* Content sections */}
          <div className="space-y-16 max-w-[1400px] mx-auto">
            {/* XL Mousepads Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-8">
              <SectionHeader title="Ковры для мыши размера XL" />
              <div className="pb-12 px-8 pt-8">
                <ProductCarousel itemsPerView={3}>
                  {xlMousepads.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      subtitle={product.subtitle}
                      productSize={product.productSize}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="small-catalog"
                      onAddToCart={() => console.log(`Add ${product.title} to cart`)}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>

            {/* L Mousepads Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-8">
              <SectionHeader title="Ковры для мыши размера L" />
              <div className="pb-12 px-8 pt-8">
                <ProductCarousel itemsPerView={3}>
                  {lMousepads.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      subtitle={product.subtitle}
                      productSize={product.productSize}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="small-catalog"
                      onAddToCart={() => console.log(`Add ${product.title} to cart`)}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>

            {/* Clothing Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-8">
              <SectionHeader title="Одежда" />
              <div className="pb-12 px-8 pt-8">
                <ProductCarousel itemsPerView={3}>
                  {clothing.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      subtitle={product.subtitle}
                      productColor={product.productColor}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="small-catalog"
                      onAddToCart={() => console.log(`Add ${product.title} to cart`)}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
