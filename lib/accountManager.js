if (Meteor.isServer) {
  Meteor.methods({
    checkPasswordUsingCredentials: function (email, password) {
      let user = Accounts.findUserByEmail(email);
      let result;

      if (user) {
        let profile = getUserProfile(user);

        //Tactical solution to remove Token from DB on login rather than logout
        deleteUserAuthenticationKey(user._id);
        
        if (!profile.twoFAuthenticationEnabled) {
          result = {
            userFound: true,
            twoFormEnabled: false
          }
          return result;
        } else {
          let result = Accounts._checkPassword(user, password);
          result = {
            userFound: true,
            twoFormEnabled: true,
            passwordMatch: result.error == null
          }
          return result;
        }
      } else {
        result = {
          twoFormEnabled: false,
          userFound: false
        }
        return result;
      }
    },

    checkAuthenticaionUsingCredentials: function (email, token) {
      let user = Accounts.findUserByEmail(email);
      if (user) {
        let profile = getUserProfile(user);
        let decryptedKey = CryptoJS.AES.decrypt(profile.twoFAuthenticationKey, Meteor.settings.private.encryptionKey).toString(CryptoJS.enc.Utf8);

        try {
          if (Authenticator.verifyAuthCode(token, decryptedKey)) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          throw new Meteor.Error(error);
        }
      }
    },

    getOtp: function () {
      try {
        let label = Meteor.user().emails[0].address;
        let issuer = Meteor.settings.private.authenticatorLabel;
        let authCode = Authenticator.getAuthCode(label, issuer);
        return authCode;
      } catch (error) {
        throw new Meteor.Error(error);
      }
    },

    verifyOtp: function (token, key) {
      try {
        if (Authenticator.verifyAuthCode(token, key)) {
          setUser2FAKey(key);
          email2FAVerification();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Meteor.Error(error);
      }
    },

    verify2FATokenLink: function (token) {
      try {
        let label = Meteor.user().emails[0].address;
        let profile = getUserProfile();
        let verificationCode = profile.twoFAuthenticationVerificationCode;
        if (token === verificationCode) {
          UserProfile.update(profile._id, {
            '$set': {
              "twoFAuthenticationEnabled": true
            }
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Meteor.Error(error);
      }
    },

    disable2FA: function (token) {
      try {
        let key = getUser2FAKey();
        if (Authenticator.verifyAuthCode(token, key)) {
          let profile = getUserProfile();
          UserProfile.update(profile._id, {
            '$set': {
              "twoFAuthenticationEnabled": false
            }
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Meteor.Error(error);
      }

    },
  })

  setUser2FAKey = function (key) {
    if (Meteor.userId) {
      let encryptedKey = CryptoJS.AES.encrypt(key, Meteor.settings.private.encryptionKey).toString()
      let profile = getUserProfile();
      UserProfile.update(profile._id, {
        '$set': {
          "twoFAuthenticationKey": encryptedKey
        }
      });
    }
  }

  getUserProfile = function (user) {
    if (user) {
      return UserProfile.findOne({
        userId: user._id
      });
    } else {
      return UserProfile.findOne({
        userId: Meteor.userId()
      });
    }
  }

  getUser2FAKey = function () {
    if (Meteor.userId) {
      let profile = getUserProfile();
      let decryptedKey = CryptoJS.AES.decrypt(profile.twoFAuthenticationKey, Meteor.settings.private.encryptionKey).toString(CryptoJS.enc.Utf8);
      return decryptedKey;
    }
  }

  email2FAVerification = function () {
    try {
      if (!process.env.MAIL_URL) {
        process.env.MAIL_URL = Meteor.settings.private.mailUrl;
      }

      SSR.compileTemplate('htmlEmail', Assets.getText('html-2fa-confirmation.html'));
      let token = Random.secret();
      // let confirmUrl = Meteor.absoluteUrl() + '#/verify-2fa/' + token;        
      let confirmUrl = Meteor.settings.private.domainUrl + '#/verify-2fa/' + token;
      let profile = getUserProfile();

      UserProfile.update(profile._id, {
        '$set': {
          "twoFAuthenticationVerificationCode": token
        }
      });

      let emailData = {
        urlWithoutHash: confirmUrl.replace('#/', ''),
        supportEmail: 'info@cleardil.com'
      };

      // let emailAddress   = user.emails[0].address,
      // urlWithoutHash = url.replace( '#/', '' ),

      Email.send({
        to: profile.username,
        from: "ClearDil Client Support<info@cleardil.com>",
        sender: "ClearDil Client Support<info@cleardil.com>",
        subject: "Enable 2-form authentication for ClearDil",
        html: SSR.render('htmlEmail', emailData)
      });
    } catch (error) {
      throw new Meteor.Error(error);
    }
  }
}