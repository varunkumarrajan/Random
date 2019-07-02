import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
// import NavBar from './../../shared/components/Navbar/index'
// import UserList from "./UserList/UserList";
// import TopVideo from "./TopVideo/TopVideo";
// import GLOBAL_VARIABLES from "../../config/config";
// import Slider from "../../components/slider/Slider";
import Banner from "../../components/banner/Banner";
import RecentVideo from "../../components/recentVideo/RecentVideo";
import {
  getBannerFromDB,
  getCurriculumFromDB,
  getReviewContentFromDB
} from "./../../database/dal/firebase/curriculumDal";
import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";

import "./teacher.scss";

class Teacher extends Component {
  state = {
    userDetails: "",
    bannerData: "",
    myContent: [],
    reviewedContent: [],
    pendingContent: []
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };
  componentDidMount = () => {
    getBannerFromDB().then(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({ bannerData });
    });

    getCurriculumFromDB(this.state.userDetails.userId).onSnapshot(
      querySnapshot => {
        let myContent = [];
        querySnapshot.forEach(doc => {
          myContent.push(doc.data());
        });
        this.setState({ myContent });
      }
    );
    getNotificationsFromDB(
      this.state.userDetails.userId,
      this.state.userDetails.role
    ).onSnapshot(querySnapshot => {
      let content = [];
      querySnapshot.forEach(doc => {
        content.push(Object.assign({ id: doc.id }, doc.data()));
      });
      if (content.length > 0) {
        this.setState({
          pendingContent: content.filter(item => !item.tstatus && item.sstatus),
          reviewedContent: content.filter(item => item.tstatus)
        });
        /* content = content.filter( (list) => {
            if(tabKey === 'reviewed') {
              return list.sstatus && list.tstatus
            } else if(tabKey === 'pendingreview'){
              return list.sstatus && !list.tstatus
            } else if(tabKey === 'rejected') {             
              return list.sstatus === false       
            }
          }) */
      }
    });
    // this.setState({ content });

    /* this.getReviewContent(
      this.state.userDetails.userId,
      true,
      "reviewedContent"
    );
    this.getReviewContent(
      this.state.userDetails.userId,
      false,
      "pendingContent"
    ); */
  };

  /* getReviewContent = (userId, status, state) => {
    console.log(userId, status,state)
    getReviewContentFromDB(userId, status).onSnapshot(querySnapshot => {
      let content = [];
      querySnapshot.forEach(doc => {
        content.push(doc.data());
      });
      console.log(content)
      this.setState({ [state]: content });
    });
  };
 */
  render = () => {
    const {
      bannerData,
      myContent,
      reviewedContent,
      pendingContent
    } = this.state;
    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="Teacher Dashboard" />

        <div className="content-container main-wrapper">
          {bannerData && <Banner bannerRows={bannerData} pageName="teacher" />}
          <RecentVideo
            isNotVisibleVideoMeta={true}
            carousellistNewlyItems={pendingContent}
            headeTitle="Video Pending for Review"
          />
          <RecentVideo
            isNotVisibleVideoMeta={true}
            carousellistNewlyItems={reviewedContent}
            headeTitle="Video Reviewed"
          />
          <RecentVideo
            carousellistNewlyItems={myContent}
            headeTitle="My Video"
          />
        </div>
      </div>
    );
  };
}
export default Teacher;
