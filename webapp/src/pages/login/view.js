function loginView(controller) {
  function load(page) {
    // User Navigation
    page.find('#login-btn').on('click', function(e) {
      controller.login(page.find('#email').val(), page.find('#password').val()).catch(function(error) {
          page.find('#login-error').text(error).show();
        });
    });

    page.find('#register-btn').on('click', function(e) {
      controller.register();
    });

    page.find('#forgot-btn').on('click', function(e) {
      controller.forgot(page.find('#email').val())
        .catch(function(error){
          page.find('#login-error').text(error).show();
        });
    });
    // End User Navigation
  }
  return {
    load: load
  };
}
module.exports = loginView;
