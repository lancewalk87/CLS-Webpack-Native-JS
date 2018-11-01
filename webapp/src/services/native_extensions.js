// APPLICATION IOS<->INTERFACE METHOD
function nativeExtensions(device) {
  // Live Stream Control Methods  
  function startStream(isBroadcast, url) {  // begin user video stream 
    if(device.android && ('nativeExt' in window)) {
      window.nativeExt.startStream(isBroadcast, url);
    } else if(device.ios) {
      // window.location = 'interface!CallStreamView!join!'+streamURL+'!'; 
    } 
    console.log('nativeExtensions('+device+').startStream('+isBroadcast+',' +url+')');
  }

  function stopStream() { // end user video stream 
    if(device.android && ('nativeExt' in window)) {
      window.nativeExt.stopStream();
    } else {
      console.info('native method stopStream() called');
    }
    console.log('nativeExtensions('+device+').stopStream()');
  }
  // End Live Stream Control Methods 

  return { startStream: startStream, stopStream: stopStream };
}
module.exports = nativeExtensions;
// END APPLICATION <-> INTERFACE METHOD

