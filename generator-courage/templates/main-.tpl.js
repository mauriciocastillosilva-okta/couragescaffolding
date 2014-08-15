define('config', ['module'], function (module) {
  return module.config();
});

require(['config', '[PROJECT]/Controller'],
function (config, theController) {
  var controller = new theController(config);
  controller.render();
});