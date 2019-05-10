var express = require('express');
var router = express.Router();

var fs = require('fs');
const config = require('../config/config')
const savevideo=require('../controllers/savevideo')
var stream;


router.route('/upload')
.post(function (req, res) {
    
    let data = req.body ;
    if(data.start_loc == 0){
      let path = config.FILE_UPLOAD_ROOT_PATH + req.user.username + "/" + data.file
      stream = fs.createWriteStream(path)
    }

    let chunk = data.file_data
    chunk = chunk.split(';base64,')[1]
    let buff = new Buffer(chunk, 'base64')
  
    stream.write(buff)
    console.log(data.end_loc + " " + data.file_size)
    if(parseInt(data.end_loc) < parseInt(data.file_size)){
        res.status(206).json({done:false})
    }
    else{
        savevideo(req, res);
    }
});


module.exports = router;
