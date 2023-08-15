const express = require("express");
const router = express.Router();

const pubsRouter = require("./pubsRouter.js");
const usersRouter = require("./usersRouter.js");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const historiesRouter = require("./historiesRouter.js");

const authentication = require("../middlewares/authentication");

router.use("/", usersRouter);
router.use("/pub", pubsRouter);

router.use(authentication);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/histories", historiesRouter);

module.exports = router;
