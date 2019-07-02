import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";

class CommentItem extends Component {
    render() {
        const { carouselRecord, linkTo } = this.props;
        return (
            <Link to={linkTo} className="link-thumb">
                <div className="img-wrapper">
                    <img src={carouselRecord.profileData.profileImage} alt="" className="img-profile"/>
                </div>
                <div className="content-section">
                    <h6 className="title divider">
                    {carouselRecord.profileData.firstName + ' ' + carouselRecord.profileData.lastName}
                    </h6>
                    <p className="content block-with-text">
                    {carouselRecord.feedback.comment}
                    </p>
                </div>
            </Link>
        )
    }
}
export default CommentItem;