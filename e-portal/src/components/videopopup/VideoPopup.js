import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-responsive-modal';
import './VideoPopup.css';
import { updateRatingOnCurriculumFromDB } from './../../database/dal/firebase/curriculumDal'
class VideoPopup extends Component {

  state = {
    open: true
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
    this.props.onVideoClose(this.state.open)
  }

  checkUserRatingExist = (videoMetadata, userId) => {
    let k =0;
    let len = videoMetadata.length;
    while(k<len){
      if(videoMetadata[k].userId === userId){
        return {isExist: true,ind: k};        
      }
      k++;
    }
    return {isExist: false,ind: 0};
  }

  onStarClick = (e, videoDetails) => {
    const {userDetails: {userId}} = this.props;
    let userCount = 0, sumOfRating = 0;
    let checkUserRatingExist = this.checkUserRatingExist(videoDetails.videoMetadata, userId);
    if(checkUserRatingExist.isExist){
      videoDetails.videoMetadata[checkUserRatingExist.ind].rating = e;
      let len = videoDetails.videoMetadata.length, k = 0;
      while(k<len){
        userCount++;
        sumOfRating = sumOfRating + videoDetails.videoMetadata[k].rating;
        k++;
      }            
    }else{
      videoDetails.videoMetadata.push({userId,rating: e});
      sumOfRating = sumOfRating + e;
      userCount++;
    }
    videoDetails.rating = Math.round(sumOfRating/userCount);
    updateRatingOnCurriculumFromDB(videoDetails.id,videoDetails.videoMetadata, videoDetails.rating);
  }

  getRating = (videoMetadata) => {
    const {userDetails: {userId}} = this.props;
    let rating = 0;
    videoMetadata.forEach((metaData)=>{
      if(metaData.hasOwnProperty('userId') && metaData.userId === userId){
        rating = metaData.rating;
      }
    })
    return rating;    
  }

  render() {
    const { videoDetails, userDetails } = this.props;  
    const modal = {
      closeIcon:{
        top: '0px!important',
        right: '0px!important'
      } 
    } 

    return (
      <>
      {videoDetails && (
          <Modal styles={modal} open={this.state.open} onClose={this.handleClick} center 
          closeOnEsc={false} 
          closeOnOverlayClick={false}>
          <div className="row">
            <div className="col-12">
                <video width="100%" controls 
                poster={videoDetails.thumb}
                preload="auto" autoPlay={true} className="video-margin">
                  <source src={videoDetails.src ? videoDetails.src : videoDetails.sVideo} type="video/mp4" />
                </video>            
                <h6 className="video-title">{videoDetails.title ? videoDetails.title : videoDetails.notificationDesc}</h6>
                <div className="video-meta-data">
                      {(userDetails && !videoDetails.sVideo) && (
                      <span>
                      <small>Your Rating</small>
                        <StarRatingComponent                
                          name="rate1"
                          starCount={5}
                          value={this.getRating(videoDetails.videoMetadata)}
                          onStarClick={(event) => this.onStarClick(event, videoDetails)}
                        />
                      </span>
                    )}
                    {!videoDetails.sVideo && (
                      <>
                      <span>
                        <small>Overall Rating</small>
                        <StarRatingComponent
                          name="rate2"
                          starCount={5}
                          value={videoDetails.rating}
                          editing={true}
                        />
                      </span>
                      {/* <span>
                      <small>Views</small>
                        <div>{videoDetails.views}</div>
                      </span> */}
                      </>
                    )}
                </div>
              </div>
            </div>
          </Modal>
      )}
      </>
    );
  }
}

export default VideoPopup;
