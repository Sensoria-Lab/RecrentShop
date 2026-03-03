import { ALL_PRODUCTS } from '@/src/lib/products';
import ProductPageClient from './ProductPageClient';

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export default function ProductPage() {
  return <ProductPageClient />;
}
