import React, { Component } from 'react';
import './blogItem.css';


class BlogItem extends Component {
  render() {
    const { blogDetails } = this.props;
    const name = blogDetails.profileData.firstName + ' ' + blogDetails.profileData.lastName;

    return (
      <div className="card">
        <div className="">
          <div className="vd-wrapper col-xs-12">
            <div className="thumb-wrapper">
              <div className="profile-pic-block">
                <img src={blogDetails.profileData.profileImage} alt={name.trim()}
                title={name.trim()}/>
              </div>
            </div>

            <div className="vd-content comment-box--style">
              <h6 className="student-title--align">
              {/* {name.trim()} */}
              {blogDetails.feedback.blogTitle}
              </h6>

              <p
                className="block-with-text"
                title={blogDetails.feedback.blogDescription}
              >
                {blogDetails.feedback.blogDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogItem;
