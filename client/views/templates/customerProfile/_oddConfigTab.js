Template.oddConfigTab.rendered = function(){ 
  $(document).on('change', 'select', function () {
    let selectId = $(this).attr('id'); 
    if(selectId === 'scopes'){
      let newValue = $(this).val();
      if(newValue){
        let customerId = Session.get('selectedCustomer');
        let oddId = $(this).attr('data-id');
        patchResource(URI_ODD, customerId, 'replace', '/scope', newValue, oddId, null,'ODD setting updated');
      }
    }
  });

    // $(".scopes").chosen().change(function() {
    //   // console.log($(this).val());
    //   // console.log($(this).attr('data-id'));
    //   let newValue = $(this).val();
    //   if(newValue){
    //     let customerId = Session.get('selectedCustomer');
    //     let oddId = $(this).attr('data-id');
    //     patchResource(URI_ODD, customerId, 'replace', '/scope', newValue, oddId, null,'ODD setting updated');
    //   }
    // });
}

Template.oddConfigTab.helpers({
  customerODD : function(){return Session.get('customerODD');}
});

Template.oddConfigTab.events({
  'change .frequency' : function(event){
    event.preventDefault();        
    // console.log($(event.target).val());
    // console.log($(event.target).attr('data-id'));
    let customerId = Session.get('selectedCustomer');
    let oddId = $(event.target).attr('data-id');
    let newValue = $(event.target).val();
    patchResource(URI_ODD, customerId, 'replace', '/frequency', newValue, oddId, null,'ODD setting updated');

  },

  'change .oddEnabled' : function(event){
    event.preventDefault();        
    let status = (event.target.checked) ? 'enabled' : 'disabled';
    let customerId = Session.get('selectedCustomer');
    let oddId = $(event.target).attr('id');
    let newValue = event.target.checked;
    patchResource(URI_ODD, customerId, 'replace', '/active', newValue, oddId, null,'ODD setting is now ' + status);
  },

  'click .addOdd' : function(event){
    event.preventDefault();        
    addSetting(event);
  },

  'click .deleteOdd' : function(event){
    swal({
     title: "Are you sure?",
     text: "You will not be able to recover the setting",
     type: "warning",
     showCancelButton: true,
     confirmButtonColor: "#DD6B55",
     confirmButtonText: "Yes, delete setting",
     closeOnConfirm: true
    }, function () {
        deleteSetting(event);
       })
   }
});  

function deleteSetting(event){
  let oddId = event.currentTarget.dataset.id;
  let numberOfRows = $('#oddTable tr').length;

  Meteor.call('deleteResource', Session.get('isLive'), URI_ODD, customerId, oddId, function(err,res){
   activateSpinner();
    if(err) {
      toastr.error(err.details, err.reason); 
      deactivateSpinner();
    } 
    else {
      //Number of rows set to 2 as the header row is also counted by jQuery
      if(numberOfRows > 2){
        $("#oddTable").find("tr#row-"+oddId).remove();     
        toastr.success('Setting deleted');                
      }
      else{
        refreshCustomerPage('odd','Setting deleted');
      }
      deactivateSpinner();
    }          
  });
};

function addSetting(event){
  let postBody = {
    scope : ["WATCHLIST"],
    frequency : "MONTHLY",
    active : false
  }

  
  Meteor.call('postResource', Session.get('isLive'), URI_ALL_ODD, customerId, postBody, function(err,res){
    activateSpinner();
     if(err) {
       toastr.error(err.details, err.reason); 
       deactivateSpinner();
     } 
     else {
       refreshCustomerPage('odd','Setting added');
       deactivateSpinner();
     }          
   });
};