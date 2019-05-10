const mongoose = require("mongoose");

// User Schema 
const userSchema = mongoose.Schema({

    username: {
        type: String, 
        required: true, 
        unique: true, 
    },

    password: {
        type: String,
        required: true
    },

    watched : [{
        video_id : String,
        continue_from: Number
    }],

    uploaded_videos:[{
        video_id:String,
        video_name:String,
        size:String
    }]
    
});

const user = mongoose.model("user", userSchema);

module.exports = user;

