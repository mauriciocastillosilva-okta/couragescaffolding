// helloworld/views/HelloWorld.js

define([
  'shared/views/forms/BaseForm'
],
function (BaseForm) {
  return BaseForm.extend({

    title: 'Edit User',
    subtitle: 'Edit the current user',
    autoSave: true,
    read: true, //sets the display mode - allows view and edit
    layout: 'o-form-theme',
    inputs: [
      {
        type: 'text',
        name: 'profile.firstName',
        label: 'First Name'
      },
      {
        type: 'text',
        name: 'profile.lastName',
        label: 'Last Name'
      },
      {
        type: 'text',
        name: 'profile.email',
        label: 'Email'
      }
    ]
  });
});