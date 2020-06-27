var express = require("express");
const RecipeController = require("../controllers/recipe");

var router = express.Router();

router.get("/", RecipeController.getRecipe);

module.exports = router;