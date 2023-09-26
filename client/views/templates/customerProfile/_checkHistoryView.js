Template.checkHistoryView.rendered = function(){
	Session.set('showNumberOfChecks',3);
	Session.set('allShownFlag',false);
};

Template.checkHistoryView.events({
	'click #showAll' : function(){FlowRouter.go('/checks');},
	'click .showMore': function (e) {e.preventDefault();Session.set('showNumberOfChecks',10);Session.set('allShownFlag',true);},
	'click .showLess': function (e) {e.preventDefault();Session.set('showNumberOfChecks',3);Session.set('allShownFlag',false);}	
});

Template.checkHistoryView.helpers({
	// gravatarImage: function(){let options = {secure: true};return Gravatar.imageUrl(Session.get('customerEmail'), options);},	
	showNumberOfChecks : function(){return Session.get('showNumberOfChecks');},
	allShownFlag : function(){return Session.get('allShownFlag');},	

	checks : function(){
		let checksArr = [];
		let screenings = Session.get('customerScreenings');
  let verifications = Session.get('customerVerifications');
		let identifications = Session.get('customerIdentifications');
  

    if(Session.get('customerScreenings')){
      for(count=0; count<Number(Session.get('customerScreeningCount')); count++) {
        checksArr.push({
          id: screenings[count].id,
          checkType: "SCREENING",
          updated_at: screenings[count].updated_at,
          scope: screenings[count].scope,
          outcome: screenings[count].outcome,
        }) 
      }
    }

    if(Session.get('customerVerifications')){
      for(count=0; count<Number(Session.get('customerVerificationCount')); count++) {
        checksArr.push({
          id: verifications[count].id,
          checkType: "VERIFICATION",
          updated_at: verifications[count].updated_at,
          scope: verifications[count].type,
          outcome: verifications[count].outcome,
        }) 
      }
    }
    
    if(Session.get('customerIdentifications')){
     for(count=0; count<Number(Session.get('customerIdentificationCount')); count++) {
       checksArr.push({
         id: identifications[count].id,
         checkType: "IDENTIFICATION",
         updated_at: identifications[count].updated_at,
         outcome: (identifications[count].face_match) ? 'CLEAR' : 'ATTENTION'
       }) 
     }
   }
    checksArr.sort(sortUpdatedDate).reverse();

		//checksArr.splice(NO_OF_CHECKS_RETURNED)
		return checksArr;
	},


	customerId : function(){return Session.get("selectedCustomer");},

	currentTime : function(){
		let date = new Date();
    let momentObj = moment(date);
    return momentObj.format('DD/MM/YYYY HH:mm:ss');
	}
});

sortUpdatedDate = function (a, b) {
	return new Date(a.updated_at) - new Date(b.updated_at);
}

