/* jshint maxparams:8 */
/*<%= _.camelize(name) %>, Courage Scaffolding Generated*/
define([
  'shared/util/BaseController',
  './views/<%=_.camelize(name)%>Form',
  './models/<%=_.camelize(name)%>Model'
], function (BaseController, <%=_.camelize(name)%>Form, <%=_.camelize(name)%>Model) {
  return BaseController.extend({

    View: <%=_.camelize(name)%>Form,

    initialize: function () {
      this.model = new <%=_.camelize(name)%>Model.Model();
      this.model.fetch();
    }

  });
});
