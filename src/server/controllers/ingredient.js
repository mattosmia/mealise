const Ingredient = require('../models/ingredient');
const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// Ingredient Schema
function IngredientData(data) {
}

/**
  * List ingredient information
  * @returns {Object}
**/
exports.getIngredient = [
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