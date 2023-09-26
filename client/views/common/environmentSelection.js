Template.environmentSelection.rendered = function(){
  $('input[name="environment"]').change( function() {
    if ($(this).val()==="true"){Session.setPersistent('isLive',true);}
    else {Session.setPersistent('isLive',false);};
    window.location.href = '/dashboard';
    // FlowRouter.go('/dashboard');
  })
};

Template.environmentSelection.helpers({
  isLive : function(){if(Session.get('isLive')){return 'active'};},
  isTest : function(){if(!Session.get('isLive')){return 'active'}},
  liveEnvName: function(){return Meteor.settings.public.env_name_live;},
  testEnvName: function(){return Meteor.settings.public.env_name_test;},
});