import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import SectionHeader from '../ui/SectionHeader';
import CategoryCard from '../ui/CategoryCard';
import FeatureItem from '../ui/FeatureItem';
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
        {/* Hero section with showcase */}
        <section id="hero" className="min-h-[80vh] snap-start flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Title and Button */}
              <div className="flex flex-col justify-center space-y-8">
                <div className="animate-fade-in-up">
                  <h1 className="text-white font-manrope font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,1)] leading-tight blur-text text-left">
                    RECRENT SHOP
                  </h1>
                </div>

                {/* CTA Button */}
                <div>
                  <button
                    onClick={navigateToCatalog}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-black/70 hover:bg-black/80 border-2 border-white/60 hover:border-white rounded-xl transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,1)] active:scale-95 ripple-button"
                  >
                    <span className="text-white font-manrope font-semibold text-base md:text-lg drop-shadow-[0_4px_16px_rgba(0,0,0,1)] whitespace-nowrap">
                      Перейти в каталог
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-white group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right side - Product showcase */}
              <div className="flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[500px]">
                  <HeroImageShowcase 
                    products={sortedProducts.slice(0, 5)} 
                    onProductClick={handleProductClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Products Section */}
        <section id="new-products" className="snap-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="panel glass-shadow">
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

        {/* Categories Section */}
        <section id="categories" className="snap-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="w-full max-w-[1400px] mx-auto">
            <h2 className="text-white font-manrope font-bold text-3xl md:text-4xl mb-8 text-center">
              Категории товаров
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <CategoryCard
                title="Коврики для мыши"
                description="Большой выбор игровых ковриков разных размеров"
                icon="🖱️"
                route={ROUTES.CATALOG}
                gradient="bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              />
              
              <CategoryCard
                title="Одежда"
                description="Стильные футболки и худи с уникальными принтами"
                icon="👕"
                route={ROUTES.CATALOG}
                gradient="bg-gradient-to-br from-pink-500/20 to-orange-500/20"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="snap-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="w-full max-w-[1400px] mx-auto">
            <h2 className="text-white font-manrope font-bold text-3xl md:text-4xl mb-8 text-center">
              Почему выбирают нас
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <FeatureItem
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                title="Качество"
                description="Только проверенные материалы и надёжные производители"
              />
              
              <FeatureItem
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                title="Быстрая доставка"
                description="Отправка заказов в течение 1-2 рабочих дней"
              />
              
              <FeatureItem
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Доступные цены"
                description="Лучшее соотношение цены и качества на рынке"
              />
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
