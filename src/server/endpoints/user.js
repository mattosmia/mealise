const express = require('express');
const auth = require('../middleware/auth');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', auth, UserController.details);
router.get('/check', auth, UserController.check);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;