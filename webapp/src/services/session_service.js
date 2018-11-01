// APPLICATION SESSION CONTROL METHODS
function sessionService(currentSession) {
  // User Session Methods
  function saveSession(newSession) {  // Log User Data
    currentSession = newSession;
    localStorage.currentSession = JSON.stringify(currentSession);
    console.log('sessionService.saveSession(currentSession: '+localStorage.currentSession+')');
  }

  function getSession() { // Active User Data
    if (!currentSession && localStorage.currentSession) { currentSession = JSON.parse(localStorage.currentSession); }
      console.log('sessionService.getSession(): '+currentSession);
      return currentSession;
  }
  //End User Session Methods

  return {
    saveSession: saveSession,
    getSession: getSession
  };
}
module.exports = sessionService;
// END APPLICATION SESSION CONTROL METHODS
