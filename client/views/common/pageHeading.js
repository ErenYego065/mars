Template.pageHeading.helpers({
    // Route for Home link in breadcrumbs
    home: 'dashboard',
    childLink: function() {
      let oldLink = FlowRouter.current().path.split("/");
      let removeChild = Number(Template.instance().data.removeNumberOfResourceForChild);
      let newLink = '';
      for(index=0;index < oldLink.length-removeChild; index++){
        newLink += oldLink[index];
        newLink += ((index + 1) != oldLink.length-removeChild) ? '/' : '' ;
      }
      return newLink;
    },
});

Template.pageHeading.helpers({
  isLive : function(){return Session.get('isLive');},
});