var express = require("express");
const PlannerController = require("../controllers/planner");

var router = express.Router();

router.get("/", PlannerController.getPlanner);

module.exports = router;