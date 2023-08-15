const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const deleteAuthorization = require("../middlewares/deleteAuthorization");
const modifyAuthorization = require("../middlewares/modifyAuthorization");

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", deleteAuthorization, ProductController.deleteProduct);
router.put("/:id", deleteAuthorization, ProductController.replaceProduct);
router.patch("/:id", modifyAuthorization, ProductController.modifyProduct);

module.exports = router;
