/* jshint maxparams:8 */
/* Generated with Courage Scaffolding */
define([
  'shared/util/BaseController',
  './views/<%= viewName %>',
  './models/<%= model %>'
], function (BaseController, <%= viewName %>, <%= model %>) {
  return BaseController.extend({

    View: <%= viewName %>,

    initialize: function () {
      this.model = new <%= model %>.Model();
      this.model.fetch();
    }

  });
});
