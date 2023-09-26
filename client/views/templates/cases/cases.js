Template.cases.rendered = function(){
  getCustomerList();  
  let allCasesToDo = [];
  let allCasesInProgress = [];
  let allCasesComplete = [];
  
  $('#caseDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy'
  });

  $("#toDo, #inProgress, #complete").sortable({
    connectWith: ".connectList",
    change: function(event, ui) {
      var start_pos = ui.item.data('start_pos');
      var index = ui.placeholder.index();

      // let source =ui.item.parent().attr('id');
      let source = ui.item.closest('ul').attr('id');
      // console.log('source ->' + event.target.id);
      let dest = this.id;           
      // console.log($(this).closest('balga').attr('id'));
      // console.log('destination -> ' + dest);      
      // console.log(' source -> ' + source);      

      // if(dest === 'complete'){
      //   $(this).sortable("cancel");
      // }
      if (start_pos < index) {
          $('#sortable li:nth-child(' + index + ')').addClass('highlights');

      } else {
          $('#sortable li:eq(' + (index + 1) + ')').addClass('highlights');
      }
    },
    update: function( event, ui ) {
      
      let source = this.id;          
      let dest = ui.item.closest('ul').attr('id');
      if(source !== dest){
        console.log('source ->' + source);      
        console.log('dest ->' + dest);      
        console.log(ui.item.attr("data-id"));
      }
    
      // $(this).sortable("cancel");      
      var todo = $( "#todo" ).sortable( "toArray" );
      var inprogress = $( "#inProgress" ).sortable( "toArray" );
      var completed = $( "#complete" ).sortable( "toArray" );      
    }
  }).disableSelection();

  for(index=0; index < allCases.length; index++){
    if(allCases[index].status === "TO_DO"){allCasesToDo.push(allCases[index]);}
    else if(allCases[index].status === "IN_PROGRESS"){allCasesInProgress.push(allCases[index]);}
    else if(allCases[index].status === "COMPLETE"){allCasesComplete.push(allCases[index]);}
  }
  Session.set('allCasesToDo',allCasesToDo);
  Session.set('allCasesInProgress',allCasesInProgress);
  Session.set('allCasesComplete',allCasesComplete);

  $('#createCaseModal').on('shown.bs.modal', function () {$('#newCaseTitle').focus();})    
};

Template.cases.helpers({
  allCasesToDo: function() {return Session.get('allCasesToDo');},
  allCasesInProgress: function() {return Session.get('allCasesInProgress');},
  allCasesComplete: function() {return Session.get('allCasesComplete');},
  caseFromDate: function(){return moment().subtract(7, "days");},
  caseToDate: function(){return moment();},  
});

Template.cases.events({
  'click .addCase' : function(event){
    event.preventDefault();    
    let existingCases = Session.get('allCasesToDo');
    
    existingCases.push({
      title: $('.caseTitle').val(),
      updated_at: "2017-11-24T21:41:31.093Z",
      status: 'TO_DO',        
      priority: 'LOW'
    });

    $('.caseTitle').val('');
    Session.set('allCasesToDo',existingCases)
  },
});  


function getCustomerList() {
  let parameters = "?reduced=true&size=" + 1000 + "&page=" + page;
  let customersList;

  Meteor.call('getResource', Session.get('isLive'), URI_ALL_CUSTOMERS, null, parameters, function(err,res){
    if(err) {  
      toastr.error(err.details, err.reason); 
    } 
    else {
      customersList = res.data.content.map(function(detail) {
        return {name: detail.entity_name, code: detail.id};
      })
      console.log(customersList);

      Session.setPersistent('customersList', customersList)
    }          
  });
}

allCases = [
  {
    id:"e38e7591-1ca8-49a0-8b12-9ad0cfd97af2",
    title: "My first case",
    summary: "Johnson hasnt updated his account details",
    created_at: "2017-11-20T23:06:35.183Z",
    updated_at: "2017-11-24T21:41:31.093Z",
    customer_id: "cc9fd920-1e13-4097-8129-7db888f810eb",
    entity_name: "John Doe",    
    status: 'TO_DO',    
    priority: 'HIGH',
    reviewer: 'John Smith',
    assignee: 'John Smith'
  },
  {
    id:"e38e7591-1ca8-49a0-8b12-123123asdf2",
    title: "My second case",
    summary: "Johnson hasnt updated his account details",
    created_at: "2017-11-20T23:06:35.183Z",
    updated_at: "2017-11-24T21:41:31.093Z",
    customer_id: "cc9fd920-1e13-4097-8129-7db888f810eb",
    entity_name: "John Doe",    
    status: 'IN_PROGRESS',
    priority: 'LOW',    
    reviewer: 'John Smith',
    assignee: 'John Smith' 
  },
  {
    id:"e38e7591-1ca8-49a0-8b12-123123asdasd",
    title: "My third case",
    summary: "Johnson hasnt updated his account details",
    created_at: "2017-11-20T23:06:35.183Z",
    updated_at: "2017-11-24T21:41:31.093Z",
    customer_id: "cc9fd920-1e13-4097-8129-7db888f810eb",
    entity_name: "John Doe",    
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',    
    reviewer: 'John Smith',
    assignee: 'John Smith'
  },
  {
    id:"e38e7591-1ca8-49a0-8b12-12312112311",
    title: "My fourth case",
    summary: "Johnson hasnt updated his account details",
    created_at: "2017-11-20T23:06:35.183Z",
    updated_at: "2017-11-24T21:41:31.093Z",
    customer_id: "cc9fd920-1e13-4097-8129-7db888f810eb",
    status: 'COMPLETE',
    entity_name: "John Doe",    
    resolution:'DONE',
    priority: 'HIGH',    
    reviewer: 'John Smith',
    assignee: 'John Smith'
  },
  total_elements = 4
]