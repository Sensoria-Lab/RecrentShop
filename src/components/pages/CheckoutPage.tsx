import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PageLayout from '../shared/PageLayout';

type DeliveryMethod = 'pickup' | 'russian-post' | 'boxberry' | 'cdek';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  vkLink: string;
  additionalInfo: string;
}

interface DeliveryFormData {
  method: DeliveryMethod;
  address: string;
  city: string;
  postalCode: string;
  pickupPoint: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items: cart, getTotalPrice } = useCart();
  const [step, setStep] = useState<'contacts' | 'delivery'>('contacts');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const [contactForm, setContactForm] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    vkLink: '',
    additionalInfo: '',
  });

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>({
    method: 'pickup',
    address: '',
    city: '',
    postalCode: '',
    pickupPoint: '',
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const isContactFormValid = 
    contactForm.fullName.trim() !== '' &&
    contactForm.phone.trim() !== '' &&
    contactForm.email.trim() !== '' &&
    agreeToPolicy;

  const isDeliveryFormValid = () => {
    if (deliveryForm.method === 'pickup') {
      return deliveryForm.pickupPoint.trim() !== '';
    }
    return (
      deliveryForm.city.trim() !== '' &&
      deliveryForm.address.trim() !== '' &&
      deliveryForm.postalCode.trim() !== ''
    );
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliveryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryForm(prev => ({ ...prev, method }));
  };

  const handleNextStep = () => {
    if (isContactFormValid) {
      setStep('delivery');
    }
  };

  const handlePrevStep = () => {
    setStep('contacts');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeliveryFormValid()) {
      console.log('Order submitted:', { contactForm, deliveryForm, cart });
      alert('Заказ успешно оформлен!');
      navigate('/');
    }
  };

  const deliveryMethods = [
    { 
      id: 'pickup' as DeliveryMethod, 
      name: 'Самовывоз', 
      description: 'Забрать в пункте выдачи' 
    },
    { 
      id: 'russian-post' as DeliveryMethod, 
      name: 'Почта России', 
      description: 'Доставка по всей России' 
    },
    { 
      id: 'boxberry' as DeliveryMethod, 
      name: 'Boxberry', 
      description: 'Доставка в пункт выдачи или курьером' 
    },
    { 
      id: 'cdek' as DeliveryMethod, 
      name: 'СДЭК', 
      description: 'Быстрая доставка по России' 
    },
  ];

  if (cart.length === 0) {
    return null;
  }

  return (
    <PageLayout>
      <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Хлебные крошки */}
          <div className="mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 text-xs sm:text-sm md:text-base">
            <Link 
              to="/cart" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Корзина
            </Link>
            <span className="text-gray-600">→</span>
            <span 
              className={`${
                step === 'contacts' 
                  ? 'text-white font-medium' 
                  : 'text-gray-400 cursor-pointer hover:text-white'
              } transition-colors`}
              onClick={() => setStep('contacts')}
            >
              Контактная информация
            </span>
            <span className="text-gray-600">→</span>
            <span 
              className={`${
                step === 'delivery' 
                  ? 'text-white font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Способ доставки
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6 md:gap-8 lg:gap-10">
            {/* Левая колонка - Форма */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Оформление заказа
              </h1>

              {step === 'contacts' ? (
                // Шаг 1: Контактная информация
                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6">
                      Контактная информация
                    </h2>

                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      <div>
                        <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                          ФИО <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={contactForm.fullName}
                          onChange={handleContactInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="Иванов Иван Иванович"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                          Телефон <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                          placeholder="email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                          Ссылка на VK (необязательно)
                        </label>
                        <textarea
                          name="vkLink"
                          value={contactForm.vkLink}
                          onChange={handleContactInputChange}
                          rows={2}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                          placeholder="https://vk.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                          Дополнительная информация (необязательно)
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={contactForm.additionalInfo}
                          onChange={handleContactInputChange}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                          placeholder="Комментарии к заказу..."
                        />
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <input
                          type="checkbox"
                          id="agreeToPolicy"
                          checked={agreeToPolicy}
                          onChange={(e) => setAgreeToPolicy(e.target.checked)}
                          className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-white"
                          required
                        />
                        <label htmlFor="agreeToPolicy" className="text-xs sm:text-sm md:text-base text-gray-300">
                          Я согласен с{' '}
                          <Link 
                            to="/info" 
                            className="text-white hover:underline"
                            target="_blank"
                          >
                            политикой конфиденциальности
                          </Link>{' '}
                          <span className="text-red-400">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    >
                      Вернуться в корзину
                    </button>
                    <button
                      type="submit"
                      disabled={!isContactFormValid}
                      className={`flex-1 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-300 ${
                        isContactFormValid
                          ? 'bg-gradient-to-r from-white/90 to-white/70 text-black hover:from-white hover:to-white/80'
                          : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                      }`}
                    >
                      Далее
                    </button>
                  </div>
                </form>
              ) : (
                // Шаг 2: Способ доставки
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6">
                      Способ доставки
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                      {deliveryMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => handleDeliveryMethodChange(method.id)}
                          className={`p-3 sm:p-4 md:p-5 border rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 ${
                            deliveryForm.method === method.id
                              ? 'border-white/30 bg-white/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              checked={deliveryForm.method === method.id}
                              onChange={() => handleDeliveryMethodChange(method.id)}
                              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-white"
                            />
                            <div className="flex-1">
                              <div className="text-sm sm:text-base md:text-lg font-medium text-white">
                                {method.name}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-400 mt-1">
                                {method.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Поля адреса в зависимости от выбранного способа */}
                    <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 md:space-y-5">
                      {deliveryForm.method === 'pickup' ? (
                        <div>
                          <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                            Пункт выдачи <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="pickupPoint"
                            value={deliveryForm.pickupPoint}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="Адрес пункта выдачи"
                            required
                          />
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                              Город <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={deliveryForm.city}
                              onChange={handleDeliveryInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                              placeholder="Москва"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                              Индекс <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={deliveryForm.postalCode}
                              onChange={handleDeliveryInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                              placeholder="123456"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm md:text-base text-gray-300 mb-1.5 sm:mb-2">
                              Адрес доставки <span className="text-red-400">*</span>
                            </label>
                            <textarea
                              name="address"
                              value={deliveryForm.address}
                              onChange={handleDeliveryInputChange}
                              rows={3}
                              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                              placeholder="Улица, дом, квартира"
                              required
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      disabled={!isDeliveryFormValid()}
                      className={`flex-1 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-300 ${
                        isDeliveryFormValid()
                          ? 'bg-gradient-to-r from-white/90 to-white/70 text-black hover:from-white hover:to-white/80'
                          : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                      }`}
                    >
                      Оформить заказ
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Правая колонка - Сводка заказа */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6">
                  Ваш заказ
                </h2>

                <div 
                  className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6 max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm md:text-base font-medium text-white truncate">
                          {item.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-0.5 sm:mt-1">
                          {item.subtitle}
                          {item.selectedSize && ` • Размер: ${item.selectedSize}`}
                          {item.selectedColor && ` • Цвет: ${item.selectedColor}`}
                          {item.selectedType && ` • ${item.selectedType}`}
                        </p>
                        <div className="flex items-center justify-between mt-1 sm:mt-2">
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-400">
                            {item.quantity} шт.
                          </span>
                          <span className="text-xs sm:text-sm md:text-base font-medium text-white">
                            {parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 sm:pt-5 md:pt-6">
                  <div className="flex justify-between items-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    <span>Итого:</span>
                    <span>{getTotalPrice()} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
