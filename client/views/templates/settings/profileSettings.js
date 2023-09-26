Template.profileSettings.created = function () {
  UserProfile.attachSchema(userProfile);
  Meteor.users.attachSchema(userAccountSchema);
  let hooksObject = {
    before: {'method-update': function(doc) {activateSpinner(); return doc;}},
    after: {'method-update': function(doc) {deactivateSpinner();}},  
    onError: function(formType, error) {deactivateSpinner();},
    onSuccess: function(formType, result) {toastr.success('Update successful');}, 
  } 
  AutoForm.addHooks(['updateProfile','updatePassword'], hooksObject);
};

Template.profileSettings.helpers({
  selectedProfile: function() {
    return UserProfile.findOne({userId: Meteor.userId()});
  },
  twoFAEnabled: function() {
    let profile = UserProfile.findOne({userId: Meteor.userId()});
    return profile.twoFAuthenticationEnabled;
  }
});