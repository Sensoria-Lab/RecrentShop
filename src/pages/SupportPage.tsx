import React, { useState, useRef, useEffect } from 'react';
import { PageLayout } from '../shared/components';
import { offerContent } from '../core/data/offerContent';
import { SITE_CONFIG, SOCIAL_LINKS, TEXTS } from '../core/constants/config';

const SupportPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    if (hash && items.some(item => item.id === hash)) {
      setOpenItem(hash);
      // Scroll to the item after a short delay to allow rendering
      setTimeout(() => {
        const index = items.findIndex(item => item.id === hash);
        if (itemRefs.current[index]) {
          const block = hash === 'offer' ? 'start' : 'center';
          itemRefs.current[index]?.scrollIntoView({ 
            behavior: 'smooth', 
            block,
            inline: 'nearest' 
          });
        }
      }, 100);
    }
  }, []);

  const toggleItem = (id: string, index: number) => {
    const newOpenItem = openItem === id ? null : id;
    setOpenItem(newOpenItem);
    
    // Scroll to the opened item for better reading experience
    if (newOpenItem === id) {
      setTimeout(() => {
        const block = id === 'offer' ? 'start' : 'center';
        itemRefs.current[index]?.scrollIntoView({ 
          behavior: 'smooth', 
          block,
          inline: 'nearest' 
        });
      }, 100); // Small delay to allow content to render
    }
  };

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
      preview: 'Правила и условия использования',
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
      preview: 'Отслеживание посылки',
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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

            {/* Discord */}
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">Discord</p>
                <p className="text-white/60 text-xs sm:text-sm truncate">discord.com/invite/recrent</p>
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
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
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
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-black/40 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">Часы работы службы поддержки</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg"><span className="text-white/60">Пн-Пт:</span> <span className="font-semibold">10:00 - 19:00 МСК</span></p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg"><span className="text-white/60">Сб-Вс:</span> <span className="font-semibold">Выходной</span></p>
          </div>

          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-black/40 rounded-lg sm:rounded-xl border border-white/10">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">Среднее время ответа</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80">Мы стараемся отвечать на все обращения в течение <span className="font-bold text-white">24 часов</span> в рабочие дни</p>
          </div>

          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-black/40 rounded-lg sm:rounded-xl border border-white/10">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        <div>
          {/* Page Title */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 content-reveal content-reveal-delay-1">
            <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Информация
            </h1>
            <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
          </div>

        <div className="border border-white/20 rounded-lg sm:rounded-xl pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10">

          <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`border-white/20 bg-black/20 rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 scroll-fade-in scroll-fade-in-delay-${Math.min(index % 4 + 1, 4)}`}
              >
                <button
                  onClick={() => toggleItem(item.id, index)}
                  className="text-white hover:text-white/80 py-4 sm:py-5 md:py-6 lg:py-7 hover:no-underline w-full text-left flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 w-full">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                      <div className="text-white/90 scale-75 sm:scale-90 md:scale-100">{item.icon}</div>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate">{item.title}</h3>
                      {item.preview && <p className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 truncate">{item.preview}</p>}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${openItem === item.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItem === item.id && (
                  <div className="text-gray-300 pb-4 sm:pb-5 md:pb-6 lg:pb-7 pt-0 animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SupportPage;
