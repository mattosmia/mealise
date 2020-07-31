const mongoose = require('mongoose');

const plannerSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  mealId: { type: String, required: true },
  recipeId: { type: String, required: true },
  recipePortion: { type: Number, default: 1 },
});

module.exports = mongoose.model('Planner', plannerSchema);