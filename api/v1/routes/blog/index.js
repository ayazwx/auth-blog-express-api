const express = require("express");

const addRouter = require("./add");

const router = express.Router();


router.use("/add", addRouter);
router.use("/update", require("./update"));
router.use("/all", require("./all"));

module.exports = router;