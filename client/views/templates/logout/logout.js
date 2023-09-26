Template.logout.rendered = function () {
  Meteor.logout(function() {FlowRouter.go('/login');});
};