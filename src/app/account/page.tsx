'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from '@/src/lib/gsap';
import { PageContainer } from '@/src/components/layout';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/constants/routes';
import type { Review } from '@/src/lib/reviews';
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, Input, Textarea, Checkbox } from '@/src/components/ui';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type TabId = 'profile' | 'orders' | 'reviews' | 'settings';

interface NavItem { value: TabId; label: string; icon: React.ReactNode }

/* ─── Star Rating (monochrome) ───────────────────────────────────────────── */
const StarRating: React.FC<{ rating: number; interactive?: boolean; onChange?: (r: number) => void }> = ({
  rating, interactive = false, onChange,
}) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onChange?.(s)}
        className={interactive ? 'cursor-pointer' : 'cursor-default pointer-events-none'}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill={s <= rating ? '#EAE2E6' : 'none'}
          stroke={s <= rating ? '#EAE2E6' : 'rgba(234,226,230,0.2)'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    ))}
  </div>
);

/* ─── AccountPage ────────────────────────────────────────────────────────── */
const AccountPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('orders');
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editRatings, setEditRatings] = useState<Record<string, number>>({});

  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const els = [headerRef.current, sidebarRef.current, contentRef.current].filter(Boolean);
    gsap.fromTo(els,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.55, ease: 'expo.out' }
    );
  }, [mounted]);

  const user = {
    name: 'Пользователь',
    email: 'user@example.com',
    phone: '+7 (999) 123-45-67',
    registered: '15 марта 2024',
  };

  const orders = [
    {
      id: '12345', date: '2 окт. 2025', status: 'delivered', statusText: 'Доставлен',
      total: '5 500 ₽', items: 2, deliveryService: 'СДЭК',
      trackNumber: 'SDEK1234567890', trackUrl: 'https://www.cdek.ru/track.html?order_id=SDEK1234567890',
      products: [
        { name: 'Коврик Geoid-Black XL', quantity: 1, price: '3 000 ₽' },
        { name: 'Худи White Edition', quantity: 1, price: '2 500 ₽' },
      ],
    },
    {
      id: '12344', date: '15 сент. 2025', status: 'in-transit', statusText: 'В пути',
      total: '5 500 ₽', items: 2, deliveryService: 'Почта России',
      trackNumber: '12345678901234', trackUrl: 'https://www.pochta.ru/tracking#12345678901234',
      products: [
        { name: 'Коврик Geoid-White L', quantity: 1, price: '2 500 ₽' },
        { name: 'Коврик Geoid-Red XL', quantity: 1, price: '3 000 ₽' },
      ],
    },
    {
      id: '12343', date: '5 авг. 2025', status: 'processing', statusText: 'Обрабатывается',
      total: '3 500 ₽', items: 2, deliveryService: null, trackNumber: null, trackUrl: null,
      products: [
        { name: 'Футболка Geoid Black', quantity: 1, price: '1 500 ₽' },
        { name: 'Футболка Geoid White', quantity: 1, price: '2 000 ₽' },
      ],
    },
  ];

  const [userReviews, setUserReviews] = useState<Review[]>([
    {
      id: 'review-user-1', author: user.name, rating: 5,
      text: 'Коврик превзошел все ожидания! Качество печати на высоте, цвета яркие и насыщенные. Материал приятный на ощупь, не скользит по столу. Доставка была быстрой, упаковка надёжная.',
      date: '5 окт. 2025', photos: [],
    },
    {
      id: 'review-user-2', author: user.name, rating: 4,
      text: 'Отличный коврик за свою цену. Качество хорошее, но первые пару дней был специфический запах. В остальном всё отлично!',
      date: '20 сент. 2025', photos: [],
    },
  ]);

  const navItems: NavItem[] = [
    {
      value: 'profile', label: 'Профиль',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    },
    {
      value: 'orders', label: 'Заказы',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    },
    {
      value: 'reviews', label: 'Отзывы',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    },
    {
      value: 'settings', label: 'Настройки',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/></svg>,
    },
  ];

  const statusConfig = (status: string): { dot: string; text: string; badge: string } => {
    if (status === 'delivered') return {
      dot: 'bg-[#34d399]',
      text: 'text-[#34d399]',
      badge: 'bg-[#34d399]/10 border-[#34d399]/25',
    };
    if (status === 'in-transit') return {
      dot: 'bg-[#fbbf24]',
      text: 'text-[#fbbf24]',
      badge: 'bg-[#fbbf24]/10 border-[#fbbf24]/25',
    };
    if (status === 'processing') return {
      dot: 'bg-[#60a5fa]',
      text: 'text-[#60a5fa]',
      badge: 'bg-[#60a5fa]/10 border-[#60a5fa]/25',
    };
    return {
      dot: 'bg-[#EAE2E6]/20',
      text: 'text-[#EAE2E6]/40',
      badge: 'bg-[#EAE2E6]/[0.04] border-[#EAE2E6]/10',
    };
  };

  const handleDeleteReview = (id: string) => {
    setUserReviews(prev => prev.filter(r => r.id !== id));
  };

  const handleSaveReview = (id: string, text: string) => {
    const rating = editRatings[id] ?? userReviews.find(r => r.id === id)?.rating ?? 5;
    setUserReviews(prev => prev.map(r => r.id === id ? { ...r, text, rating } : r));
    setEditingReview(null);
  };

  if (!mounted) return null;

  return (
    <PageContainer>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-28 sm:pb-20">
        <div className="max-w-[1400px] mx-auto">

          {/* ─── Section Header ─────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="mb-8 md:mb-12 border-b border-[#EAE2E6]/[0.07] pb-6"
            style={{ opacity: 0 }}
          >
            <h1
              className="font-manrope font-black tracking-tight text-[#EAE2E6] leading-[0.9]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Личный кабинет
            </h1>
          </div>

          {/* ─── Layout ─────────────────────────────────────────────────── */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabId)}
            className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start"
          >
            {/* ── Sidebar Nav ─── */}
            <aside
              ref={sidebarRef}
              className="border border-[#EAE2E6]/[0.07]"
              style={{ opacity: 0 }}
            >
              {/* User identity */}
              <div className="px-5 py-5 border-b border-[#EAE2E6]/[0.07] flex items-center gap-3">
                <div className="w-10 h-10 border border-[#EAE2E6]/[0.12] bg-[#EAE2E6]/[0.04] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.50)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-manrope font-bold text-[#EAE2E6] text-sm truncate">{user.name}</p>
                  <p className="font-jetbrains text-[9px] tracking-[0.1em] text-[#EAE2E6]/30 truncate">{user.email}</p>
                </div>
              </div>

              {/* Nav items */}
              <TabsList className="flex flex-col bg-transparent h-auto p-0 w-full">
                {navItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="relative flex items-center gap-3 px-5 py-3.5 w-full text-left justify-start
                      font-jetbrains text-[10px] tracking-[0.15em] uppercase
                      text-[#EAE2E6]/35 hover:text-[#EAE2E6]/70 hover:bg-[#EAE2E6]/[0.03]
                      data-[state=active]:text-[#EAE2E6] data-[state=active]:bg-[#EAE2E6]/[0.05]
                      transition-all duration-200 border-b border-[#EAE2E6]/[0.05] last:border-b-0"
                  >
                    {/* Active left accent */}
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#EAE2E6]/0 data-[state=active]:bg-[#EAE2E6]/50 transition-all duration-200 hidden data-[state=active]:block" />
                    <span className="text-current opacity-70">{item.icon}</span>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </aside>

            {/* ── Main Content ─── */}
            <div
              ref={contentRef}
              className="border border-[#EAE2E6]/[0.07]"
              style={{ opacity: 0 }}
            >

              {/* ── Profile ── */}
              <TabsContent value="profile" className="mt-0 p-6 md:p-8">
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25 mb-3">─── Профиль</p>
                <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl md:text-3xl leading-[0.9] tracking-tight mb-8">
                  Личные данные
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Имя', type: 'text', value: user.name, placeholder: 'Введите имя' },
                    { label: 'Email', type: 'email', value: user.email, placeholder: 'email@example.com' },
                    { label: 'Телефон', type: 'tel', value: user.phone, placeholder: '+7 (___) ___-__-__' },
                    { label: 'Дата регистрации', type: 'text', value: user.registered, disabled: true },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[#EAE2E6]/30 mb-2">
                        {field.label}
                      </label>
                      <Input
                        type={field.type}
                        defaultValue={field.value}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="primary" size="md">Сохранить</Button>
                  <Button variant="outline" size="md">Отмена</Button>
                </div>
              </TabsContent>

              {/* ── Orders ── */}
              <TabsContent value="orders" className="mt-0 p-6 md:p-8">
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25 mb-3">─── Заказы</p>
                <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl md:text-3xl leading-[0.9] tracking-tight mb-8">
                  Мои заказы
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-0 border border-[#EAE2E6]/[0.07]">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border-b border-[#EAE2E6]/[0.07] last:border-b-0"
                      >
                        {/* Header row */}
                        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE2E6]/[0.05] bg-[#EAE2E6]/[0.02]">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-manrope font-bold text-[#EAE2E6] text-base">
                              Заказ&nbsp;#{order.id}
                            </span>
                            <span className={`flex items-center gap-1.5 px-2 py-0.5 border ${statusConfig(order.status).badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full inline-block ${statusConfig(order.status).dot}`} />
                              <span className={`font-jetbrains text-[9px] tracking-[0.15em] uppercase ${statusConfig(order.status).text}`}>
                                {order.statusText}
                              </span>
                            </span>
                            <span className="font-jetbrains text-[9px] tracking-[0.1em] text-[#EAE2E6]/25">
                              {order.date}
                            </span>
                          </div>
                          <span className="font-manrope font-black text-[#EAE2E6] text-lg">{order.total}</span>
                        </div>

                        {/* Products + tracking */}
                        <div className="px-5 py-4">
                          <div className="space-y-1.5 mb-4">
                            {order.products.map((p, pi) => (
                              <div key={pi} className="flex items-center justify-between text-sm">
                                <span className="font-manrope text-[#EAE2E6]/65">
                                  {p.name}
                                  <span className="text-[#EAE2E6]/30 ml-1.5">× {p.quantity}</span>
                                </span>
                                <span className="font-manrope text-[#EAE2E6]/55">{p.price}</span>
                              </div>
                            ))}
                          </div>

                          {order.deliveryService && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 border-t border-[#EAE2E6]/[0.05]">
                              <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30">
                                {order.deliveryService}
                              </span>
                              {order.trackNumber && (
                                <span className="flex items-center gap-2">
                                  <code className="font-jetbrains text-[9px] tracking-[0.05em] text-[#EAE2E6]/40 bg-[#EAE2E6]/[0.05] px-2 py-0.5">
                                    {order.trackNumber}
                                  </code>
                                  {order.trackUrl && (
                                    <a
                                      href={order.trackUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30 hover:text-[#EAE2E6]/65 border-b border-[#EAE2E6]/[0.1] hover:border-[#EAE2E6]/30 pb-px transition-colors duration-200"
                                    >
                                      Отследить
                                    </a>
                                  )}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center border border-[#EAE2E6]/[0.07]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.15)" strokeWidth="1.5" className="mb-5">
                      <rect x="3" y="3" width="18" height="18"/><path d="M9 3v18M3 9h18M3 15h18"/>
                    </svg>
                    <p className="font-manrope text-[#EAE2E6]/40 text-base mb-6">У вас пока нет заказов</p>
                    <Button onClick={() => router.push(ROUTES.CATALOG)} variant="primary" size="md">
                      Перейти в каталог
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* ── Reviews ── */}
              <TabsContent value="reviews" className="mt-0 p-6 md:p-8">
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25 mb-3">─── Отзывы</p>
                <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl md:text-3xl leading-[0.9] tracking-tight mb-8">
                  Мои отзывы
                </h2>

                {userReviews.length > 0 ? (
                  <div className="space-y-0 border border-[#EAE2E6]/[0.07]">
                    {userReviews.map((review) => (
                      <div
                        key={review.id}
                        className="px-5 py-5 border-b border-[#EAE2E6]/[0.07] last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-3 gap-4">
                          <div className="flex items-center gap-3">
                            <StarRating
                              rating={editingReview === review.id ? (editRatings[review.id] ?? review.rating) : review.rating}
                              interactive={editingReview === review.id}
                              onChange={(r) => setEditRatings(prev => ({ ...prev, [review.id]: r }))}
                            />
                            <span className="font-jetbrains text-[9px] tracking-[0.1em] text-[#EAE2E6]/25">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => {
                                setEditingReview(review.id);
                                setEditRatings(prev => ({ ...prev, [review.id]: review.rating }));
                              }}
                              className="w-8 h-8 flex items-center justify-center text-[#EAE2E6]/20 hover:text-[#EAE2E6]/55 transition-colors duration-200"
                              title="Редактировать"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="w-8 h-8 flex items-center justify-center text-[#EAE2E6]/20 hover:text-[#EAE2E6]/50 transition-colors duration-200"
                              title="Удалить"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {editingReview === review.id ? (
                          <div className="space-y-3">
                            <Textarea
                              defaultValue={review.text}
                              id={`review-edit-${review.id}`}
                              className="w-full min-h-[100px] resize-y"
                              placeholder="Ваш отзыв…"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm" variant="primary"
                                onClick={() => {
                                  const el = document.getElementById(`review-edit-${review.id}`) as HTMLTextAreaElement;
                                  handleSaveReview(review.id, el?.value ?? review.text);
                                }}
                              >
                                Сохранить
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingReview(null)}>
                                Отмена
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="font-manrope text-[#EAE2E6]/60 text-sm leading-[1.75]">{review.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center border border-[#EAE2E6]/[0.07]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.15)" strokeWidth="1.5" className="mb-5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <p className="font-manrope text-[#EAE2E6]/40 text-base">У вас пока нет отзывов</p>
                  </div>
                )}
              </TabsContent>

              {/* ── Settings ── */}
              <TabsContent value="settings" className="mt-0 p-6 md:p-8">
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25 mb-3">─── Настройки</p>
                <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl md:text-3xl leading-[0.9] tracking-tight mb-8">
                  Настройки
                </h2>

                <div className="space-y-5">
                  {/* Notifications */}
                  <div className="border border-[#EAE2E6]/[0.07] p-5 md:p-6">
                    <p className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25 mb-4">Уведомления</p>
                    <div className="space-y-3">
                      {[
                        { id: 'notif-email', label: 'Email уведомления о заказах', defaultChecked: true },
                        { id: 'notif-sms', label: 'SMS уведомления', defaultChecked: false },
                        { id: 'notif-promo', label: 'Акции и скидки', defaultChecked: true },
                      ].map((item) => (
                        <label key={item.id} htmlFor={item.id} className="flex items-center justify-between cursor-pointer group">
                          <span className="font-manrope text-[#EAE2E6]/55 group-hover:text-[#EAE2E6]/80 text-sm transition-colors duration-200">
                            {item.label}
                          </span>
                          <Checkbox id={item.id} defaultChecked={item.defaultChecked} className="w-4 h-4" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Security */}
                  <div className="border border-[#EAE2E6]/[0.07] p-5 md:p-6">
                    <p className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25 mb-4">Безопасность</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="md">Изменить пароль</Button>
                      <Button variant="outline" size="md">Двухфакторная аутентификация</Button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-[#EAE2E6]/[0.05] p-5 md:p-6">
                    <p className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/15 mb-2">Опасная зона</p>
                    <p className="font-manrope text-[#EAE2E6]/30 text-sm mb-4 leading-[1.6]">
                      Удаление аккаунта приведёт к безвозвратной потере всех данных
                    </p>
                    <Button variant="danger" size="md">Удалить аккаунт</Button>
                  </div>
                </div>
              </TabsContent>

            </div>
          </Tabs>

        </div>
      </div>
    </PageContainer>
  );
};

export default AccountPage;

