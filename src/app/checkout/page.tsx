'use client';

import React, { useEffect, useMemo, useState, useSyncExternalStore, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import { useCart } from '@/src/context/CartContext';
import { CheckoutPageSkeleton } from '@/src/components/layout/Skeletons';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import Img from '@/src/components/ui/Img';
import { z } from 'zod';
import { EASE_EDITORIAL } from '@/src/components/animations';

type DeliveryMethod = 'russian-post' | 'cdek' | 'home-delivery';
type Step = 'contacts' | 'delivery';

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

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cart } = useCart();
  const [step, setStep] = useState<Step>('contacts');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [unselectedItems, setUnselectedItems] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const selectedItems = useMemo(() => {
    return new Set(cart.filter((item) => !unselectedItems.has(item.id)).map((item) => item.id));
  }, [cart, unselectedItems]);

  // Load saved form data
  const [contactForm, setContactForm] = useState<ContactFormData>(() => {
    if (typeof window === 'undefined') {
      return { fullName: '', phone: '', email: '', vkLink: '', additionalInfo: '' };
    }
    const saved = localStorage.getItem('checkoutContactForm');
    if (!saved) return { fullName: '', phone: '', email: '', vkLink: '', additionalInfo: '' };
    try { return JSON.parse(saved); } catch { return { fullName: '', phone: '', email: '', vkLink: '', additionalInfo: '' }; }
  });

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>(() => {
    if (typeof window === 'undefined') {
      return { method: 'russian-post', address: '', city: '', postalCode: '', withInsurance: false };
    }
    const saved = localStorage.getItem('checkoutDeliveryForm');
    if (!saved) return { method: 'russian-post', address: '', city: '', postalCode: '', withInsurance: false };
    try { return JSON.parse(saved); } catch { return { method: 'russian-post', address: '', city: '', postalCode: '', withInsurance: false }; }
  });

  const [agreeToPolicy, setAgreeToPolicy] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('checkoutAgreeToPolicy') === 'true';
  });

  // Save forms to localStorage
  useEffect(() => { localStorage.setItem('checkoutContactForm', JSON.stringify(contactForm)); }, [contactForm]);
  useEffect(() => { localStorage.setItem('checkoutDeliveryForm', JSON.stringify(deliveryForm)); }, [deliveryForm]);
  useEffect(() => { localStorage.setItem('checkoutAgreeToPolicy', String(agreeToPolicy)); }, [agreeToPolicy]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) router.push('/cart');
  }, [cart, router]);

  // Entrance animations
  useEffect(() => {
    if (!headerRef.current || !formRef.current || !summaryRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE_EDITORIAL }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE_EDITORIAL, delay: 0.1 }
      );
      gsap.fromTo(summaryRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE_EDITORIAL, delay: 0.2 }
      );
    });
    
    return () => ctx.revert();
  }, []);

  const toggleItemSelection = (itemId: string) => {
    setUnselectedItems(prev => {
      const newSet = new Set(prev);
      if (selectedItems.has(itemId)) newSet.add(itemId);
      else newSet.delete(itemId);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cart.length) {
      setUnselectedItems(new Set(cart.map(item => item.id)));
    } else {
      setUnselectedItems(new Set());
    }
  };

  const getSelectedTotal = () => {
    return cart
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => {
        const price = parseFloat(item.price?.replace(/[^\d]/g, '') || '0');
        return sum + (price * (item.quantity || 1));
      }, 0);
  };

  const isContactFormValid = contactForm.fullName.trim() !== '' && 
    contactForm.phone.trim() !== '' && 
    contactForm.email.trim() !== '' && 
    agreeToPolicy;

  const isDeliveryFormValid = () => {
    return deliveryForm.city.trim() !== '' && 
      deliveryForm.address.trim() !== '' && 
      deliveryForm.postalCode.trim() !== '';
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

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    if (contactErrors[name]) {
      setContactErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; });
    }
  };

  const handleDeliveryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    const result = contactSchema.safeParse(contactForm);
    if (!agreeToPolicy) {
      alert('Необходимо согласие с политикой конфиденциальности');
      return;
    }
    if (result.success) {
      setContactErrors({});
      setIsAnimating(true);
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.2,
          onComplete: () => {
            setStep('delivery');
            setTimeout(() => {
              if (formRef.current) {
                gsap.fromTo(formRef.current,
                  { opacity: 0, x: 20 },
                  { opacity: 1, x: 0, duration: 0.3, ease: EASE_EDITORIAL, onComplete: () => setIsAnimating(false) }
                );
              }
            }, 50);
          }
        });
      }
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errors[issue.path[0].toString()] = issue.message;
      });
      setContactErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setIsAnimating(true);
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.2,
        onComplete: () => {
          setStep('contacts');
          setTimeout(() => {
            if (formRef.current) {
              gsap.fromTo(formRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, ease: EASE_EDITORIAL, onComplete: () => setIsAnimating(false) }
              );
            }
          }, 50);
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = deliverySchema.safeParse(deliveryForm);
    if (result.success) {
      console.log('Order submitted:', { contactForm, deliveryForm, cart });
      localStorage.removeItem('checkoutContactForm');
      localStorage.removeItem('checkoutDeliveryForm');
      localStorage.removeItem('checkoutAgreeToPolicy');
      alert('Заказ успешно оформлен!');
      router.push('/');
    }
  };

  const deliveryMethods = [
    { id: 'russian-post' as DeliveryMethod, name: 'Почта России', description: 'Доставка по всей России', priceWithInsurance: 624, priceWithoutInsurance: 473 },
    { id: 'cdek' as DeliveryMethod, name: 'СДЭК', description: 'Быстрая доставка в пункт выдачи', priceWithInsurance: 345, priceWithoutInsurance: 293 },
    { id: 'home-delivery' as DeliveryMethod, name: 'Доставка на дом', description: 'Курьерская доставка СДЭК', priceWithInsurance: 633, priceWithoutInsurance: 581 },
  ];

  const isClient = useSyncExternalStore(() => () => {}, () => true, () => false);

  if (!isClient) return <CheckoutPageSkeleton />;
  if (cart.length === 0) return null;

  return (
    <div className="relative min-h-screen w-full bg-[var(--rc-bg)]">
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-6 sm:pt-8 md:pt-10 pb-24 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div ref={headerRef} className="mb-8 md:mb-12">
              <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-3">
                ─── Оформление
              </p>
              <h1 className="font-manrope font-black text-[var(--rc-fg)] leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
                Checkout
              </h1>
            </div>

            <div className="grid lg:grid-cols-[1fr_420px] gap-6 md:gap-8 lg:gap-12">
              {/* Left Column - Form */}
              <div ref={formRef} className="relative">
                {step === 'contacts' ? (
                  /* Step 1: Contact Information */
                  <div className="border border-[var(--rc-border)] bg-[var(--rc-bg-deep)]">
                    {/* Section Header */}
                    <div className="px-5 sm:px-6 md:px-8 py-5 border-b border-[var(--rc-border)]">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] flex items-center justify-center">
                          <span className="font-jetbrains text-[10px] tracking-[0.2em] text-[var(--rc-fg-muted)]">01</span>
                        </div>
                        <div>
                          <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-1">
                            Шаг 1
                          </p>
                          <h2 className="font-manrope font-bold text-[var(--rc-fg)] text-lg sm:text-xl md:text-2xl">
                            Контактная информация
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Form Content */}
                    <div className="px-5 sm:px-6 md:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                          ФИО <span className="text-[var(--rc-fg-subtle)]">*</span>
                        </label>
                        <Input
                          type="text"
                          name="fullName"
                          value={contactForm.fullName}
                          onChange={handleContactInputChange}
                          errorMessage={contactErrors.fullName}
                          className="w-full"
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>

                      {/* Phone & Email Row */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                            Телефон <span className="text-[var(--rc-fg-subtle)]">*</span>
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactInputChange}
                            errorMessage={contactErrors.phone}
                            className="w-full"
                            placeholder="+7 (999) 123-45-67"
                          />
                        </div>
                        <div>
                          <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                            Email <span className="text-[var(--rc-fg-subtle)]">*</span>
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactInputChange}
                            errorMessage={contactErrors.email}
                            className="w-full"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      {/* VK Link */}
                      <div>
                        <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                          Ссылка на VK <span className="text-[var(--rc-fg-subtle)]">(необязательно)</span>
                        </label>
                        <Input
                          type="text"
                          name="vkLink"
                          value={contactForm.vkLink}
                          onChange={handleContactInputChange}
                          className="w-full"
                          placeholder="https://vk.com/username"
                        />
                      </div>

                      {/* Additional Info */}
                      <div>
                        <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                          Комментарий <span className="text-[var(--rc-fg-subtle)]">(необязательно)</span>
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={contactForm.additionalInfo}
                          onChange={handleContactInputChange}
                          rows={3}
                          className="w-full border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] px-3 py-2 text-sm text-[var(--rc-fg)] placeholder:text-[var(--rc-fg-subtle)] focus:outline-none focus:border-[var(--rc-border)] resize-none transition-colors duration-200"
                          placeholder="Комментарии к заказу..."
                        />
                      </div>

                      {/* Privacy Policy Checkbox */}
                      <div className="pt-4 border-t border-[var(--rc-border)]">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex-shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={agreeToPolicy}
                              onChange={(e) => setAgreeToPolicy(e.target.checked)}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] peer-checked:bg-[var(--rc-bg-invert)] peer-checked:border-[var(--rc-border-hover)] transition-colors duration-200">
                              {agreeToPolicy && (
                                <svg className="w-3 h-3 text-[var(--rc-bg-invert)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-muted)] group-hover:text-[var(--rc-fg)] transition-colors">
                            Я согласен с{' '}
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); setShowPolicyModal(true); }}
                              className="text-[var(--rc-fg)] hover:text-[var(--rc-fg)] underline underline-offset-2 transition-colors"
                            >
                              политикой конфиденциальности
                            </button>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Step 2: Delivery Method */
                  <div className="border border-[var(--rc-border)] bg-[var(--rc-bg-deep)]">
                    {/* Section Header */}
                    <div className="px-5 sm:px-6 md:px-8 py-5 border-b border-[var(--rc-border)]">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] flex items-center justify-center">
                          <span className="font-jetbrains text-[10px] tracking-[0.2em] text-[var(--rc-fg-muted)]">02</span>
                        </div>
                        <div>
                          <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-1">
                            Шаг 2
                          </p>
                          <h2 className="font-manrope font-bold text-[var(--rc-fg)] text-lg sm:text-xl md:text-2xl">
                            Способ доставки
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Methods */}
                    <div className="px-5 sm:px-6 md:px-8 py-6 sm:py-8 space-y-4">
                      {deliveryMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setDeliveryForm(prev => ({ ...prev, method: method.id }))}
                          className={`border p-4 sm:p-5 cursor-pointer transition-all duration-200 ${
                            deliveryForm.method === method.id
                              ? 'border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]'
                              : 'border-[var(--rc-border)] bg-transparent hover:border-[var(--rc-border)] hover:bg-[var(--rc-fg-ghost)]'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Radio indicator */}
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={`w-4 h-4 border transition-colors duration-200 ${
                                deliveryForm.method === method.id
                                  ? 'border-[var(--rc-border-hover)] bg-[var(--rc-bg-invert)]'
                                  : 'border-[var(--rc-border)] bg-transparent'
                              }`}>
                                {deliveryForm.method === method.id && (
                                  <svg className="w-2.5 h-2.5 text-[var(--rc-bg-invert)] m-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                  </svg>
                                )}
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-4 mb-1">
                                <h3 className={`font-manrope font-bold text-sm sm:text-base transition-colors ${
                                  deliveryForm.method === method.id ? 'text-[var(--rc-fg)]' : 'text-[var(--rc-fg)]'
                                }`}>
                                  {method.name}
                                </h3>
                                <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">
                                  от {method.priceWithoutInsurance} ₽
                                </span>
                              </div>
                              <p className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">
                                {method.description}
                              </p>

                              {/* Insurance option (only when selected) */}
                              {deliveryForm.method === method.id && (
                                <div className="mt-4 pt-4 border-t border-[var(--rc-border)]">
                                  <label className="flex items-start gap-3 cursor-pointer">
                                    <div className="relative flex-shrink-0 mt-0.5">
                                      <input
                                        type="checkbox"
                                        checked={deliveryForm.withInsurance}
                                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, withInsurance: e.target.checked }))}
                                        onClick={(e) => e.stopPropagation()}
                                        className="peer sr-only"
                                      />
                                      <div className="w-4 h-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] peer-checked:bg-[var(--rc-bg-invert)] peer-checked:border-[var(--rc-border-hover)] transition-colors duration-200">
                                        {deliveryForm.withInsurance && (
                                          <svg className="w-2.5 h-2.5 text-[var(--rc-bg-invert)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
                                        Страховка (+{method.priceWithInsurance - method.priceWithoutInsurance} ₽)
                                      </span>
                                      <span className="block font-jetbrains text-[9px] tracking-[0.08em] text-[var(--rc-fg-subtle)] mt-0.5">
                                        {deliveryForm.withInsurance ? 'Посылка застрахована' : 'Без страховки'}
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Address Fields */}
                      <div className="pt-6 border-t border-[var(--rc-border)] space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                              Город <span className="text-[var(--rc-fg-subtle)]">*</span>
                            </label>
                            <Input
                              type="text"
                              name="city"
                              value={deliveryForm.city}
                              onChange={handleDeliveryInputChange}
                              className="w-full"
                              placeholder="Москва"
                            />
                          </div>
                          <div>
                            <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                              Индекс <span className="text-[var(--rc-fg-subtle)]">*</span>
                            </label>
                            <Input
                              type="text"
                              name="postalCode"
                              value={deliveryForm.postalCode}
                              onChange={handleDeliveryInputChange}
                              className="w-full"
                              placeholder="123456"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)] mb-2">
                            Адрес доставки <span className="text-[var(--rc-fg-subtle)]">*</span>
                          </label>
                          <textarea
                            name="address"
                            value={deliveryForm.address}
                            onChange={handleDeliveryInputChange}
                            rows={3}
                            className="w-full border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] px-3 py-2 text-sm text-[var(--rc-fg)] placeholder:text-[var(--rc-fg-subtle)] focus:outline-none focus:border-[var(--rc-border)] resize-none transition-colors duration-200"
                            placeholder="Улица, дом, квартира"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div ref={summaryRef} className="lg:sticky lg:top-28 h-fit">
                <div className="border border-[var(--rc-border)] bg-[var(--rc-bg-deep)]">
                  {/* Header */}
                  <div className="px-5 sm:px-6 py-5 border-b border-[var(--rc-border)]">
                    <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-1.5">
                      ─── Сводка
                    </p>
                    <h2 className="font-manrope font-black text-[var(--rc-fg)] text-xl sm:text-2xl leading-[0.9] tracking-tight">
                      Ваш заказ
                    </h2>
                  </div>

                  {/* Select All */}
                  <div className="px-5 sm:px-6 py-4 border-b border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedItems.size === cart.length && cart.length > 0}
                          onChange={toggleSelectAll}
                          className="peer sr-only"
                        />
                        <div className="w-4 h-4 border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] peer-checked:bg-[var(--rc-bg-invert)] peer-checked:border-[var(--rc-border-hover)] transition-colors duration-200">
                          {selectedItems.size === cart.length && cart.length > 0 && (
                            <svg className="w-2.5 h-2.5 text-[var(--rc-bg-invert)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="font-jetbrains text-[10px] tracking-[0.12em] uppercase text-[var(--rc-fg-secondary)] group-hover:text-[var(--rc-fg)] transition-colors">
                        Выбрать все ({cart.length})
                      </span>
                    </label>
                  </div>

                  {/* Items List */}
                  <div className="max-h-[280px] sm:max-h-[320px] overflow-y-auto px-5 sm:px-6 py-4 space-y-3 custom-scrollbar">
                    {cart.map((item) => (
                      <div 
                        key={item.id}
                        className={`flex gap-3 p-3 border transition-all duration-200 ${
                          selectedItems.has(item.id)
                            ? 'border-[var(--rc-border)] bg-[var(--rc-fg-ghost)]'
                            : 'border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] opacity-50'
                        }`}
                      >
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <div 
                            onClick={() => toggleItemSelection(item.id)}
                            className="cursor-pointer"
                          >
                            <div className={`w-4 h-4 border transition-colors duration-200 ${
                              selectedItems.has(item.id)
                                ? 'border-[var(--rc-border-hover)] bg-[var(--rc-bg-invert)]'
                                : 'border-[var(--rc-border)] bg-transparent'
                            }`}>
                              {selectedItems.has(item.id) && (
                                <svg className="w-2.5 h-2.5 text-[var(--rc-bg-invert)] m-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0">
                          <Img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-[var(--rc-border)]"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-manrope font-semibold text-[var(--rc-fg)] text-sm leading-tight line-clamp-2 mb-1">
                            {item.title}
                          </h3>
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.selectedSize && (
                                <span className="font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5 bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] border border-[var(--rc-border)]">
                                  {item.selectedSize}
                                </span>
                              )}
                              {item.selectedColor && (
                                <span className="font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5 bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] border border-[var(--rc-border)]">
                                  {item.selectedColor}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">
                              ×{item.quantity || 1}
                            </span>
                            <span className="font-manrope font-bold text-[var(--rc-fg)] text-sm">
                              {(parseFloat(item.price?.replace(/[^\d]/g, '') || '0') * (item.quantity || 1))} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="px-5 sm:px-6 py-5 border-t border-[var(--rc-border)] space-y-3">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                        Товары ({selectedItems.size})
                      </span>
                      <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
                        {getSelectedTotal()} ₽
                      </span>
                    </div>

                    {/* Delivery */}
                    {step === 'delivery' && (
                      <div className="flex items-center justify-between">
                        <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                          Доставка
                        </span>
                        <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
                          {getDeliveryPrice()} ₽
                        </span>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-[var(--rc-fg-ghost)] my-4" />

                    {/* Total */}
                    <div className="flex items-end justify-between">
                      <span className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)]">
                        Итого
                      </span>
                      <span className="font-manrope font-black text-[var(--rc-fg)] text-2xl sm:text-3xl leading-none">
                        {step === 'delivery' ? getSelectedTotal() + getDeliveryPrice() : getSelectedTotal()} ₽
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 sm:px-6 py-5 border-t border-[var(--rc-border)] space-y-3">
                    {selectedItems.size === 0 && (
                      <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-3 text-center mb-3">
                        <p className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">
                          Выберите хотя бы один товар
                        </p>
                      </div>
                    )}

                    {step === 'contacts' ? (
                      <>
                        <Button
                          onClick={handleNextStep}
                          disabled={!isContactFormValid || selectedItems.size === 0 || isAnimating}
                          variant="primary"
                          size="lg"
                          fullWidth
                        >
                          Продолжить
                        </Button>
                        <Button
                          onClick={() => router.push('/cart')}
                          variant="outline"
                          size="md"
                          fullWidth
                        >
                          Вернуться в корзину
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={handleSubmit}
                          disabled={!isDeliveryFormValid() || selectedItems.size === 0 || isAnimating}
                          variant="primary"
                          size="lg"
                          fullWidth
                        >
                          Оформить заказ
                        </Button>
                        <Button
                          onClick={handlePrevStep}
                          variant="outline"
                          size="md"
                          fullWidth
                          disabled={isAnimating}
                        >
                          Назад
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Privacy Policy Modal */}
      {showPolicyModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[var(--rc-bg)]/95 animate-fadeIn"
          onClick={() => setShowPolicyModal(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] bg-[var(--rc-bg-deep)] border border-[var(--rc-border)] overflow-hidden flex flex-col animate-slideUp"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--rc-border)] bg-[var(--rc-bg)]">
              <div>
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-1">
                  Документ
                </p>
                <h2 className="font-manrope font-bold text-[var(--rc-fg)] text-lg sm:text-xl">
                  Политика конфиденциальности
                </h2>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="w-10 h-10 flex items-center justify-center border border-[var(--rc-border)] hover:border-[var(--rc-border)] hover:bg-[var(--rc-fg-ghost)] transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5 text-[var(--rc-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-6 text-[var(--rc-fg-secondary)] font-manrope text-sm leading-relaxed">
                <section>
                  <h3 className="font-manrope font-bold text-[var(--rc-fg)] mb-3">1. Общие положения</h3>
                  <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных».</p>
                </section>
                
                <section>
                  <h3 className="font-manrope font-bold text-[var(--rc-fg)] mb-3">2. Основные понятия</h3>
                  <p>Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта.</p>
                </section>

                <section>
                  <h3 className="font-manrope font-bold text-[var(--rc-fg)] mb-3">3. Права и обязанности</h3>
                  <p>Оператор обязан обеспечивать сохранность персональных данных и принимать все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
                </section>

                <section>
                  <h3 className="font-manrope font-bold text-[var(--rc-fg)] mb-3">4. Обработка данных</h3>
                  <p>Обработка персональных данных осуществляется на законной и справедливой основе, ограничивается достижением конкретных, заранее определенных и законных целей.</p>
                </section>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[var(--rc-border)] bg-[var(--rc-bg)]">
              <Button onClick={() => setShowPolicyModal(false)} variant="secondary" size="md">
                Понятно
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
