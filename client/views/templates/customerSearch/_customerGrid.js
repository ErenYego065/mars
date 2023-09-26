page = 0;
customerID = '';
customerName = '';
customerType= '';
fromDate = '';
toDate = '';
isFullDataSet = true;
totalRows = 0;
parameters = '';
isEmailAsc = true;
isDateAddedAsc = true;

Template.customerGrid.created = function () {  
  Session.set('customers',null);

  page = 0;
  customerID = '';
  customerType= '';
  customerName = '';  
  fromDate = '';
  toDate = '';
  Session.set('current-page', 0)  
  Session.set('currentPage', 1);  
  Session.set('previousPageStatus', 'disabled');  
  currentPage = new ReactiveVar(Session.get('current-page') || 0);  
  
  this.currentPage = currentPage;
  this.autorun(function () {
    Session.set('current-page', currentPage.get());
  });
};

Template.customerGrid.rendered = function(){
  $('#registrationDateRange .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    clearBtn: true,
    immediateUpdates: false,
    keepEmptyValues: true,
    todayHighlight: true,
    format: 'dd/mm/yyyy'
  });

  let urlPage = FlowRouter.current().queryParams.page;
  if(urlPage){
    parameters = FlowRouter.current().path;
    parameters = '?' + (parameters.substring(parameters.indexOf("?")+1));
    page = Number(urlPage);
    Session.set('current-page', page)  
    Session.set('currentPage', page + 1);     
    if(page===0){Session.set('previousPageStatus','disabled');}
    else{Session.set('previousPageStatus','');}        
    getCustomerList(true);
  } 
  else{
    getCustomerList(false);    
  }         
};

Template.customerGrid.events({
  "keyup .idSearch": function (event, template) {
    event.preventDefault();
    let timeout = null;
    let timeInterval = (($(event.target).val().length === 0) || $(event.target).val().length === 36) ? 0 : 800;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      if($(event.target).val().length === 36){    
        if(customerID !== $(event.target).val()){
          customerID = $(event.target).val();
          getCustomerById();
        }
      }
      else if($(event.target).val().length > 0){    
        if(customerName !== $(event.target).val()){
          customerName = $(event.target).val();
          getCustomerList();
        }
      }
      else {
        customerID = '';
        customerName ='';
        getCustomerList();
        // if(!isFullDataSet){getCustomerList();}
      }
    }, timeInterval);
  },

  "focus .dateFrom": function (event,) {
    event.preventDefault(); if(fromDate===''){$(event.target).val(' ');}
  },

  "focus .dateTo": function (event) {
    event.preventDefault(); if(toDate===''){$(event.target).val(' ');}
  },

  "keyup .dateFrom, input .dateFrom, change .dateFrom": function (event) {
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if (input) {
      let stringDate = stringToDate(input);
      let newDate = moment(stringDate);
      fromDate = newDate.format('YYYY-MM-DD');
      getCustomerList();
     } 
    else {
      fromDate = '';
      getCustomerList();      
    }
  },

  "keyup .dateTo, input .dateTo, change .dateTo": function (event, template) {
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if (input) {
      let stringDate = stringToDate(input);
      let newDate = moment(stringDate);
      toDate = newDate.add(1, 'day').format('YYYY-MM-DD');
      getCustomerList();
     } 
    else {
      toDate = '';
      getCustomerList();      
    }
  },

  "change .custType": function(event, template){
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if(input != 'ALL'){
      customerType = input;
      getCustomerList();
    }
    else {
      customerType = '';
      getCustomerList();
    }
    // Session.set('filteredRows',$('.rows-per-page-count').text());
  },

  "click .nextPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows)/NO_OF_ELEMENTS_TABLE);
    if(page < numberOfPages){
      currentPage.set(++page);
    }
    // //server-side implementation
    Session.set('currentPage', page+1);
    getCustomerList();
  },

  "click .previousPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows)/NO_OF_ELEMENTS_TABLE);
    if(page!=0){
      currentPage.set(--page);
    }
    Session.set('currentPage', page+1);    
    getCustomerList();    
  },

  // 'click .reactive-table thead tr': function (event) {
  //   event.preventDefault();
  //   if (event.target.className.includes('email')) {
  //     getCustomerList();
  //     isEmailAsc = !isEmailAsc;      
  //     console.log(1)
  //   }
  // }
});

