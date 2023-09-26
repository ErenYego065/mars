 /**
 * a simple-schema designed to validate changes to a customer object of type "Individual".
 */

individualCustomerSchema = customerSchema.pick([
  'type',
  'title',
  'first_name', 
  'middle_name',
  'last_name',
  'maiden_name',
  'dob',
  'email',
  'gender',
  'mobile',
  'telephone',
  'nationality',
  'birth_country'
]);

individualCustomerSchema.messages({
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

