Template.navigation.rendered = function(){
  // // Initialize metisMenu
  $('#side-menu').metisMenu();    
  updateNavStats()
  // if(Roles.userIsInRole(Meteor.user(), ['admin','test'])){
  //   $("#helpSection").show();
  // }
};

Template.navigation.helpers({
  openScreening: function() {return Session.get('openScreening');},
  isLive : function(){if(Session.get('isLive')){return 'active'}}  
});