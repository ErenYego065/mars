 /**
 * a simple-schema designed to validate changes to an address object
 */

addressSchema = new SimpleSchema({
  type: {
    label: "Address type",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(ADDRESS_TYPE_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },

  property_number: {
    label: "Property number",
    type: String,
    optional: true
  },

  property_name: {
    label: "Property name",
    type: String,
    optional: true
  },

  line: {
    label: "Address line",
    type: String,
    optional: false
  },

  extra_line: {
    label: "Address extra line",
    type: String,
    optional: true
  },

  city: {
    label: "Address city",
    type: String,
    optional: false
  },

  state_or_province: {
    label: "State or province",
    type: String,
    optional: true
  },

  postal_code: {
    label: "Postal code",
    type: String,
    optional: false
  },

  country: {
    label: "Country",
    type: String,
    optional: false,
    custom: function () {
      if(!validateEnum(COUNTRIES, this.value)){
        return "incorrectEnum";
      }
    }
  },

  from_date: {
    label: "From date",
    type: String,
    regEx: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    optional: true,
    custom: function () {
      if ((this.value > this.field('to_date').value)){
        return "incorrectDateRange";
      }
    }
  },
    
  to_date: {
    label: "To date",
    type: String,
    regEx: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    optional: true,
    custom: function () {
      if (this.value < this.field('from_date').value) {
        return "incorrectDateRange";
      }
      else if ((this.field('to_date').value) && (!this.field('from_date').value)) {
        return "incorrectDateContext";
      }
    }
  }
});

addressSchema.messages({
  required:  "[label] is required",
  minString: "[label] must be at least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  regEx: [
    {msg: "[label] is incorrectly formatted"},
    {exp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, msg: "[label] is invalid"}
  ],
  "incorrectDateRange": "From date cannot be after to date",
  "incorrectDateContext": "Cannot have \"to date\" without \"from date\"",
  "incorrectEnum": "[label] is invalid"
});