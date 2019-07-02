import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";
import VideoPopup from '../../../components/videopopup/VideoPopup';



class VideoItem extends Component {
    state = {
        modalOpen: false,
        userDetails: ''
    };
    componentWillMount = () => {
        this.setState({
            userDetails: JSON.parse(localStorage.getItem('userProfile'))
        });
    };
    handleClick(e) {
        if (typeof e === 'object') {
            e.preventDefault();
            e.stopPropagation();
        }
        
        this.setState({
            modalOpen: !this.state.modalOpen
        });
        return false;
    };
    render() {
        const { carouselRecord, linkTo } = this.props;
        const { modalOpen, userDetails } = this.state;
        return (
        <React.Fragment>
            <Link
                className="link-thumb"
                style={{ padding: "0px" }}
                to={linkTo}
                title={carouselRecord.name}
                onClick={(event)=> this.handleClick(event)}
                >
                <div className="video-wrapper">
                {carouselRecord.thumb ? (
                    <React.Fragment>
                    <img src={carouselRecord.thumb} alt={carouselRecord.title} className="img-profile"/>
                    <i className="fa fa-play-circle" />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <video
                        controls
                        src={carouselRecord.src}
                        alt={carouselRecord.title}
                    />
                    <i className="fa fa-play-circle" />
                    </React.Fragment>
                )}
                </div>
                <div className="content-section">
                    <h6 className="title">
                    {carouselRecord.title
                        ? carouselRecord.title
                        : carouselRecord.notificationDesc}
                    </h6>
                    {carouselRecord.createdDate && (
                        <p>{carouselRecord.createdDate}</p>
                    )}
                    
                    <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={carouselRecord.rating}
                        editing={false}
                        emptyStarColor={'gray'}
                    />
                </div>
            </Link>
            {modalOpen && (
              <VideoPopup
                userDetails={userDetails}
                videoDetails={carouselRecord}
                onVideoClose={()=> this.handleClick()}
              />
            )}
        </React.Fragment>
        )
    }
}
export default VideoItem;