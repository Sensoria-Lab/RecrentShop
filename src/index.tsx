import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from './App';
import router from './core/routing';
import './index.css';
import { LoadingSkeleton } from './shared/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSkeleton />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);