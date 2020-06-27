const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
});

module.exports = mongoose.model('Ingredient', ingredientSchema);