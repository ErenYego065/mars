Template.verificationDetails.created = function(){
  Session.set('verificationDetails', null);
  Session.set('customerDetails', null);
  Session.set('extractedImages', null);
  
  customerId = FlowRouter.getParam("_CustId");
  Session.set("selectedCustomer",customerId);
  verificationId = FlowRouter.getParam("_VerificationId");
  Session.set("selectedVerification",verificationId);
};

Template.verificationDetails.rendered = function(){
  getVerification();
  getCustomer();
};


Template.verificationDetails.helpers({
  selectedVerification: function() {return Session.get('selectedVerification');},
  verificationDetails: function() {return Session.get('verificationDetails');},
  extractedImages: function() {
   return  Session.get('extractedImages');
  },  
  customerDetails: function() {return Session.get('customerDetails');}  
});

getVerification = function() {
  activateSpinner();  
  let customerId = Session.get("selectedCustomer");
  let verificationId = Session.get("selectedVerification");

  Meteor.call('getResource', Session.get('isLive'), URI_DOC_VERIFICATION, customerId, null,verificationId, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let verificationDetails = JSON.parse(res.content);
      let isImageFound = (verificationDetails.properties.extracted_images.length) ? true : false;
      Session.set('verificationDetails', verificationDetails);      

      if(!isImageFound){deactivateSpinner()}
      else{
        let isFirstImage = true;        
        let extractedImages = [];        
        for(let i =0; i<verificationDetails.properties.extracted_images.length; i++){
          let parameters = '?output=base64';          
          let attachmentId = verificationDetails.properties.extracted_images[i].file_id;
          Meteor.call('getResource', Session.get('isLive'), URI_ATTACHMENT_DOWNLOAD, null, parameters,attachmentId, function(err,res){
            if(err) {
              deactivateSpinner();  
              toastr.error(err.details, err.reason); 
            } 
            {
             extractedImages.push(res.data);
             Session.set('extractedImages',extractedImages);
             if(i === (verificationDetails.properties.extracted_images.length -1)){
              Meteor.setTimeout( function(){
               $('.carouselEncodedImages').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                centerMode: true,
                cssEase: 'linear'
               });
              },250)
             }
            }
          });
        }
        if(isFirstImage) {
          isFirstImage = false;

          //Added timeout so that image can load on browser before spinner terminates
          Meteor.setTimeout( function(){
            deactivateSpinner();
           },1000)

          // deactivateSpinner();
        }
      }      
    }          
  });
}

getCustomer = function(matchId, validationAction) {
  let customerId = Session.get("selectedCustomer");
  Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER, customerId, function(err,res){
    if(err) {
      if(err.error === 401){Meteor.logout(function() {FlowRouter.go('/login');});}
      toastr.error(err.details, err.reason); 
    } 
    else {
      let customer = JSON.parse(res.content);
      Session.set('customerDetails', customer);
    }          
  });
}