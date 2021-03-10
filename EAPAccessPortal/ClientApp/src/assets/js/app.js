var params = getHashParams(),
  mode = typeof (params.mode) == 'undefined' ? 'webrtc' : params.mode,
  username,
  password,
  application_name = typeof (params.appname) == 'undefined' ? 'videochat' : params.appname,
  account_name = params.accname,
  dialog,
  showLog = true,
  currentCall = null,
  outboundCall = null;

function getHashParams() {
  var hashParams = {};
  var e,
    a = /\+/g,  // Regex for replacing addition symbol with a space
    r = /([^&;=]+)=?([^&;]*)/g,
    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
    q = window.location.hash.substring(1);

  while (e = r.exec(q))
    hashParams[d(e[1])] = d(e[2]);

  return hashParams;
}

function log1(str) {

  console.log(str);
}
log1('App.js Load Start');
(async () => {
  try {
    voxAPI.disconnect();
  } catch (e) {

  }
})();
// create VoxImplant instance
var voxAPI = VoxImplant.getInstance();

// assign handlers
voxAPI.on(VoxImplant.Events.SDKReady, onSdkReady);
voxAPI.on(VoxImplant.Events.ConnectionEstablished, onConnectionEstablished);
voxAPI.on(VoxImplant.Events.ConnectionFailed, onConnectionFailed);
voxAPI.on(VoxImplant.Events.ConnectionClosed, onConnectionClosed);
voxAPI.on(VoxImplant.Events.AuthResult, onAuthResult);
voxAPI.on(VoxImplant.Events.IncomingCall, onIncomingCall);
voxAPI.on(VoxImplant.Events.MicAccessResult, onMicAccessResult);
voxAPI.on(VoxImplant.Events.SourcesInfoUpdated, onSourcesInfoUpdated);
var isCallConnected=false;
// initialize SDK
try {
  voxAPI.init({
    micRequired: true, // force microphone/camera access request
    videoSupport: true, // enable video support
    progressTone: true, // play progress tone
    localVideoContainerId: "voximplant_container",// "voximplant_container", // element id for local video from camera or screen sharing
    remoteVideoContainerId: "voximplant_container"
  });
} catch (e) {
  console.log(e);
}
BeforeUserConnected();
// })


// SDK ready - functions can be called now
function onSdkReady() {
  console.log("onSDKReady version " + VoxImplant.version);
  console.log("WebRTC supported: " + voxAPI.isRTCsupported());
  connect();
}

// Connection with VoxImplant established
function onConnectionEstablished() {
  console.log("Connection established: " + voxAPI.connected());

}
var RoleId;
// Login function
async function login() {
  debugger;
  console.log('login start');

  //alert(5);
  // account_name='imtiyaz09';
  // application_name='sdk-tutorial-za13jix.imtiyaz09.n4.voximplant.com';
  // log(username+"@"+application_name+"."+account_name+".voximplant.com");
  var userData = $('#callCreate').attr('userdata');
  RoleId = $('#callCreate').attr('RoleId');
  console.log(userData);
  var user = JSON.parse(userData);
  // voxAPI.login(username+"@"+application_name+"."+account_name+".voximplant.com", password);
  username = user[0].UserName;
  password = user[0].Password;
  // log(username + "@voximplantdemo.arvindker.voximplant.com");
  console.log(username + "@voximplantdemo.arvindker.voximplant.com");
  username = username + "@voximplantdemo.arvindker.voximplant.com";
  try {
    if (VoxImplant.ClientState.DISCONNECTED == 'DISCONNECTED')
      await voxAPI.login(username, password);
    console.log('login done');
    $('.messageChat').hide();
    setTimeout(() => {
      // if (!$('#voximplantlocalvideo').hasClass('video-small-cls'))
      //   $('#voximplantlocalvideo').addClass('video-big-cls');
      AfterUserConnected();
      if (RoleId == 5)
        AudioCallStart();//Direct Call start
    }, 1000);
  } catch (e) {
    console.log(e);
    setTimeout(() => {
      login();
    }, 2000);

  }

}
async function logout() {
  await voxAPI.disconnect();
}
// Connection with VoxImplant failed
function onConnectionFailed() {
  console.log("Connection failed");
  setTimeout(function () { voxAPI.connect(); }, 1000);
}

