import React, { Component } from 'react';
import './TeacherItem.scss';
import StarRatingComponent from 'react-star-rating-component';

class TeacherItem extends Component {
  setColClass = () => {};
  render() {
    const { userProfile, isTrayItem } = this.props;

    return (
      <div>
        <div className={isTrayItem ? 'card' : 'card'}>
          <div
            className="card-body vd-wrapper col-xs-12"
            style={{ padding: '0px' }}
          >
            <div
              className={
                isTrayItem
                  ? 'row row-without--margin tray-item--height'
                  : 'row row-without--margin'
              }
            >
              <div
                className={
                  isTrayItem
                    ? 'thumb-wrapper col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 profile-pic--align'
                    : 'thumb-wrapper col-12 col-without--padding profile-pic--align'
                }
              >
                <div
                  className={
                    isTrayItem ? 'profile-pic-list' : 'profile-pic-block'
                  }
                  style={{
                    backgroundImage:
                      'url(' + '../../../Assets/hdpi/placeholder.png ' + ')',
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <img src={userProfile.profileImage} alt="profile" />
                </div>
              </div>
              <div
                className={
                  isTrayItem
                    ? 'col-9 col-sm-9 col-md-7 col-lg-7 col-xl-7 col-without--padding '
                    : 'col-12 col-without--padding  '
                }
              >
                <div
                  className={
                    isTrayItem
                      ? 'vd-content user-details-tray--style user-detail--align'
                      : 'vd-content user-details-tray--style'
                  }
                  style={{ border: 'none' }}
                >
                  <h6
                    className={isTrayItem ? 'user-list--title' : 'user-title'}
                  >
                    {userProfile.firstName + ' ' + userProfile.lastName}
                  </h6>
                  <p>
                    <strong>Subject:</strong> {userProfile.subject}
                  </p>

                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={userProfile.rating}
                    emptyStarColor={'gray'}
                  />
                  {/* <span className="rating-position">
                    ({userProfile.noOfRatings})
                  </span> */}
                </div>
              </div>
              {isTrayItem && userProfile.currency && (
                <div className="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                  <div className="charge-container">
                    <div>
                      <i
                        className={
                          userProfile.currency.toLowerCase() !== 'pound'
                            ? `fa fa-${userProfile.currency.toLowerCase()}`
                            : 'fa fa-gbp'
                        }
                      />
                      {userProfile.charge}
                    </div>
                    <div className="per-hour-title">PER HOUR</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherItem;
