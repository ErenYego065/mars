FlowRouter.notFound = {
    action: function() {
        // BlazeLayout.render("mainLayout", {content: "dashboard"});
        FlowRouter.go('/dashboard');
    }
};

FlowRouter.route('/', {
    action: function() {
       FlowRouter.go('/login');
    }
});

FlowRouter.route('/login', {
    action: function() {
       BlazeLayout.render("blankLayout", {content: "login"});
    }
});

FlowRouter.route('/logout', {
    action: function() {
       BlazeLayout.render("blankLayout", {content: "logout"});
    }
});

FlowRouter.route('/dashboard', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "dashboard"});
    }
});

FlowRouter.route('/customers', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "customerSearch"});
    }
});

FlowRouter.route('/customers/:_CustId', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "customerProfile"});
    }
});

FlowRouter.route('/screenings', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "screeningSearch"});
    }
});

FlowRouter.route('/matchProfile', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "matchProfile"});
  }
});

FlowRouter.route('/verifications', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "verificationSearch"});
    }
});

FlowRouter.route('/identifications', {
 action: function() {
    BlazeLayout.render("mainLayout", {content: "identificationSearch"});
 }
});

FlowRouter.route('/customers/:_CustId/screenings/:_ScreeningId/matches', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "matchValidation"}); 
    }
});

FlowRouter.route('/customers/:_CustId/screenings/:_ScreeningId/matches/:_MatchId', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "matchProfile"}); 
    }
});

FlowRouter.route('/customers/:_CustId/screenings/:_ScreeningId/matches/:_MatchId/associations/:_AssociationId', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "associationProfile"}); 
    }
});

FlowRouter.route('/customers/:_CustId/screenings', {
    action: function(params) {
      BlazeLayout.render("mainLayout", {content: "screeningSearch", data: params._CustId}); 
    }
});

FlowRouter.route('/customers/:_CustId/verifications/:_VerificationId', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "verificationDetails"}); 
    }
});

FlowRouter.route('/customers/:_CustId/verifications', {
    action: function(params) {
      BlazeLayout.render("mainLayout", {content: "verificationSearch", data: params._CustId}); 
    }
});

FlowRouter.route('/customers/:_CustId/identifications/:_IdentificationId', {
 action: function() {
   BlazeLayout.render("mainLayout", {content: "identificationDetails"}); 
 }
});

FlowRouter.route('/customers/:_CustId/identifications', {
 action: function(params) {
   BlazeLayout.render("mainLayout", {content: "identificationSearch", data: params._CustId}); 
 }
});

FlowRouter.route('/cases', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "cases"});
    }
});

FlowRouter.route('/customers/:_CustId/cases/:_CaseId/', {
    action: function(params) {
      BlazeLayout.render("mainLayout", {content: "caseDetails"}); 
    }
});

// FlowRouter.route('/search/verifications/document_id=:_DocId', {
//   action: function() {
//     BlazeLayout.render("mainLayout", {content: "verificationSearch", data: params._DocId});         
//   }
// });

FlowRouter.route('/reports/:_ReportId', {
    action: function() {
       BlazeLayout.render("blankLayout", {content: "reports"});
    }
});

FlowRouter.route('/serviceUsage', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "serviceUsage"}); 
    }
});

FlowRouter.route('/profileSettings', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "profileSettings"}); 
    }
});

FlowRouter.route('/userSettings', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "userSettings"}); 
    }
});

FlowRouter.route('/apiSettings', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "apiSettings"}); 
    }
});

FlowRouter.route('/faqHelp', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "faqHelp"}); 
    }
});

FlowRouter.route('/admin', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "admin"});
    }
});

FlowRouter.route('/onboarding/:_CompanyName/:_Name/:_Email', {
  action: function() {
     BlazeLayout.render("mainLayout", {content: "admin"});
  }
});

FlowRouter.route('/admin/:_UserId/:_Auth/:_FromDate/:_ToDate', {
  action: function() {
     BlazeLayout.render("mainLayout", {content: "adminUserDetails"});
  }
});

FlowRouter.route('/identityVerificationDemo', {
    action: function() {
       BlazeLayout.render("mainLayout", {content: "identityVerificationDemo"});
    }
});

FlowRouter.route( '/verify-2fa/:token', {
  action: function(params) {
    Meteor.call('verify2FATokenLink', params.token, function(err, res) {
      if ( err ) {

      } 
      else {
        if(res){
          toastr.success('Congratulations! Your account is now more secure.');          
          FlowRouter.go( '/dashboard' );      
        }
        else{
          FlowRouter.go( '/dashboard' );            
        }
      }
    });
  }
});