// Connection with VoxImplant closed
function onConnectionClosed() {

  console.log("Connection closed");
  //setTimeout(function () { voxAPI.connect(); }, 1000);
}

// Handle authorization result
function onAuthResult(e) {

  console.log("AuthResult: " + e.result);
  if (e.result) {
    // Authorized successfully

    var title = $('.panel-title').html() + ': logged in as ' + username;
    showLocalVideo(true);

  } else {
    console.log("onAuthResult: " + e.code);
  }
}

// Call's media element created
function onMediaElement(e) {
  console.log('onMediaElement');
  debugger
  // For WebRTC just using JS/CSS for transformation
  // if ($('#voximplant_container video').length <= 2) {
  //   $video = $(e.element);
  //   //$video.appendTo('#voximplant_container');//receiver
  //   $video.appendTo('#receiver');//receiver
  //   //$('#receiver').html($video);
  //   $video.css('margin-left', '0px').css('float', 'left').css('width', '100%').css('height', '100%').css('object-fit', 'fill')
  //   $video[0].play();
  // }
  // For WebRTC just using JS/CSS for transformation

  if ($('#voximplant_container video').length <= 2) {
    $video = $(e.element);
    //$video.appendTo('#voximplant_container');//receiver
    $video.appendTo('#voximplant_container');//receiver
    //$('#receiver').html($video);
    $video.css('margin-left', '0px').css('float', 'left').css('width', '100%').css('height', '100%').css('object-fit', 'fill').addClass('video-big-cls1');
    $video[0].play();
  }
}

// Video stream from local screen sharing
function onLocalVideoStream(e) {

  console.log("LOCAL VIDEO STREAM");
  console.log(e);
  if (e.type == "sharing") {
    $('#shareButton').html('Stop Sharing');
    $('#shareButton').off('click').click(function () {
      currentCall.stopSharingScreen();
      // $('#shareButton').html('Share Screen');
      $('#shareButton').off('click').click(function () {
        currentCall.shareScreen(true);
      });
    });
  }
}

// Call connected
function onCallConnected(e) {

  console.log("CallConnected: " + currentCall.id());
  if ($('#cancelButton').length) {
    $('#cancelButton').html('Disconnect');

  } else {
    $('#cancelButton').click(function () {
      currentCall.hangup();
    });

  }
  $('#shareButton').click(function () {
    currentCall.shareScreen(true);
  });
  sendVideo(true);
  showRemoteVideo(true);
  AfterCallStart();
}

// Call disconnected
function onCallDisconnected(e) {

  console.log("CallDisconnected: " + currentCall.id() + " Call state: " + currentCall.state());
  currentCall = null;

}


// Call failed
function onCallFailed(e) {

  // console.log("CallFailed: " + currentCall.id() + " code: " + e.code + " reason: " + e.reason);
  // $('#cancelButton').replaceWith('<button type="button" class="btn btn-success" id="callButton">Call</button>');
  //$('#cancelButton').remove();
  // $('#callButton').click(function () {
  //   createCall();
  // });
}

// Audio & video sources info available
function onSourcesInfoUpdated() {

  var audioSources = voxAPI.audioSources(),
    videoSources = voxAPI.videoSources();
}

// Camera/mic access result
function onMicAccessResult(e) {

  // console.log("Mic/Cam access allowed: ");
  if (e.result) {
    // Access was allowed
    if (mode == 'webrtc')
      dialog.close();
  } else {
    // Access was denied
    $('div.bootstrap-dialog').addClass('type-danger');
    dialog.setMessage('You have to allow access to your microphone to use the service');
  }
}

