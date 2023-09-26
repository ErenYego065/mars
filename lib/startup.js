// Run this when the meteor app is started
if (Meteor.isServer) {
  Meteor.startup(function () {
    BrowserPolicy.content.allowSameOriginForAll();
    // BrowserPolicy.content.allowOriginForAll('*.gravatar.com');    
    // BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
    // BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
    // BrowserPolicy.content.allowOriginForAll('*.google.com');
    // BrowserPolicy.content.allowOriginForAll('*.fontawesome.com');
    // BrowserPolicy.content.allowOriginForAll(process.env.ROOT_URL);
    // BrowserPolicy.content.allowInlineStyles();
    // BrowserPolicy.content.disallowInlineScripts();
  
    BrowserPolicy.content.allowInlineStyles();
    BrowserPolicy.content.allowDataUrlForAll();
    BrowserPolicy.content.allowOriginForAll('*');
    BrowserPolicy.framing.disallow();//

    if(!Meteor.users.findOne()){
      let id= Accounts.createUser({
        username: 'admin@cleardil.com',email : 'admin@cleardil.com',password : '123123',
      });

      let apiAuthorizationHeader = "c2RhZG06NDJmNDIwNDItYjhmYS00MmYyLWFlNDItYTQyYjQyZjlkNWI5";

      userProfile = {
        "userId" : id,
        "companyName" : "Admin Company",
        "apiAuthorizationHeader" : CryptoJS.AES.encrypt(apiAuthorizationHeader, Meteor.settings.private.encryptionKey).toString(),
        "primaryContactName" : "Admin",
        "primaryContactEmail" : "admin@cleardil.com",
        "telephone" : "+555 111 221221",
        "username" : 'admin@cleardil.com'        
      }

      UserProfile.insert(userProfile);      
      Roles.addUsersToRoles(id, ['admin']);

      id= Accounts.createUser({
        username: 'audit@cleardil.com',email : 'audit@cleardil.com',password : '123123',
      });

      userProfile = {
        "userId" : id,
        "companyName" : "Audit",
        "apiAuthorizationHeader" : CryptoJS.AES.encrypt(apiAuthorizationHeader, Meteor.settings.private.encryptionKey).toString(),
        "primaryContactName" : "Audit",
        "primaryContactEmail" : "audit@cleardil.com",
        "telephone" : "+555 111 221221",
        "username" : 'audit@cleardil.com'        
      }

      UserProfile.insert(userProfile);      
      Roles.addUsersToRoles(id, ['audit']);
    }
  });
}