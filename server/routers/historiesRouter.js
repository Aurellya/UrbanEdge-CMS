const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController");

router.get("/", HistoryController.getAllHistories);

module.exports = router;
