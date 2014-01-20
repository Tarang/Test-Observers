test = new Meteor.Collection("test");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to testobserver.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Meteor.subscribe("testing");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("testing", function() {
    console.log("New connection", this.connection.id);
    var self = this;

    var handle = test.find().observe({
      added: function (document) {
        console.log(new Date(), self.connection.id);
      }
    });

    self.onStop(function () {
      handle.stop();
      console.log("Observer for ", self.connection.id, "stopped");
    });

    self.ready();
  });

}