previous_edited_field = '';
customerId = '';

Template.customerProfile.created = function () {
  Session.set('customerEmail', null);
  Session.set('riskProfile', null);
  Session.set('riskBreakdownShownFlag', null);
  Session.set('customerDetails', null);
  Session.set('customerScreeningCount', null);
  Session.set('allShownFlag', null);
  Session.set('customerVerifications', null);
  Session.set('customerScreenings', null);
  Session.set('showNumberOfChecks', null);
  Session.set('customerIdentifications', null);
  Session.set('customerIdentificationCount', null);
  Session.set('customerVerificationCount', null);
}

Template.customerProfile.rendered = function () {
  customerId = FlowRouter.getParam("_CustId");
  Session.setPersistent("selectedCustomer", customerId);
  cancelChange();
  refreshCustomerPage('full');
  $('.modal').appendTo("body");

  //'Esc' button event
  $(document).on('keyup', function (e) {
    if (e.which === 27) {
      cancelChange();
    }
  });

  $('#addressAddModal').on('shown.bs.modal', function () {
    $('#newAddressPropertyNumber').focus();
  })
  $('#documentAddModal').on('shown.bs.modal', function () {
    $('#newDocumentType').focus();
  })
};

Template.customerProfile.events({
  'click .deleteCustomer': function () {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this customer",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete customer",
      closeOnConfirm: true
    }, function () {
      Meteor.call('deleteResource', Session.get('isLive'), URI_CUSTOMER, customerId, function (err, res) {
        activateSpinner();
        if (err) {
          toastr.error(err.details, err.reason);
          deactivateSpinner();
        } else {
          deactivateSpinner();
          swal("Customer Deleted", "The customer has been deleted.", "success");
          FlowRouter.go('/customers');
        }
      });
    })
  }
});

Template.customerProfile.helpers({
  customerDetails: function () {
    return Session.get('customerDetails');
  },
  riskProfile: function () {
    return Session.get('riskProfileDetails');
  },
  checkStatus: function () {
    // return (Number(Session.get('customerScreeningCount')) > 0) ? 'disabled' : '';
    // HTC-5 a user can be deleted even if a check as been performed.
    // Delete button is always enable
    return '';
  }
});

clickEventUpdateField = function (event, field, sessionFlag) {
  Session.set('validationMessage', null);
  //Enter key
  if (event.which === 13) {
    updateField(field, sessionFlag);
  }
};

updateField = function (field, sessionFlag) {
  let valueToValidate = {};
  let newValue = $(field).val();
  let attribute = $(field).data("attribute");
  let path = '/' + attribute;
  let customer = Session.get('customerDetails');
  let nameContext = (customer.type === "INDIVIDUAL") ?
    individualCustomerSchema.newContext() : companyCustomerSchema.newContext();

  //Special treatment for bootstrap components that return null when partially populated.
  if (attribute === 'dob' && !Session.get('customerDetails').dob && !newValue) {
    cancelChange();
  } else {
    if (!newValue) {
      operation = 'remove';
    } else if (customer[$(field).data("attribute")]) {
      operation = 'replace';
    } else {
      operation = 'add';
    }

    if (!newValue) {
      newValue = null
    };
    valueToValidate[attribute] = newValue;


    if (nameContext.validateOne(valueToValidate, attribute)) {
      patchResource(URI_CUSTOMER, customerId, operation, path, newValue, null, null, 'Customer updated');
      cancelChange();
    } else {
      let error = nameContext.invalidKeys();
      Session.set('validationMessage', nameContext.keyErrorMessage(error[0].name));
    }
  }
};

enableEdit = function (sessionFlag) {
  Session.set(previous_edited_field, false);
  Session.set(sessionFlag, true);
  previous_edited_field = sessionFlag;
};

disableEdit = function (sessionFlag) {
  Session.set(sessionFlag, false);
};

cancelChange = function () {
  Session.set('editTitle', false);
  Session.set('editFirstName', false);
  Session.set('editMiddleName', false);
  Session.set('editLastName', false);
  Session.set('editMaidenName', false);
  Session.set('editDob', false);
  Session.set('editGender', false);
  Session.set('editNationality', false);
  Session.set('editBirthCountry', false);

  Session.set('editCompanyName', false);
  Session.set('editIncorporationNumber', false);
  Session.set('editIncorporationType', false);
  Session.set('editIncorporationCountry', false);
  Session.set('editBusinessPurpose', false);
  Session.set('editPrimaryContactName', false);
  Session.set('editPrimaryContactEmail', false);

  Session.set('editEmail', false);
  Session.set('editMobile', false);
  Session.set('editTelephone', false);

  Session.set('editAddress', false);
  Session.set('editDocument', false);
  Session.set('validationMessage', null);

  $("#newAddressValidationMessage").hide();
  $("#newDocumentValidationMessage").hide();

  $('#addressAddModal').modal('hide');
  $('#documentAddModal').modal('hide');

  $('#documentDateRange').hide();
  $("#editDocument").show();
  $("#saveDocument").hide();
  $("#cancelDocument").hide();
  $("#closeDocument").show();
  $("#documentValidationMessage").hide();

  clearScreeningOptions();
  // clearVerificationOptions();
};