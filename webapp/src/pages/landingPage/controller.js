function landingController(backendService, navService, sessionService) {
  var sessionData = sessionService.getSession();
  function indexSession() {
    if (sessionData.token!==null) {
      var initialView='sellerWall';
      if (sessionData.user.role==='Buyer') {
        initialView='buyerWall';
      }
      navService.loadPage(initialView);
      console.log('landingPage.controller.js: indexSession(userData: '+sessionData.token+')');
    }
  }
  return {
    indexSession: indexSession
  };
}
module.exports = landingController;
