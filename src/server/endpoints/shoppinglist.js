const express = require('express');
const auth = require('../middleware/auth');
const ShoppingListController = require('../controllers/shoppinglist');

const router = express.Router();

router.get('/', auth, ShoppingListController.getShoppingList);

module.exports = router;