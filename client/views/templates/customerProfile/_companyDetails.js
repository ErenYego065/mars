Template.companyDetails.created = function(){
  cancelChange();
};

Template.companyDetails.helpers({
  customerDetails : function(){return Session.get('customerDetails');},
  riskProfile : function(){return Session.get('riskProfileDetails');},
  validationMessage : function(){return Session.get('validationMessage');},
  editingCompanyName : function(){return Session.get('editCompanyName');},
  editingEmail : function(){return Session.get('editEmail');},
  editingIncorporationNumber : function(){return Session.get('editIncorporationNumber');},
  editingIncorporationType : function(){return Session.get('editIncorporationType');},  
  editingIncorporationCountry : function(){return Session.get('editIncorporationCountry');},
  editingBusinessPurpose : function(){return Session.get('editBusinessPurpose');},
  editingMobile : function(){return Session.get('editMobile');},
  editingTelephone : function(){return Session.get('editTelephone');},
  editingPrimaryContactName : function(){return Session.get('editPrimaryContactName');},
  editingPrimaryContactEmail : function(){return Session.get('editPrimaryContactEmail');},
  hasChecks : function(){return (Number(Session.get('customerScreeningCount'))>0)? true : false;},
  // riskBreakdownShownFlag: function(){return Session.get('riskBreakdownShownFlag');}
});

Template.companyDetails.events({
  'click #companyName': function (e) {e.preventDefault();enableEdit('editCompanyName');},  
  'click #saveCompanyName': function (e) {e.preventDefault();updateField('#newCompanyName','editCompanyName');},
  'keyup #newCompanyName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newCompanyName','editCompanyName');},

  'click #email': function (e) {e.preventDefault();enableEdit('editEmail');},  
  'click #saveEmail': function (e) {e.preventDefault();updateField('#newEmail','editEmail');},
  'keyup #newEmail': function (e) {e.preventDefault();clickEventUpdateField(e,'#newEmail','editEmail');},

  'click #incorporationNumber': function (e) {e.preventDefault();enableEdit('editIncorporationNumber');},  
  'click #saveIncorporationNumber': function (e) {e.preventDefault();updateField('#newIncorporationNumber','editIncorporationNumber');},
  'keyup #newIncorporationNumber': function (e) {e.preventDefault();clickEventUpdateField(e,'#newIncorporationNumber','editIncorporationNumber');},

  'click #incorporationType': function (e) {e.preventDefault();enableEdit('editIncorporationType');},  
  'click #saveIncorporationType': function (e) {e.preventDefault();updateField('#newIncorporationType','editIncorporationType');},
  'keyup #newIncorporationType': function (e) {e.preventDefault();clickEventUpdateField(e,'#newIncorporationType','editIncorporationType');},

  'click #incorporationCountry': function (e) {e.preventDefault();enableEdit('editIncorporationCountry');},  
  'click #saveIncorporationCountry': function (e) {e.preventDefault();updateField('#newIncorporationCountry','editIncorporationCountry');},
  'keyup #newIncorporationCountry': function (e) {e.preventDefault();clickEventUpdateField(e,'#newIncorporationCountry','editIncorporationCountry');},

  'click #businessPurpose': function (e) {e.preventDefault();enableEdit('editBusinessPurpose');},  
  'click #saveBusinessPurpose': function (e) {e.preventDefault();updateField('#newBusinessPurpose','editBusinessPurpose');},
  'keyup #newBusinessPurpose': function (e) {e.preventDefault();clickEventUpdateField(e,'#newBusinessPurpose','editBusinessPurpose');},

  'click #mobile': function (e) {e.preventDefault();enableEdit('editMobile');},  
  'click #saveMobile': function (e) {e.preventDefault();updateField('#newMobile','editMobile');},
  'keyup #newMobile': function (e) {e.preventDefault();clickEventUpdateField(e,'#newMobile','editMobile');},

  'click #telephone': function (e) {e.preventDefault();enableEdit('editTelephone');},  
  'click #saveTelephone': function (e) {e.preventDefault();updateField('#newTelephone','editTelephone');},
  'keyup #newTelephone': function (e) {e.preventDefault();clickEventUpdateField(e,'#newTelephone','editTelephone');},

  'click #primaryContactName': function (e) {e.preventDefault();enableEdit('editPrimaryContactName');},  
  'click #savePrimaryContactName': function (e) {e.preventDefault();updateField('#newPrimaryContactName','editPrimaryContactName');},
  'keyup #newPrimaryContactName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newPrimaryContactName','editPrimaryContactName');},

  'click #primaryContactEmail': function (e) {e.preventDefault();enableEdit('editPrimaryContactEmail');},  
  'click #savePrimaryContactEmail': function (e) {e.preventDefault();updateField('#newPrimaryContactEmail','editPrimaryContactEmail');},
  'keyup #newPrimaryContactEmail': function (e) {e.preventDefault();clickEventUpdateField(e,'#newPrimaryContactEmail','editPrimaryContactEmail');},

  'click .showRiskBreakdown': function (e) {e.preventDefault();Session.set('riskBreakdownShownFlag',true);},
  'click .hideRiskBreakdown': function (e) {e.preventDefault();Session.set('riskBreakdownShownFlag',false);},	

  'click #cancelChange': function (e) {cancelChange()}
});