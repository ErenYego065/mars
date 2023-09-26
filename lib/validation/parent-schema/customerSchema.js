 /**
 * a simple-schema designed to validate changes to a customer object.
 */

customerSchema = new SimpleSchema({
  type: {
    label: "Customer type",
    type: String,
    optional: true
  },

  title: {
    label: "Title",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(CUSTOMER_TITLE_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },
    
  first_name: {
    label: "First name",
    type: String,
    optional: false,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  },

  middle_name: {
    label: "Middle name",
    type: String,
    optional: true,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  },

  last_name: {
    label: "Last name",
    type: String,
    optional: false,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  },

  maiden_name: {
    label: "Maiden name",
    type: String,
    optional: true,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  },

  dob: {
    label: "Date of birth",
    type: String,
    optional: true,
    regEx: /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
  },

  email: {
    label: "Email",
    type: String,
    optional: false,
    min: 2,
    max: 50,
    regEx: SimpleSchema.RegEx.Email
  },

  gender: {
    label: "Gender",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(CUSTOMER_GENDER_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },

  mobile: {
    label: "Mobile",
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Phone
    // regEx: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$|^(\d{9}|\d{14}|\+?\d{12})$/
  },

  telephone: {
    label: "Telephone",
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Phone
  },

  nationality: {
    label: "Nationality",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(COUNTRIES, this.value)){
        return "incorrectEnum";
      }
    }
  },
    
  birth_country: {
    label: "Birth Country",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(COUNTRIES, this.value)){
        return "incorrectEnum";
      }
    }
  },

  company_name: {
    label: "Company name",
    type: String,
    optional: false,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  },

  incorporation_number: {
    label: "Incorporation number",
    type: String,
    optional: true,
    min: 2,
    max: 30
  },

  incorporation_type: {
    label: "Incorporation type",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(INCORPORATION_TYPE_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },

  incorporation_country: {
    label: "Incorporation country",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(COUNTRIES, this.value)){
        return "incorrectEnum";
      }
    }
  },
  
  business_purpose: {
    label: "Business purpose",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(BUSINESS_PURPOSE_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },

  primary_contact_email: {
    label: "Primary contact email",
    type: String,
    optional: true,
    min: 2,
    max: 50,
    regEx: SimpleSchema.RegEx.Email
  },

  primary_contact_name: {
    label: "Primary contact name",
    type: String,
    optional: true,
    min: 2,
    max: 50,
    regEx: /^[^%\^\*@?]*$/
  }
});