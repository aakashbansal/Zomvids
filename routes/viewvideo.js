var express = require('express');
var router = express.Router();

const {updateTime, findLastSeenTime} = require('../controllers/update_current_time')

// render page
router.route('/')
        .get((req,res)=>{

            res.render('viewvideo', {
                        username:req.user ? req.user.username : "Guest",
                        video_link:"http://localhost:5000/video/watch/?play="+req.query.link,
                        likes:200
                      })

        })

// update last seen time
router.route('/curtime')
      .post(function(req, res){

          // If an actual user is watching the video and not
          // the guest
          if(req.user){
            updateTime(req.user.username, req.body.video_id, req.body.lastseen)
          }

          res.status(200).end()
      })


// fetch last seen time of video
router.route('/gettime')
        .post(function(req, res){
            findLastSeenTime(res, req.user.username, req.body.video_id)
        })
  

module.exports = router;
