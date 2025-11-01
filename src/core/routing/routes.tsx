// Core routing configuration
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Pages
import MainPage from '../../pages/MainPage';
import CatalogPage from '../../pages/CatalogPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import SupportPage from '../../pages/SupportPage';
import AccountPage from '../../pages/AccountPage';
import TestImagesPage from '../../pages/TestImagesPage';

// App Layout
import App from '../../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainPage />,
      },
      {
        path: ROUTES.CATALOG,
        element: <CatalogPage />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <ProductPage />,
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <CheckoutPage />,
      },
      {
        path: ROUTES.SUPPORT,
        element: <SupportPage />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <AccountPage />,
      },
      {
        path: 'test-images',
        element: <TestImagesPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
], {
  basename: '/RecrentShop',
});

export default router;