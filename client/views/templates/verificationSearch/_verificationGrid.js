page = 0;
customerID = '';
verificationID = '';
verificationStatus = '';
getResultsFlag = true;
totalRows = 0;

Template.verificationGrid.created = function () {
  Session.set('allVerifications', null);

  page = 0;
  customerID = '';
  verificationID = '';
  verificationStatus = '';
  Session.set('current-page', 0)
  Session.set('currentPage', 1);
  Session.set('previousPageStatus', 'disabled');
  currentPage = new ReactiveVar(Session.get('current-page') || 0);

  this.currentPage = currentPage;
  this.autorun(function () {
    Session.set('current-page', currentPage.get());
  });
};

Template.verificationGrid.rendered = function () {
  customerID = (FlowRouter.current().params._CustId) ? FlowRouter.current().params._CustId : '';

  let urlPage = FlowRouter.current().queryParams.page;
  if (urlPage) {
    parameters = FlowRouter.current().path;
    parameters = '?' + (parameters.substring(parameters.indexOf("?") + 1));;
    page = Number(urlPage);
    Session.set('current-page', page)
    Session.set('currentPage', page + 1);
    if (page === 0) {
      Session.set('previousPageStatus', 'disabled');
    } else {
      Session.set('previousPageStatus', '');
    }
    getVerificationsList(true);

  } else {
   getVerificationsList(false);
  }
};

Template.verificationGrid.events({
  "keyup .idSearch": function (event, template) {
    event.preventDefault();
    if ($(event.target).val().length === 36) {
      if (customerID !== $(event.target).val()) {
        customerID = $(event.target).val();
        getVerificationsList(true);
      }
    } else {
      if (getResultsFlag) {
        customerID = '';
        getVerificationsList(false);
      }
    }
  },

  "change .status": function (event, template) {
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if (input != 'ALL') {
      verificationStatus = input;
      getVerificationsList();
    } else {
      verificationStatus = '';
      getVerificationsList();
    }
    // Session.set('filteredRows',$('.rows-per-page-count').text());
  },

  "click .nextPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows) / NO_OF_ELEMENTS_TABLE);
    if (page < numberOfPages) {
      currentPage.set(++page);
    }
    Session.set('currentPage', page + 1);
    getVerificationsList();
  },

  "click .previousPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows) / NO_OF_ELEMENTS_TABLE);
    if (page != 0) {
      currentPage.set(--page);
    }
    Session.set('currentPage', page + 1);
    getVerificationsList();
  }
});

Template.verificationGrid.helpers({
  verifications: function () {
    return Session.get('allVerifications');
  },
  totalPages: function () {
    return Session.get('totalPages');
  },
  filteredRows: function () {
    return Session.get('filteredRows');
  },
  nextPageStatus: function () {
    return Session.get('nextPageStatus');
  },
  previousPageStatus: function () {
    return Session.get('previousPageStatus');
  },
  currentPage: function () {
    return Session.get('currentPage');
  },

  tableSettings: function () {
    return {
      id: 'verificationGrid',
      rowsPerPage: NO_OF_ELEMENTS_TABLE,
      showRowCount: true,
      showFilter: false,
      showNavigation: 'never',
      showColumnToggles: false,
      useFontAwesome: true,
      showNavigationRowsPerPage: false,
      multiColumnSort: false,
      class: 'table',
      fields: [{
          key: 'entity_name',
          label: 'Customer Name',
          sortable: false,
          cellClass: function (value, object) {
            return 'col-md-3';
          },
          fn: function (entity_name, obj) {
            let html = '<a style="color:#324157;" href="/customers/' + obj.customer_id + '/verifications/' + obj.id + '">' + toTitleCase(entity_name) + '</a>';
            // let html = '<a style="color:#324157;" href="#">' + 'John Doe' + '</a>';                        
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'type',
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          sortable: false,
          label: 'Analysis',
          fn: function (type) {
            let html = '<span class="badge badge-default">' + getTextFromValue(DISPLAY_TEXT, type) + '</span> ';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'properties',
          cellClass: function (value, object) {
            return 'col-md-3';
          },
          sortable: false,
          label: 'Document Type',
          fn: function (properties) {
            return getTextFromValue(DISPLAY_TEXT, properties.document_type);
          }
        },
        {
          key: 'created_at',
          label: 'Verification Date',
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          sortable: false,
          fn: function (created_at) {
            return dateConvert(created_at, 'Do MMM YYYY');
          }
        },
        {
          key: 'status',
          label: 'Status',
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          sortable: false,
          fn: function (status) {
            let classType = (status === 'DONE') ? 'primary' : 'warning';
            let html = '<span class="label label-' + classType + '">' + toTitleCase(status) + '</span>';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'id',
          hidden: true,
          sortable: false,
          label: 'Verification ID',
          fn: function (id) {
            let html = '<small>' + id + '</small>';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'document_id',
          hidden: true,
          sortable: false,
          label: 'Document ID',
          sortable: false,
          fn: function (document_id) {
            return Spacebars.SafeString(document_id);
          }
        },
        {
          key: 'customer_id',
          hidden: true,
          sortable: false,
          label: 'Customer ID',
          sortable: false,
          fn: function (custId) {
            return Spacebars.SafeString(custId);
          }
        }
      ]
    };
  }
});

getVerificationsList = function (resultFlag) {
  let parameters = "?sort=createdDate,DESC&size=" + NO_OF_ELEMENTS_TABLE + "&page=" + page;
  if (verificationStatus !== '') {
    parameters += '&status=' + verificationStatus;
  }
  if (customerID !== '') {
    parameters += '&customer_id=' + customerID;
  }
  if (page === 0) {
    Session.set('previousPageStatus', 'disabled');
  } else {
    Session.set('previousPageStatus', '');
  }
  FlowRouter.go('/verifications' + parameters);
  Session.set('currentPage', page + 1);

  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_VERIFICATIONS, null, parameters, function (err, res) {
    if (err) {
      deactivateSpinner();
      if (err.error === 401) {
        Meteor.logout(function () {
          FlowRouter.go('/login');
        });
      }
      toastr.error(err.details, err.reason);
    } else {
      let allVerifications = res.data.content;
      let numberOfVerifications = res.data.total_elements;
      Session.set('allVerifications', allVerifications);
      totalRows = numberOfVerifications;
      Session.set('totalPages', Math.ceil(Number(totalRows) / NO_OF_ELEMENTS_TABLE));
      if (numberOfVerifications <= (NO_OF_ELEMENTS_TABLE * (page + 1))) {
        Session.set('nextPageStatus', 'disabled');
      } else {
        Session.set('nextPageStatus', '');
      }
      getResultsFlag = resultFlag;
      deactivateSpinner();
    }
  });
}