import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';

import RatingComponent from 'react-star-rating-component';
import classnames from 'classnames';
import * as actionTypes from '../../../spinnerStore/actions';
import ModalPopUp from '../../../shared/components/modalpopup/modalpopup';
import HeaderHome from '../../../components/layout/header/HeaderHome';
// import profileImgs from '../../../images/profile-imgs.png';
import CalendarModal from '../../../shared/components/calendar-modal/calendarmodal';
import { openModalForRequest } from './teacher-details.action';
import {
  getTeacherDetailFromDB,
  getTeacherRating,
  saveTeacherRating,
  saveTeacherRatingOnProfile,
  saveLike
} from '../../../database/dal/firebase/teacherDetailDal';
import {
  getFeedbackFromDB,
  getUserProfileFromDB
} from '../../../database/dal/firebase/homeDal';

import { getCurriculumFromDB } from '../../../database/dal/firebase/curriculumDal';
// import GLOBAL_VARIABLES from '../../../config/config';
import RecentVideo from '../../../components/recentVideo/RecentVideo';

import Comment from '../../../components/comment/Comment';
import { toastr } from 'react-redux-toastr';
import Like from '../../../shared/components/like/Like';
import Dislike from '../../../shared/components/dislike/Dislike';

class TeacherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailModel: {
        teacherId: '',
        title: 'title',
        description: 'this is demo',
        rating: 7,
        gender: '',
        subject: '',
        imgPath: ''
      },
      teacherDetails: {},
      userRating: {},
      calendarModal: false,
      teacherData: {},
      starRating: 0,
      totalUser: 0,
      like: 0,
      dislike: 0,
      userLike: 0,
      userDislike: 0,
      carousellistNewlyItems: [],
      loggedInUser: {},
      studentsReview: [],
      isFocus: false
    };
    this.openModalForRequest = this.openModalForRequest.bind(this);
  }

  componentDidMount() {
    this.props.setSpinnerStatus(true);
    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    this.user = user;
    getTeacherDetailFromDB(teacherId).then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        // this.setState({ spinner: false });
        // Create model
        this.props.setSpinnerStatus(false);
        this.setState({ teacherDetails: data });
        this.getDetails(data);
      });
      this.handleRating(teacherId, user, 0, 'loadComponent');
    });

    /* Get curriculum videos */
    const userId = user ? user.user.uid : '';
    getCurriculumFromDB(userId).onSnapshot(querySnapshot => {
      let currData = [];
      querySnapshot.forEach(doc => {
        currData.push(doc.data());
      });
      if (currData.length > 0) {
        this.setState({
          carousellistNewlyItems: currData
        });
      }
      currData = [];
    });

    // For Comment Section
    getFeedbackFromDB(teacherId).onSnapshot(querySnapshot => {
      let tempArr = {};
      let feedbackData = [];

      querySnapshot.forEach(doc => {
        getUserProfileFromDB(doc.data().user_id).onSnapshot(
          querySnapshot => {
            querySnapshot.forEach(profileData => {
              tempArr['feedbackId'] = doc.id;
              tempArr['profileData'] = profileData.data();
              tempArr['feedback'] = doc.data();

              feedbackData.push(tempArr);
              this.setState({
                studentsReview: feedbackData
              });
              tempArr = {};
            });

            this.props.setSpinnerStatus(false);
          },
          error => {
            this.props.setSpinnerStatus(false);

            toastr.error(error.message);
          }
        );
      });
    });
    // console.log("this.state.studentsReview", this.state.studentsReview);
  }
  setTeacherData = data => {
    this.setState({ teacherData: data });
  };
  openCalendarModal = () => {
    this.setState({ calendarModal: true });
  };
  closeCalendarModal = () => {
    this.setState({ calendarModal: false });
  };
  wrapperFunction = data => {
    this.openCalendarModal();
    this.setTeacherData(data);
  };

  getTotalRating(ratings, nOfUser) {
    let rating = 0;
    let totalRating = 0;

    ratings.forEach(user => {
      rating = rating + user.rating;
    });

    if (!rating / nOfUser) {
      totalRating = 0;
    } else {
      totalRating = rating / nOfUser;
    }
    return Math.round(totalRating);
  }

  handleNofUserRated(ratings) {
    let totalRatedUser = 0;
    ratings.forEach(user => {
      if (user.rating > 0) {
        totalRatedUser++;
      }
    });
    return totalRatedUser;
  }

  getDetails(data) {
    if (data) {
      const detailModel = { ...this.state.detailModel };
      detailModel.teacherId = data.userId;
      detailModel.title = data.firstName + ' ' + data.lastName;
      detailModel.description = data.summary;
      detailModel.rating = data.rating;
      detailModel.gender = data.gender;
      detailModel.subject = data.subject;
      detailModel.imgPath = data.profileImage;
      this.setState({ detailModel });
    }
  }

  navigateToLogin() {
    const currentId = this.props.match.params.id;
    localStorage.setItem('teacherDetailId', currentId);
    this.props.history.push('/login');
  }

  onStarClick(nextValue, prevValue, name) {
    // console.log('prevValue', prevValue)
    // console.log('nextValue', nextValue)

    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    this.handleRating(teacherId, user, nextValue, null);
  }
  handleRating(teacherId, user, nextValue, onComponentLoad) {
    getTeacherRating(teacherId).then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const ratings = data.ratings;
        const nOfUser = ratings.length;
        this.setState({ userRating: data });
        const nOfUserRated = _.filter(ratings, user => user.rating > 0).length;

        if (nOfUser > 0) {
          let totalRating = this.getTotalRating(ratings, nOfUserRated);
          if (user) {
            const userId = user.user.uid;
            let currentUser = _.filter(
              ratings,
              user => user.userId === userId
            )[0];

            if (onComponentLoad) {
              if (!currentUser) {
                currentUser = {
                  userId: userId,
                  like: 0,
                  dislike: 0,
                  rating: 0
                };
                ratings.push(currentUser);
              }
              data.rating = totalRating;

              if (this.state.teacherDetails.hasOwnProperty('rating')) {
                this.state.teacherDetails.rating = totalRating;
              }
              if (this.state.teacherDetails.hasOwnProperty('noOfRatings')) {
                this.state.teacherDetails.noOfRatings = this.handleNofUserRated(
                  ratings
                );
              }
              saveTeacherRating(teacherId, data);
              saveTeacherRatingOnProfile(teacherId, this.state.teacherDetails);

              this.setState({
                starRating: Math.round(currentUser.rating),
                like: this.getTotalLike(this.state.userRating.ratings),
                dislike: this.getTotalDislike(this.state.userRating.ratings),
                userLike: currentUser.like,
                userDislike: currentUser.dislike
              });
            } else {
              let newUser = { userId: '0', like: 0, dislike: 0, rating: 0 };
              if (currentUser) {
                currentUser.rating = nextValue;
              } else {
                newUser.userId = userId;
                currentUser = newUser;
                ratings.push(currentUser);
              }
              data.rating = totalRating;
              if (this.state.teacherDetails.hasOwnProperty('rating')) {
                this.state.teacherDetails.rating = totalRating;
              }
              if (this.state.teacherDetails.hasOwnProperty('noOfRatings')) {
                this.state.teacherDetails.noOfRatings = this.handleNofUserRated(
                  ratings
                );
              }

              saveTeacherRating(teacherId, data);
              // console.log("---------------", this.state.teacherDetails);
              saveTeacherRatingOnProfile(teacherId, this.state.teacherDetails);

              this.setState({ starRating: nextValue });
            }
          }
        } else {
          if (user) {
            const userId = user.user.uid;
            let currentUser = _.filter(
              ratings,
              user => user.userId === userId
            )[0];
            let newUser = {
              userId: userId,
              like: 0,
              dislike: 0,
              rating: nextValue
            };

            if (currentUser) {
              currentUser.rating = nextValue;
            } else {
              currentUser = newUser;
              ratings.push(currentUser);
            }
            let totalRating = this.getTotalRating(ratings, nOfUserRated);
            data.rating = totalRating;

            saveTeacherRating(teacherId, data);
            this.setState({ starRating: nextValue });
          }
        }
      }
    });
  }

  openModalForRequest = () => {
    this.props.openModalPopUp();
  };

  /* Like Dislike */
  handleLikeDislike(currentButton) {
    if (this.user) {
      const userId = this.user.user.uid;
      const teacherId = this.props.match.params.id;
      const { userRating } = this.state;
      let currentUser = _.filter(
        userRating.ratings,
        user => user.userId === userId
      )[0];
      if (currentButton === 'like') {
        // toggle like
        currentUser.like = currentUser.like ? 0 : 1;
        if (currentUser.dislike > 0) {
          currentUser.dislike = currentUser.dislike - 1;
        }

        saveLike(teacherId, userRating).then(success => {
          this.setState({
            like: this.getTotalLike(userRating.ratings),
            dislike: this.getTotalDislike(userRating.ratings),
            userLike: currentUser.like,
            userDislike: currentUser.dislike
          });
        });
      } else if (currentButton === 'dislike') {
        currentUser.dislike = currentUser.dislike ? 0 : 1;
        // currentUser.like = currentUser.like ? 0 : 1;
        if (currentUser.like > 0) {
          currentUser.like = currentUser.like - 1;
        }

        // console.log('dislike', currentUser);
        saveLike(teacherId, userRating).then(success => {
          this.setState({
            like: this.getTotalLike(userRating.ratings),
            dislike: this.getTotalDislike(userRating.ratings),
            userLike: currentUser.like,
            userDislike: currentUser.dislike
          });
        });
      }
    }
  }

  getTotalLike(ratings) {
    // console.log('userRating', ratings);
    const totalLikedObj = _.filter(ratings, user => user.like === 1);
    return totalLikedObj.length;
  }
  getTotalDislike(ratings) {
    const totalDislikeObj = _.filter(ratings, user => user.dislike === 1);
    return totalDislikeObj.length;
  }

  setFocusOnArea() {
    this.setState({ isFocus: true });
  }
  updateTotalComments(noOfComment) {
    // console.log("noOfComment", noOfComment);
    // this.setState({noOfComment: noOfComment});
  }

  render() {
    const {
      title,
      description,
      /* rating, */
      subject,
      imgPath
    } = this.state.detailModel;
    const {
      carousellistNewlyItems,
      like,
      userLike,
      userDislike,
      dislike,
      isFocus,
      noOfComment
    } = this.state;
    const isLogedIn = localStorage.getItem('user');
    const loggedInUser = JSON.parse(localStorage.getItem('userProfile'));

    return (
      <React.Fragment>
        <div className="details-wrapper">
          {isLogedIn && <ModalPopUp teacherDeatils={this.state.detailModel} />}

          <HeaderHome />
          <div className="bnr-section">
            {/* <img src={profileImgs} className="bnr-img1"/> */}
            <img
              alt=""
              src="../../../../Assets/hdpi/detail-banner.jpg"
              className="bnr-img"
            />
          </div>
          <div className="profile-section">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-3">
                  <div
                    className="profile-img-section"
                    style={{
                      backgroundImage:
                        'url(' +
                        '../../../../Assets/hdpi/placeholder.png ' +
                        ')',
                      backgroundPosition: 'top center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <img className="profile-img" src={imgPath} alt="..." />
                  </div>
                  <div className="icon-section d-flex">
                    <div className="icon">
                      <Like
                        isDisabled={!isLogedIn}
                        userLike={userLike}
                        totalLike={like}
                        onLike={e => this.handleLikeDislike('like')}
                      />
                    </div>
                    <div className="icon">
                      <Dislike
                        isDisabled={!isLogedIn}
                        userDislike={userDislike}
                        totalDislike={dislike}
                        onDislike={e => this.handleLikeDislike('dislike')}
                      />
                    </div>
                    <div className="icon">
                      <button
                        className="btn btn-transparent"
                        disabled={!isLogedIn}
                        onClick={() => this.setFocusOnArea()}
                      >
                        <i className="fas fa-comment-alt" />
                        <span>
                          {this.state.studentsReview.length && (
                            <React.Fragment>
                              {this.state.studentsReview.length}
                            </React.Fragment>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-9 profile-content">
                  <div>
                    <h3>{title}</h3>
                    <span className="sub-title">Subject: {subject}</span>
                    <div
                      className={classnames({
                        'disbaled-stars': !isLogedIn,
                        'ratings-wrpr': true
                      })}
                    >
                      <RatingComponent
                        name="rate1"
                        starCount={5}
                        value={this.state.starRating}
                        onStarClick={this.onStarClick.bind(this)}
                      />
                    </div>
                  </div>
                  <p className="description">{description}</p>

                  {!isLogedIn && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={e => this.navigateToLogin()}
                    >
                      Login to view more
                    </button>
                  )}
                  {isLogedIn && (
                    <div>
                      {loggedInUser
                        ? loggedInUser.role === 'Student' && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                this.wrapperFunction(this.state.teacherDetails)
                              }
                            >
                              Request For Chat
                            </button>
                          )
                        : null}
                      {loggedInUser
                        ? loggedInUser.role === 'Student' && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={this.openModalForRequest}
                            >
                              Request For Review
                            </button>
                          )
                        : null}

                      {/* {loggedInUser.role === 'Student' ? (
                        <button
                          className="btn btn-outline-primary"
                          onClick={this.openModalForRequest}
                        >
                          Request For Review
                        </button>
                      ) : null} */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="top-courses-section">
            <div className="container">
              <div className="vd-section">
                <div className="row">
                  <RecentVideo
                    carousellistNewlyItems={carousellistNewlyItems}
                    headeTitle="RECENT VIDEOS"
                  />
                </div>
              </div>
            </div>
          </div>

          <Comment
            teacherId={this.state.detailModel.teacherId}
            loggedInUser={loggedInUser}
            commentRows={this.state.studentsReview}
            isFocus={isFocus}
            updateTotalComments={this.updateTotalComments}
          />
          {/* <input type="text" ref={this.exampleRef}/> */}

          <CalendarModal
            teacherData={this.state.teacherData}
            modalState={this.state.calendarModal}
            closeCalendarModal={this.closeCalendarModal}
            classes="calendar-modal"
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.teacherDetailsReducer.requestForReviewPop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalPopUp: () => dispatch(openModalForRequest()),
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetails);
