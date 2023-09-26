Template.documentViewTab.helpers({
  documents : function(){return Session.get('allCustomerDocuments');},
  customerId : function(){return Session.get('selectedCustomer');},
  isDocVerified : function(docId){
    let docVerifications = Session.get('customerVerifications');

    if(docVerifications){
      for(count=0; count<docVerifications.length; count++) {
        if(docId === docVerifications[count].document_id){return true;}   
      }
    }
    return false;
  },

  //TO DO: Needs to be updated to consider scenarios where more than one doc ver have 
  //been executed for a single document
  documentVerificationResult : function(docId){
    let docVerifications = Session.get('customerVerifications');
    let resultObject = {};
    let docVerificationId = '';
    let result = '';
    let resultIconColor = '';
    let resultIcon = '';
    
    if(docVerifications){
      for(count=0; count<docVerifications.length; count++) {
        if(docId === docVerifications[count].document_id){
          let tempResult = JSON.stringify(docVerifications[count].outcome);
          docVerificationId = docVerifications[count].id;
  
          if(tempResult.includes('IN_PROGRESS')){
            return{
              "docVerificationId" : docVerificationId,
              "result": 'In Progress',
              "resultIconColor":  'blue',
              "resultIcon": 'ellipsis-h'
            }
          }
          
          else if(tempResult.includes('ATTENTION')){
            return{
            "docVerificationId" : docVerificationId,
            "result" : 'Requires Attention',
            "resultIconColor" : 'red',
            "resultIcon" : 'exclamation-circle',
            }
          }
          
          else if(tempResult.includes('ERROR')){
            return{
              "docVerificationId" : docVerificationId,
              "result" : 'Requires Attention',
              "resultIconColor" : 'red',
              "resultIcon" : 'exclamation-circle',
            }
          }
          
          else if(tempResult.includes('CLEAR')){
            return{
              "docVerificationId" : docVerificationId,
              "result" : 'Document Verified',
              "resultIconColor" : 'green',
              "resultIcon" : 'check-circle',
            }
          }   
        }
      }
    }
    
    return false;
  }
});

Template.screenRunModal.rendered = function(){
  $('[data-toggle="popover"]').popover();
}

Template.documentViewTab.events({
  'click .editDocument' : function(event){
    event.preventDefault();    
    Session.setPersistent("selectedDocumentId", event.currentTarget.dataset.id);
    Session.setPersistent("selectedDocumentType", event.currentTarget.dataset.type);
    Session.setPersistent("selectedDocumentName", event.currentTarget.dataset.name);
    Session.setPersistent("selectedDocumentNumber", event.currentTarget.dataset.number);
    Session.setPersistent("selectedDocumentIssuingCountry", event.currentTarget.dataset.issuer);
    Session.setPersistent("selectedDocumentIssuingAuthority", event.currentTarget.dataset.authority);
    Session.setPersistent("selectedDocumentIssueDate", event.currentTarget.dataset.from);
    Session.setPersistent("selectedDocumentExpiryDate", event.currentTarget.dataset.to);
    Session.setPersistent("selectedDocumentUpdatedAt", event.currentTarget.dataset.updated);
    Session.setPersistent("selectedDocumentMrz1", event.currentTarget.dataset.mrz1);
    Session.setPersistent("selectedDocumentMrz2", event.currentTarget.dataset.mrz2);
    Session.setPersistent("selectedDocumentMrz3",event.currentTarget.dataset.mrz3);
    Session.setPersistent("selectedDocumentFrontSide", event.currentTarget.dataset.front);
    Session.setPersistent("selectedDocumentBackSide", event.currentTarget.dataset.back);
    Session.setPersistent("selectedDocumentDescription", event.currentTarget.dataset.description);
    Session.setPersistent("selectedDocumentFrontSideContentType", event.currentTarget.dataset.frontcontenttype);
    Session.setPersistent("selectedDocumentBackSideContentType", event.currentTarget.dataset.backcontenttype);
    Session.setPersistent("selectedDocumentVerified", event.currentTarget.dataset.verified);
  },

  'click .verifyDocument' : function(event){
    event.preventDefault();    
    if(event.currentTarget.dataset.frontcontenttype || (event.currentTarget.dataset.mrz1 && event.currentTarget.dataset.mrz2)){
      swal({
        title: "Are you sure?",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#37aa73",
        confirmButtonText: "Yes, verify document",
        closeOnConfirm: true
       }, function () {
          verifyDocument(event);
      })
    }
    else{
      swal("Insufficient Details", "We require either an attachment or MRZ details to verify a document.");
    }
  },

  'click .deleteDocument' : function(event){
    swal({
     title: "Are you sure?",
     text: "You will not be able to recover the document",
     type: "warning",
     showCancelButton: true,
     confirmButtonColor: "#DD6B55",
     confirmButtonText: "Yes, delete document",
     closeOnConfirm: true
    }, function () {
        deleteDocument(event);
       })
   }
});  

function deleteDocument(event){
  let documentId = event.currentTarget.dataset.id;
  activateSpinner();  
  Meteor.call('deleteResource', Session.get('isLive'), URI_DOCUMENT, customerId, documentId, function(err,res){
    if(err) {
      toastr.error(err.details, err.reason); 
      deactivateSpinner();
    } 
    else {
      refreshCustomerPage('documents','Document Deleted');
    }          
  });
};

//Needs updating to consider type of analysis
function verifyDocument(event){
  let documentId = event.currentTarget.dataset.id;
  let postBody;
  
  if(event.currentTarget.dataset.frontcontenttype){
    postBody = {
        "document_id" :  documentId,
        "type" : "IMAGE"
    }
  }
  else if (event.currentTarget.dataset.mrz1 && event.currentTarget.dataset.mrz2){ 
    postBody = {
      "document_id" :  documentId,
      "type" : "MRZ"
    }
  }

  activateSpinner();
  Meteor.call('postResource', Session.get('isLive'), URI_ALL_DOC_VERIFICATIONS, customerId, postBody, null, documentId, function(err,res){
    if(err) {
      toastr.error(err.details, err.reason, {"timeOut": "15000",}).css("width","350px"); 
      deactivateSpinner();
    } 
    else {
      refreshCustomerPage('full');
      // deactivateSpinner();
    }          
  });
};