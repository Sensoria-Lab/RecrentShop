/**
 * ONCE UI Icon Library Configuration
 * 
 * Maps icon names to react-icons components.
 * This is the central registry for all icons used in the application.
 */

import type { IconType } from 'react-icons';

// Heroicons v2 (outline)
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingCart,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineArrowUpRight,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineTrash,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineSparkles,
  HiOutlineArrowTrendingUp,
  HiOutlineFire,
  HiOutlineFunnel,
  HiOutlineBars3,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineClipboardDocument,
  HiOutlinePencil,
  HiOutlinePencilSquare,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineGift,
  HiOutlineTag,
  HiOutlineSquares2X2,
  HiOutlineRectangleStack,
  HiOutlinePhoto,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineKey,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowPath,
  HiOutlineArrowUturnLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineDocumentDuplicate,
  HiOutlineFolder,
  HiOutlineFolderOpen,
  HiOutlineCloudArrowUp,
  HiOutlineCloudArrowDown,
  HiOutlinePrinter,
  HiOutlineShare,
  HiOutlineLink,
  HiOutlineQrCode,
  HiOutlineBarsArrowUp,
  HiOutlineBarsArrowDown,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineMagnifyingGlassMinus,
  HiOutlineArrowsPointingOut,
  HiOutlineArrowsPointingIn,
  HiOutlineViewfinderCircle,
  HiOutlineCursorArrowRays,
  HiOutlineHandThumbUp,
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2';

// Social media icons from react-icons (specialized sets)
import {
  FaTwitch,
  FaTelegram,
  FaYoutube,
  FaVk,
  FaDiscord,
  FaTiktok,
} from 'react-icons/fa6';

/**
 * Complete icon library mapping
 * Organized by category for easier maintenance
 */
export const iconLibrary: Record<string, IconType> = {
  // Navigation
  home: HiOutlineHome,
  catalog: HiOutlineSquares2X2,
  cart: HiOutlineShoppingCart,
  user: HiOutlineUser,
  account: HiOutlineUser,
  profile: HiOutlineUser,

  // Theme
  sun: HiOutlineSun,
  moon: HiOutlineMoon,
  light: HiOutlineSun,
  dark: HiOutlineMoon,

  // Actions
  close: HiOutlineXMark,
  x: HiOutlineXMark,
  check: HiOutlineCheck,
  plus: HiOutlinePlus,
  minus: HiOutlineMinus,
  trash: HiOutlineTrash,
  delete: HiOutlineTrash,
  edit: HiOutlinePencilSquare,
  pencil: HiOutlinePencil,
  copy: HiOutlineDocumentDuplicate,
  clipboard: HiOutlineClipboardDocument,
  refresh: HiOutlineArrowPath,
  undo: HiOutlineArrowUturnLeft,

  // Arrows
  arrowRight: HiOutlineArrowRight,
  arrowLeft: HiOutlineArrowLeft,
  arrowUpRight: HiOutlineArrowUpRight,
  chevronUp: HiOutlineChevronUp,
  chevronDown: HiOutlineChevronDown,
  chevronLeft: HiOutlineChevronLeft,
  chevronRight: HiOutlineChevronRight,
  externalLink: HiOutlineArrowTopRightOnSquare,

  // Product/Badge
  star: HiOutlineStar,
  sparkles: HiOutlineSparkles,
  new: HiOutlineSparkles,
  trending: HiOutlineArrowTrendingUp,
  bestseller: HiOutlineArrowTrendingUp,
  hot: HiOutlineFire,
  fire: HiOutlineFire,
  heart: HiOutlineHeart,
  like: HiOutlineHandThumbUp,

  // UI Controls
  search: HiOutlineMagnifyingGlass,
  filter: HiOutlineFunnel,
  funnel: HiOutlineFunnel,
  sliders: HiOutlineAdjustmentsHorizontal,
  menu: HiOutlineBars3,
  grid: HiOutlineSquares2X2,
  list: HiOutlineRectangleStack,
  sortAsc: HiOutlineBarsArrowUp,
  sortDesc: HiOutlineBarsArrowDown,

  // Status/Feedback
  success: HiOutlineCheckCircle,
  error: HiOutlineXCircle,
  warning: HiOutlineExclamationTriangle,
  danger: HiOutlineExclamationCircle,
  info: HiOutlineInformationCircle,
  help: HiOutlineQuestionMarkCircle,

  // E-commerce
  shop: HiOutlineShoppingBag,
  store: HiOutlineShoppingBag,
  payment: HiOutlineCreditCard,
  money: HiOutlineBanknotes,
  cash: HiOutlineBanknotes,
  gift: HiOutlineGift,
  tag: HiOutlineTag,
  price: HiOutlineTag,
  truck: HiOutlineTruck,
  delivery: HiOutlineTruck,
  shield: HiOutlineShieldCheck,
  security: HiOutlineShieldCheck,

  // Media
  image: HiOutlinePhoto,
  photo: HiOutlinePhoto,
  gallery: HiOutlinePhoto,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  zoomIn: HiOutlineMagnifyingGlassPlus,
  zoomOut: HiOutlineMagnifyingGlassMinus,
  fullscreen: HiOutlineArrowsPointingOut,
  minimize: HiOutlineArrowsPointingIn,
  expand: HiOutlineArrowsPointingOut,

  // Communication
  mail: HiOutlineEnvelope,
  email: HiOutlineEnvelope,
  phone: HiOutlinePhone,
  message: HiOutlineChatBubbleLeft,
  chat: HiOutlineChatBubbleLeftRight,

  // Location
  location: HiOutlineMapPin,
  pin: HiOutlineMapPin,
  map: HiOutlineMapPin,

  // Documents
  document: HiOutlineDocumentText,
  file: HiOutlineDocumentText,
  folder: HiOutlineFolder,
  folderOpen: HiOutlineFolderOpen,

  // Settings
  settings: HiOutlineCog6Tooth,
  cog: HiOutlineCog6Tooth,
  config: HiOutlineCog6Tooth,

  // Security
  lock: HiOutlineLockClosed,
  unlock: HiOutlineLockOpen,
  key: HiOutlineKey,

  // Notifications
  bell: HiOutlineBell,
  notification: HiOutlineBell,

  // Time
  calendar: HiOutlineCalendar,
  date: HiOutlineCalendar,
  clock: HiOutlineClock,
  time: HiOutlineClock,

  // Utilities
  print: HiOutlinePrinter,
  share: HiOutlineShare,
  link: HiOutlineLink,
  qrcode: HiOutlineQrCode,
  upload: HiOutlineCloudArrowUp,
  download: HiOutlineCloudArrowDown,
  cursor: HiOutlineCursorArrowRays,
  target: HiOutlineViewfinderCircle,

  // Social Media
  twitch: FaTwitch,
  telegram: FaTelegram,
  youtube: FaYoutube,
  vk: FaVk,
  discord: FaDiscord,
  tiktok: FaTiktok,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;

/**
 * Get icon component by name
 * Returns undefined if icon not found
 */
function getIcon(name: IconName): IconType | undefined {
  return iconLibrary[name];
}

/**
 * Check if icon exists in library
 */
function hasIcon(name: string): name is IconName {
  return name in iconLibrary;
}
