var loginController = require('./controller');
var loginView = require('./view');

module.exports = function (backendService, navService, sessionService) {
  return loginView(loginController(backendService, navService, sessionService));
};
  // loginPage(backend, navService, sessionSvc).load(Dom7(page.container));
