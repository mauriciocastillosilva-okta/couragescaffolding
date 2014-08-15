/* jshint maxparams:8 */
/*<%= _.camelize(name) %>, Courage Scaffolding Generated*/
define([
  'shared/util/BaseController',
  './views/<%= ctor() %>Form',
  './models/<%= ctor() %>'
], function (BaseController, <%= ctor() %>Form, <%= ctor() %>) {
  return BaseController.extend({

    View: <%= ctor() %>Form,

    initialize: function () {
      this.model = new <%= ctor() %>.Model();
      this.model.fetch();
    }

  });
});
