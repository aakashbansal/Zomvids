var player=document.getElementById('vPlayer')
         
player.onloadedmetadata = function(){
                this.currentTime = 40 ;
        }

player.onpause = function(){
        sendLastSeenTime() 
}

player.onseeking = function(){
        sendLastSeenTime()
}
function sendLastSeenTime(){

        let time = player.currentTime
      //  console.log(time)

        $.ajax({
          type : "POST",
          url : "curtime",
          contentType: 'application/json',
          data: JSON.stringify({"lastseen" : time }),
          success: function(){
                  console.log("Successfully sent")
          },
          error : function(error){
                  //console.log("Error sending data")
          }

        })
}

// setInterval(sendLastSeenTime, 3000);

window.onunload = function() {
	// You can send an ArrayBufferView, Blob, DOMString or FormData
	// Since Content-Type of FormData is multipart/form-data, the Content-Type of the HTTP request will also be multipart/form-data
	var fd = new FormData();
	fd.append("data", 22);
        sendLastSeenTime();
	// navigator.sendBeacon('/video/lastseen', JSON.stringify({"lastseen":player.currentTime}));
        }