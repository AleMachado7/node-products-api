const { body } = require("express-validator")

const requestSchema = [
  body("title")
    .isLength({ min: 5 })
    .escape()
    .withMessage("O campo titulo deve ter no mínimo 5 caracteres."),
  body("description")
    .isLength({ min: 10 })
    .withMessage("O campo descrição deve ter no mínimo 10 caracteres."),
  body("price")
    .isFloat({ min: 0 })
    .withMessage(
      "O campo preço deve ser um valor numérico e maior ou igual a zero."
    ),
  body("category")
    .notEmpty()
    .withMessage("O campo categoria não pode ser vazio."),
]

module.exports = requestSchema
