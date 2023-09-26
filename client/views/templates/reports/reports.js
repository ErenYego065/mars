Template.reports.created = function(){  
  Session.set('documentContent',null);  
};

Template.reports.rendered = function(){  
  let reportID = FlowRouter.getParam("_ReportId");;
  Meteor.call('getResource', Session.get('isLive'), URI_REPORT_DOWNLOAD, null, null, reportID, function(err, res){
    if(err) {
      toastr.error(err.details, err.reason); 
      deactivateSpinner();      
    } 
    else {
      let documentContent = res;
      Session.set('documentContent','data:application/pdf;base64,'+ encode(documentContent));
      deactivateSpinner();
    }       
  });
};

Template.reports.helpers({
  documentContent: function() {return Session.get('documentContent');}
});