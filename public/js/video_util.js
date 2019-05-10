
var player=document.getElementById('vPlayer')
var user = $('#user').html();
var vidId=$('#source').attr('src').split('=')[1];


function sendLastSeenTime(){

        let time = player.currentTime
        console.log("CUR TIME" + time)
        $.ajax({
          type : "POST",
          url : "curtime",
          contentType: 'application/json',
          data: JSON.stringify({lastseen : time,
                                video_id:vidId }),
          success: function(){
                  console.log("Successfully sent")
          },
          error : function(error){
                  //console.log("Error sending data")
          }

        })
}

if(user!="Guest"){

        player.onloadedmetadata = function(){
                $.ajax({
                        type : "POST",
                        url : "gettime",
                        contentType: 'application/json',
                        data: JSON.stringify({video_id:vidId }),
                        success: function(data){
                                console.log(data)
                                player.currentTime = data.time
                        },
                        error : function(error){
                                console.log("Error receving last seen time")
                        }
              
                      })
                }

        player.onpause = function(){
                sendLastSeenTime() 
                console.log(user)
        }
        
        player.onseeking = function(){
                sendLastSeenTime()
        }


        window.onunload = function() {
                sendLastSeenTime();
        }
}