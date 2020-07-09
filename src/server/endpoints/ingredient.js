const express = require('express');
const auth = require('../middleware/auth');
const IngredientController = require('../controllers/ingredient');

const router = express.Router();

router.get('/', auth, IngredientController.getIngredient);

module.exports = router;