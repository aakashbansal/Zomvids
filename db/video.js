const mongoose = require("mongoose");

// Video Schema 
const videoSchema = mongoose.Schema({

    video_name: {
        type: String, 
        default : "Untitled Video"
    },

    total_likes: {
        type: Number, 
        default: 0
    },

    size : {
        type : Number,
        default:0
    },

    local_path:{
        type: String
    }
    
});


const video = mongoose.model("video", videoSchema);

module.exports = video;

