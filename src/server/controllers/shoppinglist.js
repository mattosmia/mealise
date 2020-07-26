const ShoppingList = require('../models/shoppinglist');
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
      ShoppingList.find({ userId: req.user.userId }).sort('order').then(shoppingLists =>
        apiResponse.success(res, 'Success', shoppingLists))
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Add new shopping list
  * @returns {Object}
**/
exports.addShoppingList = [
	function (req, res) {
		try {
			const shoppingList = new ShoppingList({
        userId: req.user.userId,
        name: req.body.name,
        items: req.body.items,
      })
      shoppingList.save().then(result => {
        return apiResponse.success(res, 'Shopping list added successfully', { result })}
      ).catch(err => 
        apiResponse.serverError(res, err)
      )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];


/**
  * delete shopping list
  * @returns {Object}
**/
exports.deleteShoppingList = [
  function (req, res) {
    try {
      ShoppingList.deleteOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        }
      ).then(() => 
        apiResponse.success(res, 'Shopping list deleted successfully')
      ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];