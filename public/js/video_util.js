
var player=document.getElementById('vPlayer')
var user = $('#user').html();
var vidId=$('#source').attr('src').split('=')[1];

// sends the time till which the current video is seen
function sendLastSeenTime(){

        let time = player.currentTime

        $.ajax({
                type : "POST",
                url : "curtime",
                contentType: 'application/json',
                data: JSON.stringify({
                                        lastseen : time,
                                        video_id:vidId 
                                    }),
                success: function(){
                        console.log("Successfully sent the current seen time")
                },
                error : function(error){
                        console.log("Error sending the current seen time")
                }
        })
}

// Only send the current time updates to backend if a REGISTERED user is watching the video.
// If a GUEST is watching the video, no need to hit the servers!
if(user!="Guest"){

        player.onloadedmetadata = function(){

                // ajax request to fetch the last seen time of current video from server
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

        // When video is paused
        player.onpause = function(){
                sendLastSeenTime() 
        }
        
        // When slider/seeker is used
        player.onseeking = function(){
                sendLastSeenTime()
        }

        // When page is refreshed or current tab is closed or the browser is closed
        window.onunload = function() {
                sendLastSeenTime();
        }
}