define([
  'shared/views/forms/BaseForm'
],
function (BaseForm) {

  return BaseForm.extend({

    title: 'FORM_TITLE',
    layout: 'o-form-theme',
    read: true,
    autoSave: true,

    initialize: function () {
      // Add your inputs here
    }

  });

});
