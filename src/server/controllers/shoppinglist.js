const ShoppingList = require('../models/shoppinglist');
const User = require('../models/user');
const apiResponse = require('../helpers/responses');
const templates = require('../helpers/emailTemplate');
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
      ShoppingList.find({ userId: req.user.userId }).sort({created: -1}).then(shoppingLists =>
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
  * edit shopping list
  * @returns {Object}
**/
exports.editShoppingList = [
  function (req, res) {
    try {
      ShoppingList.updateOne(
        {
          _id: req.body._id,
          userId: req.user.userId
        },
        { $set:
          { 
            name: req.body.name,
            items: req.body.items
          }
        }
      ).then(() => 
          apiResponse.success(res, 'Shopping list updated successfully')
		  ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
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


/**
  * email shopping list
  * @returns {Object}
**/
exports.emailShoppingList = [
  function (req, res) {
    try {
      User.findOne({ _id: req.user.userId }).then(
        user => {
          if (!user) {
            return apiResponse.unauthorised(res, 'User not found')
          }
          const shoppingListItems = req.body.shoppingList.items.map(item => `- ${item}`);
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: user.email,
            from: 'noreply@mealise.com',
            subject: `[Mealise] Shopping List - ${req.body.shoppingList.name}`,
            text: templates.text(user.firstName,
              [
                `Here\'s your shopping list ${req.body.shoppingList.name} as requested:`,
                shoppingListItems.join('\n')
              ]
            ),
            html: templates.html(user.firstName,
              [
                `Here\'s your shopping list ${req.body.shoppingList.name} as requested:`,
                shoppingListItems.join('<br>')
              ]
            )
          }
          sgMail.send(msg);
          return apiResponse.success(res, 'Shopping list emailed successfully')
      })
    } catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];