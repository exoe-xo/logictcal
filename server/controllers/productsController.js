const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('📦 Products fetched:', products.length);
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
