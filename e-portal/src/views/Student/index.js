import React, { Component } from 'react';
import CategoryItem from '../CategoryItem';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import { getTeacher, getCurriculum /* getNotification */ } from './action';
import { getBannerFromDB } from '../../database/dal/firebase/studentDal';
import { getTeacherFromDB } from './../../database/dal/firebase/homeDal';
import Banner from '../../components/banner/Banner';
import TopTutor from '../../components/topTutor/TopTutor';
import GLOBAL_VARIABLES from '../../config/config';
import { getNotificationsBasedOnStudentID } from './action';
import './Student.css';
class Student extends Component {
  constructor(props) {
    super(props);
    //this.teacherDetails = this.teacherDetails.bind(this);
    this.state = {
      selectedOption: null,
      bannerRows: [],
      carouselTop10Items: []
    };
  }

  componentDidMount() {
    const loggedUserId = JSON.parse(localStorage.getItem('userProfile'));
    this.props.getNotificationsBasedOnStudentID(loggedUserId.userId);
    getBannerFromDB().then(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({
        bannerRows: bannerData
      });
    });
    getTeacherFromDB().onSnapshot(querySnapshot => {
      let teacherData = [];
      querySnapshot.forEach(doc => {
        teacherData.push(doc.data());
      });
      this.setState({
        carouselTop10Items: teacherData
      });
      teacherData = [];
    });
  }

  render() {
    const pendingReviev = [];
    const reviewDone = [];

    const { bannerRows, carouselTop10Items } = this.state;
    const { teacherCarouselRows, notifications } = this.props;
    console.log('notifications', notifications);
    const listTop10Items = teacherCarouselRows;
    console.log('listTop10Items', listTop10Items);
    {
      notifications.length > 0 &&
        notifications.forEach(notification => {
          const mapData = {};
          if (notification.tRejected || notification.tAccepted) {
            mapData.src = notification.sVideo;
            mapData.title = notification.notificationDesc;
            reviewDone.push(mapData);
          } else {
            mapData.src = notification.sVideo;
            mapData.title = notification.notificationDesc;
            pendingReviev.push(mapData);
          }
        });
    }
    console.log(reviewDone, pendingReviev);
    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="Student Dashboard" />
        <div className="content-container">
          {bannerRows.length > 0 && (
            <Banner bannerRows={bannerRows} pageName="student" />
          )}
          <CategoryItem />
          {/* <div className="student-notification">

                </div> */}

          {carouselTop10Items.length > 0 && (
            <TopTutor
              carouselTop10Items={carouselTop10Items}
              headeTitle={GLOBAL_VARIABLES.TOP10_TUTOR}
            />
          )}

          <div className="col-12 content-container--background">&nbsp;</div>
          <div className="col-12 content-container--background">&nbsp;</div>
          <RecentVideo
            isNotVisibleVideoMeta={true}
            carousellistNewlyItems={reviewDone}
            headeTitle="Video Reviewed"
          />
        </div>
        <RecentVideo
          carousellistNewlyItems={pendingReviev}
          title="Video Reviewed"
        />
        {/* <Navbar links={STUDENT_DASHBOARD_LINKS} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    carouselRows: state.homeReducerStore.carouselData,
    teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
    notifications: state.studentReducer.notificationData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),
    getTeacher: () => dispatch(getTeacher()),
    getNotificationsBasedOnStudentID: id =>
      dispatch(getNotificationsBasedOnStudentID(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
