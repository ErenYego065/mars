Template.addressAddModal.rendered = function() {
  $('#newAddressDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy'
  });

  $("#newAddressDateRange").show();

  $("#addressAddModal").on('keyup', function (e) {
    if (e.which != 13) {      
      $("#newAddressValidationMessage").hide();
    }
    else{
      addAddress();
    }
  });

  $("#addressAddModal").on('click', '#closeNewAddress', function(e) {
    e.preventDefault();
    resetAddressFields();
    cancelChange();
  });

  $("#addressAddModal").on('click', '#saveNewAddress', function(e) {
    e.preventDefault();
    addAddress();
  });
};

function resetAddressFields(){
  $("#newAddressPropertyNumber").val('');
  $("#newAddressPropertyName").val('');
  $("#newAddressLine").val('');
  $("#newAddressExtraLine").val('');
  $("#newAddressCity").val('');
  $("#newAddressProvince").val('');
  $("#newAddressPostalCode").val('');
  $("#newAddressCountry").val('');
  $("#newAddressType").val('');
  $("#newAddressFromDate").val('');
  $("#newAddressToDate").val('');
};

function addAddress(){
  let fromDateObj = stringToDate($("#newAddressFromDate").val());
  let toDateObj = stringToDate($("#newAddressToDate").val());
  let fromDate = dateConvert(fromDateObj,'YYYY-MM-DD');
  let toDate = dateConvert(toDateObj,'YYYY-MM-DD');
  let nameContext = addressSchema.newContext();
  let operation = 'add';
  let path = '/addresses/-';

  let patchValue = {
    "type" :  $("#newAddressType").val(),
    "property_number" : $("#newAddressPropertyNumber").val(),  
    "property_name" : $("#newAddressPropertyName").val(),
    "line" : $("#newAddressLine").val(),
    "extra_line" : $("#newAddressExtraLine").val(),
    "city" : $("#newAddressCity").val(),
    "state_or_province" : $("#newAddressProvince").val(),
    "postal_code" : $("#newAddressPostalCode").val(),
    "country" : $("#newAddressCountry").val(),
    "from_date" : fromDate,
    "to_date" : toDate
  }

  let cleanPatchValue = cleanJson(patchValue);
  if(!cleanPatchValue) {cleanPatchValue = null};
  let valueToValidate = {};    

  if(nameContext.validate(cleanPatchValue)){
    patchResource(URI_CUSTOMER, customerId, operation, path, cleanPatchValue, null,null,'Address added');
    resetAddressFields();
    $("#newAddressValidationMessage").hide();
    $('#addressAddModal').modal('hide');
  }
  else {
    $("#newAddressValidationMessage").show();
    var error = nameContext.invalidKeys();
    Session.set('newAddressValidationMessage',nameContext.keyErrorMessage(error[0].name));
    $("#newAddressValidationMessage").html(Session.get("newAddressValidationMessage"));
  }
}