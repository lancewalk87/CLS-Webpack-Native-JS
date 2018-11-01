var searchController = require('./controller');
var searchView = require('./view');

module.exports = function(backendService, sessionService) {
  return searchView(searchController(backendService, sessionService));
};
