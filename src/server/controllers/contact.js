const apiResponse = require('../helpers/responses');

// const { body,validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv').config()
}

/**
  * Submit contact form
  * @returns {Object}
**/
exports.sendForm = [
  function (req, res) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: 'info@mealise.com',
        from: 'noreply@mealise.com',
        subject: '[Mealise] Contact form - ' + req.body.subject,
        html: '<p>Name: ' + req.body.name + '</p>' +
        '<p>Email: ' + req.body.email + '</p>' +
        '<p>Message: ' + req.body.message + '</p>'
      }
      sgMail.send(msg);
      return apiResponse.success(res, 'Contact form submitted successfully!')
    } catch (err) {
      return apiResponse.serverError(res, err);
    }
  }
];
