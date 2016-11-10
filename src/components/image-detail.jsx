var React = require('react');
var Actions = require('../actions');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      image: null
    }
  },
  componentWillMount: function() {
    Actions.getImage(this.props.params.id);
  },
  render: function() {
    return <div>
      {this.renderImage()}
    </div>
  },
  renderImage: function() {
    console.log(this.state.image);
    if(this.state.image) {
      return this.state.image.id + '-' + this.state.image.title;
    } else {
      return null;
    }
  },
  onChange: function(event, image) {
    this.setState({
      image: image
    });
  }
});
