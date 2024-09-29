const express = require("express");

const indexRouter = require("./routes");
const helloRouter = require("./routes/hello");

const router = express.Router();


router.use("/hello", helloRouter);
router.use("/", indexRouter);
router.use("/register", require("./routes/register"));
router.use("/login", require("./routes/login"));
router.use("/dashboard", require("./routes/dashboard"));
router.use("/blog", require("./routes/blog"));

module.exports = router;