module.exports = (req, res, next) => {
  if (!req.user) {
    const error = new Error("로그인이 필요합니다.");
    error.status = 401;

    return next(error);
  }

  next();
};
