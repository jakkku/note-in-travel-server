const router = require("express").Router();

const authenticateUser = require("../middlewares/authenticateUser");
const courseController = require("../controllers/courseController");
const verifyParams = require("../middlewares/verifyParams");

router
  .route("/")
  .post(authenticateUser, courseController.addCourse);

router
  .route("/:courseId")
  .get(authenticateUser, verifyParams, courseController.getCourseById)
  .post(authenticateUser, verifyParams, courseController.saveMessage);

module.exports = router;
