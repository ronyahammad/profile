const express = require("express");
const router = express.Router();
const { WeatherInfo } = require('../controllers/apiInfo');



router.route("/weather").post(WeatherInfo);

module.exports = router;