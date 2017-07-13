import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: {}
    }
    this._addComment = this._addComment.bind(this)
    this._renderComment = this._renderComment.bind(this)
  }

  _addComment = (commentData) => {
    var timeStamp = (new Date()).getTime()
    this.state.comments['comment-id'+timeStamp] = commentData
    this.setState({comments:this.state.comments})
  }

  _renderComment (key) {
    return (
      <li key={key}>
        <NewComment key={key} index={key} details={this.state.comments[key]} />
      </li>
    )
  }

  render() {
    return (
      <div>
        <ol>
          {Object
              .keys(this.state.comments)
              .map(this._renderComment)}
        </ol>
        <AddCommentForm addComment={this._addComment} />
        <pre> {JSON.stringify(this.state, null, 2) }  </pre>
      </div>
    )
  }
}

class AddCommentForm extends Component {
  constructor (props) {
    super(props)
    this._processComment = this._processComment.bind(this)
  }

  _processComment (event) {
    // 1. prevents the form noraml submission behaviour
    event.preventDefault()
    // 2. Get the data from form
    let commentData = {
      commentName: this.refs.name.value,
      commentBody: this.refs.desc.value
    }
    // 3. Pass the form data back to app
    this.props.addComment(commentData) // name of method should be similar to propName
    // 4. Reset the form data
    this.refs.commentForm.reset()
  }
  render () {
    return (
      <div>
        <h4> Add Comment </h4>
        <form ref='commentForm' onSubmit={this._processComment}>
          <input type='text' ref='name' placeholder='your name' required /> <br/> <br/>
          <textarea ref='desc' placeholder='Add your comment' />  &nbsp; &nbsp;
          <button id='Submit'> Add Comment </button>
        </form>
      </div>
    )
  }
}

class NewComment extends Component {

  constructor(props) {
    super(props)
  //  console.log('props = ', props.detail)
  }
  render () {
    return(
      <p>Name - {this.props.details.commentName} <br/>
        Message - {this.props.details.commentBody}
      </p>
    )
  }
}
export default App;
