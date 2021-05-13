const mongoose = require("mongoose");

const Course = require("../models/Course");
const Site = require("../models/Site");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addCourse = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const course = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const convertedCourse = await Promise.all(course.map(async (site) => {
      const {
        fullName,
        shortName,
        region,
        index,
      } = site;
      let siteInDB = await Site.findOne({ fullName }, null, { session });

      if (siteInDB) {
        return { index, site: siteInDB._id };
      }

      [siteInDB] = await Site.create([{ fullName, shortName, region }], { session });

      return { index, site: siteInDB._id };
    }));

    const [newCourse] = await Course.create([{
      creator: userId,
      sites: convertedCourse,
    }], { session });

    await User.findByIdAndUpdate(
      userId,
      { $push: { myCourses: newCourse._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.json({
      ok: true,
      data: newCourse,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
});

exports.getCourseById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    // TODO: add error object creator
    return next(new Error("404"));
  }

  const course = await Course.findById(id);

  if (!course) {
    // TODO: add error object creator
    return next(new Error("404"));
  }

  course.sites.length > 0 && course.populate("sites.site");
  course.messages.length > 0 && course.populate("messages");

  await course.populate("creator").execPopulate();

  return res.json({
    ok: true,
    data: course,
  });
});
