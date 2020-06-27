const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  prefDateFormat: { type: String, required: false },
  acceptMkt: { type: Boolean, required: true },
  registrationDate: { type: Date, required: false },
  lastLogin: { type: Date, required: false },
  forgotPasswordToken: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);