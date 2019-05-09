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
        video_id :{
            type: String,
            complete:Boolean,
            continue_from:Number
        }
    }]
    
});


const user = mongoose.model("user", userSchema);

module.exports = user;

