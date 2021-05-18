const jwt = require("jsonwebtoken");
const Course = require("../models/Course");

const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    // TODO: ON expiresIn option
    // { expiresIn: "6h" },
  );

  await user.populate("myCourses").execPopulate();
  await user.populate("favoriteCourses").execPopulate();

  res.json({
    ok: true,
    data: { user, token },
  });
});

exports.addFavoriteCourse = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const isBookmarked = user.favoriteCourses.includes(courseId);

  if (isBookmarked) {
    const error = new Error("이미 등록되어 있습니다.");

    error.status = 400;
    return next(error);
  }

  const newCourse = await Course.findByIdAndUpdate(
    courseId,
    { $push: { favorites: user._id } },
    { new: true },
  );

  user.favoriteCourses.push(courseId);
  await user.save();

  res.json({
    ok: true,
    data: newCourse,
  });
});

exports.deleteFavoriteCourse = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const isBookmarked = user.favoriteCourses.includes(courseId);

  if (!isBookmarked) {
    const error = new Error("좋아요 목록에 존재하지 않습니다.");

    error.status = 400;
    return next(error);
  }

  const newCourse = await Course.findByIdAndUpdate(
    courseId,
    { $pull: { favorites: user._id } },
    { new: true },
  );

  user.favoriteCourses.pull(courseId);
  await user.save();

  res.json({
    ok: true,
    data: newCourse,
  });
});
