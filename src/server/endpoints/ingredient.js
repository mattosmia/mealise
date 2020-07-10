const express = require('express');
const auth = require('../middleware/auth');
const IngredientController = require('../controllers/ingredient');

const router = express.Router();

router.get('/', auth, IngredientController.getIngredients);
router.post('/add', auth, IngredientController.addIngredient);
router.post('/edit', auth, IngredientController.editIngredient);
router.post('/delete', auth, IngredientController.deleteIngredient);

module.exports = router;