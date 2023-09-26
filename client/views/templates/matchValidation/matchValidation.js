Template.matchValidation.created = function(){
  Session.set('selectedScreening',null);
  
  customerId = FlowRouter.getParam("_CustId");
  Session.setPersistent("selectedCustomer",customerId);
  screeningId = FlowRouter.getParam("_ScreeningId");
  Session.setPersistent("selectedScreening",screeningId);
};

Template.matchValidation.events({
	'click .right-sidebar-toggle': function(){
    $('#right-sidebar').toggleClass('sidebar-open');
  }
});

Template.matchValidation.helpers({
  selectedScreening: function() {return Session.get('selectedScreening');},
});