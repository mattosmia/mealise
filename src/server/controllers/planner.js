const Planner = require('../models/planner');
const Recipes = require('../models/recipe');
const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// Planner Schema
function PlannerData(data) {
}

/**
  * List planner information
  * @returns {Object}
**/
exports.getPlanner = [
  function (req, res) {
    try {
    if (!req.query.plannerRange) return
    const dateRange = req.query.plannerRange.split('|');
    Planner.find({
      userId: req.user.userId,
      date: {
        $gte: new Date(new Date(dateRange[0]).setHours(0,0,0,0)),
        $lte: new Date(new Date(dateRange[(dateRange.length - 1)]).setHours(23,59,59,999))
      }
    }).then(planner => {
      const plannerObject = {};
      planner.forEach(p => {
        const date = `${p.date.getFullYear()}-${(p.date.getMonth() + 1)}-${p.date.getDate()}`;
        if (!plannerObject[date]) plannerObject[date] = {};
        if (!plannerObject[date][p.mealId]) plannerObject[date][p.mealId] = [];
        p.recipes.forEach(r => plannerObject[date][p.mealId].push(r._id))
      })
      apiResponse.success(res, 'Success', plannerObject)
    })
    } catch (err) {
      console.log(err)
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Add new planned meal
  * @returns {Object}
**/
exports.addPlanner = [
  function (req, res) {
    try {
      const plannedMeal = new Planner({
        userId: req.user.userId,
        date: req.body.date,
        mealId: req.body.mealId,
        recipes: [{ _id: req.body.recipeId }]
      })

      plannedMeal.save().then(result => {
        return apiResponse.success(res, 'Planned meal added successfully', { result })}
      ).catch(err => 
        apiResponse.serverError(res, err)
      )
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Generate shopping list
  * @returns {Object}
**/
exports.generateShoppingList = [
  function (req, res) {
    try {
      if (!req.body.recipeIds) return
      Recipes.find({
        userId: req.user.userId,
        _id: {
          $in: [req.body.recipeIds]
        }
      }).then(recipes =>
        apiResponse.success(res, 'Success', recipes.ingredients))
      } catch (err) {
        console.log(err)
        return apiResponse.serverError(res, err);
      }

      aggregate.lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'users' });
  }
];