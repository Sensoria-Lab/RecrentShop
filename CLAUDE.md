# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RecrentShop is a React-based e-commerce platform for mousepads and clothing. Built with TypeScript, React 18, Tailwind CSS, and deployed to GitHub Pages at `https://sensoria-lab.github.io/RecrentShop`.

## Development Commands

```bash
# Development
npm start                    # Start dev server at localhost:3000/RecrentShop
npm run dev                  # Alias for npm start

# Build & Deploy
npm run build                # Production build
npm run deploy               # Deploy to GitHub Pages (runs predeploy automatically)

# Code Quality
npm run lint                 # ESLint for TypeScript files
npm run format               # Prettier format all code
npm run type-check           # TypeScript type checking without emit
npm test                     # Run Jest tests

# Image Optimization
npm run optimize-images      # Run image optimization script
```

## Architecture Overview

### Routing & Base Path
- **Router basename**: `/RecrentShop` (GitHub Pages deployment path, configured in src/index.tsx:13)
- All routes are relative to this base path
- Images reference `https://sensoria-lab.github.io/RecrentShop` (see src/data/products.ts:4)

### State Management Pattern
The app uses **React Context + Custom Hooks** pattern:
- `CartContext` (src/context/CartContext.tsx) - Global cart state with localStorage persistence
- `ToastContext` (src/context/ToastContext.tsx) - Toast notifications
- Cart items are uniquely identified by combination of: `id + selectedSize + selectedColor + selectedType`
- Cart state automatically syncs to localStorage on every change

### Component Architecture

**3-Layer Structure:**
1. **Pages** (`src/components/pages/`) - Route-level components (MainPage, CatalogPage, ProductPage, CartPage, etc.)
2. **Shared** (`src/components/shared/`) - Reusable layout/utility components (Header, Footer, Modal, LazyImage, ErrorBoundary, etc.)
3. **UI** (`src/components/ui/`) - Presentational components (ProductCard, ReviewCard, Toast, etc.)

**Design System** (`src/shared/ui/`):
- Uses Feature-Sliced Design (FSD) principles
- Components: Button, Card, Input, RadioGroup
- Built with `class-variance-authority` for variant management
- Uses Radix UI primitives for accessible components (@radix-ui/react-radio-group)
- Utility function `cn()` for className merging (src/lib/utils.ts)

### Product Data Model
Products are defined in `src/data/products.ts` with type safety from `src/types/product.ts`:
- Two categories: `mousepads` | `clothing`
- Clothing has sub-type: `hoodie` | `tshirt` | `sleeve`
- Each product has:
  - Multiple images array for gallery
  - priceNumeric for calculations (price string is for display)
  - rating and reviewCount
  - Size/color variants

### Filtering & Sorting
`useProductFilters` hook (src/hooks/useProductFilters.ts) handles complex filtering:
- Category filter (all/mousepads/clothing)
- Color filter (all/black/white/red)
- Size filter with category-specific suffixes: `L-pad`, `XL-pad` for mousepads; `XS-cloth`, `S-cloth`, etc. for clothing
- Price range slider
- Minimum rating
- Sort options: popularity, price-asc, price-desc, rating

**Important**: Product data uses plain sizes ("L", "XL"), but filter values include category suffixes to distinguish between mousepad and clothing sizes.

### Custom Hooks Pattern
Hooks encapsulate complex logic (src/hooks/):
- `useProduct` - Fetch/manage product data
- `useProductImages` - Gallery state management
- `useAddToCart` - Cart addition with variant selection
- `useProductFilters` - Filter/sort logic
- `useProductNavigation` - Next/prev product navigation
- `useLocalStorage` - Synced localStorage state
- `useDebounce` - Debounced values
- `useIntersectionObserver` - Lazy loading/scroll effects

### Lazy Loading & Code Splitting
All page components are lazy loaded in App.tsx:
```tsx
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ProductPage = lazy(() => import('./components/pages/ProductPage'));
// ... etc
```
Use `<Suspense fallback={<LoadingSkeleton />}>` wrapper.

### Image Optimization
- Images stored in `public/images/products/`
- Optimization script at `scripts/optimize-images.js` (uses sharp, imagemin)
- LazyImage component (src/components/shared/LazyImage.tsx) for lazy loading
- All product images use WebP format

### Styling Approach
- **Tailwind CSS** for utility-first styling
- **Inline styles** for dynamic values (rarely used)
- **CVA (class-variance-authority)** for component variants in Design System
- **Global styles** in src/index.css

### Configuration System
Centralized config in `src/constants/config.ts`:
- `SITE_CONFIG` - Site metadata
- `SOCIAL_LINKS` - Social media URLs
- `API_CONFIG` - API configuration (defaults to static data in production)
- `ROUTES` - Route constants
- `VALIDATION` - Form validation patterns
- All configs use `as const` for type safety

## Key Implementation Details

### Adding New Products
1. Add product object to appropriate array in `src/data/products.ts` (MOUSEPADS or CLOTHING)
2. Place images in `public/images/products/{category}/{size}/{name}/`
3. Use absolute URLs with BASE_URL constant
4. Ensure priceNumeric matches price string

### Creating New Pages
1. Create component in `src/components/pages/`
2. Wrap with `PageLayout` component for consistent layout
3. Add lazy import in `src/App.tsx`
4. Add route in `<Routes>` section
5. Optionally add route constant to `src/constants/routes.ts`

### Toast Notifications
Use `useToast()` hook from ToastContext:
```tsx
const { addToast } = useToast();
addToast('Success message', 'success');
addToast('Error message', 'error');
```

### Error Handling
All routes wrapped in `<ErrorBoundary>` component that catches React errors and displays fallback UI.

### Mobile Responsiveness
- Mobile-first Tailwind breakpoints
- `<BottomNavigation>` component for mobile navigation (src/components/shared/BottomNavigation.tsx)
- Touch-optimized interactions

## TypeScript Configuration
- Strict mode enabled
- Target: ES5 for compatibility
- JSX: react-jsx (new JSX transform)
- All imports must have proper types

## Deployment Notes
- **GitHub Pages**: Requires `PUBLIC_URL="/RecrentShop"` environment variable
- **Deploy command**: `npm run deploy` (builds and pushes to gh-pages branch)
- **Manual**: `$env:PUBLIC_URL="/RecrentShop"; npm run build; npx gh-pages -d build` (PowerShell)
- Router basename must match PUBLIC_URL path

## Static Data vs API
Controlled by `API_CONFIG.USE_STATIC_DATA`:
- In production without `REACT_APP_API_URL`: uses static data from `src/data/`
- With API URL: fetches from backend (see src/services/api.ts)
