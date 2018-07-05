let connectStatus = false;
//let userid = "hcl4@trials.com";
let pass = "HCL@1234";

  /* log.addEventListener("click", function(e) {
    console.log("user..", user.value)
    if (user.value == "") {
      console.log("user not found..")
      //return;
    }

    kandy.connect({
      username: user.value.trim()+"@trials.com",
      password: pass
    })
})  */

//
// let call = {
//     callDefaults: {
//         isVideoEnabled: true,
//         sendInitialVideo: false,
//         remoteVideoContainer: document.getElementById('vremote'),
//         localVideoContainer: document.getElementById('vlocal')
//     },
//     chromeExtensionId: 'abc123...'
// }

let config = {
    authentication: {
        subscription: {
            server: 'spidr-ucc.genband.com',
        },
        websocket: {
            server: 'spidr-ucc.genband.com',
        }
    }
}

let getUser = function(name)
{    
    debugger;
    let storedNames = '';
    if(localStorage.getItem("storage-event-test") != '[]')
    {
        storedNames = JSON.parse(localStorage.getItem("storage-event-test"));   
        var index = storedNames.indexOf(name);
        if (index > -1) {
            storedNames.splice(index, 1);
        } 
    }   
    return storedNames;
}

let setUser = function(name)
{
    debugger;
    let storedNames;
    if(localStorage.getItem("storage-event-test") == null || 
    localStorage.getItem("storage-event-test") == '')
    {
    storedNames  = [];
    storedNames[0]= name;
    }
    else
    {
    storedNames = JSON.parse(localStorage.getItem("storage-event-test")); 
   
    var index = storedNames.indexOf(name);
        if (index > -1) {            
        } 
        else
        storedNames[storedNames.length]= name;
    }
    /* if(names.length != 0)     
    names[names.length - 1] =name;
    else  */
    //names[names.length]= name;
    localStorage.setItem("storage-event-test", JSON.stringify(storedNames));
 
}

let clearStorage = function()
{

    localStorage.setItem("storage-event-test", '');

}

let removeUser = function(name)
{
    let storedNames = JSON.parse(localStorage.getItem("storage-event-test"));   
    var index = storedNames.indexOf(name);
    if (index > -1) {
        storedNames.splice(index, 1);
    }
    localStorage.setItem("storage-event-test", JSON.stringify(storedNames));
}

let kandy = createKandy( config );

 kandy.on('auth:change', function() {     
    connectStatus = kandy.getConnection().isConnected;  
    window['LoginComponent'].zone.run(() => {
        window['LoginComponent'].component.loginFromOutside(connectStatus); 
      });     
}); 

kandy.on('auth:error', function(params) {
  logmsg('Connect error: ' + params.error.message + ' (' + params.error.code + ')');
});

function logmsg(message) {   
  //document.getElementById('msg').innerHTML += '<div>' + message + '</div>';
  console.log(message);
}



var currentConvo;
function createConvo() {
  var participant = document.getElementById('convo-participant').value;
  currentConvo = kandy.conversation.get(participant);
  logmsg('Conversation created with: ' + participant)
}

function sendMessage() {
  if(currentConvo) {
    var text = document.getElementById('message-text').value;
    var message = currentConvo.createMessage(text);
    message.send();
  } else {
    logmsg('No current conversation to send message to.');
  }
}

kandy.on('messages:change', function(params) {
  logmsg('New message in conversation with ' + params.conversationId);

  if(currentConvo.destination === params.conversationId) {
    renderLatestMessage(currentConvo);
  }
});

kandy.on('conversations:change', function(params) {
  logmsg('New conversation with ' + params.conversationId);
  if(!currentConvo) {
    currentConvo = kandy.conversation.get(params.conversationId);
    renderLatestMessage(currentConvo);
  }
});

function renderLatestMessage(convo) {
  var messages = convo.getMessages();
  var message = messages[messages.length - 1];
  var text = message.sender + ': ' + message.parts[0].text;
  var convoDiv = document.getElementById('convo-messages');
  convoDiv.innerHTML += '<div>' + text + '</div>';
}
//
// ///Call..

let callId;

// Get user input and make a call to the callee.
var makeCall = function (name) {
    debugger
    // Gather call options.
  //  let callee = document.getElementById('callee').value;
  let callee = name;
   // let withVideo = document.getElementById('make-with-video').checked;
   let withVideo = true;
    // Gather media containers to be used for the call.
    let remoteContainer = document.getElementById('vremote');
    let localContainer = document.getElementById('vlocal');

    logmsg('Making call to ' + callee);
    
    callId = kandy.call.make(callee, {
      //  sendInitialVideo: withVideo,
        sendInitialVideo: withVideo,
        remoteVideoContainer: remoteContainer,
        localVideoContainer: localContainer,
        normalizeAddress: true
    });
    
}

// Answer an incoming call.
let answerCall =function() {
    debugger;
    // Gather call options.
   // let withVideo = document.getElementById('answer-with-video').checked;
   let withVideo = true;
    // Gather media containers to be used for the call.
    let remoteContainer = document.getElementById('vremote');
    let localContainer = document.getElementById('vlocal');

    // Retrieve call state.
    let call = kandy.call.getById(callId);
    logmsg('Answering call from ' + call.from);

    kandy.call.answer(callId, {
        sendInitialVideo: withVideo,
        remoteVideoContainer: remoteContainer,
        localVideoContainer: localContainer
    });
}

// Reject an incoming call.
let rejectCall = function () {
    // Retrieve call state.
    let call = kandy.call.getById(callId);
    logmsg('Rejecting call from ' + call.from);

    kandy.call.reject(callId);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationEndCall(call.from); 
      });
}

// End an ongoing call.
var endCall= function () {
    // Retrieve call state.
    let call = kandy.call.getById(callId);
    logmsg('Ending call with ' + call.from);
    kandy.call.end(callId);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationEndCall(call.from); 
      });
}

// Set listener for successful call starts.
kandy.on('call:start', function(params) {
    logmsg('Call successfully started. Waiting for response.');
});

// Set listener for generic call errors.
kandy.on('call:error', function(params) {
    logmsg('Encountered error on call: ' + params.error.message);
});

// Set listener for call media errors.
kandy.on('media:error', function(params) {
    logmsg('Call encountered media error: ' + params.error.message);
});

// Set listener for changes in a call's state.
kandy.on('call:stateChange', function(params) {
    debugger;
    let call = kandy.call.getById(callId);
    logmsg('Call state changed to: ' + params.state);
    let withVideo = true;
    // If the call ended, stop tracking the callId.
    if(params.state === 'ENDED') {
        /* callId = null;
        window['UserComponent'].zone.run(() => {
            window['UserComponent'].component.navigationEndCall(call.from); 
          }); */
          endCall();
    }  
    else if (params.state == "RINGING"|| params.state == "IN_CALL")
    {
     if( withVideo == true)
    {
        document.getElementsByClassName('call-container')[0].style.position = "relative";
       
    }
    else
    {
        document.getElementsByClassName('call-container')[0].style.position = "fixed";
    }   
}
});

// Set listener for incoming calls.
kandy.on('call:receive', function(params) {
    // Keep track of the callId.
    callId = params.callId;
debugger;
    // Retrieve call information.
    call = kandy.call.getById(params.callId);
    logmsg('Received incoming call from ' + call.from);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationReceiveCall(call.from, "receiving"); 
      });
});