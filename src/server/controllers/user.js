const User = require('../models/user');
const apiResponse = require('../helpers/responses');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv').config()
}

// User Schema
function UserData(data) {
  this.firstName= data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
  this.password = data.password;
  this.acceptMkt = data.acceptMkt;
  this.registrationDate = data.registrationDate;
  this.lastLogin = data.lastLogin;
  this.forgotPasswordToken = data.forgotPasswordToken;
}

/**
  * Check user is authenticated
  * @returns {Object}
**/
exports.check = [
  function (req, res) {
    try {
      User.findOne({ _id: req.user.userId }).then(user => {
        return apiResponse.success(res, 'Success', { id: user._id, email: user.email, firstName: user.firstName })
      })
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * List user information
  * @returns {Object}
**/
exports.details = [
  function (req, res) {
    try {
      const rows = {

      }
      return apiResponse.success(res, 'Success', rows);
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];

/**
  * Register new user
  * @returns {Object}
**/
exports.register = (req, res) => {
  bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT,10)).then(
    encryptedPassword => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPassword,
        acceptMkt: (req.body.acceptMkt? true : false)
      })
      user.save().then(() => 
        apiResponse.success(res, 'Registration successful')
      ).catch(err => 
        apiResponse.serverError(res, err)
      )
    }
  ).catch(err => 
    apiResponse.serverError(res, 'bcrypt error')
  )
}

/**
  * Log user in
  * @returns {Object}
**/
exports.login = (req, res) => {
  User.findOne({ email: { $regex: new RegExp('^' + req.body.email + '$','i') }}).then(
    user => {
      if (!user) {
        return apiResponse.unauthorised(res, 'User not found')
      }
      bcrypt.compare(req.body.password, user.password).then(
        isValid => {
          if (!isValid) return apiResponse.unauthorised(res, 'Incorrect password')
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });
          return apiResponse.success(res, 'Logged in', {
            userId: user._id,
            token
          })
        }
      ).catch(err => 
        apiResponse.serverError(res, 'bcrypt error')
      );
    }
  ).catch(err => 
    apiResponse.serverError(res, 'Error logging user in')
  )
}