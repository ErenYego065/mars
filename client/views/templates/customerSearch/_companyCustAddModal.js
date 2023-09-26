Template.companyCustAddModal.rendered = function() {
  $("#companyCustAddModal").on('click', '#closeCompanyCust', function(e) {
    e.preventDefault();
    resetFields();
    $("#companyCustAddModal").modal('hide');
  });

  $("#companyCustAddModal").keypress(function(e) {
    if(e.which == 13) {createCompanyCustomer();}
  });

  $("#companyCustAddModal").on('click', '#saveCompanyCust', function(e) {
    e.preventDefault();
    createCompanyCustomer();
  });
};

function resetFields(){
  $("#companyValidationMessage").hide();
  $("#newCompanyName").val(''),
  $("#newCompanyEmail").val('')
};

function createCompanyCustomer(){
  let nameContext = companyCustomerSchema.newContext();
  let postBody = {
    "type":"COMPANY",
    "company_name" :  $("#newCompanyName").val(),
    "email" :  $("#newCompanyEmail").val()
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
        FlowRouter.go('/customers/'+customer.id);
      } 
    });   
    $('#companyCustAddModal').modal('hide');
  }
  else {
    $("#companyValidationMessage").show();
    var error = nameContext.invalidKeys();
    Session.set('companyValidationMessage',nameContext.keyErrorMessage(error[0].name));
    $("#companyValidationMessage").html(Session.get("companyValidationMessage"));
  }
}