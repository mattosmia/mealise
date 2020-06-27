var express = require("express");
const UserController = require("../controllers/user");

var router = express.Router();

router.get("/", UserController.getUser);
router.post("/logout", UserController.logoutUser);

module.exports = router;