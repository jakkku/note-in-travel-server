const router = require("express").Router();

const authenticateUser = require("../middlewares/authenticateUser");
const courseController = require("../controllers/courseController");

router
  .route("/")
  .post(authenticateUser, courseController.addCourse);

module.exports = router;
