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
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Главная', path: '/' }];

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
      className={`flex items-center gap-2 text-sm font-medium ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        
        return (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/30"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            
            {isLast ? (
              <span className="text-white/90 font-semibold">
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={() => navigate(crumb.path)}
                className="text-white/60 hover:text-white transition-colors duration-200 hover:underline decoration-white/40 underline-offset-4"
              >
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
