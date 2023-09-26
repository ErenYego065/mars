/**
 * Defines a HTTP PATCH callback method.
 */

patchResource = function (endpoint, customerId, operation, path, value, resourceId1, resourceId2, message) {
  activateSpinner();

  Meteor.call('patchResource', Session.get('isLive'), endpoint, customerId, operation, path, value, resourceId1, resourceId2, function (err, res) {
    if (err) {
      toastr.error(err.details, err.reason);
      deactivateSpinner();
    } else {
      refreshCustomerPage('profile', message);
      deactivateSpinner();
    }
  });
}

/**
 * Defines a generic method for fetching customer related resources.
 * @param {string} variant - The scope of the fetch. Options:-
 * 	'full': retrieves all details held on customer.
 *  'profile': retrieves customer level details and risk profile.
 */

refreshCustomerPage = function (variant, message) {
  // Set GET parameter to only return 'n' elements. The purpose is to display that many number of 
  // checks on the customer page.
  let screeningParam = "?size=10"; //+ NO_OF_CHECKS_RETURNED;
  let verificationParam = "?size=10";
  let identificationParam = "?size=10";


  switch (variant) {
    case 'full':
      activateSpinner();
      Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER, customerId, function (err, res) {
        if (err) {
          if (err.error === 401) {
            Meteor.logout(function () {
              FlowRouter.go('/login');
            });
          }
          toastr.error(err.details, err.reason);
          deactivateSpinner();
        } else {
          let customer = JSON.parse(res.content);
          Session.setPersistent('customerDetails', customer);
          Session.setPersistent('customerEmail', customer.email);
          deactivateSpinner();
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_RISK_PROFILE, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let riskProfile = res.content;
          Session.setPersistent('riskProfileDetails', JSON.parse(riskProfile));
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_DOCUMENTS, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let documentsList = res.data.content;
          Session.setPersistent('allCustomerDocuments', documentsList);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_NOTES, customerId, null, '?&sort=updated_at,DESC', function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let notes = res.data.content;
          Session.setPersistent('customerNotes', notes);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_SCREENINGS, customerId, screeningParam, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let screenings = res.data.content;
          let screeningCount = res.data.total_elements;
          Session.setPersistent('customerScreenings', screenings);
          Session.setPersistent('customerScreeningCount', screeningCount);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_DOC_VERIFICATIONS, customerId, verificationParam, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let verifications = res.data.content;
          let verificationCount = res.data.total_elements;
          Session.setPersistent('customerVerifications', verifications);
          Session.setPersistent('customerVerificationCount', verificationCount);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_IDENTIFICATIONS, customerId, identificationParam, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let identifications = res.data.content;
          let identificationCount = res.data.total_elements;
          Session.setPersistent('customerIdentifications', identifications);
          Session.setPersistent('customerIdentificationCount', identificationCount);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_ALL_ODD, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let oddConfig = res.data.content;
          Session.setPersistent('customerODD', oddConfig);
        }
      });
      break;

    case 'profile':
      activateSpinner();
      Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let customer = JSON.parse(res.content);
          Session.setPersistent('customerDetails', customer);
          Session.setPersistent('customerEmail', customer.email);
          deactivateSpinner();
          toastr.success(message);
        }
      });

      Meteor.call('getResource', Session.get('isLive'), URI_RISK_PROFILE, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let riskProfile = res.content;
          Session.setPersistent('riskProfileDetails', JSON.parse(riskProfile));
        }
      });
      break;

    case 'notes':
      activateSpinner();
      Meteor.call('getResource', Session.get('isLive'), URI_ALL_NOTES, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let notes = res.data.content;
          Session.setPersistent('customerNotes', notes);
          deactivateSpinner();
          toastr.success(message);
        }
      });
      break;

    case 'documents':
      Meteor.call('getResource', Session.get('isLive'), URI_ALL_DOCUMENTS, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let documentsList = res.data.content;
          Session.setPersistent('allCustomerDocuments', documentsList);
          toastr.success(message);
          deactivateSpinner();
        }
      });
      break;

    case 'odd':
      activateSpinner();
      Meteor.call('getResource', Session.get('isLive'), URI_ALL_ODD, customerId, function (err, res) {
        if (err) {
          toastr.error(err.details, err.reason);
        } else {
          let oddConfig = res.data.content;
          Session.setPersistent('customerODD', oddConfig);
          deactivateSpinner();
          toastr.success(message);
        }
      });
      break;
  }
}

updateNavStats = function () {
  // Meteor.call('getResource', Session.get('isLive'), URI_SCREENING_STATS, function (err, res) {
  //   if (err) {
  //     if (err.error === 401) {
  //       Meteor.logout(function () {
  //         FlowRouter.go('/login');
  //       });
  //     }
  //     toastr.error(err.details, err.reason);
  //   } else {
  //     Session.set('screeningStats', res.data);
  //   }
  // });

  let parameters = "?size=1&status=PENDING";

  Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_SCREENINGS, null, parameters, function (err, res) {
   if (err) {
     if (err.error === 401) {
       Meteor.logout(function () {
         FlowRouter.go('/login');
       });
     }
     toastr.error(err.details, err.reason);
   } else {
     Session.set('openScreening', res.data.total_elements);
   }
 });
}