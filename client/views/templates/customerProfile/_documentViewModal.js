Template.documentViewModal.created = function(){
  Session.set('isDownloadBlocked', false);
}

Template.documentViewModal.helpers({  
  editingDocument: function(){return Session.get('editDocument');},
  
  document : function(){
    return [
      {
        "id": Session.get("selectedDocumentId"),
        "type": Session.get("selectedDocumentType"),
        "document_name": Session.get("selectedDocumentName"),
        "document_number": Session.get("selectedDocumentNumber"),
        "document_description": Session.get("selectedDocumentDescription"),
        "issuing_country": Session.get("selectedDocumentIssuingCountry"),
        "issuing_authority": Session.get("selectedDocumentIssuingAuthority"),
        "issue_date": Session.get("selectedDocumentIssueDate"),
        "expiry_date": Session.get("selectedDocumentExpiryDate"),
        "updated_at": Session.get("selectedDocumentUpdatedAt"),
        "mrz_line1": Session.get("selectedDocumentMrz1"),
        "mrz_line2": Session.get("selectedDocumentMrz2"),
        "mrz_line3": Session.get("selectedDocumentMrz3"),
        "front_side": Session.get("selectedDocumentFrontSide"),
        "back_side": Session.get("selectedDocumentBackSide"),
        "isVerified": Session.get("selectedDocumentVerified"),
      }
    ]
  }
});

