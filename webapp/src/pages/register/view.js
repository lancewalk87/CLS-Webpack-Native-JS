function registerView(controller) {
  function load(page) {
    document.getElementById("forgot-btn").style.display = 'none';
    page.find('#register-btn').on('click', function(e) {
      e.preventDefault();
        // Registration Fields
      var fields = [
        fistName = 'first_name',
        lastName = 'last_name',
        month = 'month',
        day = 'day',
        year = 'year',
        address1 = 'address1',
        postCode = 'postCode',
        city = 'city',
        state = 'state',
        email = 'email',
        password = 'password',
        confirmation = 'confirmation',
        role = 'role'
      ];

      var requiredFields = [
        first_name = page.find('#'+fields[0]).val(),
        last_name = page.find('#'+fields[1]).val(),
        month = page.find('#'+fields[2]).val(),
        day = page.find('#'+fields[3]).val(),
        year = page.find('#'+fields[4]).val(),
        address1 = page.find('#'+fields[5]).val(),
        postCode = page.find('#'+fields[6]).val(),
        city = page.find('#'+fields[7]).val(),
        state = page.find('#'+fields[8]).val(),
        email = page.find('#'+fields[9]).val(),
        password = page.find('#'+fields[10]).val(),
        confirmation = page.find('#'+fields[11]).val(),
        role = page.find('#'+fields[12]).val()
      ];

        var nilFields = [];
      function checkForm() {
        for (var i=0;i<requiredFields.length;i++) { // Index Fields
          if (requiredFields[i]==='') { // value == nil
            nilFields.push(fields[i]);
          } else {
            document.getElementById(fields[i]).style.borderColor = '#42c5f4';
          }
          if (i===requiredFields.length-1) {
            if (nilFields.length===0) { return true;
            } else { return false; }
          }
        }
      }
      var shouldRegister = checkForm();
      var registrationPage;
      var emailField;
      if (shouldRegister) { // Complete Form -> Move to Financial Verification
        if (password === confirmation) {  // Check Password Validity
          // document.getElementById("main_registration").style.display = 'none';
          requiredFields.splice(11,1);
          controller.nativeRegistration(requiredFields).catch(function(err) {
            page.find('#registration-errors').html(err);
            document.getElementById("forgot-btn").style.display = 'block';
            document.getElementById(fields[9]).style.borderColor = 'red';
            emailField = requiredFields[9];
          });
        } else {
          registrationPage = '<li>Passwords Do Not Match</li>';
          document.getElementById(fields[10]).style.borderColor = 'red';
          document.getElementById(fields[11]).style.borderColor = 'red';
        }
      } else {  // Incomplete Form
        for (var i=0;i<nilFields.length;i++) {
          document.getElementById(nilFields[i]).style.borderColor = 'red';
          registrationPage = '<li>Missing Fields</li>';
        }
      }
      page.find('#registration-errors').html(registrationPage);
      document.getElementById("forgot-btn").style.display = 'none';
    });

    page.find('#forgot-btn').on('click', function(e) {
      controller.passwordReset(emailField);
    });
  }
  return { load: load };
}
module.exports = registerView;
