import React, { Component } from 'react'
import './ImageComments.css'

class ImageComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // An array to store comments
      editedCommentIndex: null, // Index of the comment being edited
    }
  }

  handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    const newComment = {
      x: offsetX,
      y: offsetY,
      text: 'Click to edit', // Default text
      editing: true, // Initially in edit mode
    }

    // Update the state with the new comment
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }))
  }

  handleCommentClick = (index) => {
    // Set the index of the comment being edited
    this.setState({ editedCommentIndex: index })
  }

  handleCommentChange = (event, index) => {
    const { value } = event.target
    const { comments } = this.state

    // Update the text of the edited comment
    const updatedComments = [...comments]
    updatedComments[index].text = value

    this.setState({
      comments: updatedComments,
    })
  }

  handlePostComment = (index) => {
    // Reset the index of the comment being edited
    this.setState((prevState) => ({
      comments: prevState.comments.map((comment, i) => ({
        ...comment,
        editing: i === index ? false : comment.editing, // Only update the edited comment's editing state
      })),
      editedCommentIndex: null,
    }))

    // Update the comment with author and time
    this.setState((prevState) => {
      const updatedComments = [...prevState.comments]
      const editedComment = updatedComments[index]
      editedComment.author = 'Author' // Replace 'Author' with the actual author's name
      editedComment.time = new Date().toLocaleTimeString() // Add the current time

      return { comments: updatedComments }
    })
  }

  handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      // Prevent line break in the input field
      event.preventDefault()

      // Post the comment when Enter key is pressed
      this.handlePostComment(index)
    }
  }

  handleDeleteComment = (index) => {
    // Delete the comment at the specified index
    this.setState((prevState) => ({
      comments: prevState.comments.filter((_, i) => i !== index),
    }))
  }

  render() {
    const { comments, editedCommentIndex } = this.state

    return (
      <div className="image-comments-container">
        <div className="image-container">
          <img
            src="images/phototo.webp"
            alt="Your Image"
            onClick={this.handleImageClick}
          />
          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment-popup"
              style={{ left: comment.x, top: comment.y }}
              onClick={() => this.handleCommentClick(index)}
            >
              {comment.editing ? (
                <>
                  <input
                    type="text"
                    value={comment.text}
                    onChange={(event) => this.handleCommentChange(event, index)}
                    onKeyPress={(event) => this.handleKeyPress(event, index)}
                  />
                  <button onClick={() => this.handlePostComment(index)}>
                    Post
                  </button>
                </>
              ) : (
                <>
                  {comment.text}
                  <button onClick={() => this.handleCommentClick(index)}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDeleteComment(index)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar to display comments */}
        <div className="comment-sidebar">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.author}:</strong> {comment.text} (
                {comment.time})
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ImageComments
