
var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const {updateTime, findLastSeenTime} = require('../controllers/update_current_time')

router.route('/')
.get((req,res)=>{
    res.render('viewvideo', {
        username:req.user ? req.user.username : "Guest",
        video_link:"http://localhost:5000/video/watch/?play="+req.query.link 
    })
})

router.route('/curtime')
      .post(function(req, res){
          console.log(req.body)

          // If an actual user is watching the video and not
          // the guest
          if(req.user){
            console.log(req.user.username)
            updateTime(req.user.username, req.body.video_id, req.body.lastseen)
          }
          res.status(200).end()
      })

      
router.route('/gettime')
.post(function(req, res){
   
    findLastSeenTime(res, req.user.username, req.body.video_id )

})
  

module.exports = router;
