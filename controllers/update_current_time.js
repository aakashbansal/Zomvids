
const dbUser = require('../db/user')

const updateTime = function(username, videoId, time){

    dbUser.findOne({username:username, "watched.video_id":videoId})
    .then(data=>{
        console.log("UPDATING LAST SEEN")
  //      console.log(data)
        if(data){

            dbUser.updateOne({username:username, "watched.video_id":videoId},
            {$set:{
                "watched.$.continue_from":time
            }})
            .then(()=>console.log("SUCCESS UPDATE CURRENT TIME"))
            .catch(()=>console.log("ERROR UPDATE CURRENT TIME"))

        }else{
            dbUser.findOneAndUpdate({username:username},
                {$push:{watched:{
                            video_id:videoId,
                            continue_from:time
                        }
                    }
                })
                .then(()=>console.log("SUCCESS"))
                .catch(()=>console.log("ERROR"))

        }
    })


}

const findLastSeenTime= function(res, username, videoId){


    dbUser.findOne({username:username, "watched.video_id":videoId}).lean()
            .exec().then(data=>{
                let time=0;
          
                if(data){
                    var watched=data.watched;
                    for(index = 0 ; index<watched.length;++index){
                        var entry=watched[index];
                        if(entry.video_id==videoId){
                            time=entry.continue_from
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