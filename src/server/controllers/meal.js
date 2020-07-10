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
      Meal.deleteOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        }
      ).then(() => 
          apiResponse.success(res, 'Meal deleted successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
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
      const allUpdates = req.body.meals.map((meal, order) => (
          Meal.findOneAndUpdate(
            {
              _id: meal._id,
              userId: req.user.userId
            },
            {
              $set:
                {
                  order
                }
            }
          )
        )
      ) 
      
      Promise.all(allUpdates)
        .then(() =>
          apiResponse.success(res, 'Meals reordered successfully')
        ).catch(() =>
          apiResponse.serverError(res, err)
        )
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];
