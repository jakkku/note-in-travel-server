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
      let siteInDB = await Site.findOne({ fullName: site.fullName }, null, { session });

      if (siteInDB) {
        return { index: site.index, site: siteInDB._id };
      }

      const { fullName, shortName, region } = site;

      [siteInDB] = await Site.create([{ fullName, shortName, region }], { session });

      return { index: site.index, site: siteInDB._id };
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
