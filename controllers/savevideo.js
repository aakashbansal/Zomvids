const dbVideo = require("../db/video");

var fs = require('fs'); 
var config=require('../config/config')

var base_url = "http://localhost:" + config.SERVER_PORT +"/view/?link="
const saveVideo = (req, res) => {

    let data=req.body

    const newVideo = new dbVideo({
        video_name: data.file,
        size : data.file_size,
        uploader:req.user.username,
        local_path: config.FILE_UPLOAD_ROOT_PATH + req.user.username 
    });

    console.log(JSON.stringify(newVideo))

    newVideo.save(function(err){
        if(err){
            throw err;
        }
        res.status(201).json({
            done:true,
            url: base_url + newVideo.id}).end()
    })
};

module.exports = saveVideo;