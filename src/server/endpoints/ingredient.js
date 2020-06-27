var express = require("express");
const IngredientController = require("../controllers/ingredient");

var router = express.Router();

router.get("/", IngredientController.getIngredient);

module.exports = router;