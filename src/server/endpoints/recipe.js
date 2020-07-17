const express = require('express');
const auth = require('../middleware/auth');
const RecipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', auth, RecipeController.getRecipe);
router.post('/add', auth, RecipeController.addRecipe);
router.post('/edit', auth, RecipeController.editRecipe);
router.post('/delete', auth, RecipeController.deleteRecipe);

module.exports = router;