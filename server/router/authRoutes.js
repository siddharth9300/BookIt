const express = require("express");
const router = express.Router();

// const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const authController = require('../controllers/authController');
require("../DB/conn");
// const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authenticate, authController.logout);


router.get('/about', authenticate, authController.about);
router.get('/getdata', authenticate, authController.getdata);
router.post('/contact',authenticate, authController.contact);

module.exports = router;
