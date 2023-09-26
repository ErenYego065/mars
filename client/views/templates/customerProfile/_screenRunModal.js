Template.screenRunModal.rendered = function(){
  $('[data-toggle="popover"]').popover();

  $('.startScreening').on('click', function (e) {
    let postScope = [];

    $("#watchlist").is(':checked') ? postScope.push('WATCHLIST') : null;
    $("#pep").is(':checked') ? postScope.push('PEP') : null;
    $("#adverseMedia").is(':checked') ? postScope.push('ADVERSE_MEDIA') : null;
    $("#disqualifiedDirector").is(':checked') ? postScope.push('DISQUALIFIED_ENTITIES') : null;

    if(postScope.length > 0){
      $('#screenRunModal').modal('toggle');
      activateSpinner();
      Meteor.call('postResource', Session.get('isLive'), URI_ALL_SCREENINGS, customerId, postScope,function(err,res){
        clearScreeningOptions();
        if(err) {
          toastr.error(err.details, err.reason); 
          deactivateSpinner();
        } 
        else {
          refreshCustomerPage('full');
          updateNavStats();
          // deactivateSpinner();
        } 
      });   
    }
  });

  $('#watchlist').change(function() {
    // this will contain a reference to the checkbox   
    if ($("#watchlist").is(':checked') || $("#pep").is(':checked') || $("#adverseMedia").is(':checked') ||  $("#disqualifiedDirector").is(':checked')) {
      $(".startScreening").prop("disabled",false);
    } 
    else {$(".startScreening").prop("disabled",true);}
  });

  $('#pep').change(function() {
    // this will contain a reference to the checkbox   
    if ($("#watchlist").is(':checked') || $("#pep").is(':checked') || $("#adverseMedia").is(':checked') ||  $("#disqualifiedDirector").is(':checked')) {
      $(".startScreening").prop("disabled",false);
    } 
    else {$(".startScreening").prop("disabled",true);}
  });

  $('#adverseMedia').change(function() {
    // this will contain a reference to the checkbox   
    if ($("#watchlist").is(':checked') || $("#pep").is(':checked') || $("#adverseMedia").is(':checked') ||  $("#disqualifiedDirectordd").is(':checked')) {
      $(".startScreening").prop("disabled",false);
    } 
    else {$(".startScreening").prop("disabled",true);}
  });

  $('#disqualifiedDirector').change(function() {
    // this will contain a reference to the checkbox   
    if ($("#watchlist").is(':checked') || $("#pep").is(':checked') || $("#adverseMedia").is(':checked') ||  $("#disqualifiedDirector").is(':checked')) {
      $(".startScreening").prop("disabled",false);
    } 
    else {$(".startScreening").prop("disabled",true);}
  });

  $('.closeScreening').on('click', function (e) {
    clearScreeningOptions();
    $('#screenRunModal').modal('toggle');
  });
};

clearScreeningOptions = function(){
  $('#watchlist').attr('checked', false);
  $('#pep').attr('checked', false);
  $('#adverseMedia').attr('checked', false);
  $('#disqualifiedDirector').attr('checked', false);
  $(".startScreening").prop("disabled",true);
}

