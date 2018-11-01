function liveStreamView(controller) {
  function load(page) {
    controller.startChat(function(msg){
      var chatMessagesView = page.find('#chat-messages-view').append('<p>'+msg+'</p>');
      chatMessagesView.scrollTop(chatMessagesView[0].scrollHeight, 100);
    });
    controller.startStream();
    page.find('#chat-send-btn').click(function(e){
      e.preventDefault();
      var msg = page.find('#chat-box').val();
      page.find('#chat-box').val('');
      controller.sendChatMsg(msg);
    });
    page.find('#chat-box').on('keydown', function(e){
      if(e.keyCode === 13) {
        var msg = page.find('#chat-box').val();
        page.find('#chat-box').val('');
        controller.sendChatMsg(msg);
      }
    });
    page.find('#stop-stream-btn').click(function(e){
      e.preventDefault();
      controller.stopStream();
    });
  }

  function cleanup(page) {
    controller.stopStream();
  }

  return {
    load: load,
    cleanup: cleanup
  };
}

module.exports = liveStreamView;
