/* jshint maxparams:8 */
define([
  'shared/util/BaseController',
  './views/PROJECTForm',
  './models/PROJECTModel'
], function (BaseController, theForm, theModel) {
  return BaseController.extend({

    View: theForm,

    initialize: function () {
      this.model = new theModel.Model();
      this.model.fetch();
    }

  });
});