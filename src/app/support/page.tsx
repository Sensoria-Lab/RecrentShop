'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from '@/src/lib/gsap';
import PageContainer from '@/src/components/layout/PageContainer';
import { SupportPageSkeleton } from '@/src/components/layout/Skeletons';
import { offerContent } from '@/src/lib/offerContent';
import { SITE_CONFIG, SOCIAL_LINKS, TEXTS } from '@/src/constants/config';
import { shouldReduceMotion, EASE_EDITORIAL } from '@/src/components/animations';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface SupportItem {
  id: string;
  index: string;
  title: string;
  preview: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

/* ─── Social Link Card ───────────────────────────────────────────────────── */
const SocialCard: React.FC<{ href: string; name: string; handle: string; icon: React.ReactNode }> = ({
  href, name, handle, icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] hover:border-[var(--rc-fg)]/[0.2] hover:bg-[var(--rc-fg-ghost)] transition-all duration-200 group"
  >
    <div className="w-10 h-10 bg-[var(--rc-fg-ghost)] border border-[var(--rc-fg)]/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--rc-border)] transition-colors duration-200">
      <span className="text-[var(--rc-fg)] group-hover:text-[var(--rc-fg)] transition-colors duration-200">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-manrope font-bold text-[var(--rc-fg)] text-sm truncate group-hover:text-[var(--rc-fg)] transition-colors duration-200">{name}</p>
      <p className="font-jetbrains text-[9px] tracking-[0.1em] text-[var(--rc-fg-subtle)] truncate">{handle}</p>
    </div>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className="text-[var(--rc-fg-subtle)] group-hover:text-[var(--rc-fg-secondary)] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </a>
);

/* ─── SupportPage ────────────────────────────────────────────────────────── */
const SupportPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chevronRefs = useRef<(SVGSVGElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const items: SupportItem[] = [
    {
      id: 'sizes',
      index: '01',
      title: 'Размеры',
      preview: 'Таблицы размеров и советы по выбору',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M9 3v18" />
          <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="6" cy="15" r="1" fill="currentColor" stroke="none" />
          <path d="M14 14l6 6M14 20l6-6" strokeWidth="1" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="font-manrope text-[var(--rc-fg)] text-sm leading-[1.8]">
            Размер нашей одежды может отличаться от одежды классических размеров. Перед заказом рекомендуем внимательно ознакомиться с размерной сеткой выбранной одежды в карточке товара (после фото товара).
          </p>
          <p className="font-manrope text-[var(--rc-fg)] text-sm leading-[1.8]">
            Сравните параметры с параметрами своей аналогичной одежды и выберите ближайший для вас размер.
          </p>
        </div>
      ),
    },
    {
      id: 'delivery',
      index: '02',
      title: 'Доставка',
      preview: 'Сроки, стоимость и способы получения',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M1 6h15v10H1z" />
          <path d="M16 8h4l3 3v5h-7z" />
          <circle cx="5.5" cy="19" r="2" />
          <circle cx="18.5" cy="19" r="2" />
          <path d="M7.5 19h9" />
        </svg>
      ),
      content: (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Почта России', desc: 'Доставка по всему миру' },
              { label: 'СДЭК', desc: 'Россия, Беларусь, Казахстан — до пункта выдачи или курьером' },
            ].map((d) => (
              <div key={d.label} className="p-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
                <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] mb-1.5">{d.label}</p>
                <p className="font-manrope text-[var(--rc-fg-secondary)] text-sm leading-[1.6]">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pl-0">
            {[
              'Стоимость доставки рассчитывается автоматически при оформлении заказа.',
              'Обработка и отправка заказов — 3–5 рабочих дней.',
              'Оформляя предзаказ, вы принимаете условия обработки. Претензии по срокам не принимаются.',
              'Магазин не несёт ответственности за задержки транспортными компаниями.',
            ].map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-jetbrains text-[9px] text-[var(--rc-fg-subtle)] mt-1 flex-shrink-0">/</span>
                <p className="font-manrope text-[var(--rc-fg-secondary)] text-sm leading-[1.75]">{line}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'track',
      index: '03',
      title: 'Где мой заказ',
      preview: 'Отслеживание посылок',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l4 2" />
          <path d="M3 12h2M19 12h2M12 3v2M12 19v2" strokeWidth="1" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="font-manrope text-[var(--rc-fg)] text-sm leading-[1.8]">
            Отследить заказ можно после получения трек-номера. Все заказы обрабатываются 3–5 рабочих дней.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Почта России', desc: 'SMS-уведомление на мобильный' },
              { label: 'СДЭК', desc: 'Email на указанный адрес' },
            ].map((t) => (
              <div key={t.label} className="p-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
                <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] mb-1">{t.label}</p>
                <p className="font-manrope text-[var(--rc-fg-secondary)] text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'socials',
      index: '04',
      title: 'Социальные сети',
      preview: TEXTS.subscribePrompt,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 12h6M15.5 8.5L12 12l3.5 3.5" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="font-manrope text-[var(--rc-fg-secondary)] text-sm leading-[1.75] mb-5">{TEXTS.socialsPrompt}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <SocialCard href={SOCIAL_LINKS.twitch} name="Twitch" handle="twitch.tv/recrent"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" /></svg>}
            />
            <SocialCard href={SOCIAL_LINKS.telegram} name="Telegram" handle="t.me/recrent"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>}
            />
            <SocialCard href={SOCIAL_LINKS.youtube} name="YouTube" handle="RecrentChannel"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>}
            />
            <SocialCard href={SOCIAL_LINKS.vk} name="VKontakte" handle="vk.com/recrent"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.119-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" /></svg>}
            />
            <SocialCard href={SOCIAL_LINKS.discord} name="Discord" handle="discord.com/invite/recrent"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>}
            />
            <SocialCard href={SOCIAL_LINKS.tiktok} name="TikTok" handle="@recrent.twitch"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'support',
      index: '05',
      title: 'Поддержка',
      preview: TEXTS.supportHours,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3v2" />
          <rect x="11" y="16" width="2" height="2" fill="currentColor" stroke="none" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
              <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] mb-3">Часы работы</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-manrope text-[var(--rc-fg-muted)] text-sm">Пн–Пт</span>
                  <span className="font-manrope font-bold text-[var(--rc-fg)] text-sm">10:00 – 19:00 МСК</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-manrope text-[var(--rc-fg-muted)] text-sm">Сб–Вс</span>
                  <span className="font-manrope text-[var(--rc-fg-muted)] text-sm">Выходной</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
              <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] mb-3">Время ответа</p>
              <p className="font-manrope text-[var(--rc-fg-secondary)] text-sm leading-[1.7]">
                Отвечаем на все обращения в течение&nbsp;<span className="text-[var(--rc-fg)] font-bold">24 часов</span>&nbsp;в рабочие дни
              </p>
            </div>
          </div>
          <div className="p-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
            <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] mb-3">Email</p>
            <p className="font-manrope text-[var(--rc-fg-muted)] text-sm mb-2">{TEXTS.emailPrompt}</p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-manrope font-bold text-[var(--rc-fg)] hover:text-[var(--rc-fg)] text-base border-b border-[var(--rc-border)] hover:border-[var(--rc-border)] pb-0.5 transition-colors duration-200"
            >
              {SITE_CONFIG.email}
            </a>
            <p className="font-manrope text-[var(--rc-fg-muted)] text-xs mt-2">{TEXTS.emailResponse}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'offer',
      index: '06',
      title: 'Публичная оферта',
      preview: 'Условия использования и правила',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M4 4h10l6 6v10H4z" />
          <path d="M14 4v6h6" />
          <path d="M8 13h8M8 17h5" />
          <path d="M8 9h2" strokeWidth="1" />
        </svg>
      ),
      content: (
        <div className="font-manrope text-[var(--rc-fg-secondary)] text-sm leading-[1.85] whitespace-pre-line max-h-[60vh] overflow-y-auto pr-2
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--rc-fg)]/10 hover:scrollbar-thumb-[var(--rc-fg)]/20">
          {offerContent}
        </div>
      ),
    },
  ];

  /* ── Entrance animation — Refined per Design System ─── */
  useEffect(() => {
    if (!mounted) return;

    const reduceMotion = shouldReduceMotion();

    contentRefs.current.forEach((el) => {
      if (el) gsap.set(el, { height: 0, opacity: 0, overflow: 'hidden' });
    });

    if (headerRef.current && !reduceMotion) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: EASE_EDITORIAL }
      );
    } else if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
    }

    const accordionItems = itemRefs.current.filter(Boolean);
    if (accordionItems.length && !reduceMotion) {
      gsap.fromTo(accordionItems,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: EASE_EDITORIAL, delay: 0.1 }
      );
    } else if (accordionItems.length) {
      gsap.set(accordionItems, { opacity: 1, y: 0 });
    }
  }, [mounted]);

  // Animate accordion open/close
  useEffect(() => {
    items.forEach((item, i) => {
      const contentEl = contentRefs.current[i];
      const chevronEl = chevronRefs.current[i];
      const isOpen = openItem === item.id;
      if (contentEl) {
        if (isOpen) {
          gsap.set(contentEl, { height: 'auto', opacity: 1 });
          const autoH = contentEl.offsetHeight;
          gsap.fromTo(contentEl,
            { height: 0, opacity: 0 },
            {
              height: autoH, opacity: 1, duration: 0.4, ease: EASE_EDITORIAL,
              onComplete: () => { gsap.set(contentEl, { height: 'auto' }); }
            }
          );
        } else {
          gsap.to(contentEl, { height: 0, opacity: 0, duration: 0.3, ease: EASE_EDITORIAL });
        }
      }
      if (chevronEl) {
        gsap.to(chevronEl, { rotation: isOpen ? 180 : 0, duration: 0.3, ease: EASE_EDITORIAL });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openItem]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && items.some(item => item.id === hash)) {
      setOpenItem(hash);
      setTimeout(() => {
        const index = items.findIndex(item => item.id === hash);
        const el = itemRefs.current[index];
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: hash === 'offer' ? 'start' : 'center' });
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id: string) => {
    const next = openItem === id ? null : id;
    setOpenItem(next);
  };

  /* ── Loading — Skeleton per Design System ───────────── */
  if (!mounted) {
    return (
      <PageContainer>
        <SupportPageSkeleton />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-28 sm:pb-20">
        <div className="max-w-[1400px] mx-auto">

          {/* ─── Section Header ─────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="mb-8 md:mb-12 border-b border-[var(--rc-border)] pb-6"
            style={{ opacity: 0 }}
          >
            <h1
              className="font-manrope font-black tracking-tight text-[var(--rc-fg)] leading-[0.9]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Центр поддержки
            </h1>
          </div>

          {/* ─── Accordion List ──────────────────────────────────────── */}
          <div className="border border-[var(--rc-border)]">
            {items.map((item, i) => {
              const isOpen = openItem === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  ref={(el: HTMLDivElement | null) => { itemRefs.current[i] = el; }}
                  className="border-b border-[var(--rc-border)] last:border-b-0"
                  style={{ opacity: 0 }}
                >
                  {/* ── Trigger ── */}
                  <button
                    onClick={() => toggle(item.id)}
                    className={`w-full flex items-center gap-4 md:gap-6 px-5 md:px-7 py-4 md:py-5 text-left transition-colors duration-200
                      ${isOpen ? 'bg-[var(--rc-fg-ghost)]' : 'hover:bg-[var(--rc-fg-ghost)]'}`}
                  >
                    {/* Index */}
                    <span className="font-jetbrains text-[9px] tracking-[0.2em] text-[var(--rc-fg-subtle)] flex-shrink-0 hidden sm:block">
                      {item.index}
                    </span>

                    {/* Icon */}
                    <span className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-[var(--rc-fg)]' : 'text-[var(--rc-fg-muted)]'}`}>
                      {item.icon}
                    </span>

                    {/* Labels */}
                    <div className="flex-1 min-w-0 text-left">
                      <p className={`font-manrope font-bold text-sm md:text-base transition-colors duration-200 ${isOpen ? 'text-[var(--rc-fg)]' : 'text-[var(--rc-fg)]'}`}>
                        {item.title}
                      </p>
                      {!isOpen && item.preview && (
                        <p className="font-jetbrains text-[9px] tracking-[0.1em] text-[var(--rc-fg-subtle)] mt-0.5 truncate">
                          {item.preview}
                        </p>
                      )}
                    </div>

                    {/* Chevron */}
                    <svg
                      ref={(el) => { chevronRefs.current[i] = el; }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="flex-shrink-0 text-[var(--rc-fg-muted)]"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ── Content ── */}
                  <div
                    ref={(el) => { contentRefs.current[i] = el; }}
                    style={{ overflow: 'hidden', height: 0, opacity: 0 }}
                  >
                    <div className="px-5 md:px-7 pb-6 pt-1 border-t border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
                      {/* Content aligned with title text, accounting for index + icon + gaps */}
                      <div className="pl-0 sm:pl-[76px]">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </PageContainer>
  );
};

export default SupportPage;