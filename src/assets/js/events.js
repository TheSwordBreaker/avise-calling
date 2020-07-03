import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            $("#chat-pane").animate({marginRight:'-500px'}, {queue: false, duration: 550});
            chatElem.classList.remove( 'chat-opened' );
            setTimeout(function(){
                chatElem.setAttribute( 'hidden', true )
            },
            550);
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            $("#chat-pane").animate({marginRight:'0'}, {queue: false, duration: 550});
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );

    document.getElementById("left-pane").addEventListener("mouseover", ()=>{
        let lpane = document.getElementById("left-pane");
        if(!lpane.classList.contains('pane-opened')){
            $("#left-pane").animate({marginLeft:'0px'}, {queue: false, duration: 500});
            lpane.classList.add('pane-opened');
        }

    });

    document.getElementById("left-pane").addEventListener("mouseout", ()=>{
        let lpane = document.getElementById("left-pane");
        if(lpane.classList.contains('pane-opened')){
            $("#left-pane").animate({marginLeft:'-325px'}, {queue: false, duration: 500});
            lpane.classList.remove('pane-opened');
        }

    });

    document.getElementById("local").addEventListener("mousedown", ()=>{
        let userVideo = document.getElementById("local");
        userVideo.classList.add("dragging");    
    });
    document.getElementById("local").addEventListener("mouseup", ()=>{
        let userVideo = document.getElementById("local");
        userVideo.classList.remove("dragging"); 
    });
    document.getElementById("local").addEventListener("mousemove", (e)=>{
        let userVideo = document.getElementById("local");
        if(userVideo.classList.contains('dragging')){
            userVideo.style.top =  e.clientY - (userVideo.offsetHeight/2) +'px';
            userVideo.style.left =  e.clientX - (userVideo.offsetWidth/2) +'px';
        }
    });

    

    //When the video frame is clicked. This will enable picture-in-picture
 /*   document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );
    */


    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector( '#err-msg' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
                Share the room link with your partners.`;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );

