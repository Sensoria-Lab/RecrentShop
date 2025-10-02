import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../shared/PageLayout';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    fullName: '',
    phone: '',
    email: '',
    vkLink: '',
    additionalInfo: '',
    agreeToPolicy: false
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToPolicy) {
      alert('Пожалуйста, согласитесь с обработкой персональных данных');
      return;
    }
    
    // Here you would send the order to your backend
    console.log('Order data:', formData, items);
    alert('Заказ успешно оформлен! В ближайшее время с вами свяжется менеджер.');
    clearCart();
    navigate('/');
  };

  const isFormValid = formData.deliveryAddress && formData.fullName && formData.phone && formData.email && formData.agreeToPolicy;

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10" />
                    
                    <div className="relative z-10 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                      {/* Delivery Address - Now First */}
                      <div>
                        <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                          Полный адрес доставки <span className="text-red-400">*</span>
                        </label>
                        <p className="text-white/50 font-manrope text-xs sm:text-sm mb-2">
                          SPB106, Санкт-Петербург, пр-кт Маршала Блюхера (пр-кт Маршала Блюхера, 14)
                        </p>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="Россия, г Санкт-Петербург"
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                        />
                      </div>

                      {/* Full Name - ФИО */}
                      <div>
                        <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                          ФИО <span className="text-red-400">*</span>
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

                      {/* Phone - Телефон */}
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

                      {/* VK Link - Ваша страница в VK для связи */}
                      <div>
                        <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                          Ваша страница в VK для связи
                        </label>
                        <textarea
                          name="vkLink"
                          value={formData.vkLink}
                          onChange={handleInputChange}
                          placeholder="ссылка страницы в VK"
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm sm:text-base"
                        />
                      </div>

                      {/* Additional Info - Дополнительная информация */}
                      <div>
                        <label className="block text-white/90 font-manrope font-medium text-sm sm:text-base mb-2">
                          Дополнительная информация
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          placeholder=""
                          rows={4}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 font-manrope focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm sm:text-base"
                        />
                      </div>

                      {/* Privacy Policy Checkbox */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="agreeToPolicy"
                            checked={formData.agreeToPolicy}
                            onChange={handleInputChange}
                            required
                            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                          />
                          <span className="text-white/70 group-hover:text-white/90 font-manrope text-xs sm:text-sm transition-colors">
                            Согласен на обработку персональных данных <span className="text-red-400">*</span>
                            <Link to="/info" className="text-blue-400 hover:text-blue-300 ml-1 underline">
                              Согласен на обработку персональных данных
                            </Link>
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-3 sm:gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => navigate('/cart')}
                          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white font-manrope font-medium text-sm sm:text-base rounded-lg sm:rounded-xl transition-all border border-white/10 hover:border-white/20 active:scale-95"
                        >
                          Назад
                        </button>
                        <button
                          type="submit"
                          disabled={!isFormValid}
                          className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 font-manrope font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all ${
                            isFormValid
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
                              : 'bg-white/10 text-white/40 cursor-not-allowed'
                          }`}
                        >
                          Оформить заказ
                        </button>
                      </div>
                    </div>
                  </div>
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
