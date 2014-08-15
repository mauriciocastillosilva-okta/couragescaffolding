define([
  'shared/views/forms/BaseForm'
],
function (BaseForm) {

  return BaseForm.extend({

    title: '<%= formTitle %>',
    layout: 'o-form-theme',
    read: true,
    autoSave: true,
    noCancelButton: true,

    initialize: function () {
      // Add your inputs here
    }

  });

});
