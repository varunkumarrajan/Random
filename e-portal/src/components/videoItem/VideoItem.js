import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import VideoPopup from '../videopopup/VideoPopup';
import './VideoItem.css';

class VideoItem extends Component {
  state = {
    modalOpen: false,
    userDetails: ''
  };

  handleClick = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userProfile'))
    });
  };

  render() {
    const { isNotVisibleVideoMeta, videoDetails } = this.props;
    const { modalOpen, userDetails } = this.state;
    return (
      <>
        {videoDetails && (
          <div className="card">
            <div className="">
              <div className="vd-wrapper col-xs-12">
                <div onClick={this.handleClick} className="thumb-wrapper">
                  {videoDetails.thumb ? (
                    <React.Fragment>
                      <img src={videoDetails.thumb} alt={videoDetails.title} />
                      <i className="fa fa-play-circle" />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <video
                        controls
                        src={videoDetails.src}
                        alt={videoDetails.title}
                      />
                      <i className="fa fa-play-circle" />
                    </React.Fragment>
                  )}
                </div>
                <div className="vd-content user-details--height detail--text">
                  <h6 className="video-title">
                    {videoDetails.title
                      ? videoDetails.title
                      : videoDetails.notificationDesc}
                  </h6>
                  <p>{videoDetails.createdDate}</p>
                  {!isNotVisibleVideoMeta && (
                    <>
                      <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={videoDetails.rating}
                        editing={false}
                        emptyStarColor={'gray'}
                      />
                      <span className="rating-position">
                        ({videoDetails.views})
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {modalOpen && (
              <VideoPopup
                userDetails={userDetails}
                videoDetails={videoDetails}
                onVideoClose={this.handleClick}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

export default VideoItem;
