function landingView(controller) {
  function load(page) {
    page.find('#login-btn').on('click', function(e){
      controller.login(page.find('#email').val(), page.find('#password').val())
        .catch(function(error){
          page.find('#login-error').text(error).show();
        });
    });
  }
  return { load: load };
}

module.exports = loginView;
