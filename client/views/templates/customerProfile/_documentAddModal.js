Template.documentAddModal.rendered = function() {
  $('#newDocumentDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy'
  });

  $(document).on('keyup', function (e) {
    $("#newDocumentValidationMessage").hide();
  });

  $(document).on('click', '#closeNewDocument', function(e) {
    e.preventDefault();
    resetDocumentFields();
    cancelChange();
  });

  $(document).on('click', '#saveNewDocument', function(e) {
    e.preventDefault();
    let fromDateObj = stringToDate($("#newDocumentIssueDate").val());
    let toDateObj = stringToDate($("#newDocumentExpiryDate").val());
    let fromDate = dateConvert(fromDateObj,'YYYY-MM-DD');
    let toDate = dateConvert(toDateObj,'YYYY-MM-DD');
    let file1 = $("#frontSideFile")[0].files[0];
    let file2 = $("#backSideFile")[0].files[0];    
    let file1Base64;
    let file2Base64;
    let fileSizeLimit;
    
    if(file1){
      fileSizeLimit = Meteor.settings.public.file_upload_size_limit;
      if(fileSizeLimit > file1.size){
        var reader1 = new FileReader();
        reader1.readAsDataURL(file1);
        reader1.onload = function () {
          file1Base64 = reader1.result;
          
          let frontSide = {
            filename : file1.name,
            content_type : file1.type,
            file_size : file1.size,
            content : file1Base64.substring(file1Base64.indexOf(",") + 1)
          }
          if(file2){
            if(fileSizeLimit > file2.size){
              var reader2 = new FileReader();   
              reader2.readAsDataURL(file2);
              reader2.onload = function () {
                file2Base64 = reader2.result;
                let backSide = {
                  filename : file2.name,
                  content_type : file2.type,
                  file_size : file2.size,
                  content : file2Base64.substring(file2Base64.indexOf(",") + 1)
                }   
                createDocument(fromDate,toDate,frontSide,backSide);          
              }
            }
            else{
              $("#newDocumentValidationMessage").show();
              Session.set('newDocumentValidationMessage','File size must not exceed 5MB');
              $("#newDocumentValidationMessage").html(Session.get("newDocumentValidationMessage"));
            }
          }  
          else{createDocument(fromDate,toDate,frontSide);}
        }
      }
      else{  
        $("#newDocumentValidationMessage").show();
        Session.set('newDocumentValidationMessage','File size must not exceed 5MB');
        $("#newDocumentValidationMessage").html(Session.get("newDocumentValidationMessage"));
      }
    }
    else{createDocument(fromDate,toDate)}
  });
}

function createDocument(fromDate,toDate,frontSide,backSide){
  activateSpinner();      
  let nameContext = documentSchema.newContext();  
  let postBody = {
    "type" :  $("#newDocumentType").val(),
    "issuing_country" :  $("#newDocumentIssuingCountry").val(),
    "issuing_authority" :  $("#newDocumentIssuingAuthority").val(),
    "document_number" :  $("#newDocumentNumber").val(),
    "document_name" :  $("#newDocumentName").val(),
    "mrz_line1" :  $("#newDocumentMrzLine1").val(),
    "mrz_line2" :  $("#newDocumentMrzLine2").val(),
    "mrz_line3" :  $("#newDocumentMrzLine3").val(),
    "document_description" :  $("#newDocumentDescription").val(),
    "document_name" :  $("#newDocumentName").val(),
    "issue_date" : fromDate,
    "expiry_date" : toDate
  }      

  let cleanPostBody = cleanJson(postBody);
  if(!cleanPostBody) {cleanPostBody = null};
  if(nameContext.validate(cleanPostBody)){   
    if(frontSide){
      cleanPostBody.front_side_base64 = frontSide; 
      if(backSide){
        cleanPostBody.back_side_base64 = backSide;    
      } 
    }

     // console.log(cleanPostBody);
    Meteor.call('postResource', Session.get('isLive'), URI_ALL_DOCUMENTS, customerId, cleanPostBody,function(err,res){
      activateSpinner();
      if(err) {
        toastr.error(err.details, err.reason); 
        deactivateSpinner();
      } 
      else {
        refreshCustomerPage('documents','Document added');
        deactivateSpinner();
      } 
    });   

    $("#newDocumentValidationMessage").hide();
    resetDocumentFields();
    $('#documentAddModal').modal('hide');
  }
else { 
    deactivateSpinner();
    $("#newDocumentValidationMessage").show();
    var error = nameContext.invalidKeys();
    Session.set('newDocumentValidationMessage',nameContext.keyErrorMessage(error[0].name));
    $("#newDocumentValidationMessage").html(Session.get("newDocumentValidationMessage"));
  }
}

function resetDocumentFields(){
  $("#newDocumentType").val('');
  $("#newDocumentIssuingCountry").val('');
  $("#newDocumentIssuingAuthority").val('');
  $("#newDocumentNumber").val('');
  $("#newDocumentName").val('');
  $("#newDocumentMrzLine1").val('');
  $("#newDocumentMrzLine2").val('');
  $("#newDocumentMrzLine3").val('');
  $("#newDocumentDescription").val('');
  $("#newDocumentName").val('');
  $("#newDocumentIssueDate").val('');
  $("#newDocumentExpiryDate").val('');
  $(".fileinput").fileinput("clear");
};