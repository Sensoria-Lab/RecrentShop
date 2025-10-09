import React, { useState } from 'react';
import PageLayout from '../shared/PageLayout';
import Modal from '../shared/Modal';
import { SITE_CONFIG, SOCIAL_LINKS, COMPANY_INFO, TEXTS } from '../../constants/config';

// Contact card component
interface ContactCardProps {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  preview?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, onClick, icon, preview }) => (
  <div
    className="relative rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
    onClick={onClick}
  >
    {/* Shine effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>

    {/* Content */}
    <div className="relative p-3 sm:p-4 md:p-6 lg:p-7 flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6">
      {/* Icon container */}
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
        <div className="text-white/90 group-hover:text-white transition-colors scale-75 sm:scale-90 md:scale-100">
          {icon}
        </div>
      </div>
      
      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl group-hover:text-white/90 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] truncate">
          {title}
        </h3>
        {preview && (
          <p className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 group-hover:text-white/70 transition-colors truncate">
            {preview}
          </p>
        )}
      </div>
      
      {/* Arrow */}
      <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 group-hover:text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </div>
    </div>
  </div>
);

/**
 * Contacts Page Component
 * Displays contact information in modal cards
 */
const ContactsPage: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const contactItems = [
    {
      id: 'email',
      title: 'Электронная почта',
      preview: SITE_CONFIG.email,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      content: (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-sm sm:text-base md:text-lg">
            {TEXTS.emailPrompt}
          </p>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white hover:text-white/80 transition-colors underline decoration-white/30 hover:decoration-white/60 break-all"
          >
            {SITE_CONFIG.email}
          </a>
          <p className="text-white/70 text-xs sm:text-sm md:text-base">
            {TEXTS.emailResponse}
          </p>
        </div>
      )
    },
    {
      id: 'company',
      title: 'Реквизиты компании',
      preview: COMPANY_INFO.name,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      content: (
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-left">
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">{COMPANY_INFO.name}</p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="text-white/60 sm:min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">ИНН:</span>
                <span className="font-semibold break-all">{COMPANY_INFO.inn}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="text-white/60 sm:min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">ОГРНИП:</span>
                <span className="font-semibold break-all">{COMPANY_INFO.ogrnip}</span>
              </div>
            </div>
          </div>

          <p className="text-white/70 text-[10px] sm:text-xs md:text-sm">
            {COMPANY_INFO.description}
          </p>
        </div>
      )
    },
    {
      id: 'socials',
      title: 'Социальные сети',
      preview: TEXTS.subscribePrompt,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      ),
      content: (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-sm sm:text-base md:text-lg">
            {TEXTS.socialsPrompt}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Twitch */}
            <a
              href={SOCIAL_LINKS.twitch}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">Twitch</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">twitch.tv/recrent</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">Telegram</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">t.me/recrent</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">YouTube</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">RecrentChannel</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* VK */}
            <a
              href={SOCIAL_LINKS.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.119-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">VKontakte</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">vk.com/recrent</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer sm:col-span-2"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">TikTok</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">@recrent.twitch</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'support',
      title: 'Поддержка',
      preview: TEXTS.supportHours,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      content: (
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-left">
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Часы работы службы поддержки
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              <span className="text-white/60">Пн-Пт:</span> <span className="font-semibold">10:00 - 19:00 МСК</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              <span className="text-white/60">Сб-Вс:</span> <span className="font-semibold">Выходной</span>
            </p>
          </div>
          
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Среднее время ответа
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80">
              Мы стараемся отвечать на все обращения в течение <span className="font-bold text-white">24 часов</span> в рабочие дни
            </p>
          </div>
          
          <p className="text-white/70 text-[10px] sm:text-xs md:text-sm">
            Для срочных вопросов используйте email или социальные сети
          </p>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        {/* Background container for title and cards */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 border border-white/10">
          {/* Page title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 scroll-fade-in">
            <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Контакты
            </h1>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
          </div>

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {contactItems.map((item, index) => (
              <div key={item.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index % 4 + 1, 4)}`}>
                <ContactCard
                  title={item.title}
                  icon={item.icon}
                  preview={item.preview}
                  onClick={() => openModal(item.title, item.content)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <Modal
          isOpen={!!modalContent}
          onClose={closeModal}
          title={modalContent.title}
        >
          {modalContent.content}
        </Modal>
      )}
    </PageLayout>
  );
};

export default ContactsPage;