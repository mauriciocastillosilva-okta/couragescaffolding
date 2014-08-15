define([
  'shared/views/forms/BaseForm'
],
function (BaseForm) {

  return BaseForm.extend({

    title: '<%= formTitle %>',
    layout: 'o-form-theme',
    read: true,
    autoSave: true,

    initialize: function () {
      // Add your inputs here
    }

  });

});
