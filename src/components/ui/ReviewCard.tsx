import React from 'react';
import StarRating from '../shared/StarRating';
import Img from '../shared/Img';
import { Review } from '../../data/reviews';

interface ReviewCardProps {
  review: Review;
  onPhotoClick?: (photos: string[], index: number) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onPhotoClick }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/10">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <h4 className="text-white font-manrope font-semibold text-sm sm:text-base">
          {review.author}
        </h4>
        <StarRating rating={review.rating} />
      </div>
      
      <p className="text-white/90 font-manrope font-normal text-xs sm:text-sm mb-3 leading-relaxed">
        {review.text}
      </p>
      
      <div className="flex justify-between items-end">
        {/* Review Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-1.5 sm:gap-2">
            {review.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => onPhotoClick?.(review.photos || [], index)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105 cursor-pointer group relative"
              >
                <Img
                  src={photo}
                  alt={`Фото отзыва ${review.author} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Если изображение не загрузилось, показываем заглушку
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))';
                    }
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
        
        <span className="text-white/70 font-manrope font-normal text-xs sm:text-sm">
          {review.date}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
