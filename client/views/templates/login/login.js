Template.login.created = function () {
  Session.set('email', null);
  Session.set('password', null);  
}

Template.login.rendered = function () {
  if (Meteor.userId()) {
    FlowRouter.go('/dashboard');
  }
  window.onkeydown = null;
  $('#twoFAuthentication').on('shown.bs.modal', function () {
    $('.authenticationCode').focus();
  })

  Ladda.bind('.loginForm .ladda-button');
  $('.ladda-button').on('click', function () {
    let form = $(this).closest('form')[0];
    if (form.checkValidity() === false) {
      Ladda.stopAll()
    }
  });
};

Template.login.events({
  'submit form'(event, template) {
    event.preventDefault();
    let email = template.find('[name="email"]').value;
    let password = template.find('[name="password"]').value;
    Session.set('email', email);
    Session.set('password', password);    

    Meteor.call('checkPasswordUsingCredentials', email, password, function (error, result) {
      if (error) {
        Ladda.stopAll();
      } else {
        if (result.userFound) {
          if (!result.twoFormEnabled) {
            login(email, password);
          } else {
            if (!result.passwordMatch) {
              toastr.error('Invalid email or password.', 'Invalid Login');
            } else {
              $('#twoFAuthentication').modal('toggle');
            }
            Ladda.stopAll();
          }
        } else {
          Ladda.stopAll();
          toastr.error('Invalid email or password.', 'Invalid Login');
        }
      }
    });
  }
});

login = function (email, password) {
  Meteor.loginWithPassword(email, password, function (err) {
    if (err) {
      $('.password').val('');
      toastr.error('Username and password combination are not valid.', 'Invalid Login');
      Ladda.stopAll();
    } else {
      Ladda.stopAll();
      Session.setPersistent('isLive', false);
      FlowRouter.go("/dashboard");
      Meteor.call('loginTimeStamp', function (err, res) {
        if (err) {} else {}
      });
    }
  });
}