const express = require("express")
const router = express.Router()
const Product = require("../models/products")
const { validationResult } = require("express-validator")
const validatePostSchema = require("../validators/validate-request-schema")
const validateRequestId = require("../validators/validate-req-param-id")
const getProduct = require("../middlewares/get-product")

// Create a new product
router.post("/", validatePostSchema, async (req, res) => {
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
      .json({ message: "Something went wrong.", errorMessage: error.message })
  }
})

// Get one specific product by ID
router.get("/:id", [validateRequestId, getProduct], async (req, res) => {
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
      .json({ message: "Something went wrong.", errorMessage: error.message })
  }
})

// Update a product information based on ID
router.patch("/:id", [validateRequestId, getProduct], async (req, res) => {
  if (req.body.id) {
    delete req.body.id
  }
  Object.assign(res.product, req.body)

  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong.", errorMessage: error.message })
  }
})

// Delete one product by ID
router.delete("/:id", [validateRequestId, getProduct], async (req, res) => {
  try {
    const deletedProduct = res.product
    await res.product.remove()
    res.json({ message: "Product deleted.", deletedProduct })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", errorMessage: error.message })
  }
})

module.exports = router
