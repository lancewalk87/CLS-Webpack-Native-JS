var buyerWallController = require('./controller');
var buyerWallView = require('./view');

module.exports = function(Dom7, backendService, sessionService, navService, pageRouter) {
	return buyerWallView(Dom7, buyerWallController(backendService, sessionService, navService, pageRouter));
};
