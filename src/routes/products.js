const express = require("express")
const router = express.Router()
const Product = require("../models/products")
const { validationResult } = require("express-validator")
const requestSchema = require("../validators/validate-request-schema")
const validId = require("../validators/validate-req-param-id")

// Create a new product
router.post("/", requestSchema, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  const product = new Product({
    ...req.body,
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong.", errorMessage: error.message })
  }
})

// Get all products list
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", errorMessage: error })
  }
})

// Get one specific product by ID
router.get("/:id", [validId, getProduct], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", errorMessage: error })
  }
})

// Update a product information based on ID
router.patch("/:id", validId, async (req, res) => {})

// Delete one product by ID
router.delete("/:id", (req, res) => {})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product === null) {
      return res.status(404).json({ message: "Product not found." })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: err.message })
  }

  res.product = product
  next()
}

module.exports = router
