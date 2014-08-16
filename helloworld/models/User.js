define([
  'shared/models/BaseCollection',
  'shared/models/FlatModel'
], 
function (BaseCollection, FlatModel) {

  var url = '/api/v1/users';
  var User = FlatModel.extend({
    urlRoot: url
  });

  var Users = BaseCollection.extend({
    model: User,
    url: url
  });

  return {
    Model: User,
    Collection: Users
  };
});