import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import Img from '../../../shared/ui/Img';
import { Review } from '../../../core/data/reviews';

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  title = 'Отзывы наших клиентов',
  showViewAll = false,
  onViewAll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 content-reveal">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                {title}
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                Реальные впечатления от покупателей
              </p>
            </div>
            {showViewAll && (
              <button
                onClick={onViewAll}
                className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-sm font-semibold">Все отзывы</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Reviews Slider */}
          <div className="relative scroll-fade-in scroll-fade-in-delay-1">
            {/* Main Review Card */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ReviewCard review={reviews[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Previous review"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Next review"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {reviews.length > 1 && (
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <TrustIndicator
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              }
              value="3.7/5"
              label="Средний рейтинг"
            />
            <TrustIndicator
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              value="150+"
              label="Довольных клиентов"
            />
            <TrustIndicator
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              value="85%"
              label="Положительных отзывов"
            />
            <TrustIndicator
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              value="2-4 дня"
              label="Средняя доставка"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Review Card Component
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const visiblePhotos = showAllPhotos ? review.photos : review.photos?.slice(0, 3);

  // Debug: log photos on mount
  useEffect(() => {
    console.log('Review photos:', review.author, review.photos);
  }, [review.author, review.photos]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left: Author Info & Rating */}
        <div className="flex-shrink-0">
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
              {review.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                {review.author}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-white/60 text-sm font-semibold">
                  {review.rating}.0
                </span>
              </div>
              <p className="text-white/50 text-xs sm:text-sm">{review.date}</p>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-400 text-xs sm:text-sm font-semibold">
              Подтвержденная покупка
            </span>
          </div>
        </div>

        {/* Right: Review Content */}
        <div className="flex-1">
          {/* Review Text */}
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6">
            {review.text}
          </p>

          {/* Photos */}
          {review.photos && review.photos.length > 0 && (
            <div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {visiblePhotos?.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-200 group cursor-pointer"
                  >
                    <Img
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error('Failed to load image:', photo, e);
                        // Show fallback
                        target.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))';
                        target.alt = '❌';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  </div>
                ))}
              </div>
              {review.photos.length > 3 && !showAllPhotos && (
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200"
                >
                  + Показать еще {review.photos.length - 3} фото
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Trust Indicator Component
const TrustIndicator: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
}> = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/8 transition-all duration-300 group">
      <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl font-black text-white mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-white/60 font-medium">{label}</div>
    </div>
  );
};
