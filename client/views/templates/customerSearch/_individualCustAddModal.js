Template.individualCustAddModal.rendered = function() {
  $(document).on('click', '#closeIndividualCust', function(e) {
    e.preventDefault();
    resetFields();
    $("#individualCustAddModal").modal('hide');
  });
  
  $("#individualCustAddModal").keypress(function(e) {
    if(e.which == 13) {createIndividualCustomer();}
  });
  
  $("#individualCustAddModal").on('click', '#saveIndividualCust', function(e) {
    e.preventDefault();
    createIndividualCustomer();
  });
};

function resetFields(){
  $("#newFirstName").val(''),
  $("#newLastName").val(''),
  $("#newIndividualEmail").val(''),
  $("#individualValidationMessage").hide();
};

function createIndividualCustomer(){
  let nameContext = individualCustomerSchema.newContext();
  
  let postBody = {
    "type":"INDIVIDUAL",
    "first_name" :  $("#newFirstName").val(),
    "last_name" :  $("#newLastName").val(),
    "email" :  $("#newIndividualEmail").val()
  }

  let cleanPostBody = cleanJson(postBody);
  if(!cleanPostBody) {cleanPostBody = null};
  let valueToValidate = {};    

  if(nameContext.validate(cleanPostBody)){
    resetFields();
    Meteor.call('postResource', Session.get('isLive'), URI_ALL_CUSTOMERS, customerId, cleanPostBody,function(err,res){
    activateSpinner();
      if(err) {
        toastr.error(err.details, err.reason); 
        deactivateSpinner();
      } 
      else {
        deactivateSpinner();
        toastr.success('Customer added');
        let customer = JSON.parse(res.content);
        // $('.modal-backdrop').hide();        
        FlowRouter.go('/customers/'+customer.id);
      } 
    });   
    $('#individualCustAddModal').modal('hide');
  }
  else {
    $("#individualValidationMessage").show();
    var error = nameContext.invalidKeys();
    Session.set('individualValidationMessage',nameContext.keyErrorMessage(error[0].name));
    $("#individualValidationMessage").html(Session.get("individualValidationMessage"));
  }
}