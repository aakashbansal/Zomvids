var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.controller')
 
const ensureAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) { 
        console.log("Authenticated")
        return next();
    }
    else {
        res.send("Please login first")
    }

};

router.use(ensureAuthenticated);

router.route('/')
      .get(homeController);

module.exports = router;