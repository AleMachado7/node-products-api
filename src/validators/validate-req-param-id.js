const { param } = require("express-validator")

const validId = [
  param("id").isMongoId().withMessage("O Id informado é inválido!"),
]

module.exports = validId
