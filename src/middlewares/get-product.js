const Product = require("../models/products")

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product === null) {
      return res.status(404).json({ message: "Product not found." })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: error.message })
  }

  res.product = product
  next()
}

module.exports = getProduct
