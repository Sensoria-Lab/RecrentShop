/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f5f5f5',
  				'100': '#ebebeb',
  				'200': '#d4d4d4',
  				'300': '#b3b3b3',
  				'400': '#8a8a8a',
  				'500': '#6b6b6b',
  				'600': '#191516',
  				'700': '#0f0d0e',
  				'800': '#0a0909',
  				'900': '#050505',
  				DEFAULT: '#191516'
  			},
  			secondary: {
  				'50': '#fafafa',
  				'100': '#f5f5f5',
  				'200': '#e5e5e5',
  				'300': '#d4d4d4',
  				'400': '#a3a3a3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717',
  				DEFAULT: '#737373'
  			},
  			background: {
  				DEFAULT: 'var(--rc-bg)',
  				elevated: 'var(--rc-bg-elevated)',
  				deep: 'var(--rc-bg-deep)'
  			},
  			foreground: {
  				DEFAULT: 'var(--rc-fg)',
  				secondary: 'var(--rc-fg-secondary)',
  				muted: 'var(--rc-fg-muted)',
  				subtle: 'var(--rc-fg-subtle)'
  			},
  			border: {
  				DEFAULT: 'var(--rc-border)',
  				hover: 'var(--rc-border-hover)',
  				strong: 'var(--rc-border-strong)'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			],
  			manrope: [
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			],
  			jetbrains: [
  				'JetBrains Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		keyframes: {
  			// Shadcn-style animations - smooth and subtle
  			'fade-in': {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'fade-out': {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			'zoom-in': {
  				from: {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'zoom-out': {
  				from: {
  					opacity: '1',
  					transform: 'scale(1)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				}
  			},
  			'slide-in-from-top': {
  				from: {
  					transform: 'translateY(-8px)'
  				},
  				to: {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-bottom': {
  				from: {
  					transform: 'translateY(8px)'
  				},
  				to: {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-left': {
  				from: {
  					transform: 'translateX(-8px)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right': {
  				from: {
  					transform: 'translateX(8px)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-out-to-top': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(-8px)'
  				}
  			},
  			'slide-out-to-bottom': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(8px)'
  				}
  			},
  			'slide-out-to-left': {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-8px)'
  				}
  			},
  			'slide-out-to-right': {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(8px)'
  				}
  			},
  			'gradient-shift': {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			},
  			gradientFlow: {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			},
  			'beam-slide-1': {
  				'0%': {
  					strokeDashoffset: '2000',
  					opacity: '0'
  				},
  				'10%': {
  					opacity: '1'
  				},
  				'50%': {
  					strokeDashoffset: '0',
  					opacity: '1'
  				},
  				'90%': {
  					opacity: '1'
  				},
  				'100%': {
  					strokeDashoffset: '-2000',
  					opacity: '0'
  				}
  			},
  			'beam-slide-2': {
  				'0%': {
  					strokeDashoffset: '2200',
  					opacity: '0'
  				},
  				'15%': {
  					opacity: '1'
  				},
  				'50%': {
  					strokeDashoffset: '0',
  					opacity: '1'
  				},
  				'85%': {
  					opacity: '1'
  				},
  				'100%': {
  					strokeDashoffset: '-2200',
  					opacity: '0'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			shimmerSlide: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'slide-in-right': {
  				from: {
  					transform: 'translateX(400px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(234, 226, 230, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(234, 226, 230, 0.6)'
  				}
  			},
  			'bounce-subtle': {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				}
  			},
  			ripple: {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(4)',
  					opacity: '0'
  				}
  			},
  			badgePulse: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)'
  				},
  				'50%': {
  					transform: 'scale(1.1)',
  					boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)'
  				}
  			},
  			microPulse: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.05)',
  					opacity: '0.9'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			// Shadcn-style animations with proper timing
  			'fade-in': 'fade-in 0.2s ease-out',
  			'fade-out': 'fade-out 0.2s ease-in',
  			'zoom-in': 'zoom-in 0.3s ease-out',
  			'zoom-out': 'zoom-out 0.2s ease-in',
  			'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
  			'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
  			'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
  			'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
  			'slide-out-to-top': 'slide-out-to-top 0.2s ease-in',
  			'slide-out-to-bottom': 'slide-out-to-bottom 0.2s ease-in',
  			'slide-out-to-left': 'slide-out-to-left 0.2s ease-in',
  			'slide-out-to-right': 'slide-out-to-right 0.2s ease-in',
  			// Keep existing background animations
  			'gradient-shift': 'gradient-shift 3s ease infinite',
  			'gradient-flow': 'gradientFlow 15s ease infinite',
  			'beam-slide-1': 'beam-slide-1 8s ease-in-out infinite',
  			'beam-slide-2': 'beam-slide-2 9s ease-in-out infinite',
  			shimmer: 'shimmer 2s ease-in-out',
  			'shimmer-slide': 'shimmerSlide 2s infinite',
  			float: 'float 3s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
  			ripple: 'ripple 0.6s ease-out',
  			'badge-pulse': 'badgePulse 2s ease-in-out infinite',
  			'micro-pulse': 'microPulse 2s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Performance optimizations for production
  future: {
    hoverOnlyWhenSupported: true, // Only apply hover styles on devices that support hover
  },
}