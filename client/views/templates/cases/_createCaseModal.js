Template.createCaseModal.rendered = function() {
  $('.newCaseRelatedCustomer').typeahead({
    source: Session.get('customersList')
  });

  $("#createCaseModal").keypress(function(e) {
    if(e.which == 13) {
      //handle case creation
    }
  });

  // $(document).on('click', '#closeIndividualCust', function(e) {
  //   e.preventDefault();
  //   resetFields();
  //   $("#individualCustAddModal").modal('hide');
  // });

  // $('#createCaseModal')
  // .on('hidden.bs.modal', function() {
  //   FlowRouter.go('/customers/1289319287391827398213/cases/123-123123-1asdfsadf');        
  // })
  // .modal('hide');   
    
    // let nameContext = individualCustomerSchema.newContext();

    // let postBody = {
    //   "type":"INDIVIDUAL",
    //   "first_name" :  $("#newFirstName").val(),
    //   "last_name" :  $("#newLastName").val(),
    //   "email" :  $("#newIndividualEmail").val()
    // }

    // let cleanPostBody = cleanJson(postBody);
    // if(!cleanPostBody) {cleanPostBody = null};
    // let valueToValidate = {};    

    // if(nameContext.validate(cleanPostBody)){
    //   resetFields();
    //   Meteor.call('postResource', Session.get('isLive'), URI_ALL_CUSTOMERS, customerId, cleanPostBody,function(err,res){
    //   activateSpinner();
    //     if(err) {
    //       sweetAlert(err.reason, err.details, "error");
    //       deactivateSpinner();
    //     } 
    //     else {
    //       deactivateSpinner();
    //       toastr.success('Customer added');
    //       let customer = JSON.parse(res.content);
    //       FlowRouter.go('/customers/'+customer.id);
    //     } 
    //   });   
    //   $('#individualCustAddModal').modal('hide');
    // }
    // else {
    //   $("#individualValidationMessage").show();
    //   var error = nameContext.invalidKeys();
    //   Session.set('individualValidationMessage',nameContext.keyErrorMessage(error[0].name));
    //   $("#individualValidationMessage").html(Session.get("individualValidationMessage"));
    // }
  // });
};

Template.createCaseModal.helpers({
  customersList: function(){ $('.newCaseRelatedCustomer').data('typeahead').source =  Session.get('customersList');}
});

Template.createCaseModal.events({
  'click #saveNewCase': function (e) {
    e.preventDefault();
    // $("#createCaseModal").modal('hide');
    // $('.modal-backdrop').fadeOut(150);
    // $('#createCaseModal').modal('toggle');
    // $("#createCaseModal").modal('hide');

    Meteor.setTimeout(function(){FlowRouter.go('/customers/cc9fd920-1e13-4097-8129-7db888f810eb/cases/cc9fd920-1e13-4097-8129-7db888f810eb');}, 500);

    // FlowRouter.go('/customers/cc9fd920-1e13-4097-8129-7db888f810eb/cases/cc9fd920-1e13-4097-8129-7db888f810eb');     
    // window.location.href = "/customers/cc9fd920-1e13-4097-8129-7db888f810eb/cases/cc9fd920-1e13-4097-8129-7db888f810eb";
  },
});

// function resetFields(){
//   $("#newFirstName").val(''),
//   $("#newLastName").val(''),
//   $("#newIndividualEmail").val(''),
//   $("#individualValidationMessage").hide();
// };