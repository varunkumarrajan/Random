import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';

import CategoryItem from '../CategoryItem';
import {
  getBannerFromDB,
  getCurriculumFromDB,
  getTeacherFromDB,
  getFeedbackFromDB,
  getUserProfileFromDB,
  getBlogFromDB
} from './../../database/dal/firebase/homeDal';
import TopTutor from '../../components/topTutor/TopTutor';
import * as actionTypes from '../../spinnerStore/actions';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import StudentFeedback from '../../components/studentFeedback/StudentFeedback';
import Banner from '../../components/banner/Banner';
import Blog from '../Blog/Slider/blog';
import GLOBAL_VARIABLES from '../../config/config';
import HorSlider from '../../shared/components/tray-carousel/HorSlider';
import { CarouselItem } from 'react-bootstrap';
import ProfileItem from '../../shared/components/tray-carousel/ProfileItem';
import CommentItem from '../../shared/components/tray-carousel/CommentItem';
import { Promise, reject } from 'q';
import { resolve } from 'url';
import VideoItem from '../../shared/components/tray-carousel/VedioItem';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.setSpinnerStatus(true);
    this.state = {
      bannerRows: [],
      carouselTop10Items: [],
      carousellistNewlyItems: [],
      studentsReview: [],
      blogList: []
    };
  }
  count = 0;
  feedbackCount = -1;
  blogCount = -1;

  componentWillUnmount() {
    this.setState({
      bannerRows: [],
      carouselTop10Items: [],
      carousellistNewlyItems: [],
      studentsReview: []
    });
  }

  componentDidMount = () => {
    const online = window.navigator.onLine;
    if (online) {
      getBannerFromDB().onSnapshot(querySnapshot => {
        let bannerData = [];
        querySnapshot.forEach(doc => {
          bannerData.push(doc.data());
        });
        this.setState({
          bannerRows: bannerData
        });
      });
    } else {
      const bannerData = [
        { banner_image: 'business-banner-1600x300.jpg', page: 'home' },
        { banner_image: 'student_banner.jpg', page: 'home' }
      ];

      this.setState({
        bannerRows: bannerData
      });
    }

    getTeacherFromDB().onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
      let teacherData = [];
      querySnapshot.forEach(doc => {
        teacherData.push(doc.data());
      });
      this.setState({
        carouselTop10Items: teacherData
      });
      teacherData = [];
    });

    getCurriculumFromDB().onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
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

    getFeedbackFromDB().onSnapshot(querySnapshot => {
      // let profileData = [];
      let tempArr = {};
      let feedbackData = [];
      let feedbackObjs = [];
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
      let totalSnapshot = querySnapshot.docs.length - 1;
      // console.log("querySnapshot.docs.length",querySnapshot.docs.length);
      querySnapshot.forEach((doc, index) => {
        const user_id = doc.data().user_id;
        feedbackObjs.push(doc.data());
        if (user_id) {
          getUserProfileFromDB(doc.data().user_id).onSnapshot(
            querySnapshot => {
              this.feedbackCount++;
              querySnapshot.forEach((profileData, index) => {
                tempArr['profileData'] = profileData.data();
                tempArr['feedback'] = doc.data();

                feedbackData.push(tempArr);

                tempArr = {};
              });

              if (totalSnapshot === this.feedbackCount) {
                this.setState({
                  studentsReview: feedbackData
                });
              }

              this.props.setSpinnerStatus(false);
            },
            error => {
              this.props.setSpinnerStatus(false);
            }
          );
        } else {
          this.props.setSpinnerStatus(false);
        }
      });
    });

    getBlogFromDB().onSnapshot(querySnapshot => {
      let tempArr = {};
      let blogData = [];
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
      let totalSnapshot = querySnapshot.docs.length - 1;
      querySnapshot.forEach(doc => {
        const teacherId = doc.data().teacherId;

        if (teacherId) {
          getUserProfileFromDB(doc.data().teacherId).onSnapshot(
            querySnapshot => {
              this.blogCount++;
              querySnapshot.forEach(profileData => {
                tempArr['profileData'] = profileData.data();
                tempArr['feedback'] = doc.data();

                blogData.push(tempArr);
                tempArr = {};
              });
              if (totalSnapshot === this.blogCount) {
                this.setState({
                  blogList: blogData
                });
              }
              this.props.setSpinnerStatus(false);
            },
            error => {
              this.props.setSpinnerStatus(false);
            }
          );
        } else {
          this.props.setSpinnerStatus(false);
        }
      });
    });
  };

  render() {
    const {
      bannerRows,
      carouselTop10Items,
      carousellistNewlyItems,
      studentsReview,
      blogList
    } = this.state;
    // console.log('student review', studentsReview)
    return (
      <React.Fragment>
        <div className="container-fluid">
          <HeaderHome headeTitle="Dashboard" />
          <div className="content-container">
            {bannerRows.length > 0 && (
              <Banner bannerRows={bannerRows} pageName="home" />
            )}

            {carouselTop10Items.length > 0 && (
              <React.Fragment>
                {/* <TopTutor
                  carouselTop10Items={carouselTop10Items}
                  headeTitle={GLOBAL_VARIABLES.TOP10_TUTOR}
                /> */}
                <div className="col-sm-12 mobile-view">
                  <HorSlider
                    headerTitle={GLOBAL_VARIABLES.TOP10_TUTOR}
                    carouselItems={carouselTop10Items}
                    container="cotainer-slider-1"
                  >
                    {carouselRecord => (
                      <ProfileItem
                        carouselRecord={carouselRecord}
                        linkTo={`/home/teacher/${carouselRecord.userId}`}
                      />
                    )}
                  </HorSlider>
                </div>
              </React.Fragment>
            )}

            {carousellistNewlyItems.length > 0 && (
              <React.Fragment>
                {/* <RecentVideo
                  carousellistNewlyItems={carousellistNewlyItems}
                  headeTitle={GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS}
                /> */}
                <div className="col-sm-12 mobile-view">
                  <HorSlider
                    headerTitle={GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS}
                    carouselItems={carousellistNewlyItems}
                    container="cotainer-slider-2"
                  >
                    {carouselRecord => (
                      <VideoItem
                        carouselRecord={carouselRecord}
                        linkTo="javascript:avoid(0);"
                      />
                    )}
                  </HorSlider>
                </div>
              </React.Fragment>
            )}

            {studentsReview.length > 0 && (
              <React.Fragment>
                {/* <StudentFeedback
                  studentsReview={studentsReview}
                  headeTitle={GLOBAL_VARIABLES.STUDENTS_REVIEW}
                /> */}
                <div className="col-sm-12 mobile-view">
                  <HorSlider
                    headerTitle={GLOBAL_VARIABLES.STUDENTS_REVIEW}
                    carouselItems={studentsReview}
                    container="cotainer-slider-3"
                  >
                    {carouselRecord => (
                      <CommentItem carouselRecord={carouselRecord} linkTo="#" />
                    )}
                  </HorSlider>
                </div>
              </React.Fragment>
            )}

            {blogList.length > 0 && (
              <React.Fragment>
                {/* <Blog
                  blogList={blogList}
                    headeTitle={GLOBAL_VARIABLES.RECENT_BLOG}
                  /> */}
                <div className="col-sm-12 mobile-view">
                  <HorSlider
                    headerTitle={GLOBAL_VARIABLES.RECENT_BLOG}
                    carouselItems={blogList}
                    container="cotainer-slider-4"
                    slidesToScroll={2}
                  >
                    {carouselRecord => (
                      <CommentItem
                        carouselRecord={carouselRecord}
                        linkTo={`/blog/view/${carouselRecord.feedback.id}`}
                      />
                    )}
                  </HorSlider>
                </div>
              </React.Fragment>
            )}

            <CategoryItem />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
