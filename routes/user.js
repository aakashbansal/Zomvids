var express = require('express');
var router = express.Router();
var passport=require('../utils/passport')
var registerController = require('../controllers/register.controller')
var loginController = require('../controllers/login.controller')

router.route('/register')
    .post(registerController)
    .get((req,res)=> res.render('register'))


router.route('/login')
        .post(passport.authenticate("local", {}), 
                loginController)
        .get((req,res)=> res.render('login'));

module.exports = router;
