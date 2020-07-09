const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prefDateFormat: { type: String, required: false },
  acceptMkt: { type: Boolean, required: true },
  registrationDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, required: false },
  forgotPasswordToken: { type: String, required: false },
  forgotPasswordTokenExpiry: { type: Date, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);