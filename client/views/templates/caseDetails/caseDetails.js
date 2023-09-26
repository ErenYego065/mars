Template.caseDetails.rendered = function(){
  Session.set('caseDetails',caseDetails);
  Session.set('comments',comments);
  Session.set('attachments',attachments);  
};

Template.caseDetails.helpers({
  caseDetails: function() {return Session.get('caseDetails');},
  comments: function() {return Session.get('comments');},
  attachments: function() {return Session.get('attachments');}
});

// Template.cases.events({
//   'click .addCase' : function(event){
//     event.preventDefault();    
//     let existingCases = Session.get('allCasesToDo');
    
//     existingCases.push({
//       title: $('.caseTitle').val(),
//       updated_at: "2017-11-24T21:41:31.093Z",
//       status: 'TO_DO',        
//       priority: 'LOW'
//     });

//     $('.caseTitle').val('');
//     Session.set('allCasesToDo',existingCases)
//   },
// });  

caseDetails = {
    id:"e38e7591-1ca8-49a0-8b12-9ad0cfd97af2",
    title: "My first case",
    summary: "Johnson hasnt updated his account details in time and this had caused problems, blah blah, we need to raise a SAR asap.",
    created_at: "2017-11-20T23:06:35.183Z",
    updated_at: "2017-11-24T21:41:31.093Z",
    customer_id: "cc9fd920-1e13-4097-8129-7db888f810eb",
    entity_name: "John Doe",
    status: 'TO_DO',    
    priority: 'HIGH',
    reviewer: 'John Smith',
    assignee: 'John Smith'
  }

comments = [
  {
    id: "91d457aa-b086-42fc-b4f9-c0649b99f689",
    created_at: "2017-01-17T23:46:26Z",
    updated_at: "2017-01-17T23:46:26Z",
    text: "Called the customer to discuss issue with identity but they have dailed the phone ID&V. Will call again tomorrow."
  },
  {
    id: "91d457aa-b086-42fc-b4f9-c0649b99f689",
    created_at: "2017-01-18T23:46:26Z",
    updated_at: "2017-01-18T23:46:26Z",
    text: "The customer has provided a scanned copy of their passport, source of funds and proof of address."
  }
]

attachments = [
  {
    id: "91d457aa-b086-42fc-b4f9-c0649b99f689",
    created_at: "2017-01-17T23:46:26Z",
    updated_at: "2017-01-17T23:46:26Z",
    name: "Passport.jpg"
  },
  {
    id: "91d457aa-b086-42fc-b4f9-c0649b99f68s",
    created_at: "2017-01-18T23:46:26Z",
    updated_at: "2017-01-18T23:46:26Z",
    name: "Source of funds.png"    
  },
  {
    id: "91d457aa-b086-42fc-b4f9-c0649b99f68s",
    created_at: "2017-02-01T23:46:26Z",
    updated_at: "2017-01-01T23:46:26Z",
    name: "Utility bills.png"    
  }
]