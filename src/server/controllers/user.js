const User = require('../models/user');
const apiResponse = require('../helpers/responses');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const templates = require('../helpers/emailTemplate');

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
exports.getUser = [
  function (req, res) {
    try {
      User.findOne({ _id: req.user.userId }).then(user => {
        return apiResponse.success(res, 'Success', { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, acceptMkt: user.acceptMkt })
      })
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
      user.save().then(() => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: req.body.email,
          from: 'noreply@mealise.com',
          subject: 'Welcome to Mealise',
          text: templates.text(req.body.firstName,
            [
              'Thanks for joining Mealise - we\'re happy to have you!',
              'To start adding your recipes and planning your meals, go to https://mealise.com/planner'
            ]
          ),
          html: templates.html(req.body.firstName,
            [
              'Thanks for joining Mealise - we\'re happy to have you!',
              'To start adding your recipes and planning your meals, click <a href="https://mealise.com/planner" style="text-decoration: underline; color: #000000;">here</a>.'
            ]
          )
        }
        sgMail.send(msg);
        return apiResponse.success(res, 'Registration successful')
      }).catch(err => 
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

/**
  * Edit user - update profile
  * @returns {Object}
**/
exports.editUser = [
	function (req, res) {
		try {
      User.updateOne(
        {
          _id: req.user.userId
        },
        { $set:
          { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            acceptMkt: (req.body.acceptMkt? true : false)
          }
        }
      ).then(() => 
        apiResponse.success(res, 'User updated successfully')
      ).catch(err => 
        apiResponse.serverError(res, err)
		  )
		} catch (err) {
			return apiResponse.serverError(res, err);
		}
	}
];

/**
  * Edit user - update password
  * @returns {Object}
**/
exports.editUserPassword = [
	function (req, res) {
		try {
      User.findOne({ _id: req.user.userId }).then(
        user => {
          if (!user) {
            return apiResponse.unauthorised(res, 'User not found')
          }
          bcrypt.compare(req.body.currentPassword, user.password).then(
            isValid => {
            if (!isValid) return apiResponse.serverError(res, 'Current password is incorrect')

            bcrypt.hash(req.body.newPassword, parseInt(process.env.BCRYPT_SALT,10)).then(
              encryptedPassword => {
                User.updateOne(
                  {
                    _id: req.user.userId
                  },
                  { $set:
                    { 
                      password: encryptedPassword,
                    }
                  }
                ).then(() => {
                  const sgMail = require('@sendgrid/mail');
                  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                    to: user.email,
                    from: 'noreply@mealise.com',
                    subject: '[Mealise] Password updated',
                    text: templates.text(user.firstName,
                      [
                        'Your password has been successfully updated.',
                        'If you didn\'t make this change, please reset your password now at https://mealise.com/forgot-password, or get in touch with our team at help@mealise.com'
                      ]
                    ),
                    html: templates.html(user.firstName,
                      [
                        'Your password has been successfully updated.',
                        'If you didn\'t make this change, please reset your password now by clicking <a href="https://mealise.com/forgot-password" style="text-decoration: underline; color: #000000;">here</a>, or get in touch with our team at <a href="mailto:help@mealise.com" style="text-decoration: underline; color: #000000;">help@mealise.com</a>'
                      ]
                    )
                  }
                  sgMail.send(msg);
                  return apiResponse.success(res, 'User updated successfully')
                }).catch(err => 
                  apiResponse.serverError(res, err)
                )
            }).catch (err => apiResponse.serverError(res, err))
          }).catch (err => apiResponse.serverError(res, err))
      })
    } catch (err) {
			return apiResponse.serverError(res, err);
		}
  }
];


/**
  * Reset password - generate token
  * @returns {Object}
**/
exports.generateResetToken = [
	function (req, res) {
		try {
      const { uuid } = require('uuidv4');
      const resetToken = uuid();
      const resetTokenExpiry = new Date(Date.now() + 24*60*60*1000);

      User.findOne({ email: { $regex: new RegExp('^' + req.body.email + '$','i') } }).then(
        user => {
          if (!user) {
            return apiResponse.success(res, 'Password token successfully generated') // same message as proper success for security
          }
          User.updateOne(
            {
              _id: user._id
            },
            { $set:
              { 
                resetToken,
                resetTokenExpiry
              }
            }
          ).then(() => {
            const sgMail = require('@sendgrid/mail');
            const emailLink = `https://mealise.com/reset-password/${user._id}-${resetToken}`;
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: user.email,
              from: 'noreply@mealise.com',
              subject: '[Mealise] Reset Password',
              text: templates.text(user.firstName,
                [
                  'To reset your password, copy and paste the following link in your browser: ' + emailLink,
                  'Please note this token is only valid for 24 hours - after this time you will need to reset your password again.'
                ]
              ),
              html: templates.html(user.firstName,
                [
                  'To reset your password, click <a href="' + emailLink + '" style="text-decoration: underline; color: #000000;">here</a>, or copy and paste the following link in your browser: <a href="' + emailLink + '" style="text-decoration: underline; color: #000000;">' + emailLink + '</a>',
                  'Please note this token is only valid for <strong>24 hours</strong> - after this time you will need to reset your password again.'
                ]
              )
            }
            sgMail.send(msg);
            return apiResponse.success(res, 'Password token successfully generated')
          }).catch(err => 
            apiResponse.serverError(res, err)
          )
        }).catch (err => apiResponse.serverError(res, err))
    } catch (err) {
			return apiResponse.serverError(res, err);
		}
  }
];

/**
  * Reset password - check token
  * @returns {Object}
**/
exports.checkResetToken = [
	function (req, res) {
		try {
      User.findOne({ _id: req.query.userId, resetToken: req.query.resetToken, resetTokenExpiry: { $gte: Date.now() } })
      .then(user => 
        apiResponse.success(res, 'Checked token successfully', { email: user.email, firstName: user.firstName })
      )
      .catch (err => apiResponse.serverError(res, err))
    } catch (err) {
			return apiResponse.serverError(res, err);
		}
  }
];


/**
  * Reset password - update password
  * @returns {Object}
**/
exports.resetPassword = [
	function (req, res) {
		try {
      bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT,10)).then(
        encryptedPassword => {
          User.updateOne(
            {
              _id: req.body.userId,
              email: req.body.email,
              resetToken: req.body.resetToken
            },
            { $set:
              { 
                password: encryptedPassword,
                resetToken: null,
                resetTokenExpiry: null
              }
            }
          ).then(() => {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: req.body.email,
              from: 'noreply@mealise.com',
              subject: '[Mealise] Your password was successfully reset',
              text: templates.text(req.body.firstName,
                [
                  'Your password has been successfully updated.',
                  'If you didn\'t make this change, please reset your password now at https://mealise.com/forgot-password, or get in touch with our team at help@mealise.com'
                ]
              ),
              html: templates.html(req.body.firstName,
                [
                  'Your password has been successfully updated.',
                  'If you didn\'t make this change, please reset your password now by clicking <a href="https://mealise.com/forgot-password" style="text-decoration: underline; color: #000000;">here</a>, or get in touch with our team at <a href="mailto:help@mealise.com" style="text-decoration: underline; color: #000000;">help@mealise.com</a>'
                ]
              )
            }
            sgMail.send(msg);
            return apiResponse.success(res, 'Password updated successfully')
          }).catch(err =>
            apiResponse.serverError(res, err)
          )
      }).catch (err => 
          apiResponse.serverError(res, err))
    } catch (err) {
			return apiResponse.serverError(res, err);
		}
  }
];