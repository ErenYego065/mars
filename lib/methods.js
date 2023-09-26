if(Meteor.isServer){
  Meteor.methods({
    loginTimeStamp: function () {

      let data = {lastLoggedIn : new Date()};

      // console.log(data);
      Meteor.users.update(Meteor.userId(), {$set: {profile: data}});

      // UserProfile.update(objID, modifier);
    },

    updateUserprofile: function (modifier, objID) {
      UserProfile.update(objID, modifier);
    },

    updateUserPassword: function (modifier, objID) {      
      Accounts.setPassword(objID,modifier.$set.password,{logout: false})
    },

    adminUpdateUserAccount: function (companyName, apiAuthorizationHeader,objID) {    
      let isAdmin = Roles.userIsInRole( this.userId,'admin');
      if (isAdmin) {
        let newValue = {
          companyName: companyName,
          apiAuthorizationHeader: CryptoJS.AES.encrypt(apiAuthorizationHeader, Meteor.settings.private.encryptionKey).toString()
        }
        console.log(objID);
        console.log(newValue);
        UserProfile.update(objID, {$set: newValue});
      }
    },

    adminUpdateUserRole: function (role,objID) {    
      let isAdmin = Roles.userIsInRole( this.userId,'admin');
      if (isAdmin) { 
        Roles.setUserRoles(objID, role)
        // Roles.addUsersToRoles(objID, role)
      }
    },

    adminResetUserPassword: function (objID) {      
      let isAdmin = Roles.userIsInRole( this.userId,'admin');     
      if (isAdmin) {Accounts.setPassword(objID,'password',{logout: false});} 
    },

    adminDeleteUserAccount: function (objID, userId) {    
      let isAdmin = Roles.userIsInRole( this.userId,'admin');
      if (isAdmin) {
        Roles.removeUsersFromRoles(objID, Roles.getRolesForUser(objID));
        Meteor.users.remove({_id:userId})         
        UserProfile.remove(objID);
      }
    },

    adminDecryptAuthorizationHeader: function (encryptedAuthorizationHeader) {   
      let encryptionKey = Meteor.settings.private.encryptionKey;
			let authorizationHeader = CryptoJS.AES.decrypt(encryptedAuthorizationHeader, encryptionKey).toString(CryptoJS.enc.Utf8); 
      return authorizationHeader;
    },

    adminCreateUser: function (user, companyName, companyEmail) {    
      let isAdmin = Roles.userIsInRole( this.userId,'admin'); 
      let profileId;   
      let userId;

      if (isAdmin) {
        userId = Accounts.createUser(user);

        let userProfile = {
          "userId" : userId,
          "companyName" : companyName,
          "username" : companyEmail          
        }

        Roles.addUsersToRoles(userId, 'test');

        profileId = UserProfile.insert(userProfile);
        return profileId;
      } 
    },
  });

  deleteUserAuthenticationKey = function (userId) {    
   let profileId = UserProfile.findOne({userId: userId});
   UserProfile.update(profileId._id, { $set: { authenticationKey: null}});
 }

  updateUserAuthenticationKey = function (authenticationKey) {    
    let profileId = UserProfile.findOne({userId: Meteor.userId()});
    UserProfile.update(profileId._id, { $set: { authenticationKey: authenticationKey}});
  }

  getUserAuthenticationKey = function () {    
    let profile = UserProfile.findOne({userId: Meteor.userId()}, {fields: {authenticationKey:1}});
    return profile.authenticationKey;
  }     
}