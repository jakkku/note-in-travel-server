const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.login = async (req, res, next) => {
  const { email, name, photo } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name, photo });
  }

  res.json({
    ok: true,
    data: user,
  });
};
