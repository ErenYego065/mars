Template.settingsDisable2FAModalPage1.events({
  'click #inputDisableAuthentication': function (event) {
    event.preventDefault();
    let token = $('.authenticationDisableCode').val();
    console.log(token);
    Meteor.call('disable2FA', token, function (err, res) {
      if (err) {

      } else {
        $('#settingsDisable2FAModalPage1').modal('toggle');
        Bert.alert('2-factor authentication has been disabled.', 'success');
      }
    });
  },
});