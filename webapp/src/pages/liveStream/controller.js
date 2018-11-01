function liveStreamController(isBroadcast, postId, sessionService, nativeExt, chatService, navService, backendService) {
  var chatConnection;
  function startChat(listener) {
    var session = sessionService.getSession();
    chatConnection = chatService.connect(postId, session.token);
    chatConnection.onMessage(listener);
  }

  function sendChatMsg(msg) {
    if(chatConnection && msg) {
      chatConnection.send(msg);
    }
  }

  function startStream() {
    var url;
    if(isBroadcast) { // return url
      url = "rtmp://158.69.123.116:1935/live/stream_"+postId;
    } else {
      url = "rtsp://158.69.123.116:1935/live/stream_"+postId;
    }
    window.nativeExt.startStream(isBroadcast, url);
  }

  function stopStream() {
    nativeExt.stopStream();
    chatConnection.disconnect();
    // backendService.updatePost(
    //   postId,
    //   {type:"live_stream_ended"},
    //   sessionService.getSession().token
    // );
    navService.back('main_tabs');
  }

  return {
    startChat: startChat,
    sendChatMsg: sendChatMsg,
    startStream: startStream,
    stopStream: stopStream
  };
}

module.exports = liveStreamController;
