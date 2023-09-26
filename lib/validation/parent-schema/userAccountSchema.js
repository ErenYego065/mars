 /**
 * a simple-schema designed to validate changes to a user account
 */

userAccountSchema = new SimpleSchema({
  emails: {
      type: Array,
      optional: true
  },
  "emails.$": {
      type: Object
  },
  "emails.$.address": {
      type: String,
      label: "Email",
      regEx: SimpleSchema.RegEx.Email
  },
  password: {
    type: String,
    label: "New password",
    min: 6
  },
  passwordConfirmation:{
    type: String,
    label: "Password confirmation",
    custom: function () {
      if (this.value != this.field('password').value){
        return "passwordMissmatch"
      }
    }
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
      type: Object,
      optional: true,
      blackbox: true
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
      type: Date,
      optional: true
  }
});

userAccountSchema.messages({
  "passwordMissmatch": "Passwords do not match"
});