Template.customerGrid.helpers({
  customers: function() {return Session.get('customers');},
  totalPages: function() {return Session.get('totalPages');},
  filteredRows: function() {return Session.get('filteredRows');},
  nextPageStatus: function() {return Session.get('nextPageStatus');},
  previousPageStatus: function() {return Session.get('previousPageStatus');},  
  currentPage: function() {return Session.get('currentPage');},

  tableSettings : function () {
    return {
      id: 'customerGrid',      
      rowsPerPage: NO_OF_ELEMENTS_TABLE,
      showRowCount: false,
      showFilter: false,
      showNavigation: 'never',
      showColumnToggles: false,
      useFontAwesome: true,
      showNavigationRowsPerPage: false,
      multiColumnSort: false,
      class: 'table',      
      fields: [
        {
          key: 'entity_name',
          label: 'Name',
          sortByValue: false,
          sortable: false,
          cellClass: function (value, object) {return 'col-md-4';},    
          fn: function (name, obj) {
            // let html = '<a href="/customers/' + obj.id + '">' + name + '</a>'; 
            let html = '<a style="color:#324157;" href="/customers/' + obj.id + '">' + toTitleCase(name) + '</a>';                        
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'email', 
          label: 'Email',
          headerClass: 'email',
          sortable: false,          
          cellClass: function (value, object) {return 'col-md-4';},  
          fn: function (email) {
            // let html = '<a href="mailto:' + email +'">' + email + '</a>';
            let html = email.toLowerCase() + '</a>';            
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'id', 
          label: 'ID',
          hidden: true,
          sortable: false,
          fn: function (id) {
            let html = '<small>' + id + '</small>';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'created_at', 
          label: 'Date Added',
          sortable: false,          
          cellClass: function (value, object) {return 'col-md-2';},  
          fn: function (created_at) {
            return dateConvert(created_at,'Do MMM YYYY');
          }
        },
        {
          key: 'type', 
          label: 'Type',
          sortable: false,          
          cellClass: function (value, object) {return 'col-md-2';},  
          fn: function (type) {
            let classType = (type==='INDIVIDUAL')? 'primary' : 'info';
            let html = '<span class="label label-' + classType + '">' + toTitleCase(type) +'</span>';
            return Spacebars.SafeString(html);
          }
        }
      ]
    };
  }
});

getCustomerList = function(ifHasParameters) {
  if(!ifHasParameters){
    parameters = "?reduced=true&sort=createdDate,DESC&size=" + NO_OF_ELEMENTS_TABLE + "&page=" + page;
    if(customerType!==''){parameters += '&type=' + customerType;}
    if(customerName!==''){parameters += '&entity_name=' + customerName;}    
    if(fromDate!==''){parameters += '&created_after=' + fromDate;}
    if(toDate!==''){parameters += '&created_before=' + toDate;}  
    if(page===0){Session.set('previousPageStatus','disabled');}
    else{Session.set('previousPageStatus','');}
    FlowRouter.go('/customers' + parameters);  
    Session.set('currentPage', page + 1);              
  }

  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_ALL_CUSTOMERS, null, parameters, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason); 
    } 
    else {
      let allCustomers = res.data.content;
      let numberOfCustomers = res.data.total_elements;
      Session.setPersistent('customers', allCustomers);
      totalRows = numberOfCustomers;
      Session.set('totalPages', Math.ceil(Number(totalRows)/NO_OF_ELEMENTS_TABLE));
      if(numberOfCustomers <= (NO_OF_ELEMENTS_TABLE * (page+1))){Session.set('nextPageStatus','disabled');}
      else {Session.set('nextPageStatus','');}
      isFullDataSet = true;      
      deactivateSpinner();  
    }          
  });
}

getCustomerById = function() {
  Session.set('previousPageStatus','disabled');  
  Session.set('nextPageStatus','disabled');    
  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER, customerID, function(err,res){
    if(err) {
      deactivateSpinner();  
      toastr.error(err.details, err.reason);
    } 
    else {
      let customer = JSON.parse(res.content);
      let customerArray = [];
      if(customer.type === 'INDIVIDUAL'){
        customer.entity_name =  customer.first_name + ' ' + customer.last_name;
      }
      else{
        customer.entity_name =  customer.company_name;
      }
      customerArray.push(customer)
      Session.setPersistent('customers', customerArray);
      Session.set('totalPages', 1);
      isFullDataSet = false;
      deactivateSpinner();  
    }          
  });
}