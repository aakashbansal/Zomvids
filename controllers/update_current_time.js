
const dbUser = require('../db/user')

// Updates the time till which the user has seen a video.
// This is the time from which this video would be resumed on next play

const updateTime = function(username, videoId, time){

    // find the user who is watching the video
    dbUser.findOne({
                    username:username, 
                    "watched.video_id":videoId
                  })
        .then(data=>{

            console.log("UPDATING LAST SEEN")
            
            // if the video instance is found, just update the continue_from time
            if(data){

                // update the time
                dbUser.updateOne({
                                 username:username, 
                                 "watched.video_id":videoId
                                },
                                {$set:{
                                        "watched.$.continue_from":time
                                      }
                                })
                .then(()=>
                        console.log("SUCCESS UPDATE CURRENT TIME"))
                .catch(()=>
                        console.log("ERROR UPDATE CURRENT TIME"))

            // if video instance is not found, add new instance
            }else{

                dbUser.findOneAndUpdate(
                                        {username:username},
                                        {
                                            $push:{
                                                watched:{
                                                    video_id:videoId,
                                                    continue_from:time
                                                }
                                            }
                                        })
                    .then(()=>
                            console.log("SUCCESS"))
                    .catch(()=>
                            console.log("ERROR"))

            }
        })


}

// query for the last seen time of video.
// If the video has not been watched previously, return time=0

const findLastSeenTime= function(res, username, videoId){


    dbUser.findOne({
                    username:username, 
                    "watched.video_id":videoId})
            .lean()
            .exec()
            .then(data=>{

                    let time=0;

                    if(data){
                        var watched=data.watched;
                        for(index = 0 ; index<watched.length;++index){
                            var entry=watched[index];
                            if(entry.video_id==videoId){
                                time=entry.continue_from
                                break;
                            }
                        }
                    }

                    res.status(200).json({time:time})
            })
}


module.exports = {
    updateTime,
    findLastSeenTime
};