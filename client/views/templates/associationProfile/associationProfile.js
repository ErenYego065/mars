Template.associationProfile.created = function(){
 Session.setPersistent('hasAlternativeName', false);
}

Template.associationProfile.rendered = function(){
  customerId = FlowRouter.getParam("_CustId");
  Session.setPersistent("selectedCustomer",customerId);
  screeningId = FlowRouter.getParam("_ScreeningId");
  Session.setPersistent("selectedScreening",screeningId); 
  matchId = FlowRouter.getParam("_MatchId");
  Session.setPersistent("selectedMatch",matchId);  
  associationId = FlowRouter.getParam("_AssociationId");
  Session.setPersistent("selectedAssociation",associationId);  
  getAssociationDetails();
};

Template.associationProfile.helpers({
  association: function() {return Session.get('association');},
  customerId: function() {return Session.get('selectedCustomer');},
  screeningId: function() {return Session.get('selectedScreening');},
  matchId: function() {return Session.get('selectedMatch');},
  associationId: function() {return Session.get('selectedAssociation');},
  hasAlternativeName: function() {return Session.get('hasAlternativeName');}
});

getAssociationDetails = function() {
  activateSpinner();  
  let customerId = FlowRouter.getParam("_CustId");
  let screeningId = FlowRouter.getParam("_ScreeningId");
  let matchId = FlowRouter.getParam("_MatchId");
  let associationId = FlowRouter.getParam("_AssociationId");
  
  Meteor.call('getResource', Session.get('isLive'), URI_ASSOCIATION, customerId, null, screeningId, matchId, associationId, function(err,res){
    if(err) {
      if(err.error === 401){Meteor.logout(function() {FlowRouter.go('/login');});}
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let association = JSON.parse(res.content);
      let fullName;
      for(i=0; i < association.names.length; i++ ){
        if(association.entity_type === 'INDIVIDUAL'){
          if(association.names[i].name_type === 'PRIMARY_NAME'){
            fullName = association.names[i].first_name + ' ' + association.names[i].last_name + ' ' +
            association.names[i].maiden_name ;
            Session.setPersistent('matchFullName', fullName);
          }    
        }
        else{
          if(association.names[i].name_type === 'PRIMARY_NAME'){
            fullName = association.names[i].company_name;
            Session.setPersistent('matchFullName', fullName);
          } 
        }
      }
      if(association.image_uri){Session.setPersistent('matchImage', association.image_uri[0]);}
      if(association.names.length > 1){Session.setPersistent('hasAlternativeName', true);}
      Session.set('association', association);
      deactivateSpinner();
    }          
  });
};