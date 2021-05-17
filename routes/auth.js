const router = require("express").Router();

const authController = require("../controllers/authController");
const authenticateUser = require("../middlewares/authenticateUser");

router
  .route("/login")
  .post(authController.login);

router
  .route("/user")
  .get(authenticateUser, authController.getUser);

module.exports = router;
