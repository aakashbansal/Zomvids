var reader = {};
var file = {};
var slice_size = 5*1000*1000; // 5 MB
var upload_file_endpoint = '/filetransfer/upload'

 
function start_upload( event ) {
    event.preventDefault();

    reader = new FileReader();
    file = document.querySelector( '#file-upload' ).files[0];

    upload_file(0);
}


$( '#upload-button' ).on( 'click', start_upload );

function upload_file( start ) {

        console.log(start)
        
        var next_slice = start + slice_size + 1;
        var blob = file.slice( start, next_slice );

        reader.onloadend = function( event ) {
        if ( event.target.readyState !== FileReader.DONE ) {
            return;
        }

        $.ajax( {
            url: upload_file_endpoint,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                action: 'upload_file',
                file_data: event.target.result,
                file: file.name,
                start_loc: start,
                end_loc: next_slice,
                file_size:file.size,
                file_type: file.type 
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                console.log( jqXHR, textStatus, errorThrown );
            },
            success: function( data ) {
                
                var size_done = start + slice_size;
                var percent_done = Math.floor( ( size_done / file.size ) * 100 );
                // console.log(size_done)
                if ( next_slice < file.size ) {
                    // More to upload, call function recursively
                    $("#upload-progress").html(percent_done + " %")
                    upload_file( next_slice );
                } else {
                    // Update upload progress
                    $("#upload-progress").html("100% complete")
                    console.log("Update complete")
                    console.log(data)
                }
            }
        } );
        };

        reader.readAsDataURL( blob );
}
