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
  ACCOUNT: '/account',
  NOT_FOUND: '*'
} as const;

type RouteKey = keyof typeof ROUTES;
type RoutePath = typeof ROUTES[RouteKey];

