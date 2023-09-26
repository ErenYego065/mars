Template.faqHelp.rendered = function(){
  Session.set('isServices',true);
  Session.set('isBilling',false);
  Session.set('isSecurity',false);
};

Template.faqHelp.helpers({
  isServices: function() {return Session.get('isServices');},
  isBilling: function() {return Session.get('isBilling');},
  isSecurity: function() {return Session.get('isSecurity');},
});

Template.faqHelp.events({
  'change #services': function (e) {
    e.preventDefault();
    Session.set('isServices',true);
    Session.set('isBilling',false);
    Session.set('isSecurity',false);
  },  

  'change #billing': function (e) {
    e.preventDefault();
    Session.set('isServices',false);
    Session.set('isBilling',true);
    Session.set('isSecurity',false);
  },  

  'change #security': function (e) {
    e.preventDefault();
    Session.set('isServices',false);
    Session.set('isBilling',false);
    Session.set('isSecurity',true);
  }
});
