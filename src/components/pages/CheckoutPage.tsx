import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../shared/PageLayout';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';

type DeliveryMethod = 'pickup' | 'delivery' | 'post';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    comment: ''
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the order to your backend
    alert('Заказ успешно оформлен! В ближайшее время с вами свяжется менеджер.');
    clearCart();
    navigate('/');
  };

  const isStep1Valid = formData.fullName && formData.phone && formData.email;
  const isStep2Valid = deliveryMethod === 'pickup' || (deliveryMethod === 'delivery' && formData.address && formData.city) || (deliveryMethod === 'post' && formData.address && formData.city && formData.postalCode);

  return (
    <PageLayout>
      <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Background container */}
          <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Page Title */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Оформление заказа
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Breadcrumb Steps */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              {/* Step 1 */}
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${step >= 1 ? 'bg-blue-500 border-blue-500' : 'bg-white/5 border-white/20'} transition-all`}>
                  <span className="text-white font-manrope font-bold text-xs sm:text-sm">1</span>
                </div>
                <span className="ml-2 text-white/70 font-manrope text-xs sm:text-sm md:text-base hidden sm:inline">Контакты</span>
              </div>

              {/* Separator */}
              <div className={`w-8 sm:w-12 md:w-16 h-0.5 ${step >= 2 ? 'bg-blue-500' : 'bg-white/20'} transition-all`}></div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${step >= 2 ? 'bg-blue-500 border-blue-500' : 'bg-white/5 border-white/20'} transition-all`}>
                  <span className="text-white font-manrope font-bold text-xs sm:text-sm">2</span>
                </div>
                <span className="ml-2 text-white/70 font-manrope text-xs sm:text-sm md:text-base hidden sm:inline">Доставка</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Contact Information */}
                  {step === 1 && (
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10" />
                      
                      <div className="relative z-10 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl font-manrope font-bold text-white mb-4 sm:mb-6">
                          Введите полный адрес
                        </h2>

                        {/* Full Name */}
                        <div>
                          <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                            Полное имя <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Иван Иванов"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                            Телефон <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+7 (999) 123-45-67"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@mail.com"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                          />
                        </div>

                        {/* Address */}
                        <div>
                          <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                            Адрес доставки <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Россия, г Санкт-Петербург"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                          />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 sm:gap-4 pt-4">
                          <button
                            type="button"
                            onClick={() => navigate('/cart')}
                            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white font-manrope font-medium text-sm sm:text-base rounded-lg sm:rounded-xl transition-all border border-white/10 hover:border-white/20 active:scale-95"
                          >
                            Назад
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!isStep1Valid}
                            className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 font-manrope font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all ${
                              isStep1Valid
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
                                : 'bg-white/10 text-white/40 cursor-not-allowed'
                            }`}
                          >
                            Продолжить
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Delivery Method */}
                  {step === 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10" />
                        
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                          <h2 className="text-xl sm:text-2xl font-manrope font-bold text-white mb-4 sm:mb-6">
                            Выберите способ доставки
                          </h2>

                          {/* Delivery Options */}
                          <div className="space-y-3 sm:space-y-4">
                            {/* Pickup Point */}
                            <button
                              type="button"
                              onClick={() => setDeliveryMethod('pickup')}
                              className={`w-full text-left p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all ${
                                deliveryMethod === 'pickup'
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                                  deliveryMethod === 'pickup' ? 'bg-blue-500' : 'bg-white/10'
                                }`}>
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-white font-manrope font-semibold text-base sm:text-lg mb-1">
                                    До пункта выдачи
                                  </h3>
                                  <p className="text-white/60 font-manrope text-xs sm:text-sm">
                                    Где удобно
                                  </p>
                                </div>
                              </div>
                            </button>

                            {/* Home Delivery */}
                            <button
                              type="button"
                              onClick={() => setDeliveryMethod('delivery')}
                              className={`w-full text-left p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all ${
                                deliveryMethod === 'delivery'
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                                  deliveryMethod === 'delivery' ? 'bg-blue-500' : 'bg-white/10'
                                }`}>
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-white font-manrope font-semibold text-base sm:text-lg mb-1">
                                    Доставить по адресу
                                  </h3>
                                  <p className="text-white/60 font-manrope text-xs sm:text-sm">
                                    Когда удобно
                                  </p>
                                </div>
                              </div>
                            </button>

                            {/* Post */}
                            <button
                              type="button"
                              onClick={() => setDeliveryMethod('post')}
                              className={`w-full text-left p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all ${
                                deliveryMethod === 'post'
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-start gap-3 sm:gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                                  deliveryMethod === 'post' ? 'bg-blue-500' : 'bg-white/10'
                                }`}>
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-white font-manrope font-semibold text-base sm:text-lg mb-1">
                                    Почта
                                  </h3>
                                  <p className="text-white/60 font-manrope text-xs sm:text-sm">
                                    Почта России и EMS
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>

                          {/* Additional fields for delivery/post */}
                          {deliveryMethod !== 'pickup' && (
                            <div className="space-y-4 pt-4">
                              <div>
                                <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                                  Город <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Санкт-Петербург"
                                  required
                                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                                />
                              </div>

                              {deliveryMethod === 'post' && (
                                <div>
                                  <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                                    Почтовый индекс <span className="text-red-400">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="190000"
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Comment */}
                          <div>
                            <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                              Комментарий к заказу
                            </label>
                            <textarea
                              name="comment"
                              value={formData.comment}
                              onChange={handleInputChange}
                              placeholder="Дополнительная информация..."
                              rows={3}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm sm:text-base"
                            />
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex gap-3 sm:gap-4 pt-4">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white font-manrope font-medium text-sm sm:text-base rounded-lg sm:rounded-xl transition-all border border-white/10 hover:border-white/20 active:scale-95"
                            >
                              Назад
                            </button>
                            <button
                              type="submit"
                              disabled={!isStep2Valid}
                              className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 font-manrope font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all ${
                                isStep2Valid
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95'
                                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                              }`}
                            >
                              Оформить заказ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl sticky top-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10" />
                  
                  <div className="relative z-10 p-4 sm:p-5 md:p-6">
                    <h2 className="text-xl sm:text-2xl font-manrope font-bold text-white mb-4 sm:mb-6">
                      Ваш заказ
                    </h2>

                    {/* Order Items */}
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg p-1.5 sm:p-2">
                            <Img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-manrope font-semibold text-xs sm:text-sm truncate">
                              {item.title}
                            </h4>
                            {item.subtitle && (
                              <p className="text-white/60 text-[10px] sm:text-xs truncate">
                                {item.subtitle}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-white/60 text-xs sm:text-sm">
                                {item.quantity} шт
                              </span>
                              <span className="text-white font-manrope font-bold text-xs sm:text-sm">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 sm:mb-6" />

                    {/* Total */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between text-white/70 text-sm sm:text-base">
                        <span className="font-manrope">Товары:</span>
                        <span className="font-manrope font-semibold">
                          {items.reduce((sum, item) => sum + item.quantity, 0)} шт
                        </span>
                      </div>
                      <div className="flex justify-between text-white text-lg sm:text-xl md:text-2xl">
                        <span className="font-manrope font-bold">Итого:</span>
                        <span className="font-manrope font-extrabold">
                          {getTotalPrice()} р.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </PageLayout>
  );
};

export default CheckoutPage;
