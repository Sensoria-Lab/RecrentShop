import React from 'react';
import DecryptedText from '../shared/DecryptedText';
import Header from '../shared/Header';


const MainPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const categories = [
    { name: 'Худи', id: 'hoodie' },
    { name: 'Цепочки', id: 'necklace' },
    { name: 'Коврики', id: 'mousepad' },
    { name: 'Футболки', id: 'tshirts' }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with PC_black.png */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/backgrounds/main-background.png'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'overlay'
        }}
      />


      {/* Main layout container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header onNavigate={onNavigate} />
          </div>
        </div>

        {/* Main content - positioned to the right with balanced spacing */}
        <main className="flex-1 flex flex-col items-end justify-start pt-32 px-16 relative overflow-hidden">
          {/* Main title with decrypted text animation - aligned to right */}
          <div className="text-right mb-8">
            <h1 className="text-white font-manrope font-bold text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] mb-8 leading-none tracking-[0.3em]">
              <DecryptedText
                text="RECRENT SHOP"
                duration={600}
                enableHover={false}
                className="text-white font-manrope font-bold"
              />
            </h1>
          </div>

          {/* Categories section - aligned to end with main title */}
          <div className="flex justify-end">
            {/* Category buttons */}
            <div className="flex items-center gap-20 mb-3">
              {categories.map((category, index) => (
                <div key={category.id} className="relative">
                  <button className="text-white font-manrope font-bold text-3xl lg:text-4xl hover:text-gray-300 transition-colors whitespace-nowrap">
                    <DecryptedText
                      text={category.name}
                      duration={600}
                      delay={700 + index * 100}
                      enableHover={true}
                      className="text-white font-manrope font-bold"
                    />
                  </button>
                  {/* Individual underline positioned directly under each text */}
                  <div className="absolute top-full left-0 mt-1 h-px bg-white opacity-60 w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom right call to action - moved up for better harmony */}
        <div
          onClick={() => onNavigate('catalog')}
          className="absolute bottom-16 right-6 cursor-pointer group"
        >
          <div className="relative border-2 border-white/60 rounded-lg px-8 py-4 hover:border-white hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center gap-6 text-white font-manrope font-bold text-5xl lg:text-6xl">
              <span className="group-hover:text-gray-300 transition-colors">К каталогу</span>
              <svg width="45" height="30" viewBox="0 0 31 21" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-2 transition-transform duration-300">
                <path d="M5 10.5h20M20 3.5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;