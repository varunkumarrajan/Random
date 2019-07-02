import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import CommentItem from './CommentItem';
import TextArea from '../../shared/components/calendar-modal/helper/textArea';
import {
  saveCommentDetails,
  saveLike
} from '../../database/dal/firebase/commentDal';
import './CommentItem.css';

class Comment extends Component {
  state = {
    message: '',
    errors: {},
    isFocus: false
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.message.trim()) {
      const loggedInUSer = JSON.parse(localStorage.getItem('user'));

      let feedbacktoId = '';
      if (this.props.source === 'Blog') {
        feedbacktoId = this.props.blogId;
      } else {
        feedbacktoId = this.props.teacherId;
      }
      if (loggedInUSer) {
        const commentDetails = {
          created_date: new Date(),
          comment: this.state.message,
          user_id: loggedInUSer.user.uid,
          feedback_to: feedbacktoId,
          like: 0,
          dislike: 0
        };
        saveCommentDetails({
          ...commentDetails
        }).then(
          () => {
            this.setState({ message: '' });
            toastr.success('Comment saved successfully.');
          },
          error => {
            toastr.error(error.message);
          }
        );
      }
    }
  };

  render() {
    const { commentRows, loggedInUser, isFocus, teacherId } = this.props;
    const noOfComment = commentRows.length;
    return (
      <React.Fragment>
        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 comments-section">
          <div className="text-field-section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="comment-text">Comments:</h2>
                  {loggedInUser && loggedInUser.userId !== teacherId && (
                    <div className="comment-thread-element">
                      <div className="author-thumbnail">
                        {loggedInUser && (
                          <img
                            src={loggedInUser.profileImage}
                            alt={
                              loggedInUser.firstName +
                              ' ' +
                              loggedInUser.lastName
                            }
                            title={
                              loggedInUser.firstName +
                              ' ' +
                              loggedInUser.lastName
                            }
                            className="profile-img"
                          />
                        )}
                      </div>
                      <form style={{ width: '100%' }}>
                        <div className="comments-input">

                          <TextArea
                            value={this.state.message}
                            onChangeHandle={this.handleChange}
                            name="message"
                            className="auto-input form-control"
                            errorMessage={this.state.errors.message}
                            placeholder="Add a comment"
                            rows="2"
                            style={{ margin: 'auto', width: '100%' }}
                            isFocus={isFocus}
                            ref={this.textInput}
                          />
                        </div>

                        <div className="total-comments comment-btn d-flex justify-content-between">
                          <p className="count">
                            {noOfComment > 0 && noOfComment}{' '}
                            <span className="count-text">
                              {noOfComment > 0 && 'Comments'}
                            </span>
                          </p>

                          <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={this.handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
          {noOfComment > 0 && (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <CommentItem commentDetails={commentRows} />
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
