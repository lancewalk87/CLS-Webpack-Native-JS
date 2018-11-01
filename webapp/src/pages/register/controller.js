function registerController(backendService, navService, sessionService) {
  // MAIN REGISTRATION FUNCTIONS
  function nativeRegistration(userData) { // Superfical User Data
    console.log('register.controller.js: nativeRegistration('+userData+')');
    return backendService.registerUser(userData).then(function(token) {
      return backendService.login(userData[9], userData[10]).then(function(token) {
        return backendService.getCurrentUserInfo(token).then(function(user) {
            sessionService.saveSession({token: token, user: user});
            if (user.role==="Buyer") { navService.loadPage('buyerWall');
            } else { navService.loadPage('sellerWall'); }
          });
      }).catch(function(err) {
        console.log('login.controller.js: backendService.login(ERROR: '+e+')');
        return Promise.reject('Invalid Email/Password');
      });
    }).catch(function(err) {
      var rejectionMsg = "<p style=\"color: red;\">The attempted email is already registered.<br></p>";
      return Promise.reject(rejectionMsg);
    });
  }

  function passwordReset(email) {
    //navService.loadPage('login', 'pswRest: '+email);
    console.log('register.controller.js: passwordReset('+email+')');
  }

  function payVerification() { // User Financial Verification

    console.log('register.controller.js: payVerification()');
  }
  // END MAIN USER REGISTRATION FUNCTIONS

  return {
    nativeRegistration: nativeRegistration,
    passwordReset: passwordReset,
    payVerification: payVerification
  };
}
module.exports = registerController;
