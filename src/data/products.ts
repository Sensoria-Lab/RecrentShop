import { Product } from '../types/product';

/**
 * All mousepads products
 * Combined and sorted by rating/reviews
 */
export const MOUSEPADS: Product[] = [
  {
    id: 1,
    image: '/images/products/mousepads/xl/mousepad-geoid-black.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-black"',
    productSize: 'XL',
    price: '3 000 р.',
    priceNumeric: 3000,
    rating: 4,
    reviewCount: 29,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 2,
    image: '/images/products/mousepads/xl/mousepad-geoid-white.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-white"',
    productSize: 'XL',
    price: '3 000 р.',
    priceNumeric: 3000,
    rating: 5,
    reviewCount: 15,
    color: 'white',
    category: 'mousepads'
  },
  {
    id: 3,
    image: '/images/products/mousepads/xl/mousepad-geoid-red.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-red"',
    productSize: 'XL',
    price: '3 000 р.',
    priceNumeric: 3000,
    rating: 4,
    reviewCount: 8,
    color: 'red',
    category: 'mousepads'
  },
  {
    id: 10,
    image: '/images/products/mousepads/xl/mousepad-geoid-black.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-black"',
    productSize: 'XL',
    price: '3 000 р.',
    priceNumeric: 3000,
    rating: 5,
    reviewCount: 22,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 4,
    image: '/images/products/mousepads/l/mousepad-geoid-black.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-black"',
    productSize: 'L',
    price: '2 500 р.',
    priceNumeric: 2500,
    rating: 5,
    reviewCount: 29,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 5,
    image: '/images/products/mousepads/l/mousepad-geoid-white.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-white"',
    productSize: 'L',
    price: '2 500 р.',
    priceNumeric: 2500,
    rating: 4,
    reviewCount: 18,
    color: 'white',
    category: 'mousepads'
  },
  {
    id: 6,
    image: '/images/products/mousepads/l/mousepad-geoid-red.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-red"',
    productSize: 'L',
    price: '2 500 р.',
    priceNumeric: 2500,
    rating: 5,
    reviewCount: 12,
    color: 'red',
    category: 'mousepads'
  },
  {
    id: 11,
    image: '/images/products/mousepads/l/mousepad-geoid-black.webp',
    title: 'Коврик для мыши',
    subtitle: '"geoid-black"',
    productSize: 'L',
    price: '2 500 р.',
    priceNumeric: 2500,
    rating: 4,
    reviewCount: 20,
    color: 'black',
    category: 'mousepads'
  }
];

/**
 * All clothing products
 */
export const CLOTHING: Product[] = [
  {
    id: 7,
    image: '/images/products/clothing/hoodies/hoodie-serpents-white.webp',
    title: 'Худи-оверсайз',
    subtitle: '"Seprents"',
    productColor: 'Белый',
    price: '6 000 р.',
    priceNumeric: 6000,
    rating: 4,
    reviewCount: 19,
    color: 'white',
    category: 'clothing',
    clothingType: 'hoodie'
  },
  {
    id: 8,
    image: '/images/products/clothing/hoodies/hoodie-serpents-white.webp',
    title: 'Худи-оверсайз',
    subtitle: '"Seprents"',
    productColor: 'Белый',
    price: '6 000 р.',
    priceNumeric: 6000,
    rating: 4,
    reviewCount: 19,
    color: 'white',
    category: 'clothing',
    clothingType: 'hoodie'
  },
  {
    id: 9,
    image: '/images/products/clothing/tshirts/tshirt-serpents-black.webp',
    title: 'Футболка-оверсайз',
    subtitle: '"Seprents"',
    productColor: 'Черный',
    price: '6 000 р.',
    priceNumeric: 6000,
    rating: 5,
    reviewCount: 31,
    color: 'black',
    category: 'clothing',
    clothingType: 'tshirt'
  },
  {
    id: 12,
    image: '/images/products/clothing/hoodies/hoodie-serpents-black.webp',
    title: 'Худи-оверсайз',
    subtitle: '"Seprents"',
    productColor: 'Черный',
    price: '6 000 р.',
    priceNumeric: 6000,
    rating: 4,
    reviewCount: 28,
    color: 'black',
    category: 'clothing',
    clothingType: 'hoodie'
  }
];

/**
 * All products combined
 */
export const ALL_PRODUCTS: Product[] = [...MOUSEPADS, ...CLOTHING];

/**
 * Get sorted mousepads by rating and review count
 */
export const getSortedMousepads = (): Product[] => {
  return [...MOUSEPADS].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });
};
