import React, { useState } from 'react';
import PageLayout from '../shared/PageLayout';
import Modal from '../shared/Modal';
import { offerContent } from '../../data/offerContent';
import { SITE_CONFIG, SOCIAL_LINKS, TEXTS } from '../../constants/config';

const Card: React.FC<{ title: string; icon: React.ReactNode; preview?: string; onClick: () => void }> = ({ title, icon, preview, onClick }) => (
  <div
    className="relative rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer group bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative p-3 sm:p-4 md:p-6 lg:p-7 flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6">
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
        <div className="text-white/90 group-hover:text-white transition-colors scale-75 sm:scale-90 md:scale-100">{icon}</div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl group-hover:text-white/90 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] truncate">{title}</h3>
        {preview && <p className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 truncate">{preview}</p>}
      </div>

      <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 group-hover:text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </div>
    </div>
  </div>
);

const SupportPage: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (title: string, content: React.ReactNode) => setModalContent({ title, content });
  const closeModal = () => setModalContent(null);

  const items = [
    {
      id: 'sizes',
      title: 'Размеры',
      preview: 'Таблицы размеров и советы',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
          <polyline points="7.5 19.79 7.5 14.6 3 12"/>
          <polyline points="21 12 16.5 14.6 16.5 19.79"/>
        </svg>
      ),
      content: (
        <div className="whitespace-pre-line text-sm sm:text-base md:text-lg">{`Размер нашей одежды может отличаться от одежды классических размеров. Перед заказом рекомендуем внимательно ознакомиться с размерной сеткой выбранной одежды в карточке товара (после фото товара, в форме таблицы).

Сравните по таблице параметры ABC с параметрами своей аналогичной одежды и выберите ближайший для вас размер!`}</div>
      )
    },

    {
      id: 'delivery',
      title: 'Доставка',
      preview: 'Сроки и способы доставки',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      content: (
        <div className="whitespace-pre-line text-sm sm:text-base md:text-lg">{`Отправка заказов осуществляется "Почтой России" и "СДЭК"

«Почта России» осуществляет доставку по всему миру.
"СДЭК" осуществляет доставку по России, а также в Беларусь и Казахстан до пункта выдачи или до двери (курьерская доставка)

Стоимость доставки в ваш город будет автоматически рассчитана и включена в итоговую сумму заказа.

Обработка и отправка заказов осуществляется в течение 3-5 рабочих дней.

Оформляя предзаказ на сайте магазина, вы полностью принимаете условия обработки, претензии по срокам не принимаются.

Магазин не несёт ответственности за задержку посылок транспортными компаниями.`}</div>
      )
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
      content: <div className="text-sm sm:text-base md:text-lg whitespace-pre-line">{offerContent}</div>
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
      content: <div className="text-sm sm:text-base md:text-lg whitespace-pre-line">{`Отследить заказ можно после получения номера накладной от СДЭК или трек-номера от Почты России!

Все заказы в обработке 3-5 дней, после поступит уведомление:
• если Почта России - в смс на мобильный
• если СДЭК - на указанный адрес электронной почты!`}</div>
    },

    // Note: email card removed — email will be available inside the Поддержка card below

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
          <p className="text-sm sm:text-base md:text-lg">{TEXTS.socialsPrompt}</p>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <button onClick={() => window.open(SOCIAL_LINKS.instagram, '_blank')} className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </div>
              <div className="flex-1 text-left min-w-0"><p className="font-semibold text-sm sm:text-base truncate">Instagram</p><p className="text-white/60 text-xs sm:text-sm truncate">@recrentshop</p></div>
            </button>
            <button onClick={() => window.open(SOCIAL_LINKS.vk, '_blank')} className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div className="flex-1 text-left min-w-0"><p className="font-semibold text-sm sm:text-base truncate">VKontakte</p><p className="text-white/60 text-xs sm:text-sm truncate">{SOCIAL_LINKS.vk.replace('https://', '')}</p></div>
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
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">Часы работы службы поддержки</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg"><span className="text-white/60">Пн-Пт:</span> <span className="font-semibold">10:00 - 19:00 МСК</span></p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg"><span className="text-white/60">Сб-Вс:</span> <span className="font-semibold">Выходной</span></p>
          </div>

          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">Среднее время ответа</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80">Мы стараемся отвечать на все обращения в течение <span className="font-bold text-white">24 часов</span> в рабочие дни</p>
          </div>

          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Контакты</h3>
            <p className="text-sm sm:text-base md:text-lg">{TEXTS.emailPrompt}</p>
            <a href={`mailto:${SITE_CONFIG.email}`} className="inline-block text-base sm:text-lg md:text-xl font-bold text-white hover:text-white/80 transition-colors underline decoration-white/30 hover:decoration-white/60 break-all">
              {SITE_CONFIG.email}
            </a>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-2">{TEXTS.emailResponse}</p>
          </div>

          <p className="text-white/70 text-[10px] sm:text-xs md:text-sm">Для срочных вопросов используйте email или социальные сети</p>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 scroll-fade-in">
            <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">Поддержка</h1>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {items.map((item, index) => (
              <div key={item.id} className={`scroll-fade-in scroll-fade-in-delay-${Math.min(index % 4 + 1, 4)}`}>
                <Card title={item.title} icon={item.icon} preview={item.preview as string | undefined} onClick={() => openModal(item.title, item.content)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalContent && (
        <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent.title}>
          <div className="whitespace-pre-line">{modalContent.content}</div>
        </Modal>
      )}
    </PageLayout>
  );
};

export default SupportPage;