// Incoming call
function onIncomingCall(e) {
  console.log('onIncomingCall init');
  currentCall = e.call;
  // Add handlers
  currentCall.on(VoxImplant.CallEvents.Connected, onCallConnected);
  currentCall.on(VoxImplant.CallEvents.Disconnected, onCallDisconnected);
  currentCall.on(VoxImplant.CallEvents.Failed, onCallFailed);
  currentCall.on(VoxImplant.CallEvents.MediaElementCreated, onMediaElement);
  currentCall.on(VoxImplant.CallEvents.LocalVideoStreamAdded, onLocalVideoStream);
  console.log("Incoming call from: " + currentCall.number());
  // Answer automatically
  currentCall.answer(null, {}, { receiveVideo: true, sendVideo: true });
}

// Progress tone play start
function onProgressToneStart(e) {

  console.log("ProgessToneStart for call id: " + currentCall.id());
}

// Progres tone play stop
function onProgressToneStop(e) {

  console.log("ProgessToneStop for call id: " + currentCall.id());
}

// Create outbound call
function createCall() {
  debugger;


  $('#cancelButton').click(function () {
    currentCall.hangup();
  });
  console.log("Calling to " + document.getElementById('phonenum').value);
  outboundCall = currentCall = voxAPI.call(
    document.getElementById('phonenum').value,
    { receiveVideo: true, sendVideo: true },
    "TEST CUSTOM DATA"
  );
  currentCall.on(VoxImplant.CallEvents.Connected, onCallConnected);
  currentCall.on(VoxImplant.CallEvents.Disconnected, onCallDisconnected);
  currentCall.on(VoxImplant.CallEvents.Failed, onCallFailed);
  currentCall.on(VoxImplant.CallEvents.MediaElementCreated, onMediaElement);
  currentCall.on(VoxImplant.CallEvents.LocalVideoStreamAdded, onLocalVideoStream);
  //IsModeChange(1);

}

// Disconnect current call
function disconnectCall() {
  if (currentCall != null) {
    console.log("Disconnect");
    currentCall.hangup();
  }
}

// Close connection with VoxImplant
function closeConnection() {
  voxAPI.disconnect();
}

// Establish connection with VoxImplant
function connect() {
  console.log("Establishing connection...");
  voxAPI.connect();
  if (mode == 'webrtc' && voxAPI.isRTCsupported()) {
    dialog = new BootstrapDialog({
      title: 'Camera/Microphone access',
      message: 'Please click Allow to allow access to your camera and microphone',
      closable: false
    });
    dialog.open();
  }
}

// Show/hide local video
function showLocalVideo(flag) {
  voxAPI.showLocalVideo(flag);

}

// Show/hide remote video
function showRemoteVideo(flag) {
  currentCall.showRemoteVideo(flag);

}

// Start/stop sending video
function sendVideo(flag) {
  voxAPI.sendVideo(flag);
}
//$('#callCreate').click(function () {
$(document).on('click', '#callCreate', function () {
  //alert(1);
  console.log('click call create button..');


});

