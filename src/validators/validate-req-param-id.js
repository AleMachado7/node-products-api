const mongoose = require("mongoose")

const validId = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Error. Invalid object id.",
    })
  }
  next()
}

module.exports = validId
