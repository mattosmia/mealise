var express = require("express");
const ShoppingListController = require("../controllers/shoppinglist");

var router = express.Router();

router.get("/", ShoppingListController.getShoppingList);

module.exports = router;