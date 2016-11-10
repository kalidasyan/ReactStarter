var React = require('react');
var Actions = require('../actions');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onCommentChange')
  ],
  getInitialState: function() {
    return {
      image: null,
      comments: null
    }
  },
  componentWillMount: function() {
    Actions.getImage(this.props.params.id);
    Actions.getComments(this.props.params.id);
  },
  render: function() {
    return <div className="image-detail">
      {this.state.image ? this.renderContent() : null}
    </div>
  },
  renderContent: function() {
    return <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{this.state.image.title}</h4>
        </div>
        <div className="panel-body">
          {this.renderImage()}
        </div>
        <div className="panel-footer">
          <h5>{this.state.image.description}</h5>
        </div>
        {this.state.comments ? this.renderComments() : null}
      </div>
    </div>
  },
  renderImage: function() {
    if(this.state.image.animated) {
      return <video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
        <source src={this.state.image.mp4} type="video/mp4"></source>
      </video>
    } else {
      return <img src={this.state.image.link} />
    }
  },
  renderComments: function(){
    return <div>
      {this.state.comments.slice(0,10).map(function(comment){
        return <div className="list-group-item" key={comment.id}>
          <div className="comment-detail">
            {comment.author}
          </div>
          <div>
            {comment.comment}
          </div>
        </div>
      })}
    </div>
  },
  onChange: function(event, image) {
    this.setState({
      image: image
    });
  },
  onCommentChange: function(event, comments){
    this.setState({
      comments: comments
    });
  }
});
