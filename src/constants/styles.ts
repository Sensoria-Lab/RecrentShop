/**
 * Reusable Tailwind CSS class constants
 * Устраняет дублирование и обеспечивает консистентность дизайна
 */

// Фоны и блюр эффекты
export const GLASS_BG = 'bg-black/40 backdrop-blur rounded-xl';
export const GLASS_BG_DARK = 'bg-black/80 backdrop-blur-md';
export const GLASS_BG_LIGHT = 'bg-black/20 backdrop-blur-sm';

// Карточки с градиентами
export const CARD_GRADIENT = 'bg-white/5 backdrop-blur-sm';
export const CARD_BORDER = 'border border-white/10 hover:border-white/30';
export const CARD_BASE = `${CARD_GRADIENT} ${CARD_BORDER} transition-all duration-300`;

// Эффект shine при hover
export const SHINE_EFFECT = 'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none';
export const SHINE_GRADIENT = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000';

// Типографика - заголовки
export const HEADING_MAIN = 'text-white font-manrope font-bold';
export const HEADING_XL = `${HEADING_MAIN} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`;
export const HEADING_LG = `${HEADING_MAIN} text-xl sm:text-2xl md:text-3xl lg:text-4xl`;
export const HEADING_MD = `${HEADING_MAIN} text-lg sm:text-xl md:text-2xl`;
export const HEADING_SM = `${HEADING_MAIN} text-base sm:text-lg md:text-xl`;

// Типографика - текст
export const TEXT_PRIMARY = 'text-white font-manrope';
export const TEXT_SECONDARY = 'text-white/60';
export const TEXT_MUTED = 'text-white/40';

// Тени и свечения
export const DROP_SHADOW_STRONG = 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]';
export const DROP_SHADOW_MEDIUM = 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]';
export const TEXT_SHADOW_GLOW = '[text-shadow:_0_0_30px_rgb(0_0_0_/_100%)]';

// Кнопки
export const BUTTON_BASE = 'px-4 py-2 rounded-lg font-semibold transition-all duration-300';
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40`;
export const BUTTON_SECONDARY = `${BUTTON_BASE} bg-black/60 hover:bg-black/80 text-white`;

// Анимации
export const HOVER_SCALE = 'hover:scale-105 transition-transform duration-300';
export const HOVER_GLOW = 'hover:shadow-lg hover:shadow-white/10 transition-shadow duration-300';
export const ACTIVE_SCALE = 'active:scale-95';

// Скругления
export const ROUNDED_CARD = 'rounded-lg sm:rounded-xl md:rounded-2xl';
export const ROUNDED_BUTTON = 'rounded-lg sm:rounded-xl';

// Отступы контейнеров
export const CONTAINER_PADDING = 'px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16';
export const CONTAINER_MAX_WIDTH = 'max-w-[1400px] mx-auto';

// Сетки
export const GRID_2_COL = 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8';
export const GRID_3_COL = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6';
export const GRID_4_COL = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6';
