import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";

class ProfileItem extends Component {
    render() {
        const { carouselRecord, linkTo } = this.props;
        return (
            <Link
                className="link-thumb"
                style={{ padding: "0px" }}
                to={linkTo? linkTo : '#'}
                title={carouselRecord.name}
                >
                <div className="img-wrapper" style={{
                    backgroundImage:
                        'url(' + '../../../Assets/hdpi/placeholder.png ' + ')',
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                    }}>
                    <img src={carouselRecord.profileImage} alt="profile" className="img-profile" />
                </div>
                <div className="content-section">
                    <h6 className="title">
                        {carouselRecord.firstName + ' ' + carouselRecord.lastName}
                    </h6>
                    <p className="content">
                        <strong>Subject:</strong> {carouselRecord.subject}
                    </p>
                    <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={carouselRecord.rating}
                        emptyStarColor={'gray'}
                    />
                </div>
            </Link>
        )
    }
}
export default ProfileItem;