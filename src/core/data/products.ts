import { Product } from '../../features/products/types';

// Base URL for images (GitHub Pages for production, relative for development)
const BASE_URL = process.env.PUBLIC_URL || '';

/**
 * All mousepads products
 * Combined and sorted by rating/reviews
 */
export const MOUSEPADS: Product[] = [
  {
    id: 1,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/Generated Image October 30, 2025 - 6_24PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_01.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_02.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_03.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-Black (XL)',
    productSize: 'XL',
    price: '3 000 ₽',
    priceNumeric: 3000,
    rating: 4.9,
    reviewCount: 29,
    color: 'black',
    category: 'mousepads',
    collection: 'Geoid',
    addedDate: '2024-08-15'
  },
  {
    id: 2,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/Generated Image October 30, 2025 - 6_26PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_01.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_02.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_03.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-White (XL)',
    productSize: 'XL',
    price: '3 000 ₽',
    priceNumeric: 3000,
    rating: 5.0,
    reviewCount: 15,
    color: 'white',
    category: 'mousepads',
    collection: 'Geoid',
    addedDate: '2024-08-15'
  },
  {
    id: 3,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_red/Generated Image October 30, 2025 - 6_25PM (1).png`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_red/logo-red_red_xl_01.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/logo-red_red_xl_02.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/logo-red_red_xl_03.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/logo-red_red_xl_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-Red (XL)',
    productSize: 'XL',
    price: '3 000 ₽',
    priceNumeric: 3000,
    rating: 4.5,
    reviewCount: 8,
    color: 'red',
    category: 'mousepads',
    collection: 'Logo Red',
    addedDate: '2024-08-15'
  },
  {
    id: 4,
    image: `${BASE_URL}/images/products/mousepads/l/l_black_geoid/Generated Image October 30, 2025 - 6_08PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/geoid_black_l_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/geoid_black_l_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/geoid_black_l_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/geoid_black_l_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-Black (L)',
    productSize: 'L',
    price: '2 500 ₽',
    priceNumeric: 2500,
    rating: 4.5,
    reviewCount: 29,
    color: 'black',
    category: 'mousepads',
    collection: 'Geoid',
    addedDate: '2024-08-15'
  },
  {
    id: 5,
    image: `${BASE_URL}/images/products/mousepads/l/l_white_geoid/Generated Image October 30, 2025 - 6_11PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/geoid_white_l_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/geoid_white_l_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/geoid_white_l_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/geoid_white_l_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-White (L)',
    productSize: 'L',
    price: '2 500 ₽',
    priceNumeric: 2500,
    rating: 4.7,
    reviewCount: 18,
    color: 'white',
    category: 'mousepads',
    collection: 'Geoid',
    addedDate: '2024-08-15'
  },
  {
    id: 6,
    image: `${BASE_URL}/images/products/mousepads/l/l_red/Generated Image October 30, 2025 - 6_09PM (1).png`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_red/logo-red_red_l_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/logo-red_red_l_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/logo-red_red_l_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/logo-red_red_l_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Geoid-Red (L)',
    productSize: 'L',
    price: '2 500 ₽',
    priceNumeric: 2500,
    rating: 4.9,
    reviewCount: 12,
    color: 'red',
    category: 'mousepads',
    collection: 'Logo Red',
    addedDate: '2024-08-15'
  },
  {
    id: 15,
    image: `${BASE_URL}/images/products/mousepads/pro/pro-speed_black_pro_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/pro/pro-speed_black_pro_02.webp`,
      `${BASE_URL}/images/products/mousepads/pro/pro-speed_black_pro_03.webp`
    ],
    title: 'Коврик',
    subtitle: 'Pro Speed (poron base)',
    productSize: 'L',
    price: '4 700 ₽',
    priceNumeric: 4700,
    rating: 5.0,
    reviewCount: 5,
    color: 'black',
    category: 'mousepads',
    collection: 'Pro Speed',
    addedDate: '2025-09-20'
  },
  {
    id: 16,
    image: `${BASE_URL}/images/products/mousepads/l/l_blue/Generated Image October 30, 2025 - 6_09PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_blue/logo-blue_blue_l_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/logo-blue_blue_l_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/logo-blue_blue_l_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/logo-blue_blue_l_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Logo Blue (speed)',
    productSize: 'L',
    price: '2 200 ₽',
    priceNumeric: 2200,
    rating: 4.8,
    reviewCount: 1,
    color: 'black',
    category: 'mousepads',
    collection: 'Logo Blue',
    addedDate: '2024-07-10'
  },
  {
    id: 17,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_blue/Generated Image October 30, 2025 - 6_25PM.png`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_01.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_02.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_03.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_04.webp`
    ],
    title: 'Коврик',
    subtitle: 'Logo Blue (balance)',
    productSize: 'XL',
    price: '2 700 ₽',
    priceNumeric: 2700,
    rating: 5.0,
    reviewCount: 18,
    color: 'black',
    category: 'mousepads',
    collection: 'Logo Blue',
    addedDate: '2024-07-10'
  }
];

