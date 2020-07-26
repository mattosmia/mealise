const express = require('express');
const auth = require('../middleware/auth');
const ShoppingListController = require('../controllers/shoppinglist');

const router = express.Router();

router.get('/', auth, ShoppingListController.getShoppingList);
router.post('/add', auth, ShoppingListController.addShoppingList);
router.post('/delete', auth, ShoppingListController.deleteShoppingList);

module.exports = router;