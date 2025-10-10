import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import HeroImageShowcase from '../ui/HeroImageShowcase';
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

  // Helper for catalog navigation
  const navigateToCatalog = () => {
    navigate(ROUTES.CATALOG);
  };

  // Sort products by rating for hero showcase
  const sortedProducts = [...products].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });

  return (
    <PageContainer isMainPage={true}>
      <div ref={containerRef}>
        {/* Hero section with split layout */}
        <section id="hero" className="min-h-screen snap-start relative overflow-hidden">
          {/* White background panel on the right */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[45%] bg-white"></div>

          {/* Content */}
          <div className="relative h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full max-w-[1400px] mx-auto">
              <div className="flex items-center gap-12">
                {/* Left side - Title and Button (55% width) */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center space-y-8">
                  <div className="scroll-fade-in">
                    <h1 className="font-manrope font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-tight text-white blur-text
                      drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                      RECRENT SHOP
                    </h1>
                    <p className="mt-4 text-white/70 font-inter font-medium text-lg md:text-xl lg:text-2xl tracking-wide">
                      Официальный мерч
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="scroll-fade-in scroll-fade-in-delay-1">
                    <button
                      onClick={navigateToCatalog}
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-xl transition-all duration-300 active:scale-95 ripple-button"
                    >
                      <span className="text-white group-hover:text-black font-manrope font-semibold text-base md:text-lg whitespace-nowrap transition-colors duration-300">
                        К каталогу
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-white group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right side - Product image on white background (45% width) */}
                <div className="hidden lg:flex w-[45%] items-center justify-center scroll-fade-in scroll-fade-in-delay-2">
                  <div className="w-full max-w-[500px] aspect-square">
                    {sortedProducts.length > 0 && sortedProducts[0].image && (
                      <img 
                        src={sortedProducts[0].image} 
                        alt={sortedProducts[0].title}
                        className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => handleProductClick(sortedProducts[0])}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Products Section */}
        <section id="new-products" className="snap-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="panel glass-shadow scroll-fade-in">
              <SectionHeader
                title="Новинки"
                onShowAll={navigateToCatalog}
              />
              <div className="px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 pb-2 md:pb-3 lg:pb-4">
                <ProductCarousel itemsPerView={3}>
                  {products.slice(0, 6).map((product, index) => (
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
                      staggerIndex={index + 1}
                      onAddToCart={() => {}}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section id="best-sellers" className="snap-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="panel glass-shadow scroll-fade-in">
              <SectionHeader
                title="Популярное"
                onShowAll={navigateToCatalog}
              />
              <div className="px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 pb-2 md:pb-3 lg:pb-4">
                <ProductCarousel itemsPerView={3}>
                  {sortedProducts.slice(0, 6).map((product, index) => (
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
                      staggerIndex={index + 1}
                      onAddToCart={() => {}}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="snap-start">
          <Footer />
        </section>
      </div>
    </PageContainer>
  );
};

export default MainPage;
