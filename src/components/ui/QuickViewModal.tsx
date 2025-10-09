import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import StarRating from '../shared/StarRating';
import Img from '../shared/Img';

export interface QuickViewProduct {
  id: number;
  image: string;
  images?: string[];
  title: string;
  subtitle?: string;
  price: string;
  priceNumeric?: number;
  rating?: number;
  reviewCount?: number;
  category?: 'mousepads' | 'clothing';
  color?: string;
  size?: string;
  sizes?: string[];
  colors?: string[];
  description?: string;
}

interface QuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const toast = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Пожалуйста, выберите размер');
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Пожалуйста, выберите цвет');
      return;
    }

    addItem({
      id: product.id.toString(),
      image: product.image,
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      selectedColor: selectedColor || product.color,
      selectedSize: selectedSize || product.size,
    });

    const productName = product.subtitle ? `${product.title} ${product.subtitle}` : product.title;
    toast.success(`${productName} добавлен в корзину! 🛒`);
    onClose();
  };

  const handleViewFullProduct = () => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const images = product.images || [product.image];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-red-500/80 transition-all duration-200 hover:scale-110 hover:rotate-90"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
          {/* Left side - Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square bg-white/5 rounded-2xl overflow-hidden group">
              <Img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Image navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-blue-500 scale-110'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product info */}
          <div className="flex flex-col space-y-4">
            {/* Title and rating */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {product.title}
              </h2>
              {product.subtitle && (
                <p className="text-lg text-white/70 mb-3">{product.subtitle}</p>
              )}
              
              {product.rating && (
                <div className="flex items-center gap-3">
                  <StarRating rating={product.rating} />
                  {product.reviewCount && (
                    <span className="text-sm text-white/60">
                      ({product.reviewCount} отзывов)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-white">
              {product.price}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-white/80 text-base leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-white/90 font-semibold mb-2">
                  Размер:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-white/90 font-semibold mb-2">
                  Цвет:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 ripple-button"
              >
                Добавить в корзину
              </button>
              <button
                onClick={handleViewFullProduct}
                className="py-3 px-6 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
