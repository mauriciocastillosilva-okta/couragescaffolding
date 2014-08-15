define('config', ['module'], function (module) {
  return module.config();
});

require(['config', '<%= proj() %>/<%= ctor %>Controller'],
function (config, <%= ctor() %>Controller) {
  var controller = new <%= ctor() %>Controller(config);
  controller.render();
});