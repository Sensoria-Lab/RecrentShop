'use client';
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import { useCart } from '@/src/context/CartContext';
import { Header, Footer } from '@/src/components/layout';
import { RadioGroup, RadioGroupItem, Checkbox, Button, Input, Textarea } from '@/src/components/ui';
import Img from '@/src/components/ui/Img';
import { z } from 'zod';

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

// Zod validation schemas
const contactSchema = z.object({
  fullName: z.string().min(2, 'ФИО должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
  vkLink: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const deliverySchema = z.object({
  method: z.string(),
  address: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
  city: z.string().min(2, 'Город должен содержать минимум 2 символа'),
  postalCode: z.string().min(6, 'Введите корректный индекс'),
  withInsurance: z.boolean(),
});

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { items: cart } = useCart();
  const [step, setStep] = useState<'contacts' | 'delivery'>('contacts');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [fieldStatus, setFieldStatus] = useState<Record<string, 'idle' | 'valid' | 'invalid'>>({});
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const [unselectedItems, setUnselectedItems] = useState<Set<string>>(new Set());

  const selectedItems = useMemo(() => {
    return new Set(cart.filter((item) => !unselectedItems.has(item.id)).map((item) => item.id));
  }, [cart, unselectedItems]);

  const [contactForm, setContactForm] = useState<ContactFormData>(() => {
    if (typeof window === 'undefined') {
      return {
        fullName: '',
        phone: '',
        email: '',
        vkLink: '',
        additionalInfo: '',
      };
    }

    const savedContactForm = localStorage.getItem('checkoutContactForm');
    if (!savedContactForm) {
      return {
        fullName: '',
        phone: '',
        email: '',
        vkLink: '',
        additionalInfo: '',
      };
    }

    try {
      return JSON.parse(savedContactForm) as ContactFormData;
    } catch {
      return {
        fullName: '',
        phone: '',
        email: '',
        vkLink: '',
        additionalInfo: '',
      };
    }
  });

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>(() => {
    if (typeof window === 'undefined') {
      return {
        method: 'russian-post',
        address: '',
        city: '',
        postalCode: '',
        withInsurance: false,
      };
    }

    const savedDeliveryForm = localStorage.getItem('checkoutDeliveryForm');
    if (!savedDeliveryForm) {
      return {
        method: 'russian-post',
        address: '',
        city: '',
        postalCode: '',
        withInsurance: false,
      };
    }

    try {
      return JSON.parse(savedDeliveryForm) as DeliveryFormData;
    } catch {
      return {
        method: 'russian-post',
        address: '',
        city: '',
        postalCode: '',
        withInsurance: false,
      };
    }
  });

  const [agreeToPolicy, setAgreeToPolicy] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('checkoutAgreeToPolicy') === 'true';
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  // Toggle item selection
  const toggleItemSelection = (itemId: string) => {
    setUnselectedItems(prev => {
      const newSet = new Set(prev);
      if (selectedItems.has(itemId)) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

  // Select/Deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.size === cart.length) {
      setUnselectedItems(new Set(cart.map(item => item.id)));
    } else {
      setUnselectedItems(new Set());
    }
  };

  // Calculate total for selected items only
  const getSelectedTotal = () => {
    return cart
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => {
        const price = parseFloat(item.price?.replace(/[^\d]/g, '') || '0');
        return sum + (price * (item.quantity || 1));
      }, 0);
  };

  // Save forms to localStorage on change
  useEffect(() => {
    localStorage.setItem('checkoutContactForm', JSON.stringify(contactForm));
  }, [contactForm]);

  useEffect(() => {
    localStorage.setItem('checkoutDeliveryForm', JSON.stringify(deliveryForm));
  }, [deliveryForm]);

  useEffect(() => {
    localStorage.setItem('checkoutAgreeToPolicy', String(agreeToPolicy));
  }, [agreeToPolicy]);

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
    if (!methodPrices) return 0;
    return deliveryForm.withInsurance ? methodPrices.withInsurance : methodPrices.withoutInsurance;
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (contactErrors[name]) {
      setContactErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Inline validation handler
  const validateField = (fieldName: string, value: string) => {
    let isValid = false;

    switch (fieldName) {
      case 'fullName':
        isValid = value.trim().length >= 2;
        break;
      case 'phone':
        isValid = value.trim().length >= 10;
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      default:
        isValid = true;
    }

    setFieldStatus(prev => ({
      ...prev,
      [fieldName]: value.trim() === '' ? 'idle' : (isValid ? 'valid' : 'invalid')
    }));

    return isValid;
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
    const result = contactSchema.safeParse(contactForm);

    if (!agreeToPolicy) {
      alert('Необходимо согласие с политикой конфиденциальности');
      return;
    }

    if (result.success) {
      setContactErrors({});
      setStep('delivery');
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setContactErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setStep('contacts');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = deliverySchema.safeParse(deliveryForm);

    if (result.success) {
      console.log('Order submitted:', { contactForm, deliveryForm, cart });

      // Clear localStorage after successful order
      localStorage.removeItem('checkoutContactForm');
      localStorage.removeItem('checkoutDeliveryForm');
      localStorage.removeItem('checkoutAgreeToPolicy');

      alert('Заказ успешно оформлен!');
      router.push('/');
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      // setDeliveryErrors(errors); // Removed unused
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

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient || cart.length === 0) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-24 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">


            {/* Background container */}
            <div className="border border-[#EAE2E6]/[0.08] p-6 sm:p-8 md:p-10 content-reveal content-reveal-delay-2">

              <div className="grid lg:grid-cols-[1fr_480px] gap-6 md:gap-8 lg:gap-10">
                {/* Левая колонка - Форма */}
                <div className="relative">
                  <div
                    ref={(el) => {
                      // GSAP step transition
                      if (!el) return;
                      const prevStepEl = (el as HTMLElement & { _prevStep?: string })._prevStep;
                      if (prevStepEl && prevStepEl !== step) {
                        const dir = step === 'delivery' ? 1 : -1;
                        gsap.fromTo(el, { opacity: 0, x: dir * 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'expo.out' });
                      }
                      (el as HTMLElement & { _prevStep?: string })._prevStep = step;
                    }}
                  >
                    {step === 'contacts' ? (
                      // Шаг 1: Контактная информация
                      <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4 sm:space-y-5 md:space-y-6 scroll-fade-in scroll-fade-in-delay-1">
                        <div className="border border-[#EAE2E6]/[0.08] p-5 sm:p-6 md:p-7 lg:p-9">
                          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EAE2E6]/[0.07] border border-[#EAE2E6]/15 flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#EAE2E6]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent">
                              Контактная информация
                            </h2>
                          </div>                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                ФИО <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <div className="relative">
                                <Input
                                  type="text"
                                  name="fullName"
                                  value={contactForm.fullName}
                                  onChange={handleContactInputChange}
                                  onBlur={(e) => validateField('fullName', e.target.value)}
                                  className={`w-full form-control transition-all duration-200 ${fieldStatus.fullName === 'valid' ? 'border-[#34d399]/50 focus:ring-[#34d399]/20' :
                                    fieldStatus.fullName === 'invalid' ? 'border-[#f87171]/50 focus:ring-[#f87171]/20' :
                                      contactErrors.fullName ? 'border-[#f87171]/50' : 'border-white/20'
                                    }`}
                                  placeholder="Иванов Иван Иванович"
                                />
                                {fieldStatus.fullName === 'valid' && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                                    <svg className="w-5 h-5 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              {contactErrors.fullName && (
                                <p className="text-[#f87171] text-xs sm:text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {contactErrors.fullName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Телефон <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <div className="relative">
                                <Input
                                  type="tel"
                                  name="phone"
                                  value={contactForm.phone}
                                  onChange={handleContactInputChange}
                                  onBlur={(e) => validateField('phone', e.target.value)}
                                  className={`w-full form-control transition-all duration-200 ${fieldStatus.phone === 'valid' ? 'border-[#34d399]/50 focus:ring-[#34d399]/20' :
                                    fieldStatus.phone === 'invalid' ? 'border-[#f87171]/50 focus:ring-[#f87171]/20' :
                                      contactErrors.phone ? 'border-[#f87171]/50' : 'border-white/20'
                                    }`}
                                  placeholder="+7 (999) 123-45-67"
                                />
                                {fieldStatus.phone === 'valid' && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                                    <svg className="w-5 h-5 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              {contactErrors.phone && (
                                <p className="text-[#f87171] text-xs sm:text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {contactErrors.phone}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Email <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <div className="relative">
                                <Input
                                  type="email"
                                  name="email"
                                  value={contactForm.email}
                                  onChange={handleContactInputChange}
                                  onBlur={(e) => validateField('email', e.target.value)}
                                  className={`w-full form-control transition-all duration-200 ${fieldStatus.email === 'valid' ? 'border-[#34d399]/50 focus:ring-[#34d399]/20' :
                                    fieldStatus.email === 'invalid' ? 'border-[#f87171]/50 focus:ring-[#f87171]/20' :
                                      contactErrors.email ? 'border-[#f87171]/50' : 'border-white/20'
                                    }`}
                                  placeholder="email@example.com"
                                />
                                {fieldStatus.email === 'valid' && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                                    <svg className="w-5 h-5 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              {contactErrors.email && (
                                <p className="text-[#f87171] text-xs sm:text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {contactErrors.email}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Ссылка на VK (необязательно)
                              </label>
                              <Textarea
                                name="vkLink"
                                value={contactForm.vkLink}
                                onChange={handleContactInputChange}
                                rows={2}
                                className="w-full form-control resize-none transition-all duration-200 hover:border-white/30 focus:border-blue-500/40"
                                placeholder="https://vk.com/..."
                              />
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Дополнительная информация (необязательно)
                              </label>
                              <Textarea
                                name="additionalInfo"
                                value={contactForm.additionalInfo}
                                onChange={handleContactInputChange}
                                rows={3}
                                className="w-full form-control resize-none transition-all duration-200 hover:border-white/30 focus:border-blue-500/40"
                                placeholder="Комментарии к заказу..."
                              />
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3 p-3 hover:bg-[#EAE2E6]/[0.04] transition-colors duration-200">
                              <Checkbox
                                id="agreeToPolicy"
                                checked={agreeToPolicy}
                                onCheckedChange={(checked) => setAgreeToPolicy(checked === true)}
                                className="mt-1 data-[state=checked]:bg-[#EAE2E6] data-[state=checked]:text-[#191516] data-[state=checked]:border-[#EAE2E6] border-[#EAE2E6]/25 hover:border-[#EAE2E6]/50 transition-all duration-200"
                              />
                              <label htmlFor="agreeToPolicy" className="text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 cursor-pointer">
                                Я согласен с{' '}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowPolicyModal(true);
                                  }}
                                  className="text-[#EAE2E6]/50 hover:text-[#EAE2E6]/75 underline underline-offset-2 transition-colors"
                                >
                                  политикой конфиденциальности
                                </button>{' '}
                                <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      // Шаг 2: Способ доставки
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 scroll-fade-in scroll-fade-in-delay-1">
                        <div className="border border-[#EAE2E6]/[0.08] p-5 sm:p-6 md:p-7 lg:p-9">
                          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EAE2E6]/[0.07] border border-[#EAE2E6]/15 flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#EAE2E6]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent">
                              Способ доставки
                            </h2>
                          </div>

                          <RadioGroup
                            value={deliveryForm.method}
                            onValueChange={(value) => handleDeliveryMethodChange(value as DeliveryMethod)}
                            className="space-y-3 sm:space-y-4"
                          >
                            {deliveryMethods.map((method) => {
                              const icons: Record<DeliveryMethod, React.ReactElement> = {
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
                                  className={`p-4 sm:p-5 md:p-6 border cursor-pointer transition-all duration-300 group ${deliveryForm.method === method.id
                                    ? 'border-blue-500/40 bg-gradient-to-br from-blue-500/15 to-blue-600/5 shadow-lg shadow-blue-500/20'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg'
                                    }`}
                                >
                                  <div className="flex items-start gap-4">
                                    <RadioGroupItem
                                      value={method.id}
                                      id={`delivery-${method.id}`}
                                      className="mt-1.5 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <label
                                        htmlFor={`delivery-${method.id}`}
                                        className="cursor-pointer"
                                      >
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                          <div className="flex items-center gap-3">
                                            <div
                                              className={`transition-transform duration-200 hover:scale-110 ${deliveryForm.method === method.id ? 'text-[#EAE2E6]/50' : 'text-[#EAE2E6]/40 group-hover:text-[#EAE2E6]'
                                                }`}
                                            >
                                              {icons[method.id]}
                                            </div>
                                            <div className={`text-base sm:text-lg md:text-xl font-semibold transition-colors ${deliveryForm.method === method.id ? 'text-[#EAE2E6]' : 'text-[#EAE2E6]/70 group-hover:text-[#EAE2E6]'
                                              }`}>
                                              {method.name}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-xs sm:text-sm text-[#EAE2E6]/40 leading-relaxed mb-3">
                                          {method.description}
                                        </div>
                                      </label>
                                      {deliveryForm.method === method.id && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                          <div className="flex items-start gap-3">
                                            <Checkbox
                                              id={`insurance-${method.id}`}
                                              checked={deliveryForm.withInsurance}
                                              onCheckedChange={(checked) => {
                                                setDeliveryForm(prev => ({ ...prev, withInsurance: checked }));
                                              }}
                                              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-white flex-shrink-0"
                                            />
                                            <label
                                              htmlFor={`insurance-${method.id}`}
                                              className="text-xs sm:text-sm text-[#EAE2E6]/55 cursor-pointer flex-1"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              Страховка ({deliveryForm.withInsurance ? method.priceWithInsurance : method.priceWithoutInsurance} ₽)
                                              <span className="block text-[#EAE2E6]/35 mt-1">
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
                          </RadioGroup>

                          {/* Поля адреса */}
                          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 md:space-y-5">
                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Город <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <Input
                                type="text"
                                name="city"
                                value={deliveryForm.city}
                                onChange={handleDeliveryInputChange}
                                className="w-full form-control transition-all duration-200 hover:border-white/30 focus:border-blue-500/40"
                                placeholder="Москва"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Индекс <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <Input
                                type="text"
                                name="postalCode"
                                value={deliveryForm.postalCode}
                                onChange={handleDeliveryInputChange}
                                className="w-full form-control transition-all duration-200 hover:border-white/30 focus:border-blue-500/40"
                                placeholder="123456"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm md:text-base text-[#EAE2E6]/55 mb-1.5 sm:mb-2">
                                Адрес доставки <span className="text-[#EAE2E6]/50">*</span>
                              </label>
                              <Textarea
                                name="address"
                                value={deliveryForm.address}
                                onChange={handleDeliveryInputChange}
                                rows={3}
                                className="w-full form-control resize-none transition-all duration-200 hover:border-white/30 focus:border-blue-500/40"
                                placeholder="Улица, дом, квартира"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Правая колонка - Сводка заказа */}
                <div className="lg:sticky lg:top-28 h-fit scroll-fade-in scroll-fade-in-delay-2">
                  <div className="border border-[#EAE2E6]/[0.08] p-5 sm:p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#EAE2E6]/[0.07] border border-[#EAE2E6]/15 flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAE2E6]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent">
                        Ваш заказ
                      </h2>
                    </div>

                    {/* Select All Checkbox */}
                    <div className="mb-4 flex items-center gap-3 p-3 bg-[#EAE2E6]/[0.04] border border-[#EAE2E6]/[0.08]">
                      <Checkbox
                        id="select-all"
                        checked={selectedItems.size === cart.length && cart.length > 0}
                        onCheckedChange={toggleSelectAll}
                        className="data-[state=checked]:bg-[#EAE2E6] data-[state=checked]:text-[#191516] data-[state=checked]:border-[#EAE2E6] border-[#EAE2E6]/25"
                      />
                      <label htmlFor="select-all" className="text-sm sm:text-base text-[#EAE2E6] font-semibold cursor-pointer select-none">
                        Выбрать все товары ({cart.length})
                      </label>
                    </div>

                    <div
                      className="space-y-3 mb-5 sm:mb-6 max-h-[280px] sm:max-h-[320px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                    >
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="group relative"
                        >
                          <div className={`flex gap-3 sm:gap-4 p-3 sm:p-4 border transition-all duration-300 ${selectedItems.has(item.id)
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10'
                            : 'bg-white/[0.02] border-white/5 opacity-60'
                            }`}>
                            {/* Checkbox для выбора товара */}
                            <div className="flex items-start pt-1">
                              <Checkbox
                                id={`item-${item.id}`}
                                checked={selectedItems.has(item.id)}
                                onCheckedChange={() => toggleItemSelection(item.id)}
                                className="data-[state=checked]:bg-[#EAE2E6] data-[state=checked]:text-[#191516] data-[state=checked]:border-[#EAE2E6] border-[#EAE2E6]/25"
                              />
                            </div>

                            {/* Изображение товара */}
                            <div className="flex-shrink-0">
                              <Img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover border border-[#EAE2E6]/10 group-hover:border-[#EAE2E6]/25 transition-colors"
                              />
                            </div>

                            {/* Информация о товаре */}
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                              {/* Название и параметры */}
                              <div className="space-y-1">
                                <h3 className="text-sm sm:text-base font-semibold text-[#EAE2E6] leading-tight line-clamp-2">
                                  {item.title}
                                </h3>
                                {/* Параметры товара */}
                                {(item.selectedSize || item.selectedColor || item.selectedType) && (
                                  <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-xs">
                                    {item.selectedSize && (
                                      <span className="px-2 py-0.5 bg-[#EAE2E6]/[0.06] text-[#EAE2E6]/60 border border-[#EAE2E6]/10">
                                        {item.selectedSize}
                                      </span>
                                    )}
                                    {item.selectedColor && (
                                      <span className="px-2 py-0.5 bg-[#EAE2E6]/[0.06] text-[#EAE2E6]/60 border border-[#EAE2E6]/10">
                                        {item.selectedColor}
                                      </span>
                                    )}
                                    {item.selectedType && item.subtitle?.toLowerCase().includes('коврик') && (
                                      <span className="px-2 py-0.5 bg-[#EAE2E6]/[0.06] text-[#EAE2E6]/60 border border-[#EAE2E6]/10">
                                        {item.selectedType}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Цена */}
                              <div className="flex items-end justify-between mt-2">
                                <div className="text-xs sm:text-sm text-[#EAE2E6]/40">
                                  ×{item.quantity || 1}
                                </div>
                                <div className="text-base sm:text-lg font-bold text-[#EAE2E6]">
                                  {(parseFloat(item.price?.replace(/[^\d]/g, '') || '0') * (item.quantity || 1))} ₽
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>                {/* Сводка стоимости */}
                    <div className="space-y-3 sm:space-y-4 mt-5 sm:mt-6">
                      {/* Доставка */}
                      {step === 'delivery' && (
                        <div
                          className="flex justify-between items-center text-sm sm:text-base"
                        >
                          <span className="text-[#EAE2E6]/40 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Доставка
                          </span>
                          <span className="font-semibold text-[#EAE2E6]">{getDeliveryPrice()} ₽</span>
                        </div>
                      )}

                      {/* Итого */}
                      <div
                        className="flex justify-between items-center p-4 sm:p-5 bg-[#EAE2E6]/[0.06] border border-[#EAE2E6]/15 transition-transform duration-200 hover:scale-[1.02]"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm text-[#EAE2E6]/50">Итого к оплате</span>
                          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EAE2E6]">
                            {step === 'delivery' ? getSelectedTotal() + getDeliveryPrice() : getSelectedTotal()} ₽
                          </span>
                        </div>
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#EAE2E6]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {step === 'contacts' ? (
                      <div className="flex flex-col gap-3 mt-4 sm:mt-5">
                        {selectedItems.size === 0 && (
                          <div className="bg-[#EAE2E6]/[0.04] border border-[#EAE2E6]/10 p-3 text-center">
                            <p className="text-[#EAE2E6]/50 text-sm font-medium">
                              Выберите хотя бы один товар для оформления
                            </p>
                          </div>
                        )}
                        <Button
                          onClick={handleNextStep}
                          disabled={!isContactFormValid || selectedItems.size === 0}
                          variant="primary"
                          size="lg"
                          fullWidth={true}
                        >
                          Далее
                        </Button>
                        <Button
                          type="button"
                          onClick={() => router.push('/cart')}
                          variant="secondary"
                          size="lg"
                          fullWidth={true}
                        >
                          Вернуться в корзину
                        </Button>
                        {/* DEV: Quick jump to delivery step */}
                        <Button
                          type="button"
                          onClick={() => setStep('delivery')}
                          variant="tertiary"
                          size="sm"
                          fullWidth={true}
                        >
                          [DEV] Перейти к доставке
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 mt-5 sm:mt-6">
                        {selectedItems.size === 0 && (
                          <div className="bg-[#EAE2E6]/[0.04] border border-[#EAE2E6]/10 p-3 text-center">
                            <p className="text-[#EAE2E6]/50 text-sm font-medium">
                              Выберите хотя бы один товар для оформления
                            </p>
                          </div>
                        )}
                        <Button
                          onClick={handleSubmit}
                          disabled={!isDeliveryFormValid() || selectedItems.size === 0}
                          variant="success"
                          size="lg"
                          fullWidth={true}
                        >
                          Оформить заказ
                        </Button>
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="secondary"
                          size="lg"
                          fullWidth={true}
                        >
                          Назад
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Модальное окно с политикой конфиденциальности */}
      {showPolicyModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowPolicyModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#191516] border border-[#EAE2E6]/[0.08] shadow-2xl overflow-hidden"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 sm:p-6 bg-gray-800/90 border-b border-white/10 backdrop-blur-md">
              <h2 className="text-xl sm:text-2xl font-bold text-[#EAE2E6]">
                Политика конфиденциальности
              </h2>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="p-2 hover:bg-[#EAE2E6]/[0.07] transition-colors group"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6 text-[#EAE2E6]/40 group-hover:text-[#EAE2E6] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Контент с прокруткой */}
            <div className="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                <div className="space-y-4 text-[#EAE2E6]/55 leading-relaxed text-sm sm:text-base">
                  <h3 className="text-lg font-bold text-[#EAE2E6]">Согласие на обработку персональных данных</h3>
                  <h3 className="text-lg font-bold text-[#EAE2E6]">Политика в отношении обработки персональных данных</h3>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">1. Общие положения</h4>
                    <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» (далее - Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ИП Осинцевым Юрием Витальевичем (далее – Оператор).</p>
                    <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
                    <p>1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://recrentshop.ru/.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">2. Основные понятия, используемые в Политике</h4>
                    <p>2.1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники.</p>
                    <p>2.2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
                    <p>2.3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://recrentshop.ru/.</p>
                    <p>2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных, и обеспечивающих их обработку информационных технологий и технических средств.</p>
                    <p>2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.</p>
                    <p>2.6. Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
                    <p>2.7. Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</p>
                    <p>2.8. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://recrentshop.ru/.</p>
                    <p>2.9. Персональные данные, разрешенные субъектом персональных данных для распространения, - персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее - персональные данные, разрешенные для распространения).</p>
                    <p>2.10. Пользователь – любой посетитель веб-сайта https://recrentshop.ru/.</p>
                    <p>2.11. Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.</p>
                    <p>2.12. Распространение персональных данных – любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.</p>
                    <p>2.13. Трансграничная передача персональных данных – передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</p>
                    <p>2.14. Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) уничтожаются материальные носители персональных данных.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">3. Основные права и обязанности Оператора</h4>
                    <p>3.1. Оператор имеет право:</p>
                    <p>– получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;</p>
                    <p>– в случае отзыва субъектом персональных данных согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;</p>
                    <p>– самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.</p>
                    <p>3.2. Оператор обязан:</p>
                    <p>– предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;</p>
                    <p>– организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;</p>
                    <p>– отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;</p>
                    <p>– сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 30 дней с даты получения такого запроса;</p>
                    <p>– публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;</p>
                    <p>– принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;</p>
                    <p>– прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;</p>
                    <p>– исполнять иные обязанности, предусмотренные Законом о персональных данных.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">4. Основные права и обязанности субъектов персональных данных</h4>
                    <p>4.1. Субъекты персональных данных имеют право:</p>
                    <p>– получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных;</p>
                    <p>– требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;</p>
                    <p>– выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;</p>
                    <p>– на отзыв согласия на обработку персональных данных;</p>
                    <p>– обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;</p>
                    <p>– на осуществление иных прав, предусмотренных законодательством РФ.</p>
                    <p>4.2. Субъекты персональных данных обязаны:</p>
                    <p>– предоставлять Оператору достоверные данные о себе;</p>
                    <p>– сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.</p>
                    <p>4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">5. Оператор может обрабатывать следующие персональные данные Пользователя</h4>
                    <p>5.1. Фамилия, имя, отчество.</p>
                    <p>5.2. Электронный адрес.</p>
                    <p>5.3. Номера телефонов.</p>
                    <p>5.4. Адрес фактического места проживания и регистрации по месту жительства и (или) по месту пребывания.</p>
                    <p>5.5. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).</p>
                    <p>5.6. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.</p>
                    <p>5.7. Обработка специальных категорий персональных данных, касающихся расовой, национальной принадлежности, политических взглядов, религиозных или философских убеждений, интимной жизни, Оператором не осуществляется.</p>
                    <p>5.8. Обработка персональных данных, разрешенных для распространения, из числа специальных категорий персональных данных, указанных в ч. 1 ст. 10 Закона о персональных данных, допускается, если соблюдаются запреты и условия, предусмотренные ст. 10.1 Закона о персональных данных.</p>
                    <p>5.9. Согласие Пользователя на обработку персональных данных, разрешенных для распространения, оформляется отдельно от других согласий на обработку его персональных данных. При этом соблюдаются условия, предусмотренные, в частности, ст. 10.1 Закона о персональных данных. Требования к содержанию такого согласия устанавливаются уполномоченным органом по защите прав субъектов персональных данных.</p>
                    <p>5.9.1 Согласие на обработку персональных данных, разрешенных для распространения, Пользователь предоставляет Оператору непосредственно.</p>
                    <p>5.9.2 Оператор обязан в срок не позднее трех рабочих дней с момента получения указанного согласия Пользователя опубликовать информацию об условиях обработки, о наличии запретов и условий на обработку неограниченным кругом лиц персональных данных, разрешенных для распространения.</p>
                    <p>5.9.3 Передача (распространение, предоставление, доступ) персональных данных, разрешенных субъектом персональных данных для распространения, должна быть прекращена в любое время по требованию субъекта персональных данных. Данное требование должно включать в себя фамилию, имя, отчество (при наличии), контактную информацию (номер телефона, адрес электронной почты или почтовый адрес) субъекта персональных данных, а также перечень персональных данных, обработка которых подлежит прекращению. Указанные в данном требовании персональные данные могут обрабатываться только Оператором, которому оно направлено.</p>
                    <p>5.9.4 Согласие на обработку персональных данных, разрешенных для распространения, прекращает свое действие с момента поступления Оператору требования, указанного в п. 5.9.3 настоящей Политики в отношении обработки персональных данных.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">6. Принципы обработки персональных данных</h4>
                    <p>6.1. Обработка персональных данных осуществляется на законной и справедливой основе.</p>
                    <p>6.2. Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.</p>
                    <p>6.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.</p>
                    <p>6.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.</p>
                    <p>6.5. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.</p>
                    <p>6.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.</p>
                    <p>6.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">7. Цели обработки персональных данных</h4>
                    <p>7.1. Цель обработки персональных данных Пользователя:</p>
                    <p>– информирование Пользователя посредством отправки электронных писем;</p>
                    <p>– заключение, исполнение и прекращение гражданско-правовых договоров;</p>
                    <p>– предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте https://recrentshop.ru/.</p>
                    <p>7.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты <a href="mailto:info@recrentshop.ru" className="text-[#EAE2E6]/40 hover:text-[#EAE2E6] underline">info@recrentshop.ru</a> с пометкой «Отказ от уведомлений о новых продуктах и услугах и специальных предложениях».</p>
                    <p>7.3. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">8. Правовые основания обработки персональных данных</h4>
                    <p>8.1. Правовыми основаниями обработки персональных данных Оператором являются:</p>
                    <p>– уставные (учредительные) документы Оператора;</p>
                    <p>– договоры, заключаемые между оператором и субъектом персональных данных;</p>
                    <p>– федеральные законы, иные нормативно-правовые акты в сфере защиты персональных данных;</p>
                    <p>– согласия Пользователей на обработку их персональных данных, на обработку персональных данных, разрешенных для распространения.</p>
                    <p>8.2. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте https://recrentshop.ru/ или направленные Оператору посредством электронной почты. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.</p>
                    <p>8.3. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).</p>
                    <p>8.4. Субъект персональных данных самостоятельно принимает решение о предоставлении его персональных данных и дает согласие свободно, своей волей и в своем интересе.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">9. Условия обработки персональных данных</h4>
                    <p>9.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.</p>
                    <p>9.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.</p>
                    <p>9.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.</p>
                    <p>9.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.</p>
                    <p>9.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.</p>
                    <p>9.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее – общедоступные персональные данные).</p>
                    <p>9.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">10. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h4>
                    <p>Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.</p>
                    <p>10.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
                    <p>10.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.</p>
                    <p>10.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора <a href="mailto:info@recrentshop.ru" className="text-[#EAE2E6]/40 hover:text-[#EAE2E6] underline">info@recrentshop.ru</a> с пометкой «Актуализация персональных данных».</p>
                    <p>10.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством.</p>
                    <p>Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора <a href="mailto:info@recrentshop.ru" className="text-[#EAE2E6]/40 hover:text-[#EAE2E6] underline">info@recrentshop.ru</a> с пометкой «Отзыв согласия на обработку персональных данных».</p>
                    <p>10.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Субъект персональных данных и/или Пользователь обязан самостоятельно своевременно ознакомиться с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг.</p>
                    <p>10.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ.</p>
                    <p>10.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.</p>
                    <p>10.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.</p>
                    <p>10.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных или отзыв согласия субъектом персональных данных, а также выявление неправомерной обработки персональных данных.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">11. Перечень действий, производимых Оператором с полученными персональными данными</h4>
                    <p>11.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.</p>
                    <p>11.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">12. Трансграничная передача персональных данных</h4>
                    <p>12.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.</p>
                    <p>12.2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">13. Конфиденциальность персональных данных</h4>
                    <p>Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.</p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-[#EAE2E6]">14. Заключительные положения</h4>
                    <p>14.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты <a href="mailto:info@recrentshop.ru" className="text-[#EAE2E6]/40 hover:text-[#EAE2E6] underline">info@recrentshop.ru</a>.</p>
                    <p>14.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
                    <p>14.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу <a href="https://recrentshop.ru/registraciya/agreement" target="_blank" rel="noopener noreferrer" className="text-[#EAE2E6]/40 hover:text-[#EAE2E6] underline">https://recrentshop.ru/registraciya/agreement</a></p>
                  </section>
                </div>
              </div>
            </div>

            {/* Футер с кнопкой */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 p-5 sm:p-6 bg-gray-800/90 border-t border-white/10 backdrop-blur-md">
              <Button
                onClick={() => setShowPolicyModal(false)}
                variant="secondary"
                size="lg"
              >
                Понятно
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

