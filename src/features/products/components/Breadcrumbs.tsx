import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if not provided
  // UX Logic: Product pages should show Catalog in breadcrumbs, not Home
  // This provides logical navigation and matches user expectations
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = location.pathname.split('/').filter(Boolean);
    
    // Special handling for product page - link to catalog instead of home
    const isProductPage = paths.includes('product');
    const breadcrumbs: BreadcrumbItem[] = isProductPage 
      ? [{ label: 'Каталог', path: '/catalog' }]  // Product pages start from catalog
      : [{ label: 'Главная', path: '/' }];         // Other pages start from home

    const pathMap: { [key: string]: string } = {
      catalog: 'Каталог',
      product: 'Товар',
      cart: 'Корзина',
      checkout: 'Оформление',
      account: 'Профиль',
      support: 'Поддержка',
      admin: 'Админ',
    };

    let currentPath = '';
    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: pathMap[segment] || segment,
        path: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      className={`flex items-center gap-2 text-xs sm:text-sm font-medium py-3 sm:py-4 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="flex items-center gap-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30 flex-shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}

              {isLast ? (
                <span className="text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="text-white/70 hover:text-white transition-colors duration-200 group flex items-center gap-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  <span className="group-hover:underline decoration-white/50 underline-offset-4">
                    {crumb.label}
                  </span>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
