const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const mealSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    colour: { type: String, required: true },
    order: { type: Number },
})

mealSchema.plugin(autoIncrement, { id: 'order_sequence', inc_field: 'order', reference_fields: 'userId' });

module.exports = mongoose.model('Meal', mealSchema)