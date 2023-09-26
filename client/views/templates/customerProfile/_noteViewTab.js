Template.noteViewTab.created = function(){
  disableEdit('editNote');
 }

Template.noteViewTab.helpers({
  notes : function(){return Session.get('customerNotes');},
  addNoteFlag: function(){return Session.get('addNoteFlag');},
  editNote: function(){return  $.trim($('#'+Session.get('editNoteId')).text());}
});

Template.noteViewTab.events({
  'click .addNote' : function(event){
    event.preventDefault();
    enableEdit('addNoteFlag');
    $('#note').val('');
  },

  'click .cancelNote' : function(event){
    event.preventDefault();
    disableEdit('addNoteFlag');
    Session.set('editNoteId',null);
    $('#note').val('');
  },

  'click .editNote' : function(event){
    event.preventDefault();
    enableEdit('addNoteFlag');
    Session.get('editNoteId');

    let editNoteId = event.currentTarget.dataset.id;
  //  let selectedNoteText = $.trim($('#'+editNoteId).text());
    Session.set('editNoteId',editNoteId);
    //Session.set('editNote',selectedNoteText);
    window.location.href = "#tabAnchor";
  },

  'click .saveNote' : function(event){
    event.preventDefault();
    
    if($('#note').val())
    {
      body = {
        "text": $('#note').val()
      }
        
      activateSpinner();

      if(Session.get('editNoteId')){
        Meteor.call('putResource', Session.get('isLive'), URI_NOTE, customerId, body, Session.get('editNoteId'),function(err,res){
          if(err) {
            toastr.error(err.details, err.reason); 
          } 
          else {
            refreshCustomerPage('notes','Note updated');
            Session.set('editNoteId',null);
            $('#note').val('');
            disableEdit('addNoteFlag');
          }       
          deactivateSpinner();
        });
      }

      else {
        Meteor.call('postResource', Session.get('isLive'), URI_ALL_NOTES, customerId, body,function(err,res){
          if(err) {
            toastr.error(err.details, err.reason); 
            deactivateSpinner();
          } 
          else {
            refreshCustomerPage('notes','Note added');
            disableEdit('addNoteFlag');
            deactivateSpinner();
          }       
        });
      }
    }
    else {
      disableEdit('addNoteFlag');
      Session.set('editNoteId',null);
    }
   },

   'click .deleteNote' : function(event){
      event.preventDefault();
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this note",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete note",
        closeOnConfirm: true
      }, function () {
        let noteId = event.currentTarget.dataset.id;
        Meteor.call('deleteResource', Session.get('isLive'), URI_NOTE, customerId, noteId, function(err,res){
         activateSpinner();
          if(err) {
            toastr.error(err.details, err.reason); 
            deactivateSpinner();
          } 
          else {
            refreshCustomerPage('notes','Note deleted');
            deactivateSpinner();
          }          
        });
	  	}
    )}
 });

 Template.noteViewTab.destroyed = function(){
  disableEdit('editNote');
 }