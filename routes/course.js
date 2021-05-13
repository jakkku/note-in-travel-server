const router = require("express").Router();

const authenticateUser = require("../middlewares/authenticateUser");
const courseController = require("../controllers/courseController");

router
  .route("/")
  .post(authenticateUser, courseController.addCourse);

router
  .route("/:id")
  .get(authenticateUser, courseController.getCourseById);

module.exports = router;
