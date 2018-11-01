var productController = require('./controller');
var productView = require('./view');

module.exports = function (backendService, navService, sessionService) {
  return landingView(landingController(backendService, navService, sessionService));
};
