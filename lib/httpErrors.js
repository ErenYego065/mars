/**
 * HTTP error messages.
 */
SUPPORT_EMAIL      = "support@cleardil.com";

//HTTP PATCH and POST will have their own validation error messages (e.g. missing mandatory field)
HTTP_400_MESSAGE   = 'Invalid request';
HTTP_400_DETAILS   = 'An unexpected error has occured. Please contact us at '
                    + SUPPORT_EMAIL + ' with the details.';

HTTP_401_MESSAGE   = 'Invalid credentials';
HTTP_401_DETAILS   = 'Your login credentials has expired.';

HTTP_403_MESSAGE   = 'Unauthorised';
HTTP_403_DETAILS   = 'Your account does not have sufficient permissions to access this <resource_label>.';

HTTP_404_MESSAGE   = 'Not found';
HTTP_404_DETAILS   = 'Requested <resource_label> was not found. Please refresh the page and try again.';

HTTP_409_MESSAGE   = 'Duplicate <resource_label>';
HTTP_409_DETAILS   = 'A <resource_label> with the same details already exists.';

HTTP_410_MESSAGE   = 'Deleted';
HTTP_410_DETAILS   = 'The <resource_label> was deleted while processing your request.';

HTTP_500_MESSAGE   = 'Server error';
HTTP_500_DETAILS   = 'An internal server error has occured.';

HTTP_503_MESSAGE   = 'We\'re upgrading!';
HTTP_503_DETAILS   = 'Service is under planned maintenance and will be restored shortly.';

HTTP_ERROR_MESSAGE = 'Unexpected error';
HTTP_ERROR_DETAILS = 'An unexpected error has occured. Please try again. If it continues to occur, '
                   +'please contact us at '+ SUPPORT_EMAIL +' with details.';

 /**
 * Mapping used for generating user-friendly validation and error messages pertaining to HTTP requests.
 * It maps the API error response ("type" field) to a customised message for display purposes. 
 */
ERROR_TYPE_DESCRIPTION_MAPPPING     = [
  {value:'duplicate', text:'Duplicate', description:"A <attribute_label> with the same details already exists."},
  {value:'conflict', text:'Conflict', description:"A change has taken place while making this request. Please refresh and try again."},
  {value:'not_available_in_sandbox', text:'Unavailable in Sandbox', description:"Provided document can not be verified using the Sandbox. Please use one of the provided samples."},
  {value:'mandatory_field_missing', text:'Mandatory field missing', description:"A required field is missing. Please check and try again."},
  {value:'incorrect_email_format', text:'Incorrect email format', description:"Email format is incorrect."},
  {value:'date_out_of_bounds', text:'Incorrect date format', description:"Date provided is incorrect."},
  {value:'incorrect_phone_number_format', text:'Incorrect phone format', description:"Mobile number format is incorrect."},
  {value:'plan_limitation', text:'Service not included', description:"The <attribute_label> service is not included in your plan."},
  {value:'invalid_verification_request', text:'Document Processing Error', description:"Common causes:</br> - Low image quality </br> - Image taken at an angle </br> - Unsupported country & ID combination"}
]