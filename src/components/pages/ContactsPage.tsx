import React, { useState } from 'react';
import PageLayout from '../shared/PageLayout';
import Modal from '../shared/Modal';

// Contact card component
interface ContactCardProps {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  preview?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, onClick, icon, preview }) => (
  <div 
    className="relative overflow-hidden rounded-2xl cursor-pointer group"
    onClick={onClick}
  >
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-white/30" />
    
    {/* Shine effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
    
    {/* Content */}
    <div className="relative p-8 flex items-center gap-6">
      {/* Icon container */}
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
        <div className="text-white/90 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      
      {/* Text */}
      <div className="flex-1">
        <h3 className="text-white font-manrope font-semibold text-xl group-hover:text-white/90 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {title}
        </h3>
        {preview && (
          <p className="text-white/60 text-sm mt-1 group-hover:text-white/70 transition-colors">
            {preview}
          </p>
        )}
      </div>
      
      {/* Arrow */}
      <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 group-hover:text-white/80">
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
      preview: 'info@recrentshop.ru',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            По всем вопросам пишите на нашу электронную почту:
          </p>
          <a
            href="mailto:info@recrentshop.ru"
            className="inline-block text-3xl font-bold text-white hover:text-white/80 transition-colors underline decoration-white/30 hover:decoration-white/60"
          >
            info@recrentshop.ru
          </a>
          <p className="text-white/70 text-base">
            Мы отвечаем на все письма в течение 24 часов в рабочие дни.
          </p>
        </div>
      )
    },
    {
      id: 'company',
      title: 'Реквизиты компании',
      preview: 'ИП Осинцев Юрий Витальевич',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      content: (
        <div className="space-y-6 text-left">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <p className="text-2xl font-bold mb-6">ИП Осинцев Юрий Витальевич</p>
            
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3">
                <span className="text-white/60 min-w-[120px]">ИНН:</span>
                <span className="font-semibold">450100470595</span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-white/60 min-w-[120px]">ОГРНИП:</span>
                <span className="font-semibold">321774600455545</span>
              </div>
            </div>
          </div>
          
          <p className="text-white/70 text-sm">
            Индивидуальный предприниматель, зарегистрированный в Российской Федерации
          </p>
        </div>
      )
    },
    {
      id: 'socials',
      title: 'Социальные сети',
      preview: 'Подпишитесь на наши аккаунты',
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
        <div className="space-y-6">
          <p className="text-lg">
            Следите за новостями и обновлениями в наших социальных сетях:
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => window.open('https://instagram.com/recrentshop', '_blank')}
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Instagram</p>
                <p className="text-white/60 text-sm">@recrentshop</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            
            <button
              onClick={() => window.open('https://vk.com/recrentshop', '_blank')}
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">VKontakte</p>
                <p className="text-white/60 text-sm">vk.com/recrentshop</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all">
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
      preview: 'Часы работы и время ответа',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      content: (
        <div className="space-y-6 text-left">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Часы работы службы поддержки
            </h3>
            <p className="text-lg">
              <span className="text-white/60">Пн-Пт:</span> <span className="font-semibold">10:00 - 19:00 МСК</span>
            </p>
            <p className="text-lg">
              <span className="text-white/60">Сб-Вс:</span> <span className="font-semibold">Выходной</span>
            </p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Среднее время ответа
            </h3>
            <p className="text-lg text-white/80">
              Мы стараемся отвечать на все обращения в течение <span className="font-bold text-white">24 часов</span> в рабочие дни
            </p>
          </div>
          
          <p className="text-white/70 text-sm">
            Для срочных вопросов используйте email или социальные сети
          </p>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        {/* Background container for title and cards */}
        <div className="bg-black/40 backdrop-blur rounded-xl p-12 lg:p-16">
          {/* Page title */}
          <div className="text-center mb-20">
            <h1 className="text-white font-manrope font-bold text-5xl lg:text-6xl mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Контакты
            </h1>
            <div className="w-32 h-1 bg-white/40 mx-auto"></div>
          </div>

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactItems.map((item) => (
              <ContactCard
                key={item.id}
                title={item.title}
                icon={item.icon}
                preview={item.preview}
                onClick={() => openModal(item.title, item.content)}
              />
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