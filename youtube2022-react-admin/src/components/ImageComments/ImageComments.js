import React, { useState, useRef, useContext } from "react";
import "./ImageComments.css";
import { MyContext } from "../../App";

function ImageComments() {
  const [comments, setComments] = useState([]); // An array to store comments
  const [editedCommentIndex, setEditedCommentIndex] = useState(null); // Index of the comment being edited
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menu state
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null); // Index of the comment being hovered
  const { currentImg } = useContext(MyContext); // Replace with the actual image source

  const handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const imageWidth = e.target.width;
    const imageHeight = e.target.height;

    // Calculate the position of the comment box
    const commentX = offsetX >= imageWidth / 2 ? offsetX - 220 : offsetX;
    const commentY = offsetY >= imageHeight / 2 ? offsetY - 40 : offsetY;

    const newComment = {
      x: commentX,
      y: commentY,
      text: "Click to edit", // Default text
      editing: true, // Initially in edit mode
    };

    // Update the state with the new comment
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentClick = (index) => {
    // Toggle the editing state of the clicked comment
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index].editing = !updatedComments[index].editing;
      return updatedComments;
    });
    setEditedCommentIndex(index);
  };

  const handleCommentChange = (event, index) => {
    const { value } = event.target;
    const updatedComments = [...comments];

    // Update the text of the edited comment
    updatedComments[index].text = value;

    setComments(updatedComments);
  };

  const handlePostComment = (index) => {
    // Reset the index of the comment being edited
    setComments((prevComments) =>
      prevComments.map((comment, i) => ({
        ...comment,
        editing: i === index ? false : comment.editing, // Only update the edited comment's editing state
      }))
    );

    // Update the comment with author and time
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      const editedComment = updatedComments[index];
      editedComment.author = "Author"; // Replace 'Author' with the actual author's name
      editedComment.time = new Date().toLocaleTimeString(); // Add the current time

      return updatedComments;
    });
    setEditedCommentIndex(null);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      // Prevent line break in the input field
      event.preventDefault();

      // Post the comment when Enter key is pressed
      handlePostComment(index);
    }
  };

  const handleDeleteComment = (index) => {
    // Delete the comment at the specified index
    setComments((prevComments) => prevComments.filter((_, i) => i !== index));
  };

  const handleCopyLink = (index) => {
    // You can implement the logic to copy the comment link here.
    // For simplicity, I'll demonstrate copying the comment's index.
    const commentLink = `${window.location.href}#comment-${index + 1}`;
    navigator.clipboard.writeText(commentLink);
    alert(`Comment link copied: ${commentLink}`);
  };

  const toggleDropdown = (index) => {
    // Toggle the dropdown menu for the comment at the specified index
    setComments((prevComments) =>
      prevComments.map((comment, i) => ({
        ...comment,
        isDropdownOpen: i === index ? !comment.isDropdownOpen : false,
      }))
    );
  };

  const handleCommentMouseEnter = (index) => {
    setHoveredCommentIndex(index);
  };

  // Handler for moving mouse away from a comment
  const handleCommentMouseLeave = () => {
    setHoveredCommentIndex(null);
  };

  return (
    <div className="image-comments-container">
      <div className="image-container">
        <img src={currentImg} alt="Your Image" onClick={handleImageClick} />
        {comments.map((comment, index) => (
          <div
            key={index}
            className="comment-popup"
            style={{ left: comment.x, top: comment.y }}
          >
            {comment.editing ? (
              <>
                <input
                  type="text"
                  placeholder={comment.text}
                  onChange={(event) => handleCommentChange(event, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                />
                <button
                  onClick={() => handlePostComment(index)}
                  className="comment-popup-button"
                >
                  Post
                </button>
              </>
            ) : (
              <>
                <span
                  className="comment-index"
                  onMouseEnter={() => handleCommentMouseEnter(index)}
                  onMouseLeave={handleCommentMouseLeave}
                >
                  {index + 1}
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar to display comments */}
      <div className="comment-sidebar">
        <h3>Comments</h3>
        <hr />
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="comment-dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => toggleDropdown(index)}
                >
                  <span className="dots">&#8230;</span>
                </button>
                {comment.isDropdownOpen && (
                  <div className="dropdown-content">
                    <button
                      onClick={() => handleCommentClick(index)}
                      className="comment-popup-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(index)}
                      className="comment-popup-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCopyLink(index)}
                      className="comment-popup-button"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
              <span className="comment-index">{index + 1}</span>

              <div className="comment-content">
                <strong>{comment.author}:</strong>
                <br />
                {comment.time}
              </div>
              <div className="comment-text">{comment.text}</div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
      {hoveredCommentIndex !== null && (
        <div className="comment-details-popup">
          <div className="comment-content">
            <strong>{comments[hoveredCommentIndex].author}:</strong>
            <br />
            {comments[hoveredCommentIndex].time}
          </div>
          <div className="comment-text">
            {comments[hoveredCommentIndex].text}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageComments;
