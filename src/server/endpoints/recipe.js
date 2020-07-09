const express = require('express');
const auth = require('../middleware/auth');
const RecipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', auth, RecipeController.getRecipe);

module.exports = router;