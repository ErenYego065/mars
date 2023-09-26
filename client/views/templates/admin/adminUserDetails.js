Template.adminUserDetails.created = function () {
 Session.set('usageCount', null)
}

Template.adminUserDetails.destroyed = function () {
 Session.set('usageCount', null)
}

Template.adminUserDetails.rendered = function () {
 activateSpinner();
 let userId = FlowRouter.getParam("_UserId");
 let fromDate = FlowRouter.getParam("_FromDate");
 let toDate = FlowRouter.getParam("_ToDate");
 let newToDate = moment(toDate);
 let newFromDate = moment(fromDate);
 let auth = FlowRouter.getParam("_Auth");
 auth = auth.replace(/pPoOlLkKlL/g, '/');
 auth = auth.replace(/pPoOlLmMnN/g, '+');
 newFromDate = newFromDate.add(-1, 'day').format('YYYY-MM-DD');
 newToDate = newToDate.add(1, 'day').format('YYYY-MM-DD');

 Meteor.call('adminDecryptAuthorizationHeader', auth, function (err, res) {
  if (err) {
   deactivateSpinner();
  } else {
   Meteor.call('userConsumption', Session.get('isLive'), res, newFromDate, newToDate, function (err, res) {
    if (err) {
     deactivateSpinner();
    } else {
     Session.set('usageCount', res);
     deactivateSpinner();
    }
   });

  }
 });
};

Template.adminUserDetails.helpers({
 profiles: function () {
  let userId = FlowRouter.getParam("_UserId");
  return UserProfile.findOne({
   userId: userId
  });
 },
 lastLoggedIn: function () {
  let userId = FlowRouter.getParam("_UserId");
  let profile = Meteor.users.findOne({
   _id: userId
  });
  if (profile.profile) {
   return dateConvert(profile.profile.lastLoggedIn, 'Do MMM YYYY HH:mm:ss');
  } else {
   return 'Never';
  }
 },
 usageCount: function () {
  return Session.get('usageCount');
 },
 fromDate: function () {
  return FlowRouter.getParam("_FromDate");
 },
 toDate: function () {
  return  FlowRouter.getParam("_ToDate");
 }
});