const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);