const Recipe = require('../models/recipe');
const apiResponse = require('../helpers/responses');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

// ShoppingList Schema
function ShoppingListData(data) {
}

/**
  * List shopping list information
  * @returns {Object}
**/
exports.getShoppingList = [
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