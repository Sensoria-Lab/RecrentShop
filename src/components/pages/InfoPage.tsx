import React, { useState } from 'react';
import PageLayout from '../shared/PageLayout';
import Modal from '../shared/Modal';
import { offerContent } from '../../data/offerContent';

// Info card component
interface InfoCardProps {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, onClick, icon }) => (
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
        <p className="text-white/40 text-sm mt-1 group-hover:text-white/60 transition-colors">
          Нажмите для просмотра
        </p>
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
 * Info Page Component
 * FAQ and information sections in modal cards
 */
const InfoPage: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const infoItems = [
    {
      id: 'sizes',
      title: 'Размеры',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
          <polyline points="7.5 19.79 7.5 14.6 3 12"/>
          <polyline points="21 12 16.5 14.6 16.5 19.79"/>
        </svg>
      ),
      content: `Размер нашей одежды может отличаться от одежды классических размеров. Перед заказом рекомендуем внимательно ознакомиться с размерной сеткой выбранной одежды в карточке товара (после фото товара, в форме таблицы).

Сравните по таблице параметры ABC с параметрами своей аналогичной одежды и выберите ближайший для вас размер!`
    },
    {
      id: 'delivery',
      title: 'Доставка',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      content: `Отправка заказов осуществляется "Почтой России" и "СДЭК"

«Почта России» осуществляет доставку по всему миру.
"СДЭК" осуществляет доставку по России, а также в Беларусь и Казахстан до пункта выдачи или до двери (курьерская доставка)

Стоимость доставки в ваш город будет автоматически рассчитана и включена в итоговую сумму заказа.

Обработка и отправка заказов осуществляется в течение 3-5 рабочих дней.

Оформляя предзаказ на сайте магазина, вы полностью принимаете условия обработки, претензии по срокам не принимаются.

Магазин не несёт ответственности за задержку посылок транспортными компаниями.`
    },
    {
      id: 'offer',
      title: 'Оферта',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      content: offerContent
    },
    {
      id: 'track',
      title: 'Где мой заказ',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      content: `Отследить заказ можно после получения номера накладной от СДЭК или трек-номера от Почты России!

Все заказы в обработке 3-5 дней, после поступит уведомление:
• если Почта России - в смс на мобильный
• если СДЭК - на указанный адрес электронной почты!`
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
              Информация
            </h1>
            <div className="w-32 h-1 bg-white/40 mx-auto"></div>
          </div>

          {/* Info cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infoItems.map((item) => (
              <InfoCard
                key={item.id}
                title={item.title}
                icon={item.icon}
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
          <div className="whitespace-pre-line">
            {modalContent.content}
          </div>
        </Modal>
      )}
    </PageLayout>
  );
};

export default InfoPage;