const Meal = require('../models/meal');
const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// Meal Schema
function MealData(data) {
  this._id = data._id;
  this.name = data.name;
  this.colour = data.colour;
  this.order = data.order;
}

/**
  * List meals
  * @returns {Object}
**/
exports.getMeals = [
  function (req, res) {
    try {
      Meal.find({ userId: req.user.userId }).then(meals =>
        apiResponse.success(res, 'Success', meals))
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];


/**
  * Add new meal
  * @returns {Object}
**/
exports.addMeal = [
	function (req, res) {
		try {
			const meal = new Meal({
        userId: req.user.userId,
        name: req.body.name,
        colour: req.body.colour,
      })
      meal.save().then(result => {
			  return apiResponse.success(res, 'Meal added successfully', { result })}
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * Edit meal
  * @returns {Object}
**/
exports.editMeal = [
	function (req, res) {
		try {
      Meal.updateOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        },
        { $set:
          { 
            name: req.body.name,
            colour: req.body.colour
          }
        }
      ).then(() => 
          apiResponse.success(res, 'Meal updated successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * delete meal
  * @returns {Object}
**/
exports.deleteMeal = [
  function (req, res) {
    try {
       return apiResponse.success(res, 'Success')
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * reorder meals
  * @returns {Object}
**/
exports.reorderMeals = [
  function (req, res) {
    try {
       return apiResponse.success(res, 'Success')
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];
