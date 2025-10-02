/**
 * SVG Icons Collection
 * Централизованное хранилище всех иконок проекта
 */

import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

// Email icon
export const EmailIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// Phone icon
export const PhoneIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// VK icon
export const VKIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.31 14.93c-.23.26-.48.47-.73.65-.61.43-1.2.65-1.67.65-.31 0-.56-.09-.76-.27-.36-.33-.49-.9-.49-1.55 0-.28.02-.58.05-.9-1.16.08-2.25-.36-3.39-1.22-.94-.71-1.84-1.73-2.54-2.86-.41.67-.87 1.33-1.37 1.93-.83.99-1.61 1.64-2.18 1.84-.14.05-.27.07-.39.07-.39 0-.68-.21-.87-.63-.14-.31-.21-.72-.21-1.22 0-.85.19-1.92.52-3.05.26-.89.6-1.77.99-2.56.13-.26.36-.39.66-.39.22 0 .45.08.67.23.47.32.71.82.71 1.49 0 .11-.01.23-.03.36 1.06-.22 2.15.02 3.22.71.94.61 1.81 1.53 2.48 2.61.36-.54.76-1.07 1.21-1.56.83-.91 1.63-1.48 2.23-1.59.11-.02.22-.03.32-.03.45 0 .79.18 1.03.55.17.26.26.6.26 1.01 0 .13-.01.27-.03.42-.14.95-.53 2.02-1.13 3.05-.5.86-1.08 1.65-1.7 2.32z"/>
  </svg>
);

// Telegram icon
export const TelegramIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

// WhatsApp icon
export const WhatsAppIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Box/Package icon (размеры)
export const PackageIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
    <polyline points="7.5 19.79 7.5 14.6 3 12"/>
    <polyline points="21 12 16.5 14.6 16.5 19.79"/>
  </svg>
);

// Truck icon (доставка)
export const TruckIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

// Document icon (оферта)
export const DocumentIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

// Clock icon (отслеживание)
export const ClockIcon: React.FC<IconProps> = ({ width = 28, height = 28, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// Arrow right icon
export const ArrowRightIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Chevron down icon
export const ChevronDownIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

// Shopping cart icon
export const CartIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

// Close icon
export const CloseIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Menu icon (hamburger)
export const MenuIcon: React.FC<IconProps> = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
