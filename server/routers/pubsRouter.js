const express = require("express");
const router = express.Router();
const PubController = require("../controllers/pubController");
const customAuthentication = require("../middlewares/customAuthentication");

router.post("/login", PubController.login);
router.post("/register", PubController.register);
router.post("/glogin", PubController.googleLogin);

router.get("/products", PubController.getAllProducts);
router.get("/products/:id", PubController.getProductById);
router.get("/categories", PubController.getAllCategories);

router.use(customAuthentication);
router.get("/bookmarks", PubController.getAllBookmarks);
router.post("/bookmarks/:ProductId", PubController.addBookmark);
router.delete("/bookmarks/:id", PubController.deleteBookmark);

module.exports = router;
