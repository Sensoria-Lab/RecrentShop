import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import Img from '../shared/Img';
import SEO from '../shared/SEO';
import { OrganizationStructuredData, WebsiteStructuredData } from '../shared/StructuredData';
import { ROUTES } from '../../constants/routes';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToCatalog = () => {
    navigate(ROUTES.CATALOG);
  };

  return (
    <PageContainer isMainPage={true}>
      <SEO
        title="Главная"
        description="Премиальные игровые коврики для мыши и стильная одежда от RECRENT. Высокое качество, уникальный дизайн, быстрая доставка по России."
        keywords="коврик для мыши, gaming mousepad, игровой коврик, коврик xl, коврик l, recrent, одежда, худи, футболки"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      {/* Hero section with RECRENT SHOP design */}
      <section className="min-h-screen relative flex items-center">
        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">

              {/* Left side - Title */}
              <div className="lg:col-span-5 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                {/* Main Title at top */}
                <div className="space-y-1 mb-8 lg:mb-0">
                  <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tight leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    RECRENT
                  </h1>
                  <h2 className="font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 tracking-wide drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
                    SHOP
                  </h2>
                </div>

                {/* Bottom section: Categories and Button */}
                <div className="space-y-6 sm:space-y-8 mt-auto">
                  {/* Categories */}
                  <div className="flex flex-wrap items-center gap-5 sm:gap-6 lg:gap-8">
                    <a
                      href="#dragons"
                      className="group relative font-bold text-base sm:text-lg text-white/90 hover:text-white transition-all duration-200 pb-1.5 px-1"
                    >
                      <span className="relative z-10">dragons</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-white/60 to-white/80 group-hover:from-white group-hover:to-white transition-all duration-200 shadow-lg shadow-white/20" />
                      <span className="absolute inset-0 bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                    </a>
                    <a
                      href="#serpents"
                      className="group relative font-bold text-base sm:text-lg text-white/90 hover:text-white transition-all duration-200 pb-1.5 px-1"
                    >
                      <span className="relative z-10">serpents</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-white/60 to-white/80 group-hover:from-white group-hover:to-white transition-all duration-200 shadow-lg shadow-white/20" />
                      <span className="absolute inset-0 bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                    </a>
                    <a
                      href="#geoid"
                      className="group relative font-bold text-base sm:text-lg text-white/90 hover:text-white transition-all duration-200 pb-1.5 px-1"
                    >
                      <span className="relative z-10">geoid</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-white/60 to-white/80 group-hover:from-white group-hover:to-white transition-all duration-200 shadow-lg shadow-white/20" />
                      <span className="absolute inset-0 bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                    </a>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <button
                      onClick={navigateToCatalog}
                      className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-white/5 backdrop-blur-sm border-2 border-white/80 hover:border-white hover:bg-white rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </div>

                      <span className="relative z-10 font-extrabold text-lg sm:text-xl md:text-2xl text-white group-hover:text-black transition-colors duration-300 drop-shadow-lg">
                        К каталогу
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="relative z-10 sm:w-7 sm:h-7 text-white group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side - Image Gallery */}
              <div className="lg:col-span-7">
                <div className="relative max-w-[650px] mx-auto lg:ml-auto">
                  {/* Layout: 2 small squares on left, 1 tall vertical rectangle on right */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-5" style={{ height: '600px' }}>

                    {/* Left column: 2 stacked square images */}
                    <div className="flex-1 flex flex-col gap-3 sm:gap-4 lg:gap-5">
                      {/* Top - White sleeve with tattoo */}
                      <div className="relative flex-1 bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                        <Img
                          src="/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_01.webp"
                          alt="White sleeve with tattoo"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Bottom - White geoid pattern mousepad */}
                      <div className="relative flex-1 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                        <Img
                          src="/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp"
                          alt="White geoid mousepad"
                          className="w-full h-full object-contain object-center p-4"
                        />
                      </div>
                    </div>

                    {/* Right column: 1 tall vertical image */}
                    <div className="flex-1 flex flex-col">
                      {/* Tall vertical - Black geoid XL mousepad */}
                      <div className="relative h-full bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                        <Img
                          src="/images/products/mousepads/xl/xl_black_geoid/114_001.webp"
                          alt="Black XL geoid mousepad"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vertical divider line (matching Figma) */}
                  <div className="hidden xl:block absolute right-[-60px] top-1/2 -translate-y-1/2 w-px h-48 bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default MainPage;
