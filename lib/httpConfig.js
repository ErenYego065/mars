/**
 * HTTP URIs used across the web-application.
 */

URI_LIVE_KEYCLOAK           = Meteor.settings.public.authentication_uri_live;
URI_TEST_KEYCLOAK           = Meteor.settings.public.authentication_uri_test;

URI_API                     = '';                                                        
URI_LIVE_API                = Meteor.settings.public.base_uri_live;                               
URI_TEST_API                = Meteor.settings.public.base_uri_test;                               

URI_CUSTOMER                = URI_API + '/customers/<customer_id>';
URI_DOCUMENT                = URI_API + '/customers/<customer_id>/documents/<resource_id_1>';
URI_NOTE                    = URI_API + '/customers/<customer_id>/notes/<resource_id_1>';
URI_RISK_PROFILE            = URI_API + '/customers/<customer_id>/risk_profile';
URI_ODD                     = URI_API + '/customers/<customer_id>/odd/<resource_id_1>';
URI_SCREENING               = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>';
URI_MATCH                   = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>/matches/<resource_id_2>';
URI_DOC_VERIFICATION        = URI_API + '/customers/<customer_id>/verifications/<resource_id_1>';
URI_IDENTIFICATION          = URI_API + '/customers/<customer_id>/identifications/<resource_id_1>';
URI_ASSOCIATION             = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>/matches/<resource_id_2>/associations/<resource_id_3>';
URI_ATTACHMENT              = URI_API + '/files/<resource_id_1>';
URI_REPORT                  = URI_API + '/reports/<resource_id_1>';

URI_CUSTOMER_STATS          = URI_API + '/stats/customers';
URI_SCREENING_STATS         = URI_API + '/stats/screenings';

URI_ALL_CUSTOMERS           = '/customers';
URI_ALL_DOCUMENTS           = URI_API + '/customers/<customer_id>/documents';
URI_ALL_NOTES               = URI_API + '/customers/<customer_id>/notes';
URI_ALL_SCREENINGS          = URI_API + '/customers/<customer_id>/screenings';
//URI_ALL_MATCHES             = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>/matches';
URI_ALL_MATCHES             = URI_API + '/search/matches?customer_id=<customer_id>&screening_id=<resource_id_1>';
URI_ALL_DOC_VERIFICATIONS   = URI_API + '/customers/<customer_id>/verifications';
URI_ALL_IDENTIFICATIONS     = URI_API + '/customers/<customer_id>/identifications/';
URI_ALL_ASSOCIATIONS        = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>/matches/<resource_id_2>/associations';
URI_ALL_ODD                 = URI_API + '/customers/<customer_id>/odd';
URI_ALL_REPORTS             = URI_API + '/reports';

URI_SEARCH_SCREENINGS       = URI_API + '/search/screenings';
URI_SEARCH_VERIFICATIONS    = URI_API + '/search/verifications';
URI_SEARCH_IDENTIFICATIONS  = URI_API + '/search/identifications';

URI_ATTACHMENT_DOWNLOAD     = URI_API + '/files/<resource_id_1>';
URI_REPORT_DOWNLOAD         = URI_API + '/reports/<resource_id_1>/pdf';
URL_DOC_DOWNLOAD            = URI_API + '/customers/<customer_id>/documents/<resource_id_1>/download?side=<resource_id_2>';
URI_VALIDATE_MATCH          = URI_API + '/customers/<customer_id>/screenings/<resource_id_1>/matches/<resource_id_2>/<resource_id_3>';

URI_USER_REGISTER           = URI_API + "/um/users";
URI_ALL_USER_PLANS          = URI_API + "/um/memberships";
URI_USER_PLANS              = URI_API + "/um/memberships/<resource_id_1>";
URI_SUBSCRIBE_PLAN          = URI_API + "/profile/subscription";
URI_USER_INFO               = URI_API + "/oauth2/userinfo";

/**
 * Mapping used for generating user-friendly messages pertaining to HTTP requests.
 * It maps a label to a URI for display purposes.
 */
URI_LABEL_MAPPING     = [
  {value:URI_CUSTOMER, text:"customer"},
  {value:URI_SCREENING, text:"screening"},
  {value:URI_ALL_SCREENINGS, text:"screening"},
  {value:URI_ODD, text:"ODD"},  
  {value:URI_DOCUMENT, text:"document"},
  {value:URI_IDENTIFICATION, text:"identity verification"},  
  {value:URI_ALL_IDENTIFICATIONS, text:"identity verification"},  
  {value:URI_DOC_VERIFICATION, text:"document verification"},  
  {value:URI_ALL_DOC_VERIFICATIONS, text:"document verification"},         
  {value:URI_NOTE, text:"note"},
  {value:URI_RISK_PROFILE, text:"risk profile"},
  {value:URI_ALL_CUSTOMERS, text:"customer"},
  {value:URI_ALL_DOCUMENTS, text:"document"},
  {value:URI_ALL_NOTES, text:"notes"},
  {value:URI_ALL_ODD, text:"ODD"},
  {value:URL_DOC_DOWNLOAD, text:"document"},
  {value:URI_REPORT, text:"report"},
  {value:URI_ALL_REPORTS, text:"report"},
  {value:URI_REPORT_DOWNLOAD, text:"report"},  
  {value:URI_ALL_REPORTS, text:"attachment"},  
  {value:URI_ATTACHMENT_DOWNLOAD, text:"attachment"},    
]

CONTENT_TYPE_MAPPPING     = [
  {value:URI_ALL_NOTES, text:"application/json"},
  {value:URI_NOTE, text:"application/json"},
  {value:URI_CUSTOMER, text:"application/json"},
  {value:URI_IDENTIFICATION, text:"application/json"},  
  {value:URI_ALL_CUSTOMERS, text:"application/json"},
  {value:URI_ODD, text:"application/json"},
  {value:URI_ALL_ODD, text:"application/json"},
  {value:URI_ALL_SCREENINGS, text:"application/json"},
  {value:URI_ALL_DOC_VERIFICATIONS, text:"application/json"},
  {value:URI_ALL_IDENTIFICATIONS, text:"application/json"},  
  // {value:URI_DOCUMENT, text:"application/x-www-form-urlencoded"},
  // {value:URI_ALL_DOCUMENTS, text:"application/x-www-form-urlencoded"}  
  {value:URI_DOCUMENT, text:"application/json"},  
  {value:URI_ALL_DOCUMENTS, text:"application/json"},    
  {value:URI_REPORT, text:"application/json"},  
  {value:URI_ALL_REPORTS, text:"application/json"},
  {value:URI_REPORT_DOWNLOAD, text:"application/json"},
  {value:URI_ATTACHMENT_DOWNLOAD, text:"application/json"},
  {value:URI_USER_REGISTER, text:"application/json"},
  {value:URI_ALL_USER_PLANS, text:"application/json"},  
  {value:URI_USER_PLANS, text:"application/json"},
  {value:URI_SUBSCRIBE_PLAN, text:"application/json"},
  {value:URI_USER_INFO, text:"application/json"}  
]

ADMIN_ENDPOINTS = [
  URI_USER_REGISTER, URI_ALL_USER_PLANS, URI_SUBSCRIBE_PLAN, URI_USER_PLANS
]