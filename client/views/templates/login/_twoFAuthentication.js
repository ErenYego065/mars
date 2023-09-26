Template.twoFAuthentication.rendered = function () {
  Ladda.bind('.ladda-button');
};

Template.twoFAuthentication.events({
  'keyup .authenticationCode': function (event) {
    event.preventDefault();
    if (event.target.value.length === 6) {
      let isNum = /^\d+$/.test(event.target.value);
      if (isNum) {
        authenticateUserKey();
      }
    }
  },

  'click #authenticateCodeButton': function (event) {
    event.preventDefault();
    authenticateUserKey();
  },
});

authenticateUserKey = function () {
  let email = Session.get('email');
  let password = Session.get('password');
  let token = $('.authenticationCode').val();
  var l = $('#authenticateCodeButton').ladda();
  l.ladda('start');

  Meteor.call('checkAuthenticaionUsingCredentials', email, token, function (error, result) {
    if (error) {
      Ladda.stopAll();
    } else {
      Ladda.stopAll();
      $('#twoFAuthentication').modal('toggle');
      Meteor.setTimeout(function () {
        login(email, password)
        Session.set('email', null);
        Session.set('password', null);
      }, 250);
    }
  });
}