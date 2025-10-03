const { pool } = require('../db/config');
const { ALL_PRODUCTS } = require('../../src/data/products');

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
