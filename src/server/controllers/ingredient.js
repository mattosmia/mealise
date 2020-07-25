const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// Ingredient Schema
function IngredientData(data) {
}

/**
  * List ingredients
  * @returns {Object}
**/
exports.getIngredients = [
	function (req, res) {
    try {
      let ingredientQuery = { userId: req.user.userId };
      const ingredientList = req.query.ingredientList;

      if (ingredientList) {
        const ingredientArray = ingredientList.split('|');
        ingredientQuery = {
          ...ingredientQuery,
          _id: { $in: ingredientArray }
        }
      }

      Ingredient.find(ingredientQuery).sort('name').then(ingredients =>
      apiResponse.success(res, 'Success', ingredients))
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
	}
];


/**
  * Add new ingredient
  * @returns {Object}
**/
exports.addIngredient = [
	function (req, res) {
		try {
			const ingredient = new Ingredient({
        userId: req.user.userId,
        name: req.body.name,
        unit: req.body.unit,
      })
      ingredient.save().then(result => {
			  return apiResponse.success(res, 'Ingredient added successfully', { result })}
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * Edit ingredient
  * @returns {Object}
**/
exports.editIngredient = [
	function (req, res) {
		try {
      Ingredient.updateOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        },
        { $set:
          { 
            name: req.body.name,
            unit: req.body.unit
          }
        }
      ).then(() => 
          apiResponse.success(res, 'Ingredient updated successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * delete ingredient
  * @returns {Object}
**/
exports.deleteIngredient = [
  function (req, res) {
    try {
      Recipe.updateMany(
        {
          userId: req.user.userId
        },
        {
          $pull: {
            ingredients: {
              _id: req.body._id
            }
          }
        }
      ).then(() => {
        Ingredient.deleteOne(
          {
            _id: req.body._id,
            userId: req.user.userId
          }
        ).then(() => 
          apiResponse.success(res, 'Ingredient deleted successfully')
        )
      }).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];