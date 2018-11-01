
function newPostController(backendService, sessionService, navService) {
  function createPost(isBroadcast, content) {
    window.location = 'host:CallStreamView'; // Host Stream
    var token = sessionService.getSession().token;
    if(!content || !content.trim()) {
      return;
    }

    return backendService.createPost({
      type: (isBroadcast ? 'live_stream' : 'text'),
      content: content
    }, token, true).then(function(post){
      if(isBroadcast) {
        navService.loadPage('live_stream_broadcast', {id: post.id});
      } else {
        navService.back('main_tabs');
      }
    });
  }

  function canBroadcast() {
    return sessionService.getSession().user.role === 'seller';
  }

  return {
    canBroadcast: canBroadcast,
    createPost: createPost
  };
}

module.exports = newPostController;
