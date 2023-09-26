Template.settings2FAModalPage2.events({
  'click #inputAuthenticationComplete': function (event) {
    event.preventDefault();

    var token = $('.authenticationCode').val();
    var key = $('#key').text();


    Meteor.call('verifyOtp', token, key, function (err, res) {
      if (err) {
        // alert(err.reason);
      } else {
        $('#settings2FAModalPage2').modal('toggle');
        $('#settings2FAModalPage3').modal('toggle');
      }
    });
  },
});