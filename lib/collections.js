UserProfile = new Mongo.Collection('userProfile');

// Files = new FS.Collection("files", {
//   stores: [new FS.Store.FileSystem("files", {path: "/Users/Mo/"})],
//   chunkSize: 4 * 1024 * 1024
// });

// FS.File

if(Meteor.isServer){
  Meteor.publish("userData", function () {
    if (this.userId) {return Meteor.users.find({_id: this.userId});} 
    else {this.ready();}
  });

  Meteor.publish('userProfile', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );    
    if (isAdmin) {      
      return [UserProfile.find({})];
    } else {
      return UserProfile.find({userId: Meteor.userId()});  ;
    }
  });

  Meteor.publish( 'users', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
    if ( isAdmin ) {
      return [
        UserProfile.find({}),
      ];
    } else {
      return null;
    }
  });

  Meteor.publish("userList", function () {
    return Meteor.users.find({});
  });

  // Files.allow({
  //   'insert': function () {return true;},
  //   'update': function () {return true;}
  // });

  // Meteor.publish("files", function() {
  //   return Collections.Files.find();
  // });
}

if(Meteor.isClient){
  Meteor.subscribe("userData");
  Meteor.subscribe("userProfile");
  Meteor.subscribe("userList");
  // Meteor.subscribe("files");
}



