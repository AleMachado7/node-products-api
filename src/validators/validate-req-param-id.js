const mongoose = require("mongoose")

const validId = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Something went wrong.",
      errorMessage: "O Id informado é inválido.",
    })
  }
  next()
}

module.exports = validId
