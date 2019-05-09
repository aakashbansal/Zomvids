
var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

router.route('/')
.get((req,res)=>{
    res.render('viewvideo', {
        username:req.user.username,
        video_link:"http://localhost:5000/video/?play="+req.query.link
    })
})

module.exports = router;
