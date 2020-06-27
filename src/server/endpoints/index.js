const express = require("express");
const app = express();

const userRouter = require("./user");
const plannerRouter = require("./planner");
const mealRouter = require("./meal");
const recipeRouter = require("./recipe");
const ingredientRouter = require("./ingredient");

app.use("/user", userRouter);
app.use("/planner", plannerRouter);
app.use("/meal", mealRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);

module.exports = app