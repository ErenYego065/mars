Template.admin.rendered = function(){
  let companyName = FlowRouter.getParam("_CompanyName");
  let contactName = FlowRouter.getParam("_Name");
  let companyEmail = FlowRouter.getParam("_Email");
  if(companyName){
    $("#foCompanyName").val(companyName);
    $("#foCompanyEmail").val(companyEmail);
    $("#foContactName").val(contactName);
    $("#foApiClientId").val(companyEmail.substring(companyEmail.lastIndexOf("@") + 1,companyEmail.lastIndexOf(".")));
  }
}

Template.admin.events({
  'click .editItem': function(){Session.set('editItemId', this._id);},
  'click .cancelItem': function(){Session.set('editItemId', null);},
  'click .saveItem': function(){saveItem();},
  'click .deleteItem': function(){deleteItem(this.userId);},  
  'click .saveRole': function(){saveRole();},  
  'click .resetPassword': function(){Session.set('resetUserId', this.userId);resetPassword();},  
  'click .createUser': function(){createUser();},  
  'click .fullOnboarding': function(){onboardUser();}
});

Template.admin.helpers({
  profiles: function() {return UserProfile.find().fetch();},
  permissions: function() {return Meteor.users.find().fetch();},  
  editing: function(){return Session.equals('editItemId', this._id);},
  isTest : function(){if(!Session.get('isLive')){return 'active'}}  
});

Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
  return currentUser === Meteor.userId() ? true : false;
});

onboardUser = function(){
  let companyName = $("#foCompanyName").val();
  let companyEmail = $("#foCompanyEmail").val();
  let contactName = $("#foContactName").val();
  let apiClientId = $("#foApiClientId").val();

  if(companyName && companyEmail && contactName && apiClientId){
    activateSpinner();    
    Meteor.call('registerUser', Session.get('isLive'), companyName, companyEmail, contactName,apiClientId, function(err,res){
      if(err) {
      } 
      else {
        if(res.error){
          toastr.error(res.error,'An Error Occured');
          deactivateSpinner();
        }
        else{
          console.log(res);
          toastr.success('User onboarded succesfully');          
          $("#foCompanyName").val('');
          $("#foCompanyEmail").val('');
          $("#foContactName").val('');
          $("#foApiClientId").val('');
          deactivateSpinner();
        }
      }
    });
  }
}

createUser = function(){
  let companyName = $("#newCompanyName").val();
  let companyEmail = $("#newCompanyEmail").val();
  if(companyEmail && companyName){
    let user = {username: companyEmail,email : companyEmail, password : 'password'}
    Meteor.call('adminCreateUser', user, companyName,companyEmail, function(err,res){
      if(err) {} 
      else {
        $("#newCompanyName").val('');
        $("#newCompanyEmail").val('');
      }          
    });
  }
}

saveItem = function(){
  let companyName = $("#editCompanyName").val();
  let apiAuthorizationHeader = $("#editApiAuthorizationHeader").val();

  Meteor.call('adminUpdateUserAccount', companyName, apiAuthorizationHeader, Session.get('editItemId'), function(err,res){
    if(err) {} 
    else {}          
  });
  Session.set('editItemId', null);
}

deleteItem = function(userId){  
  Meteor.call('adminDeleteUserAccount', Session.get('editItemId'), userId, function(err,res){
    if(err) {} 
    else {}          
  });
  Session.set('editItemId', null);
}

saveRole = function(){
  let role = $("#editRole").val();

  Meteor.call('adminUpdateUserRole', role, Session.get('editItemId'), function(err,res){
    if(err) {} 
    else {}          
  });
  Session.set('editItemId', null);
}

resetPassword = function(){
  Meteor.call('adminResetUserPassword', Session.get('resetUserId'), function(err,res){
    if(err) {} 
    else {}          
  });
  Session.set('resetPassword', null);
}