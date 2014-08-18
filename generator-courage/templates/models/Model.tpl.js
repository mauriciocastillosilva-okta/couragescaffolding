define([
  'shared/models/BaseModel',
  'shared/models/BaseCollection'
], function (BaseModel, BaseCollection) {

  var <%= model %> = BaseModel.extend({
    url: function () {
      return '<%= api %>' + this.id;
    }
  });

  return {
    Model: <%= model %>
  };
});