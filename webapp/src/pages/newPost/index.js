
var newPostController = require('./controller');
var newPostView = require('./view');

module.exports = function(backendService, sessionService, navService) {
  return newPostView(newPostController(backendService, sessionService, navService));
}
