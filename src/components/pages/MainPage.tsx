import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';


const MainPage: React.FC = () => {
  const navigate = useNavigate();

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

        {/* Main content - centered */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
          <div className="max-w-4xl w-full text-center space-y-12">
            
            {/* Logo or Brand Name */}
            <div>
              <h1 className="text-white font-manrope font-bold text-7xl lg:text-9xl xl:text-[10rem] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_40px_rgb(0_0_0_/_100%)]">
                RECRENT SHOP
              </h1>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={() => navigate('/catalog')}
                className="group relative inline-flex items-center gap-4 px-12 py-5 bg-black/70 hover:bg-black/80 border-2 border-white/60 hover:border-white rounded-2xl transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,1)]"
              >
                <span className="text-white font-manrope font-semibold text-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%)]">
                  Перейти в каталог
                </span>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Social links */}
            <div className="pt-12">
              <div className="flex items-center justify-center gap-6 mb-8">
                {/* Twitch */}
                <a
                  href="https://twitch.tv/recrent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-16 h-16 flex items-center justify-center bg-black/60 hover:bg-purple-600/30 border-2 border-white/30 hover:border-purple-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.8)] hover:shadow-[0_6px_24px_rgba(147,51,234,0.4)] hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/recrent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-16 h-16 flex items-center justify-center bg-black/60 hover:bg-blue-500/30 border-2 border-white/30 hover:border-blue-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.8)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.4)] hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@recrent.twitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-16 h-16 flex items-center justify-center bg-black/60 hover:bg-pink-600/30 border-2 border-white/30 hover:border-pink-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.8)] hover:shadow-[0_6px_24px_rgba(236,72,153,0.4)] hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white group-hover:text-pink-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/c/RecrentChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-16 h-16 flex items-center justify-center bg-black/60 hover:bg-red-600/30 border-2 border-white/30 hover:border-red-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.8)] hover:shadow-[0_6px_24px_rgba(239,68,68,0.4)] hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white group-hover:text-red-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              
              <p className="text-white font-manrope font-semibold text-lg uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%)]">
                Наши соцсети
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
