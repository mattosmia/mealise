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
        plannerObject[date][p.mealId].push({ _id: p.recipeId, portion: p.recipePortion})
      })
      apiResponse.success(res, 'Success', plannerObject)
    })
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Add new planned meal (recipe)
  * @returns {Object}
**/
exports.addPlanner = [
  function (req, res) {
    try {
      Planner.findOneAndUpdate(
        {
          userId: req.user.userId,
          date: req.body.date,
          mealId: req.body.mealId,
          recipeId: req.body.recipeId,
        },
        {
          $set:
            {
              recipePortion: req.body.recipePortion
            }
        },
        {
          new: true,
          upsert: true
        }
      ).then(result => {
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
  * Delete planned meal (recipe)
  * @returns {Object}
**/
exports.deletePlanner = [
  function (req, res) {
    try {
      Planner.deleteOne(
        {
          userId: req.user.userId,
          date: req.body.date,
          mealId: req.body.mealId,
          recipeId: req.body.recipeId
        }
      ).then(() => 
          apiResponse.success(res, 'Planned meal deleted successfully')
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
        plannerObject[date][p.mealId].push({ _id: p.recipeId, portion: p.recipePortion})
      })
      apiResponse.success(res, 'Success', plannerObject)
    })
    } catch (err) {
      console.log(err)
      return apiResponse.serverError(res, err);
    }
  }
];