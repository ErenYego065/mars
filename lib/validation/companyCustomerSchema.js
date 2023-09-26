 /**
 * a simple-schema designed to validate changes to a customer object of type "Company".
 */

companyCustomerSchema = customerSchema.pick([
  'type',
  'company_name',
  'incorporation_number', 
  'incorporation_type',
  'incorporation_country',
  'business_purpose',
  'email',
  'mobile',
  'telephone',
  'primary_contact_name',
  'primary_contact_email'
]);

companyCustomerSchema.messages({
  required:  "[label] is required",
  minString: "[label] must be at least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  regEx: [
    {msg: "[label] is incorrectly formatted"},
    {exp: /^[^%\^\*@?]*$/, msg: "[label] should not contain %, ^, *, @ or ?"},
    {exp: SimpleSchema.RegEx.Phone, msg: "[label] number does not meet international format."},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
    {exp: /^(\+\d{1,3}[- ]?)?\d{10}$/, msg: "[label] must be a valid contact number"}
  ],
  "incorrectEnum": "[label] is invalid",
  "invalidDate": "[label] is invalid"
});
