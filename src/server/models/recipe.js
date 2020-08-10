const mongoose = require('mongoose')

const recipeIngredientSchema = mongoose.Schema({
  _id: { type: String, required: true },
  qty: { type: Number, required: true },
})

const recipeSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  instructions: { type: String },
  ingredients: {
    type: [recipeIngredientSchema]
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)