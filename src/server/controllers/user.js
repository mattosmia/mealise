const User = require("../models/user");
const apiResponse = require("../endpoints/responses");
// const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");

// User Schema
function UserData(data) {
	this.id = data._id;
	this.firstName= data.firstName;
	this.lastName = data.lastName;
	this.email = data.email;
	this.password = data.password;
	this.acceptMkt = data.acceptMkt;
	this.registrationDate = data.registrationDate;
	this.lastLogin = data.lastLogin;
	this.forgotPasswordToken = data.forgotPasswordToken;
}

/**
  * List user information
  * @returns {Object}
**/
exports.getUser = [
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

/**
  * Logs user out
  * @returns {Object}
**/
exports.logoutUser = [
	function (req, res) {
		try {
			console.log('logging out....');
			return apiResponse.success(res, 'Logged out!');
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];