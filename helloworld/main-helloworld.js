// main-helloworld.js

define('config', ['module'], function (module) {
  return module.config();
});

require(['config', 'helloworld/HelloWorldController'], function (config, HelloWorldController) {
  var controller = new HelloWorldController(config);
  controller.render();
});
