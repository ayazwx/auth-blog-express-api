const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/", async (req, res) => {
  try {
    return res.status(200).send('This is the hello root route.');
  } catch (error) {
    console.error('Error fetching or processing data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;