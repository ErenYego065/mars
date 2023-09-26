Template.matchProfile.created = function(){
  Session.set('matchProfile',null);
  Session.get('association',null);
  Session.set('isAssociateSelected',false);
  Session.set('isPartialNote',true);
  Session.set('hasAlternativeName', false)
}

Template.matchProfile.rendered = function(){
  $('.dd').nestable('expandAll');
  customerId = FlowRouter.getParam("_CustId");
  Session.setPersistent("selectedCustomer",customerId);
  screeningId = FlowRouter.getParam("_ScreeningId");
  Session.setPersistent("selectedScreening",screeningId);
  matchId = FlowRouter.getParam("_MatchId");
  Session.setPersistent("selectedMatch",matchId);
  getMatchProfile();
};

Template.matchProfile.events({
  'click .fullNote': function (e) {e.preventDefault();Session.set('isPartialNote',false);},
  'click .partialNote': function (e) {e.preventDefault();Session.set('isPartialNote',true);},  
  "click .confirmMatch": function (event) {
     event.preventDefault();
     let matchId = event.currentTarget.dataset.id;

     swal({
      title: "Confirm match?",
      text: "Are you sure you want to confirm match?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {validateMatch(matchId, 'confirm');} 
        else {$("[data-id="+matchId+"]").removeClass( "active");}
      }            
    )
  },
  "click .dismissMatch": function (event) {
     event.preventDefault();
     let matchId = event.currentTarget.dataset.id;

     swal({
      title: "Dismiss match?",
      text: "Are you sure you want to dismiss match?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {validateMatch(matchId, 'dismiss');} 
        else {$("[data-id="+matchId+"]").removeClass( "active");}
      }            
    )
  }
 });

Template.matchProfile.helpers({
  matchProfile: function() {return Session.get('matchProfile');},
  customerId: function() {return Session.get('selectedCustomer');},
  screeningId: function() {return Session.get('selectedScreening');},
  matchId: function() {return Session.get('selectedMatch');},
  hasAlternativeName: function() {return Session.get('hasAlternativeName');},
  isAssociateSelected: function() {return Session.get('isAssociateSelected');},
  isPartialNote: function() {return Session.get('isPartialNote');}
});

getMatchProfile = function() {
  activateSpinner1();  
  let customerId = Session.get("selectedCustomer");
  let screeningId = Session.get("selectedScreening");
  let matchId = Session.get("selectedMatch");
  Session.setPersistent('matchImage','');
  
  Meteor.call('getResource', Session.get('isLive'), URI_MATCH, customerId, null, screeningId, matchId, function(err,res){
    if(err) {
      deactivateSpinner1();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let matchProfile = JSON.parse(res.content);      
      let fullName;
      for(i=0; i < matchProfile.names.length; i++ ){
        if(matchProfile.entity_type === 'INDIVIDUAL'){
          if(matchProfile.names[i].name_type === 'PRIMARY_NAME'){
            fullName = matchProfile.names[i].first_name + ' ' + matchProfile.names[i].last_name + ' ' +
              matchProfile.names[i].maiden_name ;
            Session.setPersistent('matchFullName', fullName);
          }    
        }
        else{
          if(matchProfile.names[i].name_type === 'PRIMARY_NAME'){
            fullName = matchProfile.names[i].company_name;
            Session.setPersistent('matchFullName', fullName);
          } 
        }
      }
      if(matchProfile.image_uri){Session.setPersistent('matchImage', matchProfile.image_uri[0]);}
      if(matchProfile.names.length > 1){Session.setPersistent('hasAlternativeName', true);}
      Session.setPersistent('matchProfile', matchProfile);
      deactivateSpinner1();  
    }          
  });
}

validateMatch = function(matchId, validationAction) {
  activateSpinner();
  let customerId = Session.get("selectedCustomer");
  let screeningId = Session.get("selectedScreening");
  Meteor.call('postResource', Session.get('isLive'), URI_VALIDATE_MATCH, customerId, null, null, screeningId, matchId, validationAction, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let action = (validationAction === 'confirm') ? 'confirmed' : 'dismissed';      
      $('[data-type="matchValidation"][data-id='+matchId+']').css({"pointer-events": "none" });
      $('[data-type="matchValidation"][data-id='+matchId+']').addClass("disabled");
      toastr.success('Match ' + action);
      deactivateSpinner();  
      getScreening();
    }          
  });
}