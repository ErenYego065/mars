Template.identificationDetails.created = function () {
 customerId = FlowRouter.getParam("_CustId");
 identificationId = FlowRouter.getParam("_IdentificationId");
 Session.set("selectedCustomer", customerId);
 Session.set("selectedIdentification", identificationId);
 Session.set('identificationDetails', null);
 Session.set('idImage', null);
 Session.set('selfieImages', null);
};

Template.identificationDetails.rendered = function () {
 getIdentification();
};


Template.identificationDetails.helpers({
 selectedIdentification: function () {
  return Session.get('selectedIdentification');
 },
 identificationDetails: function () {
  return Session.get('identificationDetails');
 },
 selfieImages: function () {
  return Session.get('selfieImages');
 },
 idImage: function () {
  return Session.get('idImage');
 }
});

getIdentification = function () {
 let customerId = Session.get("selectedCustomer");
 let identificationId = Session.get("selectedIdentification");
 activateSpinner1();

 Meteor.call('getResource', Session.get('isLive'), URI_IDENTIFICATION, customerId, null, identificationId, function (err, res) {
  if (err) {
   deactivateSpinner1();
   toastr.error(err.details, err.reason);
  } else {
   let identificationDetails = JSON.parse(res.content);
   Session.set('identificationDetails', identificationDetails);
   let parameters = '?output=base64';
   let attachmentId = identificationDetails.selfie_id;
   let documentId = identificationDetails.document_id;

   Meteor.call('getResource', Session.get('isLive'), URI_ATTACHMENT_DOWNLOAD, null, parameters, attachmentId, function (err, res) {
    if (err) {
     deactivateSpinner1();
     toastr.error(err.details, err.reason);
    } else {

     Session.set('selfieImages', res.data);
    }
   });

   Meteor.call('getResource', Session.get('isLive'), URI_DOCUMENT, customerId, null, documentId, function (err, res) {
    if (err) {
     deactivateSpinner1();
     toastr.error(err.details, err.reason);
    } else {
     let documentDetails = JSON.parse(res.content);
     Meteor.call('getResource', Session.get('isLive'), URI_ATTACHMENT_DOWNLOAD, null, parameters, documentDetails.front_side.id, function (err, res) {
      if (err) {
       deactivateSpinner1();
       toastr.error(err.details, err.reason);
      } else {
       deactivateSpinner1();
       Session.set('idImage', res.data);
      }
     });
    }
   });
  }
 });
}