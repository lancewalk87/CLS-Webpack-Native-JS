var sellerWallController = require('./controller');
var sellerWallView = require('./view');

module.exports = function(Dom7, backendService, navService, sessionService, hostID) {
  return sellerWallView(Dom7, sellerWallController(backendService, navService, sessionService, hostID));
};
