const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    items: { type: Array, required: true },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);