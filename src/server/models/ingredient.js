const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    unit: { type: String, required: true },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);