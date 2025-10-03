const { pool } = require('../db/config');

// Base URL for images (GitHub Pages)
const BASE_URL = 'https://sensoria-lab.github.io/RecrentShop';

// Products data (copied from frontend)
const MOUSEPADS = [
  {
    id: 1,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_001.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_001.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_002.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_003.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/11.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/11.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/4_4.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_white_geoid/5_4.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/xl/xl_red/010_xl_logo-red_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_red/010_xl_logo-red_01.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/010_xl_logo-red_02.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/010_xl_logo-red_03.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_red/010_xl_logo-red_04.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_001.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_001.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_002.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_black_geoid/114_003.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_04.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_05.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/011_l_white_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/011_l_white_04.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_white_geoid/011_l_white_05.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/l/l_red/109_l_logo-red_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_red/109_l_logo-red_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/109_l_logo-red_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/109_l_logo-red_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_red/109_l_logo-red_04.webp`
    ],
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
    image: `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_04.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_black_geoid/013_l_black_05.webp`
    ],
    title: 'Коврик для мыши',
    subtitle: '"geoid-black"',
    productSize: 'L',
    price: '2 500 р.',
    priceNumeric: 2500,
    rating: 4,
    reviewCount: 20,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 15,
    image: `${BASE_URL}/images/products/mousepads/pro/control.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/pro/control.webp`,
      `${BASE_URL}/images/products/mousepads/pro/control_2.webp`,
      `${BASE_URL}/images/products/mousepads/pro/control_3.webp`
    ],
    title: 'Коврик для мыши',
    subtitle: '"Pro Speed" (poron base)',
    productSize: 'L',
    price: '4 700 р.',
    priceNumeric: 4700,
    rating: 5,
    reviewCount: 5,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 16,
    image: `${BASE_URL}/images/products/mousepads/l/l_blue/107_l_logo-blue_01.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/l/l_blue/107_l_logo-blue_01.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/107_l_logo-blue_02.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/107_l_logo-blue_03.webp`,
      `${BASE_URL}/images/products/mousepads/l/l_blue/107_l_logo-blue_04.webp`
    ],
    title: 'Коврик для мыши',
    subtitle: '"logo-blue" (speed)',
    productSize: 'L',
    price: '2 200 р.',
    priceNumeric: 2200,
    rating: 5,
    reviewCount: 1,
    color: 'black',
    category: 'mousepads'
  },
  {
    id: 17,
    image: `${BASE_URL}/images/products/mousepads/xl/xl_blue/lxl_01_1.webp`,
    images: [
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/lxl_01_1.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/lxl_02_1.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/xl_01_2.webp`,
      `${BASE_URL}/images/products/mousepads/xl/xl_blue/xl_02_2.webp`
    ],
    title: 'Коврик для мыши',
    subtitle: '"logo-blue" (balance)',
    productSize: 'XL',
    price: '2 700 р.',
    priceNumeric: 2700,
    rating: 5,
    reviewCount: 18,
    color: 'black',
    category: 'mousepads'
  }
];

const CLOTHING = [
  {
    id: 7,
    image: `${BASE_URL}/images/products/clothing/hoodies/seprents_white/801.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/801.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/802.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/803.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/804.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/razmernaya_setka_hudich_122023.webp`
    ],
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
    image: `${BASE_URL}/images/products/clothing/hoodies/seprents_white/801.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/801.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/802.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/803.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/804.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_white/razmernaya_setka_hudich_122023.webp`
    ],
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
    image: `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/img_7207.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/img_7207.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/img_7208.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/img_7209.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_black/razmernaya_setka_futbolka_20_zmei_na_spine_iyun_20241.webp`
    ],
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
    id: 18,
    image: `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/img_7205.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/img_7205.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/img_7206.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/img_7210.webp`,
      `${BASE_URL}/images/products/clothing/tshirts/Serpents2.0_white/razmernaya_setka_futbolka_20_zmei_na_spine_iyun_2024.webp`
    ],
    title: 'Футболка-оверсайз',
    subtitle: '"Seprents"',
    productColor: 'Белый',
    price: '6 000 р.',
    priceNumeric: 6000,
    rating: 5,
    reviewCount: 31,
    color: 'white',
    category: 'clothing',
    clothingType: 'tshirt'
  },
  {
    id: 12,
    image: `${BASE_URL}/images/products/clothing/hoodies/seprents_black/003-01_hudi.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/003-01_hudi.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/003-02_hudi.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/003-03_hudi_1.webp`,
      `${BASE_URL}/images/products/clothing/hoodies/seprents_black/razmernaya_setka_hudich_.webp`
    ],
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

const SLEEVES = [
  {
    id: 13,
    image: `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/rukav_geoid_black_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/rukav_geoid_black_01.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/rukav_geoid_black_02.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/rukav_geoid_black_03.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/black_sleeve/rukava_razmery_kopia.webp`
    ],
    title: 'Рукав игровой',
    subtitle: '"geoid-black" (комплект из 2 шт.)',
    productSize: 'M',
    price: '1 800 р.',
    priceNumeric: 1800,
    rating: 4,
    reviewCount: 14,
    color: 'black',
    category: 'clothing',
    clothingType: 'sleeve'
  },
  {
    id: 14,
    image: `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_01.webp`,
    images: [
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_01.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_02.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/rukav_geoid_white_03.webp`,
      `${BASE_URL}/images/products/clothing/sleeves/white_sleeve/rukava_razmery_kopia.webp`
    ],
    title: 'Рукав игровой',
    subtitle: '"geoid-white" (комплект из 2 шт.)',
    productSize: 'M',
    price: '1 800 р.',
    priceNumeric: 1800,
    rating: 4,
    reviewCount: 10,
    color: 'white',
    category: 'clothing',
    clothingType: 'sleeve'
  }
];

const ALL_PRODUCTS = [...MOUSEPADS, ...CLOTHING, ...SLEEVES];

/**
 * Seed database with existing products from products.ts
 */
async function seedProducts() {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log('🔄 Seeding products into database...\n');

    // Check if products already exist
    const [existing] = await connection.query('SELECT COUNT(*) as count FROM products');

    if (existing[0].count > 0) {
      console.log(`ℹ️  Database already has ${existing[0].count} products`);
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise(resolve => {
        readline.question('Do you want to clear and re-seed? (y/N): ', resolve);
      });
      readline.close();

      if (answer.toLowerCase() !== 'y') {
        console.log('❌ Seeding cancelled');
        return;
      }

      await connection.query('DELETE FROM products');
      console.log('✅ Cleared existing products\n');
    }

    // Insert products
    let successCount = 0;

    for (const product of ALL_PRODUCTS) {
      try {
        await connection.query(
          `INSERT INTO products
           (id, title, subtitle, price, priceNumeric, rating, reviewCount, color, category,
            clothingType, productSize, productColor, image, images)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            product.id,
            product.title,
            product.subtitle || null,
            product.price,
            product.priceNumeric,
            product.rating,
            product.reviewCount,
            product.color,
            product.category,
            product.clothingType || null,
            product.productSize || null,
            product.productColor || null,
            product.image,
            JSON.stringify(product.images || [])
          ]
        );
        successCount++;
        console.log(`✅ Added: ${product.title} ${product.subtitle || ''} (ID: ${product.id})`);
      } catch (err) {
        console.error(`❌ Failed to add product ${product.id}:`, err.message);
      }
    }

    console.log(`\n✨ Successfully seeded ${successCount}/${ALL_PRODUCTS.length} products!`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

// Run seeding
seedProducts()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
