const Planner = require('../models/planner');
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
			const rows = {

			}
            return apiResponse.success(res, 'Success', rows);
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];