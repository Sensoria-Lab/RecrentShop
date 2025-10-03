import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import { useProductNavigation } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import { API_CONFIG } from '../../config/constants';
import { ALL_PRODUCTS } from '../../data/products';
import type { Product } from '../../types/product';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToProduct } = useProductNavigation();
  const [currentSection, setCurrentSection] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  // Fetch products from API or use static data
  React.useEffect(() => {
    const fetchProducts = async () => {
      // Use static data in production if no API URL is configured
      if (API_CONFIG.USE_STATIC_DATA) {
        setProducts(ALL_PRODUCTS);
        return;
      }

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data on error
        setProducts(ALL_PRODUCTS);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productData: any) => {
    // Find full product data by id
    const fullProduct = products.find(p => p.id === productData.id);
    if (fullProduct) {
      navigateToProduct(fullProduct);
    }
  };

  // Filter and sort products
  const sortedMousepads = products
    .filter(p => p.category === 'mousepads')
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    });

  const clothing = products.filter(p => p.category === 'clothing');

  // Helper for catalog navigation
  const navigateToCatalog = () => {
    navigate(ROUTES.CATALOG);
  };

  // Smooth scroll to next section
  const scrollToSection = (sectionIndex: number) => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const targetScrollTop = sectionIndex * windowHeight;

      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });

      setCurrentSection(sectionIndex);
    }
  };

  const scrollToNextSection = () => {
    const nextIndex = Math.min(currentSection + 1, 2);
    if (nextIndex !== currentSection) {
      scrollToSection(nextIndex);
    }
  };

  // Handle wheel scroll for section snapping
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;

      // Determine scroll direction
      if (delta > 30 && currentSection < 2) {
        // Scroll down to next section
        e.preventDefault();
        setIsScrolling(true);
        scrollToSection(currentSection + 1);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (delta < -30 && currentSection > 0) {
        // Scroll up to previous section
        e.preventDefault();
        setIsScrolling(true);
        scrollToSection(currentSection - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling]);

  return (
    <PageContainer>
      <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
        {/* Hero section - centered with full viewport height */}
        <section id="hero" className="h-screen snap-start snap-always flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
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

            {/* Animated scroll indicator - smaller and prettier */}
            <div className="pt-8 sm:pt-12 md:pt-16 hidden sm:block">
              <button 
                onClick={scrollToNextSection}
                className="flex justify-center animate-bounce hover:animate-none focus:outline-none group"
                aria-label="Scroll to next section"
              >
                <div className="relative">
                  {/* Pulsing gradient aura */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-400/20 to-purple-400/20 rounded-full animate-pulse blur-lg scale-150"></div>
                  
                  {/* Outer ring */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300 flex items-center justify-center">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                    
                    {/* Chevron down icon - smaller and cleaner */}
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:translate-y-0.5 transition-transform duration-300"
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </section>

        {/* Mousepads Section */}
        <section id="mousepads" className="h-screen snap-start snap-always px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto">
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
          </div>
        </section>

        {/* Clothing Section */}
        <section id="clothing" className="h-screen snap-start snap-always px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:pb-16 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto">
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
      </div>
    </PageContainer>
  );
};

export default MainPage;
