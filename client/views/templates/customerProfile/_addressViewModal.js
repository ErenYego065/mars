Template.addressViewModal.rendered = function(){
  $('#addressDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy'
  });

  $('.modal').appendTo("body");
  $("#addressValidationMessage").hide();
  hideAddressButtons(true,false,false,true,false)

  $(document).on('keyup', function (e) {
    if (e.which === 27) {
      disableEdit('editAddress');
      $("#addressDateRange").hide();
      hideAddressButtons(true,false,false,true,false);
      cancelChange();
    }
  });

  $(document).on('keyup', function (e) {
    $("#addressValidationMessage").hide();
  });

  $(document).on('click', '#editAddress', function(e) {
    e.preventDefault();
    enableEdit('editAddress');
    $('#addressDateRange').show();
    hideAddressButtons(false,true,true,false,false);
  });

  $(document).on('click', '#closeAddress', function(e) {
    e.preventDefault();
    disableEdit('editAddress');
    $("#addressDateRange").hide();
    hideAddressButtons(true,false,false,true,false);
  });

  $(document).on('click', '#cancelAddress', function(e) {
    e.preventDefault();
    disableEdit('editAddress');
    $('#addressDateRange').hide();
    hideAddressButtons(true,false,false,true,false);
  });
  
  $(document).on('click', '#saveAddress', function(e) {
    e.preventDefault();
    let fromDateObj = stringToDate($("#addressFromDate").val());
    let toDateObj = stringToDate($("#addressToDate").val());
    let fromDate = dateConvert(fromDateObj,'YYYY-MM-DD');
    let toDate = dateConvert(toDateObj,'YYYY-MM-DD');
    
    let nameContext = addressSchema.newContext();
    let operation;
    let path = '/addresses/'+Session.get('selectedAddressIndex');
    let customer = Session.get('customerDetails');
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
    let valueToValidate = {};    

    if(!cleanPatchValue) {cleanPatchValue = null};

    if(customer.addresses){operation = 'replace';}
    else if(!cleanPatchValue){operation = 'remove';}
    else {operation='add';}
    
    if(nameContext.validate(cleanPatchValue)){
      patchResource(URI_CUSTOMER, customerId, operation, path, cleanPatchValue, null,null,'Address updated');
      hideAddressButtons(true,false,false,true,false);
      cancelChange();
      $("#addressDateRange").hide();
      $("#addressValidationMessage").hide();
      $('#addressViewModal').modal('toggle');
    }
    else {
      $("#addressValidationMessage").show();
      let error = nameContext.invalidKeys();
      Session.set('addressValidationMessage',nameContext.keyErrorMessage(error[0].name));
      $("#addressValidationMessage").html(Session.get("addressValidationMessage"));
    }
  });
};

Template.addressViewModal.helpers({
  editingAddress: function(){return Session.get('editAddress');},
  address : function(){
    return [
      {
        "type": Session.get("selectedAddressType"),
        "property_number": Session.get("selectedAddressPropNumber"),
        "property_name": Session.get("selectedAddressPropName"),
        "line": Session.get("selectedAddressline"),
        "extra_line": Session.get("selectedAddressExtraline"),
        "city": Session.get("selectedAddressCity"),
        "state_or_province": Session.get("selectedAddressProvince"),
        "postal_code": Session.get("selectedAddressPostalCode"),
        "country": Session.get("selectedAddressCountry"),
        "from_date": Session.get("selectedAddressFromDate"),
        "to_date": Session.get("selectedAddressToDate")
      }
    ]
  }
});

function hideAddressButtons(edit,save,cancel,close,validation){
  if(edit){$("#editAddress").show();} else{$("#editAddress").hide();}
  if(save){$("#saveAddress").show();} else{$("#saveAddress").hide();}
  if(cancel){$("#cancelAddress").show();} else{$("#cancelAddress").hide();}
  if(close){$("#closeAddress").show();} else{$("#closeAddress").hide();}
  if(validation){$("#addressValidationMessage").show();} else{$("#addressValidationMessage").hide();}
}