Template.documentViewModal.rendered = function(){
  $('#documentDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy'
  });

  hideDocumentButtons(true,false,false,true,false)

  $(document).on('click', '#editDocument', function(e) {
    e.preventDefault();
    enableEdit('editDocument');
    $('#documentDateRange').show();
    hideDocumentButtons(false,true,true,false,false);
  });

  $(document).on('click', '#closeDocument', function(e) {
    e.preventDefault();
    disableEdit('editDocument');
    hideDocumentButtons(true,false,false,true,false);
  });

  $(document).on('click', '#cancelDocument', function(e) {
    e.preventDefault();
    disableEdit('editDocument');
    $('#documentDateRange').hide();
    hideDocumentButtons(true,false,false,true,false);
  });

  $('#documentViewModal').on('click', '#downloadFrontSide', function(e) {
  // $('#downloadFrontSide').on('click', function (e) {
    e.preventDefault();

    if(!Session.get('isDownloadBlocked')){
      Session.set('isDownloadBlocked', true);
      activateSpinner();
      customerId = Session.get('selectedCustomer');
      documentId = Session.get('selectedDocumentId');
      contentType = Session.get('selectedDocumentFrontSideContentType');

      Meteor.call('getResource', Session.get('isLive'), URL_DOC_DOWNLOAD, customerId, null, documentId,'front', function(err,res,body){
      if(err) {
        toastr.error(err.details, err.reason); 
        Session.set('isDownloadBlocked', false);        
        deactivateSpinner();      
      } 
      else {
        // let documentContent = res;
        // let dl = document.createElement('a');
        // dl.setAttribute('href', 'data:'+ contentType +';base64,' + documentContent);
        // dl.setAttribute('download', Session.get('selectedDocumentFrontSide'));
        // dl.click();

        // let blob = dataURIToBlob('data:'+ contentType +';base64,' + res);
        // let url = URL.createObjectURL(blob);
        // let blobAnchor = document.createElement('a');
        // blobAnchor.download = Session.get('selectedDocumentFrontSide');
        // blobAnchor.href = url;
        // blobAnchor.click();
        // deactivateSpinner();
        
        let blob = dataURIToBlob('data:'+ contentType +';base64,' + encode(res));
        let url = URL.createObjectURL(blob);
        let blobAnchor = document.createElement('a');
        blobAnchor.download = Session.get('selectedDocumentFrontSide');
        blobAnchor.href = url;
        blobAnchor.click();
        Session.set('isDownloadBlocked', false);        
        deactivateSpinner();      
      }       
    });
    }
    
    
  });
        
  $('#documentViewModal').on('click', '#downloadBackSide', function(e) {  
  // $('#downloadBackSide').on('click', function (e) {
    e.preventDefault();

    if(!Session.get('isDownloadBlocked')){
      Session.set('isDownloadBlocked', true);

      activateSpinner();
      customerId = Session.get('selectedCustomer');
      documentId = Session.get('selectedDocumentId');
      contentType = Session.get('selectedDocumentBackSideContentType');

      Meteor.call('getResource', Session.get('isLive'), URL_DOC_DOWNLOAD, customerId, null, documentId,'back', function(err, res, body){
        if(err) {
          toastr.error(err.details, err.reason); 
          Session.set('isDownloadBlocked', false);          
          deactivateSpinner();      
        } 
        else {
          let blob = dataURIToBlob('data:'+ contentType +';base64,' + encode(res));
          let url = URL.createObjectURL(blob);
          let blobAnchor = document.createElement('a');
          blobAnchor.download = Session.get('selectedDocumentBackSide');
          blobAnchor.href = url;
          blobAnchor.click();
          Session.set('isDownloadBlocked', false);                    
          deactivateSpinner();   
        }       
      });
    }
  });

  $(document).on('click', '#saveDocument', function(e) {
    e.preventDefault();
    let fromDateObj = stringToDate($("#documentIssueDate").val());
    let toDateObj = stringToDate($("#documentExpiryDate").val());
    let fromDate = dateConvert(fromDateObj,'YYYY-MM-DD');
    let toDate = dateConvert(toDateObj,'YYYY-MM-DD');
    let nameContext = documentSchema.newContext();

    let putBody = {
      "type": $("#newDocumentType").val(),
      "document_name": $("#newDocumentName").val(),
      "document_description": $("#newDocumentDescription").val(),
      "document_number": $("#newDocumentNumber").val(),
      "issuing_country": $("#newDocumentIssuingCountry").val(),
      "issuing_authority": $("#newDocumentIssuingAuthority").val(),
      "mrz_line1": $("#newDocumentMrzLine1").val(),
      "mrz_line2": $("#newDocumentMrzLine2").val(),
      "mrz_line3": $("#newDocumentMrzLine3").val(),
      "issue_date": fromDate,
      "expiry_date": toDate
    }

    let cleanPutBody = cleanJson(putBody);
    if(!cleanPutBody) {cleanPutBody = null};

    if(nameContext.validate(cleanPutBody)){
      activateSpinner();
      Meteor.call('putResource', Session.get('isLive'), URI_DOCUMENT, customerId, cleanPutBody, Session.get('selectedDocumentId'),function(err,res){
        if(err) {
          toastr.error(err.details, err.reason); 
          deactivateSpinner();  
        } 
        else {
          refreshCustomerPage('documents','Document updated');
          deactivateSpinner();  
        }       
      });
      
      hideDocumentButtons(true,false,false,true,false);
      cancelChange();
      $("#documentValidationMessage").hide();
      $('#documentDateRange').hide();
      $('#documentViewModal').modal('toggle');
      $("#documentDateRange").hide();
    }
    else {
      $("#documentValidationMessage").show();
      let error = nameContext.invalidKeys();
      Session.set('documentValidationMessage',nameContext.keyErrorMessage(error[0].name));
      $("#documentValidationMessage").html(Session.get("documentValidationMessage"));
    }
  });
};

function hideDocumentButtons(edit,save,cancel,close,validation){
  if(edit){$("#editDocument").show();} else{$("#editDocument").hide();}
  if(save){$("#saveDocument").show();} else{$("#saveDocument").hide();}
  if(cancel){$("#cancelDocument").show();} else{$("#cancelDocument").hide();}
  if(close){$("#closeDocument").show();} else{$("#closeDocument").hide();}
  if(validation){$("#documentValidationMessage").show();} else{$("#documentValidationMessage").hide();}
}

function dataURIToBlob(dataURI) {
  try{
    let binStr = atob(dataURI.split(',')[1]),
    len = binStr.length,
    arr = new Uint8Array(len),
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr], {
      type: mimeString
    });
  }
  
	catch (error) {
    console.log(error);
  }

}
