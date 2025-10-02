import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import { getSortedMousepads, CLOTHING, ALL_PRODUCTS } from '../../data/products';
import { useProductNavigation } from '../../hooks';
import { ROUTES } from '../../constants/routes';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToProduct } = useProductNavigation();

  const handleProductClick = (productData: any) => {
    // Find full product data by id
    const fullProduct = ALL_PRODUCTS.find(p => p.id === productData.id);
    if (fullProduct) {
      navigateToProduct(fullProduct);
    }
  };

  const sortedMousepads = getSortedMousepads();
  const clothing = CLOTHING;
  
  // Helper for catalog navigation
  const navigateToCatalog = () => {
    navigate(ROUTES.CATALOG);
  };

  return (
    <PageContainer>
        {/* Main content - centered with full viewport height */}
        <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
            
            {/* Logo or Brand Name */}
            <div className="px-2">
              <h1 className="text-white font-manrope font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_40px_rgb(0_0_0_/_100%)] leading-tight">
                RECRENT SHOP
              </h1>
            </div>

            {/* CTA Button */}
            <div className="pt-6 sm:pt-8">
              <button
                onClick={navigateToCatalog}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 bg-black/70 hover:bg-black/80 border-2 border-white/60 hover:border-white rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,1)] active:scale-95"
              >
                <span className="text-white font-manrope font-semibold text-sm sm:text-base md:text-xl lg:text-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%)] whitespace-nowrap">
                  Перейти в каталог
                </span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] sm:w-6 sm:h-6"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Animated scroll indicator */}
            <div className="pt-8 sm:pt-12 md:pt-16 hidden sm:block">
              <div className="flex justify-center animate-bounce">
                <div className="relative">
                  {/* Pulsing background circle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full animate-pulse blur-xl"></div>
                  
                  {/* Main circle */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border-2 border-white/40 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:scale-110 hover:border-white/60 transition-all duration-300 cursor-pointer">
                    <svg 
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white sm:w-8 sm:h-8 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Product sections below */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-8 sm:pb-12 md:pb-16">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-[1400px] mx-auto">
            {/* Mousepads Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-8">
              <SectionHeader 
                title="Коврики для мыши" 
                onShowAll={navigateToCatalog}
              />
              <div className="pb-6 sm:pb-8 md:pb-12 px-2 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8">
                <ProductCarousel itemsPerView={3}>
                  {sortedMousepads.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      images={product.images}
                      title={product.title}
                      subtitle={product.subtitle}
                      productSize={product.productSize}
                      price={product.price}
                      priceNumeric={product.priceNumeric}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      color={product.color}
                      category={product.category}
                      size="small-catalog"
                      onAddToCart={() => {}}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>

            {/* Clothing Section */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-8">
              <SectionHeader 
                title="Одежда"
                onShowAll={navigateToCatalog}
              />
              <div className="pb-6 sm:pb-8 md:pb-12 px-2 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8">
                <ProductCarousel itemsPerView={3}>
                  {clothing.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      images={product.images}
                      title={product.title}
                      subtitle={product.subtitle}
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
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </div>
        </section>

    </PageContainer>
  );
};

export default MainPage;
