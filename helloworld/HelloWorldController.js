// helloworld/HelloWorldController.js

define([
   'shared/util/BaseController',
   './views/HelloWorld',
   './models/User'
],
function (BaseController, HelloWorld, User) {

  return BaseController.extend({

    View: HelloWorld,

    initialize: function () {
      this.model = new User.Model({id: 'me'});
      this.model.fetch();
    }
  });
 
});