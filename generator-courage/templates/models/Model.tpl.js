define([
  'shared/models/BaseModel'
],
function (BaseModel) {

  return {
    Model: BaseModel.extend({

      defaults: {
      	// Add your variables here
      },

      url: '<%= api %>'

    })
  };

});