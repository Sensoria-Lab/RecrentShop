import React, { useState } from 'react';
import PageContainer from '../shared/PageContainer';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { Review } from '../../data/reviews';

/**
 * Account Page Component
 * User profile and account management
 */
const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'reviews' | 'settings'>('orders');
  const [editingReview, setEditingReview] = useState<string | null>(null);

  // Mock user data - replace with real auth context
  const user = {
    name: 'Пользователь',
    email: 'user@example.com',
    phone: '+7 (999) 123-45-67',
    registered: '15 марта 2024'
  };

  // Mock orders with tracking info
  const orders = [
    {
      id: '12345',
      date: '2 октября 2025',
      status: 'delivered',
      statusText: 'Доставлен',
      total: '3 990 ₽',
      items: 2,
      deliveryService: 'СДЭК',
      trackNumber: 'SDEK1234567890',
      trackUrl: 'https://www.cdek.ru/track.html?order_id=SDEK1234567890',
      products: [
        { name: 'Коврик "Pixel Art"', quantity: 1, price: '1 990 ₽' },
        { name: 'Худи Black Edition', quantity: 1, price: '2 000 ₽' }
      ]
    },
    {
      id: '12344',
      date: '15 сентября 2025',
      status: 'in-transit',
      statusText: 'В пути',
      total: '5 490 ₽',
      items: 3,
      deliveryService: 'Почта России',
      trackNumber: '12345678901234',
      trackUrl: 'https://www.pochta.ru/tracking#12345678901234',
      products: [
        { name: 'Коврик "Neon Wave"', quantity: 2, price: '3 980 ₽' },
        { name: 'Футболка White', quantity: 1, price: '1 510 ₽' }
      ]
    },
    {
      id: '12343',
      date: '5 августа 2025',
      status: 'processing',
      statusText: 'Обрабатывается',
      total: '1 990 ₽',
      items: 1,
      deliveryService: null,
      trackNumber: null,
      trackUrl: null,
      products: [
        { name: 'Коврик "Galaxy"', quantity: 1, price: '1 990 ₽' }
      ]
    }
  ];

  // Mock user reviews
  const [userReviews, setUserReviews] = useState<Review[]>([
    {
      id: 'review-user-1',
      author: user.name,
      rating: 5,
      text: 'Коврик превзошел все ожидания! Качество печати на высоте, цвета яркие и насыщенные. Материал приятный на ощупь, не скользит по столу. Размер идеально подходит для моего рабочего стола. Доставка была быстрой, упаковка надежная. Однозначно рекомендую!',
      date: '5 октября 2025',
      photos: []
    },
    {
      id: 'review-user-2',
      author: user.name,
      rating: 4,
      text: 'Отличный коврик за свою цену. Качество хорошее, но первые пару дней был специфический запах. В остальном всё отлично!',
      date: '20 сентября 2025',
      photos: []
    }
  ]);

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      setUserReviews(userReviews.filter(r => r.id !== reviewId));
    }
  };

  const handleEditReview = (reviewId: string) => {
    setEditingReview(reviewId);
  };

  const handleSaveReview = (reviewId: string, newText: string, newRating: number) => {
    setUserReviews(userReviews.map(r => 
      r.id === reviewId ? { ...r, text: newText, rating: newRating } : r
    ));
    setEditingReview(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-transit':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <PageContainer>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Background panel with blur */}
          <div className="panel panel-strong pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-8 md:px-10 lg:px-12">
            {/* Page Header */}
            <div className="text-center mb-8 md:mb-12 scroll-fade-in">
              <h1 className="text-white font-manrope font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Личный кабинет
              </h1>
              <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3 scroll-fade-in scroll-fade-in-delay-1">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-manrope font-bold text-lg">{user.name}</h2>
                    <p className="text-white/60 text-sm">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left font-manrope font-medium text-sm px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-3 ${
                      activeTab === 'profile'
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Профиль
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left font-manrope font-medium text-sm px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-3 ${
                      activeTab === 'orders'
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M9 3v18M3 9h18M3 15h18"/>
                    </svg>
                    Заказы
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full text-left font-manrope font-medium text-sm px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-3 ${
                      activeTab === 'reviews'
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Отзывы
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left font-manrope font-medium text-sm px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-3 ${
                      activeTab === 'settings'
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/>
                    </svg>
                    Настройки
                  </button>
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-9 scroll-fade-in scroll-fade-in-delay-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-white font-manrope font-bold text-2xl md:text-3xl mb-6">
                      Личные данные
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/70 font-manrope text-sm mb-2">Имя</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="form-control w-full"
                          placeholder="Введите имя"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 font-manrope text-sm mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="form-control w-full"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 font-manrope text-sm mb-2">Телефон</label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="form-control w-full"
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 font-manrope text-sm mb-2">Дата регистрации</label>
                        <input
                          type="text"
                          value={user.registered}
                          disabled
                          className="form-control w-full opacity-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button className="btn-primary hover:scale-105 transition-transform">
                        Сохранить изменения
                      </button>
                      <button className="btn-secondary hover:bg-white/8 transition-all">
                        Отмена
                      </button>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <h2 className="text-white font-manrope font-bold text-2xl md:text-3xl mb-6">
                      Мои заказы
                    </h2>

                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/8 transition-all"
                        >
                          {/* Order Header */}
                          <div className="p-4 md:p-6 border-b border-white/10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <span className="text-white font-manrope font-bold text-lg">
                                    Заказ #{order.id}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                    {order.statusText}
                                  </span>
                                </div>
                                <p className="text-white/60 text-sm mb-1">
                                  {order.date} • {order.items} {order.items === 1 ? 'товар' : order.items < 5 ? 'товара' : 'товаров'}
                                </p>
                                
                                {/* Tracking Info */}
                                {order.deliveryService && (
                                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="flex items-center gap-2">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                                        <rect x="1" y="3" width="15" height="13"/>
                                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                                        <circle cx="5.5" cy="18.5" r="2.5"/>
                                        <circle cx="18.5" cy="18.5" r="2.5"/>
                                      </svg>
                                      <span className="text-white/70 text-sm font-medium">
                                        {order.deliveryService}
                                      </span>
                                    </div>
                                    {order.trackNumber && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-white/50 text-xs">Трек-номер:</span>
                                        <code className="text-white/80 text-xs bg-white/5 px-2 py-1 rounded font-mono">
                                          {order.trackNumber}
                                        </code>
                                        {order.trackUrl && (
                                          <a
                                            href={order.trackUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 text-xs underline"
                                          >
                                            Отследить
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-white font-manrope font-bold text-xl">
                                  {order.total}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="p-4 md:p-6">
                            <h4 className="text-white/70 font-manrope font-semibold text-sm mb-3">Товары в заказе:</h4>
                            <div className="space-y-2">
                              {order.products.map((product, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-white/80">
                                    {product.name} <span className="text-white/50">× {product.quantity}</span>
                                  </span>
                                  <span className="text-white/70 font-medium">{product.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orders.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <path d="M9 3v18M3 9h18M3 15h18"/>
                          </svg>
                        </div>
                        <p className="text-white/60 font-manrope text-lg mb-4">
                          У вас пока нет заказов
                        </p>
                        <button
                          onClick={() => navigate(ROUTES.CATALOG)}
                          className="btn-primary hover:scale-105 transition-transform"
                        >
                          Перейти в каталог
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <h2 className="text-white font-manrope font-bold text-2xl md:text-3xl mb-6">
                      Мои отзывы
                    </h2>

                    {userReviews.length > 0 ? (
                      <div className="space-y-4">
                        {userReviews.map((review) => (
                          <div
                            key={review.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/8 transition-all"
                          >
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {/* Star Rating */}
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg
                                        key={star}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill={star <= review.rating ? '#FACC15' : 'none'}
                                        stroke={star <= review.rating ? '#FACC15' : 'rgba(255,255,255,0.3)'}
                                        strokeWidth="2"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-white/60 text-sm">{review.date}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditReview(review.id)}
                                  className="p-2 rounded-lg hover:bg-white/10 transition-all group"
                                  title="Редактировать"
                                >
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 group-hover:text-white">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="p-2 rounded-lg hover:bg-red-500/20 transition-all group"
                                  title="Удалить"
                                >
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 group-hover:text-red-400">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Review Text */}
                            {editingReview === review.id ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-white/70 font-manrope text-sm mb-2">Оценка</label>
                                  <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        onClick={() => {
                                          const updatedReview = userReviews.find(r => r.id === review.id);
                                          if (updatedReview) {
                                            updatedReview.rating = star;
                                          }
                                        }}
                                        className="transition-transform hover:scale-110"
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill={star <= review.rating ? '#FACC15' : 'none'}
                                          stroke="#FACC15"
                                          strokeWidth="2"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                        </svg>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <textarea
                                  defaultValue={review.text}
                                  className="form-control w-full min-h-[120px] resize-y"
                                  placeholder="Ваш отзыв..."
                                  id={`review-text-${review.id}`}
                                />
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => {
                                      const textarea = document.getElementById(`review-text-${review.id}`) as HTMLTextAreaElement;
                                      handleSaveReview(review.id, textarea.value, review.rating);
                                    }}
                                    className="btn-primary text-sm hover:scale-105 transition-transform"
                                  >
                                    Сохранить
                                  </button>
                                  <button
                                    onClick={() => setEditingReview(null)}
                                    className="btn-secondary text-sm hover:bg-white/10 transition-all"
                                  >
                                    Отмена
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-white/80 text-sm leading-relaxed">
                                {review.text}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </div>
                        <p className="text-white/60 font-manrope text-lg mb-4">
                          У вас пока нет отзывов
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                          Оставьте отзыв на товар, который вы приобрели
                        </p>
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="btn-primary hover:scale-105 transition-transform"
                        >
                          Посмотреть заказы
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-white font-manrope font-bold text-2xl md:text-3xl mb-6">
                      Настройки
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-white font-manrope font-bold text-lg mb-4">
                          Уведомления
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-white/70 group-hover:text-white transition-colors">
                              Email уведомления о заказах
                            </span>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                          </label>
                          <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-white/70 group-hover:text-white transition-colors">
                              SMS уведомления
                            </span>
                            <input type="checkbox" className="w-5 h-5" />
                          </label>
                          <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-white/70 group-hover:text-white transition-colors">
                              Акции и скидки
                            </span>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                          </label>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-white font-manrope font-bold text-lg mb-4">
                          Безопасность
                        </h3>
                        <div className="space-y-3">
                          <button className="w-full text-left btn-secondary hover:bg-white/10 transition-all">
                            Изменить пароль
                          </button>
                          <button className="w-full text-left btn-secondary hover:bg-white/10 transition-all">
                            Двухфакторная аутентификация
                          </button>
                        </div>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                        <h3 className="text-red-400 font-manrope font-bold text-lg mb-2">
                          Опасная зона
                        </h3>
                        <p className="text-white/60 text-sm mb-4">
                          Удаление аккаунта приведет к безвозвратной потере всех данных
                        </p>
                        <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-manrope font-semibold px-4 py-2 rounded-lg transition-all">
                          Удалить аккаунт
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AccountPage;
