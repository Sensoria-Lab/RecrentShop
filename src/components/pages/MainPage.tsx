import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import Footer from '../shared/Footer';
import { useProductNavigation } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import { API_CONFIG } from '../../constants/config';
import { ALL_PRODUCTS } from '../../data/products';
import type { Product } from '../../types/product';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToProduct } = useProductNavigation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  // Enable scroll snapping on main page
  React.useEffect(() => {
    document.documentElement.classList.add('snap-scroll');
    return () => {
      document.documentElement.classList.remove('snap-scroll');
    };
  }, []);

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

  // previously: scroll helper removed (not used)

  return (
    <PageContainer isMainPage={true}>
      <div ref={containerRef}>
        {/* Hero section - centered with full viewport height */}
        <section id="hero" className="h-screen snap-start flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
            <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">

            {/* Logo or Brand Name */}
            <div className="px-2 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '40ms' }}>
              {/* Animated heading: blur reveal applied to whole text */}
              <h1 className="text-white font-manrope font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_40px_rgb(0_0_0_/_100%)] leading-tight blur-text">
                RECRENT SHOP
              </h1>
            </div>

            {/* CTA Button */}
              <div className="pt-2 sm:pt-4">
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

          </div>
        </section>

        {/* Mousepads Section */}
        <section id="mousepads" className="min-h-screen snap-start px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-8 md:py-10 lg:py-12 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="panel">
              <SectionHeader
                title="Коврики для мыши"
                onShowAll={navigateToCatalog}
              />
              <div className="px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 pb-2 md:pb-3 lg:pb-4">
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
        <section id="clothing" className="min-h-screen snap-start px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-8 md:py-10 lg:py-12 flex flex-col">
          <div className="w-full max-w-[1400px] mx-auto flex-shrink-0">
            <div className="panel">
              <SectionHeader
                title="Одежда"
                onShowAll={navigateToCatalog}
              />
              <div className="px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 pb-2 md:pb-3 lg:pb-4">
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

          {/* Footer at bottom */}
          <div className="mt-auto">
            <Footer />
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default MainPage;
