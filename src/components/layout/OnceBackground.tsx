'use client';

import React from 'react';

const OnceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--rc-bg)] transition-colors duration-300" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--rc-bg)]/60" />
    </div>
  );
};

export default OnceBackground;
