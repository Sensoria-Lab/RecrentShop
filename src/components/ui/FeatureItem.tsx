import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover-lift">
      {/* Icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-white font-manrope font-bold text-lg mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-white/70 text-sm">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;
