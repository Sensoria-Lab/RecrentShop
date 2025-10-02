import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

type DeliveryMethod = 'russian-post' | 'cdek' | 'home-delivery';

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
  withInsurance: boolean;
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
    method: 'russian-post',
    address: '',
    city: '',
    postalCode: '',
    withInsurance: false,
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
    return (
      deliveryForm.city.trim() !== '' &&
      deliveryForm.address.trim() !== '' &&
      deliveryForm.postalCode.trim() !== ''
    );
  };

  const getDeliveryPrice = () => {
    const prices = {
      'russian-post': { withInsurance: 624, withoutInsurance: 473 },
      'cdek': { withInsurance: 345, withoutInsurance: 293 },
      'home-delivery': { withInsurance: 633, withoutInsurance: 581 },
    };
    const methodPrices = prices[deliveryForm.method];
    return deliveryForm.withInsurance ? methodPrices.withInsurance : methodPrices.withoutInsurance;
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
      id: 'russian-post' as DeliveryMethod, 
      name: 'Почта России', 
      description: 'Доставка по всей России',
      priceWithInsurance: 624,
      priceWithoutInsurance: 473
    },
    { 
      id: 'cdek' as DeliveryMethod, 
      name: 'СДЭК', 
      description: 'Быстрая доставка в пункт выдачи',
      priceWithInsurance: 345,
      priceWithoutInsurance: 293
    },
    { 
      id: 'home-delivery' as DeliveryMethod, 
      name: 'Доставка на дом', 
      description: 'Курьерская доставка СДЭК',
      priceWithInsurance: 633,
      priceWithoutInsurance: 581
    },
  ];

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-4 sm:px-8 md:px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Background container */}
            <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Page title */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  Оформление заказа
                </h1>
                <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
              </div>

              {/* Хлебные крошки */}
              <div className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <Link 
              to="/cart" 
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${
                'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
              }`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
                Корзина
              </span>
            </Link>

            <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-white/10 via-white/30 to-white/10"></div>

            <div 
              className={`flex flex-col items-center gap-2 ${
                step !== 'contacts' ? 'cursor-pointer' : ''
              } group`}
              onClick={() => step !== 'contacts' && setStep('contacts')}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${
                step === 'contacts'
                  ? 'bg-gradient-to-r from-white/20 to-white/10 border-white/30'
                  : 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
              }`}>
                <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors ${
                  step === 'contacts' ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className={`text-[10px] sm:text-xs md:text-sm transition-colors text-center ${
                step === 'contacts' ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'
              }`}>
                Контакты
              </span>
            </div>

            <div className={`h-px w-8 sm:w-12 md:w-16 transition-colors duration-300 ${
              step === 'delivery' 
                ? 'bg-gradient-to-r from-white/30 via-white/30 to-white/30'
                : 'bg-gradient-to-r from-white/10 via-white/30 to-white/10'
            }`}></div>

            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${
                step === 'delivery'
                  ? 'bg-gradient-to-r from-white/20 to-white/10 border-white/30'
                  : 'bg-white/5 border-white/10'
              }`}>
                <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors ${
                  step === 'delivery' ? 'text-white' : 'text-gray-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className={`text-[10px] sm:text-xs md:text-sm transition-colors text-center ${
                step === 'delivery' ? 'text-white font-medium' : 'text-gray-600'
              }`}>
                Доставка
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6 md:gap-8 lg:gap-10">
                {/* Левая колонка - Форма */}
            <div>
              {step === 'contacts' ? (
                // Шаг 1: Контактная информация
                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-9 shadow-2xl shadow-black/20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Контактная информация
                      </h2>
                    </div>                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
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
                  <div className="backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-9 shadow-2xl shadow-black/20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Способ доставки
                      </h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {deliveryMethods.map((method) => {
                        const icons: Record<DeliveryMethod, JSX.Element> = {
                          'russian-post': (
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ),
                          'cdek': (
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ),
                          'home-delivery': (
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          ),
                        };

                        return (
                          <div
                            key={method.id}
                            onClick={() => handleDeliveryMethodChange(method.id)}
                            className={`p-4 sm:p-5 md:p-6 border rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 group ${
                              deliveryForm.method === method.id
                                ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/5'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="radio"
                                name="deliveryMethod"
                                checked={deliveryForm.method === method.id}
                                onChange={() => handleDeliveryMethodChange(method.id)}
                                className="mt-1.5 w-5 h-5 accent-white flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                  <div className="flex items-center gap-3">
                                    <div className={`transition-colors ${
                                      deliveryForm.method === method.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                    }`}>
                                      {icons[method.id]}
                                    </div>
                                    <div className={`text-base sm:text-lg md:text-xl font-semibold transition-colors ${
                                      deliveryForm.method === method.id ? 'text-white' : 'text-gray-200 group-hover:text-white'
                                    }`}>
                                      {method.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3">
                                  {method.description}
                                </div>
                                {deliveryForm.method === method.id && (
                                  <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex items-start gap-3">
                                      <input
                                        type="checkbox"
                                        id={`insurance-${method.id}`}
                                        checked={deliveryForm.withInsurance}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          setDeliveryForm(prev => ({ ...prev, withInsurance: e.target.checked }));
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-white flex-shrink-0"
                                      />
                                      <label 
                                        htmlFor={`insurance-${method.id}`} 
                                        className="text-xs sm:text-sm text-gray-300 cursor-pointer flex-1"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Страховка ({deliveryForm.withInsurance ? method.priceWithInsurance : method.priceWithoutInsurance} ₽)
                                        <span className="block text-gray-500 mt-1">
                                          {deliveryForm.withInsurance 
                                            ? 'Посылка застрахована' 
                                            : 'Без страховки'}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Поля адреса */}
                    <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 md:space-y-5">
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
              <div className="backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Ваш заказ
                  </h2>
                </div>

                <div 
                  className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6 max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">
                          {item.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-2">
                          {item.subtitle}
                          {item.selectedSize && ` • ${item.selectedSize}`}
                          {item.selectedColor && ` • ${item.selectedColor}`}
                          {item.selectedType && ` • ${item.selectedType}`}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs sm:text-sm text-gray-400 font-medium">
                            ×{item.quantity}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white">
                            {parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-5 sm:pt-6 mt-5 sm:mt-6 space-y-3">
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                    <span>Товары:</span>
                    <span>{getTotalPrice()} ₽</span>
                  </div>
                  {step === 'delivery' && (
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                      <span>Доставка:</span>
                      <span>{getDeliveryPrice()} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20">
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200">Итого:</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      {step === 'delivery' ? getTotalPrice() + getDeliveryPrice() : getTotalPrice()} ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default CheckoutPage;
