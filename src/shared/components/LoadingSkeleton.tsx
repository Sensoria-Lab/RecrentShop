import React from 'react';

// Простой скелет для загрузки страниц (используется в Suspense fallback)
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="flex flex-col gap-6 w-full max-w-4xl px-8 animate-pulse">
        <div className="h-10 w-2/3 bg-white/10 rounded" />
        <div className="h-6 w-1/2 bg-white/10 rounded" />
        <div className="grid grid-cols-3 gap-6 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-white/5 rounded-xl" />
          ))}
        </div>
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-5/6 bg-white/5 rounded" />
        <div className="h-4 w-4/6 bg-white/5 rounded" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
