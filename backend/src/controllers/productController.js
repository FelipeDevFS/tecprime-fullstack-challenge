const productService = require('../services/productService')

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts()
    return res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error.message)
    return res.status(500).json({ message: 'Failed to fetch products' })
  }
}

module.exports = {
  getProducts
}