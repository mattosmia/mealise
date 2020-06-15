const express = require("express")
const app = express()

const path = require("path")

const bodyParser = require('body-parser')

// const endpoints = require("./endpoints/index")
const endpointResp = require("./endpoints/responses")

const cors = require("cors")

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv').config()
}

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join('client', 'build')))

// app.use("/api/", endpoints)


// app.get('/*', (request, response) => {
// 	response.sendFile('index.html', { root: './client/build' })
// })

app.listen(port, () => console.log("Server started on port " + port))


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
app.get('/sendgridtest', (request, response) => {
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
	  to: 'mattosmia@gmail.com',
	  from: 'noreply@mealise.com',
	  subject: 'Sending with Twilio SendGrid is Fun',
	  text: 'and easy to do anywhere, even with Node.js',
	  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	sgMail.send(msg);
})

// 404 if URL not found
app.all("*", function(req, res) {	
	return endpointResp.notFound(res, "Page not found")
})