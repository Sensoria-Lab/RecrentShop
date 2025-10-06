/**
 * Application routes and navigation constants
 */

export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  SUPPORT: '/support',
  PRODUCT: '/product',
  CART: '/cart',
  CHECKOUT: '/checkout',
  NOT_FOUND: '*'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

/**
 * Navigation menu items
 */
export const NAV_ITEMS = [
  { path: ROUTES.CATALOG, label: 'Каталог' },
  { path: ROUTES.SUPPORT, label: 'Поддержка' }
] as const;

/**
 * Mobile navigation menu items
 */
export const MOBILE_NAV_ITEMS = [
  { path: ROUTES.CATALOG, label: 'Каталог' },
  { path: ROUTES.SUPPORT, label: 'Поддержка и информация' }
] as const;
