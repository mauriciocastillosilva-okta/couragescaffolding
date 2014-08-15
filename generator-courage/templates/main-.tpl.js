define('config', ['module'], function (module) {
  return module.config();
});

require(['config', '<%=_.camelize(name)%>/<%=_.camelize(name)%>Controller'],
function (config, <%=_.camelize(name)%>Controller) {
  var controller = new <%=_.camelize(name)%>Controller(config);
  controller.render();
});