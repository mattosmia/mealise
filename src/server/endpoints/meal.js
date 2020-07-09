const express = require('express');
const auth = require('../middleware/auth');
const MealController = require('../controllers/meal');

const router = express.Router();

router.get('/', auth, MealController.getMeals);
router.post('/add', auth, MealController.addMeal);
router.post('/edit', auth, MealController.editMeal);
router.post('/delete', auth, MealController.deleteMeal);
router.post('/reorder', auth, MealController.reorderMeals);

module.exports = router;