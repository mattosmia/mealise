var express = require("express")
var app = express()

var mealRouter = require("./meals")
var recipeRouter = require("./recipes")
var ingredientRouter = require("./ingredients")

app.use("/meals", mealRouter)
app.use("/recipes", recipeRouter)
app.use("/ingredients", ingredientRouter)

module.exports = app