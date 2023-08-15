const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "HELLO MY FRIENDS!",
  });
});
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/glogin", UserController.googleLogin);

module.exports = router;
