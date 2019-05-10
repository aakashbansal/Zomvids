var express = require('express');
var router = express.Router();
const dbVideo = require("../db/video");



router.route('/')
    .get(function (req, res) {
        
        let video_id = req.query.link;

        dbVideo.findById(video_id, function(err, video){
            if(err){
              res.status(404).end();
              return;
            }
            const path = "uploads/"+video.uploader+"/"+ video.video_name;
            res.download(path);
    });
})


module.exports = router;
