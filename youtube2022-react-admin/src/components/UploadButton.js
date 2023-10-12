import React, { Component } from 'react'
import './ShareButton.css'

class UploadButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false, // Initially, the popup is hidden
    }
  }

  togglePopup = () => {
    // Toggle the visibility of the popup
    this.setState((prevState) => ({ isVisible: !prevState.isVisible }))
  }

  closePopup = () => {
    // Close the popup
    this.setState({ isVisible: false })
  }

  render() {
    const { isVisible } = this.state

    return (
      <div>
        <button className="share-popup-send-button" onClick={this.togglePopup}>
          Upload
        </button>

        {isVisible && (
          <div className="share-popup-container">
            <div className="share-popup-content">
              <button
                className="share-popup-close-button"
                onClick={this.closePopup}
              >
                &times; {/* The 'x' character for close */}
              </button>
              <h2>Drag and drop Images,<br/>Videos,PDFs and more</h2>
                <img src="images/Upload.png" alt="upload" style={{width:'35vw'}}/>
                <button className="share-popup-send-button" style={{marginBottom:'20px'}}>Browse</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default UploadButton