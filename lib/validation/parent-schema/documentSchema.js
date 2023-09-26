 /**
 * a simple-schema designed to validate changes to a document object
 */

documentSchema = new SimpleSchema({
  type: {
    label: "Document type",
    type: String,
    optional: false,
    custom: function () {
      if(!validateEnum(DOCUMENT_TYPE_OPTIONS, this.value)){
        return "incorrectEnum";
      }
    }
  },

  issuing_country: {
    label: "Country",
    type: String,
    optional: true,
    custom: function () {
      if(!validateEnum(COUNTRIES, this.value)){
        return "incorrectEnum";
      }
    }
  },

  issuing_authority: {
    label: "Issuing authority",
    type: String,
    optional: true
  },

  document_name: {
    label: "Document name",
    type: String,
    optional: true
  },

  document_number: {
    label: "Document number",
    type: String,
    optional: true
  },

  document_description: {
    label: "Document description",
    type: String,
    optional: true
  },

  mrz_line1: {
    label: "MRZ line 1",
    type: String,
    optional: true
  },

  mrz_line2: {
    label: "MRZ line 2",
    type: String,
    optional: true
  },

  mrz_line3: {
    label: "MRZ line 3",
    type: String,
    optional: true
  },
  
  issue_date: {
    label: "Issue date",
    type: String,
    regEx: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    optional: true,
    custom: function () {
      if ((this.value > this.field('expiry_date').value)){
        return "incorrectDateRange";
      }
    }
  },

  expiry_date: {
    label: "Expiry date",
    type: String,
    regEx: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    optional: true,
    custom: function () {
      if (this.value < this.field('issue_date').value) {
        return "incorrectDateRange";
      }
    }
  }

  // front_image: {
  //   label: "Front image",
  //   type: Object,
  //   optional: true
  // },

  // back_image: {
  //   label: "Back image",
  //   type: Object,
  //   optional: true,
  // }
});

documentSchema.messages({
  required:  "[label] is required",
  regEx: [
    {msg: "[label] is incorrectly formatted"},
    {exp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, msg: "[label] is invalid"}
  ],
  "incorrectDateRange": "Issue date cannot be after expiry date",
  "incorrectEnum": "[label] is invalid",
  "mandatoryEnum": "[label] is required"
});