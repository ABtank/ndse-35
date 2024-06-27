const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post("/logout", AuthController.logout);
router.post('/signup', AuthController.signup);

router.get("/logout", AuthController.logout);
router.get('/login', AuthController.loginPage);
router.get("/signup", AuthController.signupPage);


module.exports = router;
