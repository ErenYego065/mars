Template.apiSettings.created = function () {
  Session.set('userApiClientId',null);
  Session.set('userApiClientKey',null);
}

Template.apiSettings.rendered = function () {
  activateSpinner();
  Meteor.call('getApiCredentials', function(err,res){
    if(err) {
      deactivateSpinner(); 
      toastr.error(err.details, err.reason); 
    } 
    else {
      Session.set('userApiClientId',res.apiId);
      Session.set('userApiClientKey',res.apiKey);
      deactivateSpinner();
    }          
  });
};

Template.apiSettings.helpers({
  userApiClientId: function() {return Session.get('userApiClientId')},
  userApiClientKey: function() {return Session.get('userApiClientKey')}  
});