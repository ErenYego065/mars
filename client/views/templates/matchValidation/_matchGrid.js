page = 0;
NO_OF_ELEMENTS_TABLE = 20
Template.matchGrid.created = function(){
  page = 0;
  NO_OF_ELEMENTS_TABLE = 20
  Session.set('allMatches',null);
  Session.set('customerDetails',null);
  Session.set('screeningDetails',null);
  Session.set('current-page', 0)  
  Session.set('currentPage', 1);  
  Session.set('previousPageStatus', 'disabled');  
  currentPage = new ReactiveVar(Session.get('current-page') || 0);  
  this.currentPage = currentPage;
  this.autorun(function () {
    Session.set('current-page', currentPage.get());
  });
}

Template.matchGrid.rendered = function(){

  let urlPage = FlowRouter.current().queryParams.page;
  if(urlPage){
    parameters = FlowRouter.current().path;
    parameters = '?' + (parameters.substring(parameters.indexOf("?")+1));
    page = Number(urlPage);
    Session.set('current-page', page)  
    Session.set('currentPage', page + 1);     
    if(page===0){Session.set('previousPageStatus','disabled');}
    else{Session.set('previousPageStatus','');}        
    getMatches(true);
  } 
  else{
    getMatches(false);
  }

  getScreening();
  getCustomer();


  // $(document).on('click', '#getReport', function(event) {
  //   event.preventDefault();
  //   activateSpinner();    
    // let pdfPage = window.open('data:application/pdf;base64,','Hello');
    // pdfPage.document.title = 'testing';
    
    // let screeningId = Session.get('selectedScreening');    
    // let cleanPostBody = {
    //   type: "SCREENING_REPORT",
    //   name : "Screening report",
    //   parameters : {
    //     screening_id : screeningId
    //   }
    // }
    // Meteor.call('postResource', Session.get('isLive'), URI_ALL_REPORTS, null, cleanPostBody,function(err,res){
    //   if(err) {
    //     deactivateSpinner();  
    //     toastr.error(err.details, err.reason); 
    //   } 
    //   else {       
        // let reportID = JSON.parse(res.content).id;

        // let reportID = Session.get('screeningDetails').report_id;
        // Meteor.call('getResource', Session.get('isLive'), URI_REPORT_DOWNLOAD, null, null, reportID, function(err, res){
        //   if(err) {
        //     toastr.error(err.details, err.reason); 
        //     deactivateSpinner();      
        //   } 
        //   else {
        //     let name;
        //     if(Session.get('customerDetails').type === 'INDIVIDUAL'){
        //       name = Session.get('customerDetails').first_name + ' ' + Session.get('customerDetails').last_name;
        //     }
        //     else{
        //       name = Session.get('customerDetails').company_name;
        //     }

        //     let documentContent = res;
        //     // pdfPage.location.href='data:application/pdf;base64,' + documentContent;
          
        //     let dl = document.createElement('a');
        //     dl.setAttribute('href', 'data:application/pdf;base64,' + documentContent);
        //     dl.setAttribute('download', 'Screening Report - ' + name);
        //     dl.click();
        //     deactivateSpinner();
        //   }       
        // });
    //   } 
    // });       
  // });

};

Template.matchGrid.events({
  "click .viewReport": function (event) {
    event.preventDefault();
    FlowRouter.go('/reports/' + Session.get('screeningDetails').report_id)    
  },
  
  "click .downloadReport": function (event) {
    event.preventDefault();
    activateSpinner();    
    // let pdfPage = window.open('data:application/pdf;base64,','Hello');
    // pdfPage.document.title = 'testing';

    let reportID = Session.get('screeningDetails').report_id;
        Meteor.call('getResource', Session.get('isLive'), URI_REPORT_DOWNLOAD, null, null, reportID, function(err, res){
          if(err) {
            toastr.error(err.details, err.reason); 
            deactivateSpinner();      
          } 
          else {
            let name;
            if(Session.get('customerDetails').type === 'INDIVIDUAL'){
              name = Session.get('customerDetails').first_name + ' ' + Session.get('customerDetails').last_name;
            }
            else{
              name = Session.get('customerDetails').company_name;
            }

            let documentContent = res;
            // pdfPage.location.href='data:application/pdf;base64,' + documentContent;
          
            let dl = document.createElement('a');
            dl.setAttribute('href', 'data:application/pdf;base64,' + encode(documentContent));
            dl.setAttribute('download', 'Screening Report - ' + name);
            dl.click();
            deactivateSpinner();
          }       
        });
 },

 "click .confirmMatch": function (event) {
    event.preventDefault();
    let matchId = event.currentTarget.dataset.id;

    swal({
      title: "Confirm match?",
      text: "Are you sure you want to confirm match?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {validateMatch(matchId, 'confirm');} 
        else {$("[data-id="+matchId+"]").removeClass( "active");}
      }            
    )
 },

 "click .dismissMatch": function (event) {
    event.preventDefault();
    let matchId = event.currentTarget.dataset.id;
    
    swal({
      title: "Dismiss match?",
      text: "Are you sure you want to dismiss match?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {validateMatch(matchId, 'dismiss');} 
        else {$("[data-id="+matchId+"]").removeClass( "active");}
      }            
    )
 },

 "click .viewMatch": function (event) {
    event.preventDefault();
    let customerId = Session.get('selectedCustomer');
    let screeningId = Session.get('selectedScreening');
    let matchId = event.currentTarget.dataset.id;
    FlowRouter.go('/customers/' + customerId + '/screenings/' + screeningId + '/matches/' + matchId);  
  },

  "click .nextPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows)/NO_OF_ELEMENTS_TABLE);
    if(page < numberOfPages){
      currentPage.set(++page);
    }
    // //server-side implementation
    Session.set('currentPage', page+1);
    getMatches();
  },

  "click .previousPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows)/NO_OF_ELEMENTS_TABLE);
    if(page!=0){
      currentPage.set(--page);
    }
    Session.set('currentPage', page+1);    
    getMatches();    
  }

});

