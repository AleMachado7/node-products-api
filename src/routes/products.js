const express = require("express")
const router = express.Router()
const Product = require("../models/products")

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
router.get("/:id", async (req, res) => {})

// Create a new product
router.post("/", (req, res) => {})

// Update a product information based on ID
router.patch("/:id", (req, res) => {})

// Delete one product by ID
router.delete("/:id", (req, res) => {})

module.exports = router
