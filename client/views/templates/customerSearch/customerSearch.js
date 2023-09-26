Template.customerSearch.rendered = function(){
  //'Esc' button event
  $(document).on('keyup', function (e) {
  if (e.which != 13) {
    $("#individualValidationMessage").hide();
    $("#companyValidationMessage").hide();
      if (e.which === 27) {
        $("#companyCustAddModal").modal('hide');
        $("#individualCustAddModal").modal('hide');
      }
    }
  });

  $('#individualCustAddModal').on('shown.bs.modal', function () {$('#newFirstName').focus();})  
  $('#companyCustAddModal').on('shown.bs.modal', function () {$('#newCompanyName').focus();})    
};