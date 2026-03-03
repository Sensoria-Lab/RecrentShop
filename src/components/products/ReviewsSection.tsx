'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import StarRating from '@/src/components/products/StarRating';
import Img from '@/src/components/ui/Img';
import { Review } from '@/src/lib/reviews';
import ImageGalleryModal from '@/src/components/products/ImageGalleryModal';

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  compact?: boolean;
}

/* --- Inline ReviewCard ---- */
const ReviewCard: React.FC<{
  review: Review;
  onOpenGallery: (images: string[], index: number) => void;
}> = ({ review, onOpenGallery }) => {
  const [showAll, setShowAll] = useState(false);
  const photos = review.photos ?? [];
  const visiblePhotos = showAll ? photos : photos.slice(0, 3);
  const hiddenCount = photos.length - 3;

  return (
    <div className="bg-[#191516] p-6 sm:p-7 flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#EAE2E6]/[0.07] border border-[#EAE2E6]/[0.12] flex-shrink-0 flex items-center justify-center font-manrope font-black text-[#EAE2E6]/50 text-base select-none">
          {review.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-manrope font-bold text-[#EAE2E6] text-sm leading-tight truncate">
              {review.author}
            </h3>
            <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/25 flex-shrink-0 pt-px">
              {review.date}
            </span>
          </div>
          <StarRating rating={review.rating} size="xs" showCount={false} />
        </div>
      </div>

      <p className="font-manrope text-[#EAE2E6]/65 text-[13px] leading-[1.8] flex-1">
        {review.text}
      </p>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {visiblePhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => onOpenGallery(photos, i)}
              className="aspect-square overflow-hidden border border-[#EAE2E6]/[0.08] hover:border-[#EAE2E6]/25 transition-all duration-200 group cursor-pointer"
            >
              <Img
                src={photo}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </button>
          ))}
          {hiddenCount > 0 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="aspect-square border border-[#EAE2E6]/[0.08] hover:border-[#EAE2E6]/20 flex items-center justify-center transition-all duration-200 font-jetbrains text-[10px] tracking-[0.12em] text-[#EAE2E6]/30 hover:text-[#EAE2E6]/60"
            >
              +{hiddenCount}
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-4 border-t border-[#EAE2E6]/[0.07]">
        <svg className="w-3 h-3 text-[#EAE2E6]/35 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30">
          Подтверждённая покупка
        </span>
      </div>
    </div>
  );
};

/* --- TrustStat ---- */
const TrustStat: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="flex flex-col p-4 sm:p-5 border border-[#EAE2E6]/[0.07] hover:border-[#EAE2E6]/15 transition-all duration-200">
    <div className="text-[#EAE2E6]/25 mb-3">{icon}</div>
    <div className="font-manrope font-black text-[#EAE2E6] text-2xl sm:text-3xl leading-none mb-1.5 tabular-nums">{value}</div>
    <div className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[#EAE2E6]/30">{label}</div>
  </div>
);

/* --- ReviewsSection ---- */
export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  title = 'Отзывы наших клиентов',
  showViewAll = false,
  onViewAll,
  compact = false,
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const openGallery = (images: string[], index: number) => {
    setGalleryImages(images);
    setSelectedPhotoIndex(index);
    setGalleryOpen(true);
  };

  if (reviews.length === 0) return null;

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  const positivePercent = Math.round((positiveCount / reviews.length) * 100);

  return (
    <section className={compact ? '' : 'relative py-14 md:py-20 lg:py-24 border-b border-[#EAE2E6]/[0.07]'}>
      <div className={compact ? '' : 'px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20'}>
        <div className={compact ? '' : 'max-w-[1400px] mx-auto'}>

          {/* Section header — home page only */}
          {!compact && (
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <h2
                  className="font-manrope font-black text-[#EAE2E6] leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
                >
                  {title}
                </h2>
              </div>
              {showViewAll && (
                <button
                  onClick={onViewAll}
                  className="hidden sm:flex items-center gap-2 font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[#EAE2E6]/35 hover:text-[#EAE2E6] transition-colors duration-200 pb-1 border-b border-[#EAE2E6]/10 hover:border-[#EAE2E6]/40 focus:outline-none"
                >
                  Все отзывы
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Rating summary */}
          <div className="flex items-start gap-8 mb-8 pb-8 border-b border-[#EAE2E6]/[0.07]">
            <div className="flex-shrink-0">
              <div
                className="font-manrope font-black text-[#EAE2E6] tabular-nums leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
              >
                {avgRating.toFixed(1)}
              </div>
              <StarRating rating={avgRating} size="sm" showCount={false} />
              <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[#EAE2E6]/25 mt-2">
                {reviews.length}&nbsp;{reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}
              </p>
            </div>
            <div className="flex-1 space-y-2 py-1">
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="font-jetbrains text-[9px] text-[#EAE2E6]/30 w-2 flex-shrink-0">{star}</span>
                    <div className="flex-1 h-[2px] bg-[#EAE2E6]/[0.08]">
                      <div className="h-full bg-[#EAE2E6]/45 transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-jetbrains text-[9px] text-[#EAE2E6]/20 w-3 text-right flex-shrink-0 tabular-nums">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#EAE2E6]/[0.07]">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} onOpenGallery={openGallery} />
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-[#EAE2E6]/[0.07] pt-8">
            <TrustStat
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>}
              value={`${avgRating.toFixed(1)}/5`}
              label="Средний рейтинг"
            />
            <TrustStat
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              value="150+"
              label="Клиентов"
            />
            <TrustStat
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              value={`${positivePercent}%`}
              label="Положительных"
            />
            <TrustStat
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              value="2–4 дня"
              label="Доставка"
            />
          </div>
        </div>
      </div>

      {galleryOpen && createPortal(
        <ImageGalleryModal
          images={galleryImages}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          initialIndex={selectedPhotoIndex}
        />,
        document.body
      )}
    </section>
  );
};
