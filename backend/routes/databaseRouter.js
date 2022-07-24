const express = require("express");
const router = express.Router();
const { getDatabase } = require("../controller/databaseController");

router.get("/:id", getDatabase);

module.exports = router;
