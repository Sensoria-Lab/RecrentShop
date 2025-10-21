import React, { useState } from 'react';

const RecrentShopPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-200">
      {/* Background Grid Pattern (visible on light section) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 24, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 24, 24, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Decorative Blob Elements */}
      <div className="absolute top-[-10%] left-[10%] w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[5%] right-[5%] w-80 h-80 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-[2%] left-[-5%] w-72 h-72 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <header className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#catalog" className="px-5 py-2 text-white/90 hover:text-white font-bold text-base transition-colors">
              Каталог
            </a>
            <span className="w-1 h-1 rounded-full bg-white/40 mx-1" />
            <a href="#info" className="px-5 py-2 text-white/90 hover:text-white font-bold text-base transition-colors">
              Информация
            </a>
            <span className="w-1 h-1 rounded-full bg-white/40 mx-1" />
            <a href="#account" className="px-5 py-2 text-white/90 hover:text-white font-bold text-base transition-colors">
              Аккаунт
            </a>
            <span className="w-1 h-1 rounded-full bg-white/40 mx-1" />
            <a href="#cart" className="px-5 py-2 text-white/90 hover:text-white font-bold text-base transition-colors">
              Корзина
            </a>
          </nav>
        </header>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl space-y-2 animate-fade-in">
            <a
              href="#catalog"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-bold text-base transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </a>
            <a
              href="#info"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-bold text-base transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Информация
            </a>
            <a
              href="#account"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-bold text-base transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Аккаунт
            </a>
            <a
              href="#cart"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-bold text-base transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Корзина
            </a>
          </nav>
        )}

        {/* Hero Section */}
        <main className="mt-12 md:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Side - Title and Categories */}
            <div className="lg:col-span-5 space-y-8">
              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  RECRENT
                </h1>
                <h2 className="font-normal text-3xl sm:text-4xl md:text-5xl text-white/90 tracking-wide drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
                  SHOP
                </h2>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-8 lg:mt-12">
                <a
                  href="#dragons"
                  className="group relative font-bold text-sm text-black hover:text-gray-800 transition-colors pb-1"
                >
                  dragons
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black group-hover:bg-gray-800 transition-colors" />
                </a>
                <a
                  href="#serpents"
                  className="group relative font-bold text-sm text-black hover:text-gray-800 transition-colors pb-1"
                >
                  serpents
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black group-hover:bg-gray-800 transition-colors" />
                </a>
                <a
                  href="#geoid"
                  className="group relative font-bold text-sm text-black hover:text-gray-800 transition-colors pb-1"
                >
                  geoid
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black group-hover:bg-gray-800 transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Side - Image Gallery */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                {/* Top Left - Hand with tattoo */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <img
                    src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=500&h=500&fit=crop"
                    alt="Hand with tattoo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Top Right - Abstract lines (white) */}
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id="topo-white" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path
                            d="M0,20 Q10,10 20,20 T40,20"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M0,10 Q10,0 20,10 T40,10"
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="1"
                          />
                          <path
                            d="M0,30 Q10,20 20,30 T40,30"
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="200" height="200" fill="url(#topo-white)" />
                      <circle cx="50" cy="80" r="30" fill="none" stroke="#9ca3af" strokeWidth="2" />
                      <circle cx="150" cy="120" r="40" fill="none" stroke="#9ca3af" strokeWidth="2" />
                      <path
                        d="M20,20 Q100,50 180,30"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Left - Abstract lines (black) */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id="topo-black" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path
                            d="M0,20 Q10,10 20,20 T40,20"
                            fill="none"
                            stroke="#374151"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M0,10 Q10,0 20,10 T40,10"
                            fill="none"
                            stroke="#4b5563"
                            strokeWidth="1"
                          />
                          <path
                            d="M0,30 Q10,20 20,30 T40,30"
                            fill="none"
                            stroke="#4b5563"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="200" height="200" fill="url(#topo-black)" />
                      <circle cx="50" cy="80" r="30" fill="none" stroke="#6b7280" strokeWidth="2" />
                      <circle cx="150" cy="120" r="40" fill="none" stroke="#6b7280" strokeWidth="2" />
                      <path
                        d="M20,20 Q100,50 180,30"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Right - Vertical topographic pattern */}
                <div className="relative aspect-square bg-black rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <svg viewBox="0 0 200 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <pattern id="topo-vertical" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path
                            d="M0,10 Q12.5,5 25,10 T50,10"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            opacity="0.3"
                          />
                          <path
                            d="M0,20 Q12.5,15 25,20 T50,20"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            opacity="0.4"
                          />
                          <path
                            d="M0,30 Q12.5,25 25,30 T50,30"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            opacity="0.3"
                          />
                          <path
                            d="M0,40 Q12.5,35 25,40 T50,40"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            opacity="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="200" height="300" fill="url(#topo-vertical)" />
                      {/* Additional decorative elements */}
                      {[...Array(8)].map((_, i) => (
                        <ellipse
                          key={i}
                          cx="100"
                          cy={50 + i * 30}
                          rx={40 + i * 8}
                          ry={15 + i * 2}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="0.5"
                          opacity={0.2 + (i * 0.05)}
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent border-2 border-black hover:bg-black hover:text-white rounded-lg transition-all duration-300 active:scale-95 shadow-lg hover:shadow-2xl"
                >
                  <span className="font-extrabold text-xl text-black group-hover:text-white transition-colors">
                    К каталогу
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-black group-hover:text-white group-hover:translate-x-1 transition-all"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Spacing at bottom */}
        <div className="h-16 md:h-24" />
      </div>
    </div>
  );
};

export default RecrentShopPage;
