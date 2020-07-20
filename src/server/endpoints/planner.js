const express = require('express');
const auth = require('../middleware/auth');
const PlannerController = require('../controllers/planner');

const router = express.Router();

router.get('/', auth, PlannerController.getPlanner);
router.post('/add', auth, PlannerController.addPlanner);

module.exports = router;