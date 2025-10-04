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
    className="relative rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer group bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
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

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <button
              onClick={() => window.open(SOCIAL_LINKS.instagram, '_blank')}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">Instagram</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">@recrentshop</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            
            <button
              onClick={() => window.open(SOCIAL_LINKS.vk, '_blank')}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">VKontakte</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">{SOCIAL_LINKS.vk.replace('https://', '')}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all sm:w-5 sm:h-5 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
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
        <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
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