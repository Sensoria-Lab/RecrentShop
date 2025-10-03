const express = require('express');
const router = express.Router();
const { pool } = require('../db/config');
const { authenticateToken } = require('../middleware/auth');

/**
 * GET /api/products
 * Get all products
 */
router.get('/', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products ORDER BY id ASC');

    // Parse JSON images field
    const parsedProducts = products.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }));

    res.json(parsedProducts);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = {
      ...products[0],
      images: products[0].images ? JSON.parse(products[0].images) : []
    };

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * POST /api/products
 * Create new product (requires authentication)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      price,
      priceNumeric,
      rating,
      reviewCount,
      color,
      category,
      clothingType,
      productSize,
      productColor,
      image,
      images
    } = req.body;

    // Validation
    if (!title || !price || !priceNumeric || !category || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO products
       (title, subtitle, price, priceNumeric, rating, reviewCount, color, category,
        clothingType, productSize, productColor, image, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        subtitle || null,
        price,
        priceNumeric,
        rating || 5,
        reviewCount || 0,
        color || 'black',
        category,
        clothingType || null,
        productSize || null,
        productColor || null,
        image,
        JSON.stringify(images || [])
      ]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

/**
 * PUT /api/products/:id
 * Update product (requires authentication)
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      price,
      priceNumeric,
      rating,
      reviewCount,
      color,
      category,
      clothingType,
      productSize,
      productColor,
      image,
      images
    } = req.body;

    // Check if product exists
    const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await pool.query(
      `UPDATE products SET
       title = ?, subtitle = ?, price = ?, priceNumeric = ?,
       rating = ?, reviewCount = ?, color = ?, category = ?,
       clothingType = ?, productSize = ?, productColor = ?,
       image = ?, images = ?
       WHERE id = ?`,
      [
        title,
        subtitle || null,
        price,
        priceNumeric,
        rating || 5,
        reviewCount || 0,
        color || 'black',
        category,
        clothingType || null,
        productSize || null,
        productColor || null,
        image,
        JSON.stringify(images || []),
        req.params.id
      ]
    );

    res.json({
      success: true,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/**
 * DELETE /api/products/:id
 * Delete product (requires authentication)
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
