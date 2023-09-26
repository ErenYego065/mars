selectedDocumentType = null;

Template.identityVerificationDemo.rendered = function () {
  Session.set('selfieImage',null);
  Session.set('idPhotoImage',null);
  Session.set('identificationDetails',null);                    
  
  $(document).on('keyup', function (e) {
    if (e.which === 27) {
      $(".selfieContent").hide();
      $(".idPhotoContent").hide();      
    }
  });
};

Template.identityVerificationDemo.helpers({
  selfieImage: function() {return Session.get('selfieImage');},
  idPhotoImage: function() {return Session.get('idPhotoImage');},
  identificationDetails: function() {return Session.get('identificationDetails');},

  confidenceLevel: function() {
    return ((Math.random() * (0.9 - 0.7) + 0.7).toFixed(2)*100);
  }
});

Template.identityVerificationDemo.destroyed = function () {
  Session.set('selfieImage',null);
  Session.set('idPhotoImage',null);  
  Session.set('identificationDetails',null);                    
};

Template.identityVerificationDemo.events({
  'change #passport': function (e) {
    e.preventDefault();
    selectedDocumentType = 'PASSPORT';
  }, 
  'change #drivingLicense': function (e) {
    e.preventDefault();
    selectedDocumentType = 'DRIVING_LICENSE';
    
  },  
  'change #nationalId': function (e) {
    e.preventDefault();
    selectedDocumentType = 'NATIONAL_ID_CARD';
  },   

  'click .takeSelfie': function(e) {
    e.preventDefault();
    var cameraOptions = {
        width: 600,
        height: 600,
        quality: 100
    };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (!error) {
        $(".selfieContent").hide();
        Session.set('selfieImage', data);
      }      
    });
    Meteor.setTimeout(function(){$('.selfieContent').show();},500);
  },

  'click .captureId': function(e) {
    e.preventDefault();
    var cameraOptions = {
        width: 600,
        height: 600,
        quality: 100        
    };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (!error) {
        $('.idPhotoContent').hide(); 
        Session.set('idPhotoImage', data);

        let customerPostBody = {
          "type":"INDIVIDUAL",
          "first_name" : "John",
          "last_name" :  "Sample",
          "email": "john."+ (new Date).getTime() + "@example.com"
        }

        let documentPostBody = {
          "type": selectedDocumentType,
          "front_side_base64":{
            "filename" : "test.jpeg",
            "content_type": "jpeg",
            "file_size":122731,
            "content": Session.get('idPhotoImage').substring(Session.get('idPhotoImage').indexOf(",") + 1)
          }
          // "front_side": Session.get('idPhotoImage')
        }
      
        Meteor.call('postResource', Session.get('isLive'), URI_ALL_CUSTOMERS, null, customerPostBody,function(err,res){
        activateSpinner();
          if(err) {
            toastr.error(err.details, err.reason); 
            deactivateSpinner();
          } 
          else {
            let customer = JSON.parse(res.content);    
            
            Meteor.call('postResource', Session.get('isLive'), URI_ALL_DOCUMENTS, customer.id, documentPostBody,function(err,res){
              if(err) {
                toastr.error(err.details, err.reason); 
                deactivateSpinner();
              } 
              else {
                let document = JSON.parse(res.content); 

                let identificationsPostBody = {
                  "mode": "SOLO",
                  "document_id": document.id,
                  "selfie_image": {
                    "filename" : "test2.jpeg",
                    "content":Session.get('selfieImage').substring(Session.get('selfieImage').indexOf(",") + 1),
                    "content_type": "jpeg",
                    "file_size": 11221
                  }
                }
  
                Meteor.call('postResource', Session.get('isLive'), URI_ALL_IDENTIFICATIONS, customer.id, identificationsPostBody,function(err,res){
                  if(err) {
                    toastr.error(err.details, err.reason);                     
                    deactivateSpinner();
                  } 
                  else {
                    deactivateSpinner();
                    let identification = JSON.parse(res.content); 
                    Session.set('identificationDetails', identification)          
                  } 
                });   
              } 
            });   
          } 
        });   

      }
    });
    Meteor.setTimeout(function(){$('.idPhotoContent').show();},500);
  }
});