page = 0;
customerID = '';
screeningID = '';
screeningStatus = '';
parameters = '';
getResultsFlag = true;
totalRows = 0;

Template.screeningGrid.created = function () {
  Session.set('allScreenings', null);

  page = 0;
  customerID = '';
  screeningID = '';
  screeningStatus = '';
  Session.set('current-page', 0)
  Session.set('currentPage', 1);
  Session.set('previousPageStatus', 'disabled');
  currentPage = new ReactiveVar(Session.get('current-page') || 0);

  this.currentPage = currentPage;
  this.autorun(function () {
    Session.set('current-page', currentPage.get());
  });
};

Template.screeningGrid.rendered = function () {
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
    getScreeningList(true);

  } else {
    getScreeningList(false);
  }
};

Template.screeningGrid.events({
  "keyup .idSearch": function (event, template) {
    event.preventDefault();
    if ($(event.target).val().length === 36) {
      if (customerID !== $(event.target).val()) {
        customerID = $(event.target).val();
        getScreeningList(true);
      }
    } else {
      if (getResultsFlag) {
        customerID = '';
        getScreeningList(false);
      }
    }
  },

  "change .status": function (event, template) {
    event.preventDefault();
    let input = $(event.target).val();
    page = 0;
    currentPage.set(page);
    if (input != 'ALL') {
      screeningStatus = input;
      getScreeningList();
    } else {
      screeningStatus = '';
      getScreeningList();
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
    getScreeningList();
  },

  "click .previousPage": function (event) {
    event.preventDefault();
    let numberOfPages = Math.floor(Number(totalRows) / NO_OF_ELEMENTS_TABLE);
    if (page != 0) {
      currentPage.set(--page);
    }
    Session.set('currentPage', page + 1);
    getScreeningList();
  }
});

Template.screeningGrid.helpers({
  screenings: function () {
    return Session.get('allScreenings');
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
      id: 'screeningGrid',
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
            let html = '<a style="color:#324157;" href="/customers/' + obj.customer_id + '/screenings/' + obj.id + '/matches">' + toTitleCase(entity_name) + '</a>';
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'scope',
          label: 'Scope',
          sortable: false,
          cellClass: function (value, object) {
            return 'col-md-3';
          },
          fn: function (scope) {
            let html = '';
            _.each(scope, function (scopeConstituent) {
              html +=
                '<span class="badge badge-default">' + getTextFromValue(DISPLAY_TEXT, scopeConstituent) + '</span> ';
            })
            return Spacebars.SafeString(html);
          }
        },
        {
          key: 'created_at',
          label: 'Start Date',
          sortable: false,
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          fn: function (created_at) {
            return dateConvert(created_at, 'Do MMM YYYY');
          }
        },
        {
          key: 'updated_at',
          label: 'Completion Date',
          sortable: false,
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          fn: function (updated_at, obj) {
            if (obj.status === 'DONE') {
              return dateConvert(updated_at, 'Do MMM YYYY');
            } else {
              return '-';
            }
          }
        },
        {
          key: 'status',
          label: 'Status',
          sortable: false,
          cellClass: function (value, object) {
            return 'col-md-2';
          },
          fn: function (status) {
            let classType = (status === 'DONE') ? 'primary' : 'warning';
            let html = '<span class="label label-' + classType + '">' + toTitleCase(status) + '</span>';
            return Spacebars.SafeString(html);
          }
        },
        // {
        //   key: 'id', 
        //   hidden: true,    
        //   label: 'Screening ID',
        //   fn: function (id) {
        //     let html = '<small>' + id + '</small>';
        //     return Spacebars.SafeString(html);
        //   }
        // },
        {
          key: 'customer_id',
          hidden: true,
          sortable: false,
          label: 'Customer ID',
          fn: function (custId, obj) {
            let html = '<a href="/customers/' + obj.id + '">' + name + '</a>';
            return Spacebars.SafeString(html);
          }
        }
      ]
    };
  }
});

getScreeningList = function (resultFlag) {
  let parameters = "?sort=createdDate,DESC&size=" + NO_OF_ELEMENTS_TABLE + "&page=" + page;
  if (screeningStatus !== '') {
    parameters += '&status=' + screeningStatus;
  }
  if (customerID !== '') {
    parameters += '&customer_id=' + customerID;
  }
  if (page === 0) {
    Session.set('previousPageStatus', 'disabled');
  } else {
    Session.set('previousPageStatus', '');
  }
  FlowRouter.go('/screenings' + parameters);
  Session.set('currentPage', page + 1);

  activateSpinner();

  Meteor.call('getResource', Session.get('isLive'), URI_SEARCH_SCREENINGS, null, parameters, function (err, res) {
    if (err) {
      deactivateSpinner();
      if (err.error === 401) {
        Meteor.logout(function () {
          FlowRouter.go('/login');
        });
      }
      toastr.error(err.details, err.reason);
    } else {
      let allScreenings = res.data.content;
      let numberOfScreenings = res.data.total_elements;
      Session.setPersistent('allScreenings', allScreenings);
      totalRows = numberOfScreenings;
      Session.set('totalPages', Math.ceil(Number(totalRows) / NO_OF_ELEMENTS_TABLE));
      if (numberOfScreenings <= (NO_OF_ELEMENTS_TABLE * (page + 1))) {
        Session.set('nextPageStatus', 'disabled');
      } else {
        Session.set('nextPageStatus', '');
      }
      getResultsFlag = resultFlag;
      deactivateSpinner();
    }
  });
}