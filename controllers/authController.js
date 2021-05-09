const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.login = async (req, res, next) => {
  const { email, name, photoUrl } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name, photoUrl });
  }

  res.json({
    ok: true,
    data: user,
  });
};
