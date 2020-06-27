const Meal = require("../models/meal");
const apiResponse = require("../endpoints/responses");
// const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");

// Meal Schema
function MealData(data) {
}

/**
  * List meal information
  * @returns {Object}
**/
exports.getMeal = [
	function (req, res) {
		try {
			const rows = {

			}
            return apiResponse.success(res, "Success", rows);
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];