/**
 * All clothing products
 */
export const CLOTHING: Product[] = [
  {
    id: 7,
    image: `${BASE_URL}/images/products/clothing/hoodies/seprents_white/serpents_hoodie_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/serpents_hoodie_white_02.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/serpents_hoodie_white_03.webp`
    ],
    title: 'Худи-Оверсайз',
    subtitle: 'Serpents',
    productColor: 'Белый',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '6 000 ₽',
    priceNumeric: 6000,
    rating: 4.9,
    reviewCount: 19,
    color: 'white',
    category: 'clothing',
    clothingType: 'hoodie',
    collection: 'Serpents',
    addedDate: '2025-10-15'
  },
  {
    id: 9,
    image: `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/serpents_tshirt_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/serpents_tshirt_black_02.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/serpents_tshirt_black_03.webp`
    ],
    title: 'Футболка-Оверсайз',
    subtitle: 'Serpents',
    productColor: 'Черный',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '6 000 ₽',
    priceNumeric: 6000,
    rating: 4.4,
    reviewCount: 31,
    color: 'black',
    category: 'clothing',
    clothingType: 'tshirt',
    collection: 'Serpents',
    addedDate: '2024-10-05'
  },
  {
    id: 18,
    image: `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/serpents_tshirt_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/serpents_tshirt_white_02.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/serpents_tshirt_white_03.webp`
    ],
    title: 'Футболка-Оверсайз',
    subtitle: 'Serpents',
    productColor: 'Белый',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '6 000 ₽',
    priceNumeric: 6000,
    rating: 4.5,
    reviewCount: 31,
    color: 'white',
    category: 'clothing',
    clothingType: 'tshirt',
    collection: 'Serpents',
    addedDate: '2025-10-25'
  },
  {
    id: 12,
    image: `${BASE_URL}/images/products/clothing/hoodies/seprents_black/serpents_hoodie_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/serpents_hoodie_black_02.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/serpents_hoodie_black_03.webp`
    ],
    title: 'Худи-Оверсайз',
    subtitle: 'Serpents',
    productColor: 'Черный',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '6 000 ₽',
    priceNumeric: 6000,
    rating: 5.0,
    reviewCount: 28,
    color: 'black',
    category: 'clothing',
    clothingType: 'hoodie',
    collection: 'Serpents',
    addedDate: '2025-10-20'
  },
  {
    id: 19,
    image: `${BASE_URL}/images/products/clothing/tshirts/Dragons_black/dragons_tshirt_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Dragons_black/dragons_tshirt_black_02.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Dragons_black/dragons_tshirt_black_03.webp`
    ],
    title: 'Футболка-Оверсайз',
    subtitle: 'Dragons',
    productColor: 'Черный',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '2 500 ₽',
    priceNumeric: 2500,
    rating: 4.3,
    reviewCount: 8,
    color: 'black',
    category: 'clothing',
    clothingType: 'tshirt',
    collection: 'Dragons',
    addedDate: '2024-09-15'
  },
  {
    id: 20,
    image: `${BASE_URL}/images/products/clothing/tshirts/Dragons_white/dragons_tshirt_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Dragons_white/dragons_tshirt_white_02.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Dragons_white/dragons_tshirt_white_03.webp`
    ],
    title: 'Футболка-Оверсайз',
    subtitle: 'Dragons',
    productColor: 'Белый',
    productSize: 'XS,S,M,L,XL,2XL',
    price: '2 500 ₽',
    priceNumeric: 2500,
    rating: 4.6,
    reviewCount: 12,
    color: 'white',
    category: 'clothing',
    clothingType: 'tshirt',
    collection: 'Dragons',
    addedDate: '2024-09-20'
  }
];

/**
 * Gaming sleeves
 */
export const SLEEVES: Product[] = [
  {
    id: 13,
    image: `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/geoid_sleeve_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/geoid_sleeve_black_02.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/geoid_sleeve_black_03.webp`
    ],
    title: 'Рукав Игровой',
    subtitle: 'Geoid-Black (2 Шт.)',
    productSize: 'M',
    price: '1 800 ₽',
    priceNumeric: 1800,
    rating: 4.2,
    reviewCount: 14,
    color: 'black',
    category: 'clothing',
    clothingType: 'sleeve',
    collection: 'Geoid',
    addedDate: '2024-10-01'
  },
  {
    id: 14,
    image: `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/geoid_sleeve_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/geoid_sleeve_white_02.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/geoid_sleeve_white_03.webp`
    ],
    title: 'Рукав Игровой',
    subtitle: 'Geoid-White (2 шт.)',
    productSize: 'M',
    price: '1 800 ₽',
    priceNumeric: 1800,
    rating: 4.5,
    reviewCount: 10,
    color: 'white',
    category: 'clothing',
    clothingType: 'sleeve',
    collection: 'Geoid',
    addedDate: '2025-10-28'
  }
];

/**
 * All products combined
 */
export const ALL_PRODUCTS: Product[] = [...MOUSEPADS, ...CLOTHING, ...SLEEVES];

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