Template.matchGrid.helpers({
  matches: function() {return Session.get('allMatches');},
  hasMatches: function() {return Session.get('hasMatches');},
  customerId: function() {return Session.get('selectedCustomer');},
  screeningId: function() {return Session.get('selectedScreening');},  
  screeningDetails: function() {return Session.get('screeningDetails');},
  customerDetails: function() {return Session.get('customerDetails');},
  totalPages: function() {return Session.get('totalPages');},
  nextPageStatus: function() {return Session.get('nextPageStatus');},
  previousPageStatus: function() {return Session.get('previousPageStatus');},  
  currentPage: function() {return Session.get('currentPage');}
});

getMatches = function(hasParameters) {
  activateSpinner();  
  let customerId = Session.get("selectedCustomer");
  let screeningId = Session.get("selectedScreening");
  if(!hasParameters){
    if(page===0){Session.set('previousPageStatus','disabled');}
    else{Session.set('previousPageStatus','');}
    Session.set('currentPage', page + 1);              
  }
  parameters = "&size="+NO_OF_ELEMENTS_TABLE + "&page=" + page;
  Meteor.call('getResource', Session.get('isLive'), URI_ALL_MATCHES, customerId, parameters, screeningId, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let allMatches = res.data;
      let numberOfMatches = res.data.total_elements;
      let hasMatches = (res.data.total_elements>0) ? true : false;
      Session.setPersistent('allMatches', allMatches);
      Session.setPersistent('hasMatches', hasMatches);
      totalRows = numberOfMatches;
      Session.set('totalPages', Math.ceil(Number(totalRows)/NO_OF_ELEMENTS_TABLE));
      if(numberOfMatches <= (NO_OF_ELEMENTS_TABLE * (page+1))){Session.set('nextPageStatus','disabled');}
      else {Session.set('nextPageStatus','');}
      isFullDataSet = true;
      deactivateSpinner();  
    }          
  });
}

getScreening = function() {
  activateSpinner();  
  let customerId = Session.get("selectedCustomer");
  let screeningId = Session.get("selectedScreening");

  Meteor.call('getResource', Session.get('isLive'), URI_SCREENING, customerId, null,screeningId, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let screeningDetails = JSON.parse(res.content);
      Session.setPersistent('screeningDetails', screeningDetails);
      deactivateSpinner();
    }          
  });
}

validateMatch = function(matchId, validationAction) {
  activateSpinner();
  let customerId = Session.get("selectedCustomer");
  let screeningId = Session.get("selectedScreening");
  Meteor.call('postResource', Session.get('isLive'), URI_VALIDATE_MATCH, customerId, null, null, screeningId, matchId, validationAction, function(err,res){
    if(err) {
      deactivateSpinner();
      $("[data-id="+matchId+"]").removeClass( "active");
      toastr.error(err.details, err.reason); 
    } 
    else {
      let action = (validationAction === 'confirm') ? 'confirmed' : 'dismissed';      
      $('[data-type="matchValidation"][data-id='+matchId+']').css({"pointer-events": "none" });
      $('[data-type="matchValidation"][data-id='+matchId+']').addClass("disabled");
      // toastr.success('Match ' + action);
      deactivateSpinner();  
      getScreening();
    }          
  });
}

getCustomer = function(matchId, validationAction) {
  activateSpinner();
  let customerId = Session.get("selectedCustomer");
  Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER, customerId, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let customer = JSON.parse(res.content);
      Session.setPersistent('customerDetails', customer);
      deactivateSpinner();  
    }          
  });
}