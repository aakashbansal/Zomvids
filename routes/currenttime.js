
var express = require('express');
var router = express.Router();

const dbVideo=require('../db/video')

router.route('/')
      .post(function(req, res){
          console.log(req.body)
          res.status(200).end()
      })

module.exports = router;
