const express = require('express');
const auth = require('../middleware/auth');
const PlannerController = require('../controllers/planner');

const router = express.Router();

router.get('/', auth, PlannerController.getPlanner);
router.post('/add', auth, PlannerController.addPlanner);
router.post('/delete', auth, PlannerController.deletePlanner);
router.post('/generatelist', auth, PlannerController.generateShoppingList);

module.exports = router;