import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchPost, deletePost} from './../actions';

class PostsShow extends Component {
  componentDidMount() {
    const id = this.props.match.params.id; //match.params.id is from react-router-dom
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {post} = this.props;

    if (!post) {
      return <div>Loading...</div>
    } 

    return(
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// mapStateToProps takes two arguments (state, ownProps)
// ownProps is an object containing this props of the component above (i.e., this.props)
const mapStateToProps = ({posts}, ownProps) => {
  return {post: posts[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);