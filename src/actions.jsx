var Reflux = require('reflux');

//This is a proxy class which calls the methods
module.exports = Reflux.createActions([
  'getTopics',
  'getImages',
  'getImage',
  'getComments'
]);
