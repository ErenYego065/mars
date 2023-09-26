if(Meteor.isServer) {
  Meteor.methods({
    getApiCredentials: function() {
      this.unblock();  
      try {
        let encryptionKey = Meteor.settings.private.encryptionKey;
			  let encryptedAuthorizationHeader = UserProfile.find({userId: Meteor.userId()}).fetch()[0].apiAuthorizationHeader;
        let authorizationHeader = CryptoJS.AES.decrypt(encryptedAuthorizationHeader, encryptionKey).toString(CryptoJS.enc.Utf8);
        let user = UserProfile.findOne({userId: Meteor.userId()});  
        let apiCredentials = new Buffer(authorizationHeader, "base64").toString();
        return {
          apiId: apiCredentials.split(':')[0],
          apiKey: apiCredentials.split(':')[1],
        }
      }
    
      catch (error) {  
        console.log(error);        
        return error;
      }
    },

    getPlanDetails: function(planID) {
      this.unblock();  
      try {
        let response = Async.runSync(function(done) {       
          Meteor.call('getResource', true, URI_USER_PLANS, null, null, planID, null, null, Meteor.settings.private.adminAuthCode, function(err,res){
            if(err) {
              // done('Error creating KK account', null);       
            }        
            else {
              done(null, res.data.limit);
            }
          });
        });
        return response;
      }
      
      catch (error) {
        console.log(error);
        return error;
      }
    }
  });
};