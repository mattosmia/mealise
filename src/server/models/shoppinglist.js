const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    items: { type: Array, required: true },
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);