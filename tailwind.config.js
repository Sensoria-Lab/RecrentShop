/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Scroll animations
        scrollFadeIn: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        // Card animations
        cardFadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        // Background animations
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        // Beam animations
        'beam-slide-1': {
          '0%': { strokeDashoffset: '2000', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { strokeDashoffset: '0', opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { strokeDashoffset: '-2000', opacity: '0' }
        },
        'beam-slide-2': {
          '0%': { strokeDashoffset: '2200', opacity: '0' },
          '15%': { opacity: '1' },
          '50%': { strokeDashoffset: '0', opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { strokeDashoffset: '-2200', opacity: '0' }
        },
        // UI animations
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        shimmerSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slide-in-right': {
          'from': { transform: 'translateX(400px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' }
        },
        // Hover effects
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' }
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        // Badge animations
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '50%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' }
        },
        microPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' }
        }
      },
      animation: {
        // Scroll animations
        'scroll-fade-in': 'scrollFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.55s cubic-bezier(0.4,0.1,0.2,1) both',
        // Card animations
        'card-fade-in-up': 'cardFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        // Background animations
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'gradient-flow': 'gradientFlow 15s ease infinite',
        // Beam animations
        'beam-slide-1': 'beam-slide-1 8s ease-in-out infinite',
        'beam-slide-2': 'beam-slide-2 9s ease-in-out infinite',
        // UI animations
        'shimmer': 'shimmer 2s ease-in-out',
        'shimmer-slide': 'shimmerSlide 2s infinite',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        // Hover effects
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        // Badge animations
        'badge-pulse': 'badgePulse 2s ease-in-out infinite',
        'micro-pulse': 'microPulse 2s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Performance optimizations for production
  future: {
    hoverOnlyWhenSupported: true, // Only apply hover styles on devices that support hover
  },
}