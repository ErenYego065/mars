Template.individualDetails.created = function(){
  cancelChange();
};

Template.individualDetails.helpers({
  customerDetails : function(){return Session.get('customerDetails');},
  riskProfile : function(){return Session.get('riskProfileDetails');},
  validationMessage : function(){return Session.get('validationMessage');},
  editingTitle : function(){return Session.get('editTitle');},
  editingFirstName : function(){return Session.get('editFirstName');},
  editingMiddleName : function(){return Session.get('editMiddleName');},
  editingLastName : function(){return Session.get('editLastName');},
  editingMaidenName : function(){return Session.get('editMaidenName');},
  editingDob : function(){return Session.get('editDob');},
  editingEmail : function(){return Session.get('editEmail');},
  editingGender : function(){return Session.get('editGender');},
  editingMobile : function(){return Session.get('editMobile');},
  editingTelephone : function(){return Session.get('editTelephone');},
  editingNationality : function(){return Session.get('editNationality');},
  editingBirthCountry: function(){return Session.get('editBirthCountry');},
  hasChecks : function(){return (Number(Session.get('customerScreeningCount'))>0)? true : false;},
  gravatarImage: function(){let options = {secure: true};return Gravatar.imageUrl(Session.get('customerEmail'), options);},
  // riskBreakdownShownFlag: function(){return Session.get('riskBreakdownShownFlag');}
});

Template.individualDetails.events({
  'click #title': function (e) {e.preventDefault();enableEdit('editTitle');},  
  'click #saveTitle': function (e) {e.preventDefault();updateField('#newTitle','editTitle');},
  'keyup #newTitle': function (e) {e.preventDefault();clickEventUpdateField(e,'#newTitle','editTitle');},

  'click #firstName': function (e) {e.preventDefault();enableEdit('editFirstName');},  
  'click #saveFirstName': function (e) {e.preventDefault();updateField('#newFirstName','editFirstName');},
  'keyup #newFirstName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newFirstName','editFirstName');},

  'click #middleName': function (e) {e.preventDefault();enableEdit('editMiddleName');},  
  'click #saveMiddleName': function (e) {e.preventDefault();updateField('#newMiddleName','editMiddleName');},
  'keyup #newMiddleName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newMiddleName','editMiddleName');},

  'click #lastName': function (e) {e.preventDefault();enableEdit('editLastName');},  
  'click #saveLastName': function (e) {e.preventDefault();updateField('#newLastName','editLastName');},
  'keyup #newLastName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newLastName','editLastName');},

  'click #maidenName': function (e) {e.preventDefault();enableEdit('editMaidenName');},  
  'click #saveMaidenName': function (e) {e.preventDefault();updateField('#newMaidenName','editMaidenName');},
  'keyup #newMaidenName': function (e) {e.preventDefault();clickEventUpdateField(e,'#newMaidenName','editMaidenName');},

  'click #dob': function (e) {e.preventDefault();enableEdit('editDob');},  
  'click #saveDob': function (e) {e.preventDefault();updateField('#newDob','editDob');},
  'keyup #newDob': function (e) {e.preventDefault();clickEventUpdateField(e,'#newDob','editDob');},

  'click #email': function (e) {e.preventDefault();enableEdit('editEmail');},  
  'click #saveEmail': function (e) {e.preventDefault();updateField('#newEmail','editEmail');},
  'keyup #newEmail': function (e) {e.preventDefault();clickEventUpdateField(e,'#newEmail','editEmail');},

  'click #gender': function (e) {e.preventDefault();enableEdit('editGender');},  
  'click #saveGender': function (e) {e.preventDefault();updateField('#newGender','editGender');},
  'keyup #newGender': function (e) {e.preventDefault();clickEventUpdateField(e,'#newGender','editGender');},

  'click #mobile': function (e) {e.preventDefault();enableEdit('editMobile');},  
  'click #saveMobile': function (e) {e.preventDefault();updateField('#newMobile','editMobile');},
  'keyup #newMobile': function (e) {e.preventDefault();clickEventUpdateField(e,'#newMobile','editMobile');},

  'click #telephone': function (e) {e.preventDefault();enableEdit('editTelephone');},  
  'click #saveTelephone': function (e) {e.preventDefault();updateField('#newTelephone','editTelephone');},
  'keyup #newTelephone': function (e) {e.preventDefault();clickEventUpdateField(e,'#newTelephone','editTelephone');},

  'click #nationality': function (e) {e.preventDefault();enableEdit('editNationality');},  
  'click #saveNationality': function (e) {e.preventDefault();updateField('#newNationality','editNationality');},
  'keyup #newNationality': function (e) {e.preventDefault();clickEventUpdateField(e,'#newNationality','editNationality');},

  'click #birthCountry': function (e) {e.preventDefault();enableEdit('editBirthCountry');},  
  'click #saveBirthCountry': function (e) {e.preventDefault();updateField('#newBirthCountry','editBirthCountry');},
  'keyup #newBirthCountry': function (e) {e.preventDefault();clickEventUpdateField(e,'#newBirthCountry','editBirthCountry');},
  
  'click .showRiskBreakdown': function (e) {e.preventDefault();Session.set('riskBreakdownShownFlag',true);},
  'click .hideRiskBreakdown': function (e) {e.preventDefault();Session.set('riskBreakdownShownFlag',false);},	
  
  'click #cancelChange': function (e) {cancelChange()}
});