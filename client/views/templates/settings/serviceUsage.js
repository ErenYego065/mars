Template.serviceUsage.created = function () {
  Session.set('checksMade', null);
  Session.set('documentVerificationCredit', null);
}

Template.serviceUsage.rendered = function () {
  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_USER_INFO, function (err, res) {
    if (err) {
      deactivateSpinner();
      toastr.error(err.details, err.reason);
    } else {
      Session.set('documentVerificationCredit', res.data.prepaid_dv)

      let planId = res.data.plan_id;
      let credit = res.data.credit;
      let parameters;
      let docVerCount = idVerCount = wl = pep = dde = ame = 0;
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let fromDate = new Date(y, m, 1);
      let toDate = new Date(y, m + 1, 0);
      fromDate = moment(fromDate).add(-1, 'day').format('YYYY/MM/DD');
      toDate = moment(toDate).add(1, 'day').format('YYYY/MM/DD');
      parameters = '?size=1000&created_after=' + fromDate + '&created_before=' + toDate + '&disable_customer_filter=true';

      Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_SCREENINGS, null, parameters, function (err, res) {
        if (err) {
          deactivateSpinner();
          toastr.error(err.details, err.reason);
        } else {
          for (let i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].scope.includes('WATCHLIST')) {
              wl++;
            }
            if (res.data.content[i].scope.includes('PEP')) {
              pep++;
            }
            if (res.data.content[i].scope.includes('DISQUALIFIED_ENTITIES')) {
              dde++;
            }
            if (res.data.content[i].scope.includes('ADVERSE_MEDIA')) {
              ame++;
            }
          }

          Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_VERIFICATIONS, null, parameters, function (err, res) {
            if (err) {
              deactivateSpinner();
              toastr.error(err.details, err.reason);
            } else {
              docVerCount = res.data.total_elements;

              Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_IDENTIFICATIONS, null, parameters, function (err, res) {
                if (err) {
                  deactivateSpinner();
                  toastr.error(err.details, err.reason);
                } else {
                  idVerCount = res.data.total_elements;

                  finalResult = {
                    wlCount: wl,
                    pepCount: pep,
                    ddCount: dde,
                    amCount: ame,
                    totalDocVerChecks: docVerCount,
                    totalIdVerChecks: idVerCount,
                  }
                  Session.set('checksMade', finalResult);
                  deactivateSpinner();
                }
              });
            }
          });
        }
        // Meteor.call('getPlanDetails', planId, function(err,res){
        //   if(err) {
        //     deactivateSpinner(); 
        //     toastr.error(err.details, err.reason); 
        //   } 
        //   else {
        //     Session.set('screeningChecksMade', Number(res.result) - Number(credit));
        //     deactivateSpinner();          
        //   }
      });
    }
  });
};

Template.serviceUsage.helpers({
  checksMade: function () {
    return Session.get('checksMade')
  },
  documentVerificationCredit: function () {
    return Session.get('documentVerificationCredit')
  },
  fromDate: function () {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let fromDate = new Date(y, m, 1);
    return moment(fromDate).format('Do MMM');
  },
  toDate: function () {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var toDate = new Date(y, m + 1, 0);
    return moment(toDate).format('Do MMM');
  }
});