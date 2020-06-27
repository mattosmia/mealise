var express = require("express");
const MealController = require("../controllers/meal");

var router = express.Router();

router.get("/", MealController.getMeal);

module.exports = router;