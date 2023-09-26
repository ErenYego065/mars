page = 0;
customerID = '';
identificationID = '';
identificationStatus = '';
getResultsFlag = true;
totalRows = 0;

Template.identificationGrid.created = function () {
  Session.set('allIdentifications', null);

  page = 0;
  customerID = '';
  identificationID = '';
  identificationStatus = '';
  Session.set('current-page', 0)
  Session.set('currentPage', 1);
  Session.set('previousPageStatus', 'disabled');
  currentPage = new ReactiveVar(Session.get('current-page') || 0);

  this.currentPage = currentPage;
  this.autorun(function () {
    Session.set('current-page', currentPage.get());
  });
};

Template.identificationGrid.rendered = function () {
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
    getIdentificationList(true);

  } else {
   getIdentificationList(false);
  }

  // getIdentificationList();
};

Template.identificationGrid.events({
  "keyup .idSearch": function (event, template) {
    event.preventDefault();
    if ($(event.target).val().length === 36) {
      if (customerID !== $(event.target).val()) {
        customerID = $(event.target).val();
        getIdentificationList(true);
      }
    } else {
      if (getResultsFlag) {
        customerID = '';
        getIdentificationList(false);
      }
    }
  },

  "change .status": function (event, template) {
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if (input != 'ALL') {
      identificationStatus = input;
      getIdentificationList();
    } else {
      identificationStatus = '';
      getIdentificationList();
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
    getIdentificationList();
  },

  "click .previousPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows) / NO_OF_ELEMENTS_TABLE);
    if (page != 0) {
      currentPage.set(--page);
    }
    Session.set('currentPage', page + 1);
    getIdentificationList();
  }
});

Template.identificationGrid.helpers({
  identifications: function () {
    return Session.get('allIdentifications');
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
      id: 'identificationGrid',
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
            return 'col-md-4';
          },
          fn: function (entity_name, obj) {
            let html = '<a style="color:#324157;" href="/customers/' + obj.customer_id + '/identifications/' + obj.id + '">' + toTitleCase(entity_name) + '</a>';
            // let html = '<a style="color:#324157;" href="#">' + 'John Doe' + '</a>';                        
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'similarity',
          label: 'Similarity',
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          sortable: false,
          sortByValue: true,
          fn: function (similarity) {
            return similarity.toFixed(2);
          }
        },
        {
          key: 'face_match',
          label: 'Face Match',
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          sortable: false,
          sortByValue: true,
          fn: function (face_match) {
            if (face_match) {
              return 'True'
            } else {
              return 'False'
            }
          }
        },
        {
          key: 'created_at',
          label: 'Identification Date',
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
          label: 'Identification ID',
          fn: function (id) {
            let html = '<small>' + id + '</small>';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'document_id',
          hidden: true,
          label: 'Document ID',
          sortable: false,
          fn: function (document_id) {
            return Spacebars.SafeString(document_id);
          }
        },
        {
          key: 'customer_id',
          hidden: true,
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

getIdentificationList = function (resultFlag) {
  let parameters = "?sort=createdDate,DESC&size=" + NO_OF_ELEMENTS_TABLE + "&page=" + page;
  if (identificationStatus !== '') {
    parameters += '&status=' + identificationStatus;
  }
  if (customerID !== '') {
    parameters += '&customer_id=' + customerID;
  }
  if (page === 0) {
    Session.set('previousPageStatus', 'disabled');
  } else {
    Session.set('previousPageStatus', '');
  }
  FlowRouter.go('/identifications' + parameters);
  Session.set('currentPage', page + 1);

  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_IDENTIFICATIONS, null, parameters, function (err, res) {
    if (err) {
      deactivateSpinner();
      if (err.error === 401) {
        Meteor.logout(function () {
          FlowRouter.go('/login');
        });
      }
      toastr.error(err.details, err.reason);
    } else {
      let allIdentifications = res.data.content;
      let numberOfidentifications = res.data.total_elements;
      Session.set('allIdentifications', allIdentifications);
      totalRows = numberOfidentifications;
      Session.set('totalPages', Math.ceil(Number(totalRows) / NO_OF_ELEMENTS_TABLE));
      if (numberOfidentifications <= (NO_OF_ELEMENTS_TABLE * (page + 1))) {
        Session.set('nextPageStatus', 'disabled');
      } else {
        Session.set('nextPageStatus', '');
      }
      getResultsFlag = resultFlag;
      deactivateSpinner();
    }
  });
}