function UserLogin() {
  console.log('Login Event Call');
  $('#voximplant_container video').css('visibility', 'visible');
  login();

}
function AudioCallStart() {
if(!isCallConnected)
{
  isCallConnected=true;
  createCall();
}
}
function EndCall(e) {
  if (confirm("Are you sure to disconnect the call?")) {
    console.log('click endCall create button..EndCall');
    //onCallDisconnected(e);
    disconnectCall();
    logout();
    $('.messageChat').show().text('Thank You..!!!');
    $('#voximplant_container video').css('visibility', 'hidden');
    $('#caller').hide();
    $('#receiver').hide();


    //disconnectCall();
    // disconnectCall();
    BeforeUserConnected();
    //voxAPI.disconnect();
    //currentCall.hangup();
    //$('#voximplantlocalvideo').hide();
  } else {

  }
}
function EndCallForbothClientCouns(e) {
  disconnectCall();
  logout();
  console.log('click endCall create button..EndCallForbothClientCouns');
  $('.messageChat').show().text('Thank You..!!!');
  $('#voximplant_container video').css('visibility', 'hidden');
  $('#caller').hide();
  $('#receiver').hide();



  BeforeUserConnected();
  if (RoleId == 5) {
    location.href = "dashboard-counsellor/counsellor-upcomingappointment";
  }
  else {
    location.href = "dashboard/upcomingappointments";
  }


}
function EndCallForbothClientCounsdasboard(e) {
  debugger;
  disconnectCall();
  logout();
  console.log('click endCall create button..EndCallForbothClientCouns');
  $('.messageChat').show().text('Thank You..!!!');
  $('#voximplant_container video').css('visibility', 'hidden');
  $('#caller').hide();
  $('#receiver').hide();



   BeforeUserConnected();
  // if (RoleId == 5) {
  //   location.href = "dashboard-counsellor/counsellor-upcomingappointment";
  // }
  // else {
  //   location.href = "dashboard/upcomingappointments";
  // }


}
//Custom function Change mode of video caller and sender
function IsModeChange() {
  $('#receiver').addClass('video-big-cls').removeClass('video-small-cls');
  $('#caller').addClass('video-small-cls').removeClass('video-big-cls');
  $('#voximplantlocalvideo').addClass('video-small-cls');

  // if ($('#caller').hasClass('video-big-cls')) {
  //   if (!$('#caller').hasClass('video-small-cls'))
  //     $('#caller').addClass('video-small-cls').removeClass('video-big-cls');

  // }

  // if ($('#receiver').hasClass('video-small-cls')) {
  //   if (!$('#receiver').hasClass('video-big-cls'))
  //     $('#receiver').addClass('video-big-cls').removeClass('video-small-cls');

  // }
}
function mutePlayback() {
  console.log(10);
  currentCall.sendAudio(false);
}
function unMutePlayback() {
  currentCall.sendAudio(true);
}
function UnShareVideo() {
  currentCall.sendVideo(false);
}
function ShareVideo() {
  currentCall.sendVideo(true);
}
// $(document).off().on('click', '#muteAudio', function (e) {
//   debugger;

//   let isMute = $(this).attr('rel');
//   if (isMute == "0") {
//     alert('start audio sharing');
//     currentCall.sendAudio(true);
//     $(this).attr('rel', 1);
//   }
//   else {
//     alert('stop audio sharing');
//     currentCall.sendAudio(false);
//     $(this).attr('rel', 0);
//   }
// });
function MuteVideoVoice(thisVal) {
  debugger;
  let isMute = $(thisVal).attr('rel');

  if (isMute == "0") {
    // alert('start audio sharing');
    currentCall.sendAudio(true);
    $(thisVal).find('img').attr('src', '/assets/images/mic.svg');
    $(thisVal).attr('rel', 1);

  }
  else {
    // alert('stop audio sharing');
    currentCall.sendAudio(false);
    $(thisVal).find('img').attr('src', '/assets/images/microphone-slash.svg');
    $(thisVal).attr('rel', 0);

  }

}
$(document).off().on('click', '#shareVideo', function (e) {
  debugger;

  let isMute = $(this).attr('rel');
  if (isMute == "0") {
    //alert('start video sharing');
    currentCall.sendVideo(true);
    $(this).attr('rel', 1);
    $(this).find('img').attr('src', '/assets/images/video.svg');
    showLocalVideo(true);
    $('#voximplantlocalvideo').addClass('video-small-cls');
  }
  else {
    //alert('stop video sharing');
    currentCall.sendVideo(false);
    $(this).attr('rel', 0);
    $(this).find('img').attr('src', '/assets/images/videocam-off.svg');
    showLocalVideo(false);
  }

});

function BeforeUserConnected() {
  $('#muteAudio').hide();
  $('#AudioCallStart').hide();
  $('#shareVideo').hide();
  $('#EndCall').hide();
  $('#voximplant_container video').remove();
}
function AfterUserConnected() {
  $('#muteAudio').hide();
  $('#AudioCallStart').hide();
  $('#shareVideo').hide();
  $('#EndCall').hide();
}
function AfterCallStart() {
  $('#muteAudio').show();
  $('#AudioCallStart').hide();
  $('#shareVideo').show();
  $('#EndCall').show();
  IsModeChange();
}


function IsVideoDisabled(event) {
  var vid = $(".video-big-cls1")[1];
  $(vid).toggle();
}
$('.cls-3dotscustomMenu').click(function (e) {
  $('.cls-3dotscustom').toggle();
});
