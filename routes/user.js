const router = require("express").Router();

const userController = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticateUser");

router
  .route("/")
  .get(authenticateUser, userController.getUser);

router
  .route("/favoriteCourse/:courseId")
  .patch(authenticateUser, userController.addFavoriteCourse)
  .delete(authenticateUser, userController.deleteFavoriteCourse);

module.exports = router;
