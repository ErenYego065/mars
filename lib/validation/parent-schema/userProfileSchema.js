 /**
 * a simple-schema designed to validate changes to a user profile
 */
userProfile = new SimpleSchema({
  companyName: {
    type: String,
    optional: false,
    autoform: {
      label: true,
      placeholder: "schemaLabel"
    }
  },
  telephone: {
    type: String,     
    optional: true,
    label: "Phone",
    regEx: SimpleSchema.RegEx.Phone,
    autoform: {
      label: true,
      placeholder: "schemaLabel"
    }
  },
  primaryContactName: {
    type: String,
    optional: true,
    autoform: {
      label: true,
      placeholder: "schemaLabel"
    }
  },
  primaryContactEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,      
    optional: true,
    autoform: {
      label: true,
      placeholder: "schemaLabel"
    }
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    optional: true,
    autoform: {
      label: true,
      placeholder: "schemaLabel"
    }
  }
});

userProfile.messages({
  regEx: [
    {exp: SimpleSchema.RegEx.Phone, msg: "[label] number does not meet international format."}
  ],
});