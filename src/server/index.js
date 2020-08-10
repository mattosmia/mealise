const express = require("express");
const app = express();

const sslRedirect = require('heroku-ssl-redirect');
app.use(sslRedirect());

const path = require("path");

const bodyParser = require('body-parser');

const endpoints = require("./endpoints/index");
const endpointResp = require("./helpers/responses");

const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv').config()
}
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

app.use("/api", endpoints);

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: './dist' }), function(err) {
    if (err) {
    res.status(500).send(err)
    }
  }
});

app.listen(port, () => {
  console.log("Server started on port " + port)
  mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => {
    console.error('Unable to connect to MongoDB Atlas!', err);
  })
})