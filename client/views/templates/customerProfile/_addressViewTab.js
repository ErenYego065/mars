Template.addressViewTab.events({
 'click .deleteAddress' : function(event){
   swal({
    title: "Are you sure?",
    text: "You will not be able to recover the address",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete address",
    closeOnConfirm: true
   }, function () {
       deleteAddress(event);
      })
  },

 'click .editAddress' : function(event){
   event.preventDefault();
   Session.set("selectedAddressIndex", event.target.dataset.index);
   Session.set("selectedAddressType", event.target.dataset.type);
   Session.set("selectedAddressPropNumber", event.target.dataset.number);
   Session.set("selectedAddressPropName", event.target.dataset.name);
   Session.set("selectedAddressline", event.target.dataset.line);
   Session.set("selectedAddressExtraline", event.target.dataset.extra);
   Session.set("selectedAddressCity", event.target.dataset.city);
   Session.set("selectedAddressProvince", event.target.dataset.province);
   Session.set("selectedAddressPostalCode", event.target.dataset.postalcode);
   Session.set("selectedAddressCountry", event.target.dataset.country);
   Session.set("selectedAddressFromDate", event.target.dataset.from);
   Session.set("selectedAddressToDate", event.target.dataset.to);
 },
});

function deleteAddress(event){
  let operation = 'remove';
  let path = '/addresses/' + event.target.dataset.index;
  patchResource(URI_CUSTOMER, customerId, operation, path, null, null, null ,'Address deleted');
  cancelChange();
};