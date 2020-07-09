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
			const rows = {

			}
            return apiResponse.success(res, 'Success', rows);
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];