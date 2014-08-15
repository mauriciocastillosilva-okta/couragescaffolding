/* jshint maxparams:8 */
/*<%= _.camelize(name) %>, Courage Scaffolding Generated*/
define([
  'shared/util/BaseController',
  './views/<%= _.camelize(name) %>Form',
  './models/<%= _.camelize(name) %>Model'
], function (BaseController, theForm, theModel) {
  return BaseController.extend({

    View: theForm,

    initialize: function () {
      this.model = new theModel.Model();
      this.model.fetch();
    }

  });
});
