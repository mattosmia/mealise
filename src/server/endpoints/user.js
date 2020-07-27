const express = require('express');
const auth = require('../middleware/auth');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', auth, UserController.getUser);
router.get('/check', auth, UserController.check);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/edit', auth, UserController.editUser);
router.post('/editpwd', auth, UserController.editUserPassword);
router.post('/delete', auth, UserController.deleteAccount);
router.post('/forgotpassword', UserController.generateResetToken);
router.get('/resetpassword', UserController.checkResetToken);
router.post('/resetpassword', UserController.resetPassword);

module.exports = router;