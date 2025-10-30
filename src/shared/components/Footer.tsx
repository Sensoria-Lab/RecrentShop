import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SOCIAL_LINKS, SITE_CONFIG, COMPANY_INFO } from '../../core/constants/config';

/**
 * Footer Component
 * Displays navigation, social links, contact info and company information
 */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 mt-16 sm:mt-20 lg:mt-24">
      <div className="w-full">
        {/* Main Footer Content */}
        <div className="bg-gradient-to-b from-transparent via-black/20 to-black/40 border-t border-white/5 w-full">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

              {/* Column 1: About */}
              <div className="space-y-3">
                <h3 className="text-white font-manrope font-bold text-base sm:text-lg mb-3">
                  О магазине
                </h3>

                <div className="text-white/40 text-xs pt-2">
                  © 2021-{year} RECRENT SHOP
                </div>
              </div>

              {/* Column 2: Navigation */}
              <div className="space-y-3">
                <h3 className="text-white font-manrope font-bold text-base sm:text-lg mb-3">
                  Навигация
                </h3>
                <nav className="flex flex-col gap-1.5">
                  <button
                    onClick={() => navigate('/catalog')}
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors text-left"
                  >
                    Каталог
                  </button>
                  <button
                    onClick={() => navigate('/support')}
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors text-left"
                  >
                    Поддержка
                  </button>
                  <button
                    onClick={() => navigate('/account')}
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors text-left"
                  >
                    Личный кабинет
                  </button>
                </nav>
              </div>

              {/* Column 3: Help */}
              <div className="space-y-3">
                <h3 className="text-white font-manrope font-bold text-base sm:text-lg mb-3">
                  Помощь
                </h3>
                <nav className="flex flex-col gap-1.5">
                  <Link
                    to="/support#delivery"
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors"
                  >
                    Доставка
                  </Link>
                  <Link
                    to="/support#support"
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors"
                  >
                    Поддержка
                  </Link>
                  <Link
                    to="/support#offer"
                    className="text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors"
                  >
                    Оферта
                  </Link>
                </nav>
              </div>

              {/* Column 4: Contacts & Social */}
              <div className="space-y-3">
                <h3 className="text-white font-manrope font-bold text-base sm:text-lg mb-3">
                  Контакты
                </h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="block text-white/50 hover:text-white/80 font-manrope text-xs sm:text-sm transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                {/* Social Media Icons */}
                <div className="pt-1">
                  <p className="text-white/50 font-manrope text-xs mb-2">Мы в соцсетях:</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <a
                      href={SOCIAL_LINKS.twitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/30 transition-all group"
                      aria-label="Twitch"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-purple-400 transition-colors">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                    </a>

                    <a
                      href={SOCIAL_LINKS.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/5 hover:border-blue-400/30 transition-all group"
                      aria-label="Telegram"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-blue-400 transition-colors">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>

                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/5 hover:border-red-500/30 transition-all group"
                      aria-label="YouTube"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-red-500 transition-colors">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>

                    <a
                      href={SOCIAL_LINKS.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/30 transition-all group"
                      aria-label="VKontakte"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-blue-500 transition-colors">
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.119-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                      </svg>
                    </a>

                    <a
                      href={SOCIAL_LINKS.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 transition-all group"
                      aria-label="Discord"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-indigo-400 transition-colors">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>

                    <a
                      href={SOCIAL_LINKS.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gray-700/20 border border-white/5 hover:border-gray-400/30 transition-all group"
                      aria-label="TikTok"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-gray-300 transition-colors">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar - Legal & Copyright */}
        <div className="bg-black/30 border-t border-white/5 w-full backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="text-white/30 font-manrope text-center sm:text-left">
                {COMPANY_INFO.name} • ИНН {COMPANY_INFO.inn}
              </div>
              <div className="text-white/30 font-manrope">
                Все права защищены
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
