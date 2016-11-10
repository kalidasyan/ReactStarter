var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImages: function(topicId){
    Api.get('topics/' + topicId)
      .then(function(json){

        this.images = _.reject(json.data, function(image){
          return image.is_album
        });
        this.triggerChange();
      }.bind(this));
  },
  getImage: function(imageId){
    Api.get('image/' + imageId)
      .then(function(json) {
        this.image = json.data;
        this.triggerImageChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.images);
  },
  triggerImageChange: function(){
    this.trigger('change', this.image);
  }
});
