import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../shared/PageLayout';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/catalog');
  };

  return (
    <PageLayout>
      <div className="min-h-screen px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Background container */}
          <div className="panel panel-strong pt-8 sm:pt-12 md:pt-16">
            {/* Page Title */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 scroll-fade-in">
              <h1 className="text-white font-manrope font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Корзина
              </h1>
              <div className="w-24 sm:w-32 h-1 bg-white/40 mx-auto"></div>
              <p className="text-base sm:text-lg md:text-xl text-white/70 font-manrope mt-4 sm:mt-6">
                {items.length === 0
                  ? 'Ваша корзина пуста'
                  : `Товаров в корзине: ${items.reduce((sum, item) => sum + item.quantity, 0)}`}
              </p>
            </div>

          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 scroll-fade-in scroll-fade-in-delay-1">
                <div className="panel panel-strong max-w-2xl text-center w-full">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 sm:p-10 md:p-16">
                  <div className="mb-6 sm:mb-8">
                    <svg
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto text-white/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-manrope font-bold text-white mb-3 sm:mb-4">
                    Корзина пуста
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8">
                    Добавьте товары из каталога, чтобы оформить заказ
                  </p>
                  <button onClick={handleContinueShopping} className="btn-primary">
                    Перейти в каталог
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-2 space-y-4 scroll-fade-in scroll-fade-in-delay-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300"
                  >
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>

                    <div className="relative z-10 p-6 flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-32 h-32 bg-white/5 rounded-xl p-2">
                        <Img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-manrope font-bold text-white mb-1">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-white/70 font-manrope mb-2">
                              {item.subtitle}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-white/60">
                            {item.selectedSize && (
                              <span>Размер: {item.selectedSize}</span>
                            )}
                            {item.selectedColor && (
                              <span>Цвет: {item.selectedColor}</span>
                            )}
                            {item.selectedType && (
                              <span>Тип: {item.selectedType}</span>
                            )}
                          </div>
                        </div>

                        {/* Price and Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-2xl font-manrope font-bold text-white">
                            {item.price}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="text-white hover:text-white/70 font-bold text-xl transition-colors w-8 h-8 flex items-center justify-center"
                              >
                                −
                              </button>
                              <span className="text-white font-manrope font-semibold text-lg min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="text-white hover:text-white/70 font-bold text-xl transition-colors w-8 h-8 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-2"
                              title="Удалить товар"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - Right Column */}
              <div className="lg:col-span-1 scroll-fade-in scroll-fade-in-delay-2">
                <div className="relative rounded-2xl sticky top-24 bg-white/5 backdrop-blur-sm border border-white/10">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 p-8">
                    <h2 className="text-3xl font-manrope font-bold text-white mb-8">
                      Итого
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div className="flex justify-between text-white/70 text-lg">
                        <span className="font-manrope">Товары:</span>
                        <span className="font-manrope font-semibold">
                          {items.reduce((sum, item) => sum + item.quantity, 0)} шт
                        </span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex justify-between text-white text-2xl">
                        <span className="font-manrope font-bold">Сумма:</span>
                        <span className="font-manrope font-extrabold">
                          {getTotalPrice()} р.
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleCheckout}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-manrope font-semibold text-xl rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                      >
                        Оформить заказ
                      </button>

                      <button
                        onClick={handleContinueShopping}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-manrope font-medium text-lg rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
                      >
                        Продолжить покупки
                      </button>

                      <button
                        onClick={clearCart}
                        className="w-full py-3 text-red-400 hover:text-red-300 font-manrope font-medium text-base transition-colors border border-red-400/20 hover:border-red-400/40 rounded-xl hover:bg-red-500/5"
                      >
                        Очистить корзину
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
