const mongoose = require('mongoose');

const plannerRecipeSchema = mongoose.Schema({
  _id: { type: String, required: true }
})

const plannerSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  mealId: { type: String, required: true },
  recipes: {
    type: [plannerRecipeSchema]
  }
});

module.exports = mongoose.model('Planner', plannerSchema);