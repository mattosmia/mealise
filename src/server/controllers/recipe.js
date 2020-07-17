const Recipe = require('../models/recipe');
const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// Recipe Schema
function RecipeData(data) {
}

/**
  * List recipe information
  * @returns {Object}
**/
exports.getRecipe = [
  function (req, res) {
    try {
      Recipe.find({ userId: req.user.userId }).sort('order').then(recipes =>
        apiResponse.success(res, 'Success', recipes))
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];


/**
  * Add new recipe
  * @returns {Object}
**/
exports.addRecipe = [
  function (req, res) {
    try {
      const recipe = new Recipe({
        userId: req.user.userId,
        name: req.body.name,
        description: req.body.description,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
      })
      recipe.save().then(result => {
        return apiResponse.success(res, 'Recipe added successfully', { result })}
      ).catch(err => 
        apiResponse.serverError(res, err)
      )
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Edit recipe
  * @returns {Object}
**/
exports.editRecipe = [
	function (req, res) {
		try {
      Recipe.updateOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        },
        { $set:
          { 
            name: req.body.name,
            description: req.body.description,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients
          }
        }
      ).then(() => 
          apiResponse.success(res, 'Recipe updated successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * delete recipe
  * @returns {Object}
**/
exports.deleteRecipe = [
  function (req, res) {
    try {
      Recipe.deleteOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        }
      ).then(() => 
          apiResponse.success(res, 'Recipe deleted successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];