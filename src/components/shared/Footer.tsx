import React from 'react';
import { SOCIAL_LINKS } from '../../constants/config';

/**
 * Footer Component
 * Displays copyright, social links, and developer information
 */
const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-auto py-6 px-4 sm:px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            {/* Copyright */}
            <div className="text-white/70 font-manrope font-medium text-sm sm:text-base">
              © Recrentshop.ru 2021-2025
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Twitch */}
              <a
                href={SOCIAL_LINKS.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/80 hover:bg-purple-600/40 border border-white/40 hover:border-purple-400 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)] hover:scale-110 hover:-translate-y-1 active:scale-95"
                aria-label="Twitch"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/80 hover:bg-blue-500/40 border border-white/40 hover:border-blue-400 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.6)] hover:scale-110 hover:-translate-y-1 active:scale-95"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/80 hover:bg-pink-600/40 border border-white/40 hover:border-pink-400 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.6)] hover:scale-110 hover:-translate-y-1 active:scale-95"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-pink-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/80 hover:bg-red-600/40 border border-white/40 hover:border-red-400 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.6)] hover:scale-110 hover:-translate-y-1 active:scale-95"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-red-300 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,1)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
            {/* Developer info */}
            <div className="text-white/70 font-manrope font-medium text-sm sm:text-base">
              Разработано{' '}
              <a 
                href="https://github.com/Sensoria-Lab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors underline decoration-white/30 hover:decoration-blue-400"
              >
                Sensoria Lab
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
