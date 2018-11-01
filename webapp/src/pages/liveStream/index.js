var liveStreamView = require('./view');
var liveStreamController = require('./controller');

module.exports = function(
  isBroadcast, postId, sessionService, nativeExt,
  chatService, navService, backendService) {
  return liveStreamView(
    liveStreamController(
      isBroadcast, postId, sessionService, nativeExt,
      chatService, navService, backendService
    )
  );
}
