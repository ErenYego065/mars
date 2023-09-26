Template.settings2FAModalPage1.rendered = function () {
  Meteor.call('getOtp', function(err, res) {
    if (!err) {
      $('#key').text(res.key);
      $('#qrcode').html('');
      jQuery('#qrcode').qrcode({
          text: res.uri,
          width: 200,
          height: 200
      });
    }
  });
}

Template.settings2FAModalPage1.events({
  'click #inputAuthenticationCode': function(event) {
    $('#settings2FAModalPage1').modal('toggle');
    $('#settings2FAModalPage2').modal('toggle');
  },
});