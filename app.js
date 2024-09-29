
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");


const api = require("./api");
const { connectDB } = require("./api/v1/config/dbconnect");



//config env file:
dotenv.config();

//DB connect:
connectDB();

//rest obj:
const app = express();
const PORT = process.env.PORT || 3001;

//middlewares:

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Serve static files (images will be accessible from /static/uploads/filename)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// api ENDPOINT:
app.use('/api', api);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//  error handling middleware with JSON responses
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/v1/`);
});

module.exports = app;
