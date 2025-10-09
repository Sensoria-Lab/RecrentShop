import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon, 
  route,
  gradient 
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover-lift"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Title */}
        <h3 className="text-white font-manrope font-bold text-xl mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/70 text-sm mb-4">
          {description}
        </p>
        
        {/* Arrow */}
        <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
          <span className="text-sm font-medium mr-2">Перейти</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
