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
          text: `Hello ${req.body.firstName},
Thanks for joining Mealise - we're happy to have you!
To start adding your recipes and planning your meals, go to https://mealise.com/login.
Have a great day!
- the Mealise team`,
          html: `Hello ${req.body.firstName},
Thanks for joining Mealise - we're happy to have you!
To start adding your recipes and planning your meals, click <a href="https://mealise.com/login">here</a>.
Have a great day!
<em>- the Mealise team</em>`,
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
                    subject: 'Mealise - Password updated',
                    text: `Hello ${user.firstName},
Your password has been successfully updated.
If you didn't make this change, please reset your password now at https://mealise.com/forgot-password
- the Mealise team`,
                    html: `Hello ${user.firstName},
Your password has been successfully updated.
If you didn't make this change, please reset your password now by clicking <a href="https://mealise.com/forgot-password">here</a>
- the Mealise team`,
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
              subject: 'Mealise - Reset Password',
              text: 'Hello ' + user.firstName + '\n\n'+
              'To reset your password, copy and paste this link in your browser: ' + emailLink + '.\n\n'+
              'Please note this token will only last <strong>24h</strong> - after this time you will need to reset your password again.\n\n' +
              '- the Mealise team',
              html: 'Hello ' + user.firstName + '<br><br>'+
              'To reset your password, click <a href="' + emailLink + '">here</a>.<br><br>'+
              'Please note this token will only last <strong>24h</strong> - after this time you will need to reset your password again.<br><br>' +
              'If you can\'t click the link above, copy and paste in your browser: ' + emailLink + '<br><br>'+
              '- the Mealise team',
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
              subject: 'Mealise - Your password was reset',
              text: 'Hello ' + req.body.firstName + '\n\n'+
              'Your password has been successfully updated.\n\n'+
              'If you didn\'t make this change, please reset your password now at https://mealise.com/forgot-password.\n\n'+
              '- the Mealise team',
              html: 'Hello ' + req.body.firstName + '<br><br>'+
              'Your password has been successfully updated.<br><br>'+
              'If you didn\'t make this change, please reset your password now by clicking <a href="https://mealise.com/forgot-password">here</a><br><br>'+
              '- the Mealise team',
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