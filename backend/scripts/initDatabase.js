const { pool } = require('../db/config');
const bcrypt = require('bcryptjs');

/**
 * Initialize Database Tables
 */
async function initDatabase() {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log('🔄 Initializing database...\n');

    // Create Products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        price VARCHAR(50) NOT NULL,
        priceNumeric INT NOT NULL,
        rating INT DEFAULT 5,
        reviewCount INT DEFAULT 0,
        color VARCHAR(50),
        category VARCHAR(50) NOT NULL,
        clothingType VARCHAR(50),
        productSize VARCHAR(20),
        productColor VARCHAR(50),
        image TEXT NOT NULL,
        images JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_color (color)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Products table created');

    // Create Admin Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastLogin TIMESTAMP NULL,
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Admin users table created');

    // Check if admin exists
    const [adminExists] = await connection.query(
      'SELECT id FROM admin_users WHERE username = ?',
      ['admin']
    );

    if (adminExists.length === 0) {
      // Create default admin user
      const passwordHash = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO admin_users (username, passwordHash) VALUES (?, ?)',
        ['admin', passwordHash]
      );
      console.log('✅ Default admin user created (username: admin, password: admin123)');
      console.log('⚠️  IMPORTANT: Change the default password after first login!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n✨ Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

// Run initialization
initDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
