function loginController(backendService, navService, sessionService) {
  function login(email, password) { // Parse Login Info
    return backendService.login(email, password).then(function(token) {
        console.log('login.controller.js: backendService.login('+email+', '+password+')');
        getLoggedUserInfo(token);
    }).catch(function(e) {
      console.log('login.controller.js: backendService.login(ERROR: '+e+')');
      return Promise.reject('Invalid Email/Password');
    });
  }

  function forgot(email) {  // Forgotten Password
    return backendService.passwordReset(email).then(function(token) {
      return getLoggedUserInfo(token);
    }).catch(function(err) {
      return Promise.reject('Error: '+err);
    });
    console.log('login.controller.js: forgot(email, password)');
  }

  function getLoggedUserInfo(token) {
    return backendService.getCurrentUserInfo(token).then(function(user) {
      console.log('login.controller.js: getLoggedUserInfo('+token+')');
      sessionService.saveSession({token: token, user: user});
      if (user.role==='Buyer') {
        navService.loadPage('buyerWall');
      } else {
        navService.loadPage('sellerWall');
      }
    });
  }

  function register() {
    navService.loadPage('register');
    console.log('login.controller.js: register()');
  }

  return {
    login: login,
    forgot: forgot,
    register: register
  };
}
module.exports = loginController;
