import React, { Component } from 'react';
import './CommentItem.css';

class CommentItem extends Component {
  render() {
    const { commentDetails } = this.props;
    const name = commentDetails.profileData.firstName + ' ' + commentDetails.profileData.lastName;
    
    return (
      <div className="card">
        <div className="">
          <div className="vd-wrapper col-xs-12">
            <div className="thumb-wrapper">
              <div className="profile-pic-block">
                <img src={commentDetails.profileData.profileImage} alt=""/>
              </div>
            </div>

            <div className="vd-content comment-box--style">
              <h6 className="student-title--align">
                {name.trim()}
              </h6>

              <p
                className="block-with-text"
                title={commentDetails.feedback.comment}
              >
                {commentDetails.feedback.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
