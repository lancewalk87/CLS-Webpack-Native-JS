var landingView = require('./view');
var landingController = require('./controller');

module.exports = function (backendService, navService, sessionService) {
  return landingView(landingController(backendService, navService, sessionService));
};
