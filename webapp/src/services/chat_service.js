// CHAT BACKEND SERVER CONTROLS
function chatService(wsBaseUrl) {
  var RECONNECT_TIMEOUT = 3000; // Three seconds
  var READY_STATE_OPEN  = 1;
  var socket, onConnect = function(){}, onMessage = function(){}, onClose = function(){}, onCustomChat = function(){}, onDeleteChat = function(){};

  // Socket Data Receiver Methods
  function connect(id, token) {
    // Socket Event Listners:
    var dataTypes = ['msg=', 'customSale=', 'celebration=', 'hostChange='];
    socket = new WebSocket(wsBaseUrl + '?id='+id+'&user_token='+token);
    // socket events
    socket.addEventListener('open', function (event) { // connection: opened
        onConnect();
    });
    socket.addEventListener('message', function(event) {  // connection: received data[msg]
      var msgType; var msg;
      for (var i=0; i<dataTypes.length; i++) {
        if (event.data.includes(dataTypes[i])) {
          msgType = dataTypes[i];
          msg = event.data.replace(msgType, '');

          switch (i) {
            case 0:
              onMessage(msg);
              console.log('socket.msg: '+msg);
                break;
            case 1:
              onCustomChat(msg);
              console.log('socket.onCustomChat: '+msg);
                break;
            case 2:
              onCelebration(msg);
              console.log('socket.onCelebration: '+msg);
                break;
            case 3:
              onStreamHostChange(msg);
              console.log('socket.onStreamHostChange: '+msg);
                break;
            default:
              break;
          }
        }
      }
    });
    socket.addEventListener('customSale', function(event) { // connection: received data[customSale]
      onCustomChat(event.data);
      // onCustomChat(event.data);
    });
    socket.addEventListener('removeChat', function(event) { // connection: remove data
      onDeleteChat(event.data);
    });
    socket.addEventListener('error', function() { // connection: encountered error
      if(socket.readyState !== READY_STATE_OPEN) {
        console.log('connection closed, reconnecting in 3 seconds');
        setTimeout(function(){ connect(id, token); }, RECONNECT_TIMEOUT);
      }
    });
    socket.addEventListener('close', function() { // connection: closed
      onClose();
    });
    // End Socket Listners

    console.log('chatService(wsBaseUrl).connect('+id+', '+token+')');
      return this;
  }
  // End Data Receivers Methods

  // Data Transmitter Methods
    // Inital Data Methods
  function send(msg) {  // send: msg
    if (socket.readyState === READY_STATE_OPEN) { socket.send(msg); }

    console.log('chatService(wsBaseUrl).send('+msg+')');
  }

  function sendCustomChat(data) { // send: customSale
    if (socket.readyState === READY_STATE_OPEN) { socket.send(data); }
    console.log('chatService(wsBaseUrl).sendCustomChat('+data+')');
  }

  function disconnect() { // close socket
    socket.close();
    console.log('chatService(wsBaseUrl).disconnect()');
  }
    // End Intial Data Methods

    // Socket Event Definitions
  function setOnConnect(newOnConnect) { // socket event: onConnect()
    onConnect = newOnConnect;
    console.log('chatService(wsBaseUrl).setOnConnect(newOnConnect)');
  }

  function setOnMessage(newOnMessage) { // socket event: onMessage()
    onMessage = newOnMessage;
    console.log('chatService(wsBaseUrl).setOnMessage('+newOnMessage+')');
  }

  function setOnCustomChat(NewcustomChat) { // socket event: onCustomChat()
    // onCustomChat = NewcustomChat;

    // console.log('chatService('+wsBaseUrl+').setOnCustomChat('+NewcustomChat+')');
  }

  function setOnCelebration(celebrationData) {
   onCelebration = celebrationData;
   console.log('chatService(wsBaseUrl).setOnCelebration('+celebrationData+')');
 }

 function setOnStreamHostChange(hostChangeData) {
   onStreamHostChange = hostChangeData;
   console.log('chatService(wsBaseUrl).setOnStreamHostChange('+hostChangeData+')');
 }

  function setOnClose(newOnClose) { // socket event: onClose()
    onClose = newOnClose;
    console.log('chatService(wsBaseUrl).setOnClose('+newOnClose+')');
  }
    // End Socket Event Definitions
  // End Data Transmitter Methods

  return {
    connect: connect,
    disconnect: disconnect,
    send: send,
    sendCustomChat: sendCustomChat,
    onClose: setOnClose,
    onConnect: setOnConnect,
    onMessage: setOnMessage,
    onCustomChat: onCustomChat,
    onCelebration: setOnCelebration,
    onStreamHostChange: setOnStreamHostChange
  };
  // END CHAT SERVICE METHOD
}
module.exports = chatService;
// END CHAT BACKEND SERVER CONTROLS
