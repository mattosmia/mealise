const express = require("express");
const app = express();

const userRouter = require("./user");
const plannerRouter = require("./planner");
const mealRouter = require("./meal");
const recipeRouter = require("./recipe");
const ingredientRouter = require("./ingredient");
const shoppingListRouter = require("./shoppinglist");
const contactRouter = require("./contact");

app.use("/user", userRouter);
app.use("/planner", plannerRouter);
app.use("/meal", mealRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/shoppinglist", shoppingListRouter);
app.use("/contact", contactRouter);

module.exports = app