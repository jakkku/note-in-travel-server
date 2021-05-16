const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const params = Object.values(req.params);
  const invalid = params.find((param) => !mongoose.isValidObjectId(param));

  if (invalid) {
    const error = new Error("Not Found Page");

    error.status = 404;
    return next(error);
  }

  next();
};
