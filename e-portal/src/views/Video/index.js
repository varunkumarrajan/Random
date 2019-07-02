import React, { Component } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { toastr } from "react-redux-toastr";

import HeaderHome from "../../components/layout/header/HeaderHome";
// import Navbar from "../../shared/components/Navbar";
import Filter from "../../shared/components/Filter";

import VideoList from "./VideoList";
import Curriculum from "./../Curriculum";

import { getAllCategory } from "../../database/dal/firebase/categoryDal";
import { getCurriculumFromDB, deleteContentWithDocFromDB } from "../../database/dal/firebase/curriculumDal";
import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";

import { VIDEO_TABS } from "./../../constant/Constant";
// import { link } from "fs";
import "./video.scss";
// import notifications from "../Student/Notification/notifications";

class Video extends Component {
  state = {
    filter: "",
    content: "",
    userDetails: "",
    tabs: [],
    upload: false,
    delete: false,
    tabKey: "pendingreview"
  };

  map = new Map();

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };

  componentDidMount = () => {
    this.setState({
      tabs: VIDEO_TABS[this.state.userDetails.role.toLowerCase()]
    });
    this.getContent();
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const category = [...doc.data().subjects];
        this.setState({ category });
      });
    });
  };

  getContent = async () => {
    if (this.state.tabKey === "myvideo") {
      await this.getCurriculum();
    } else {
      await this.getNotifications();
    }
  };

  handleClick = () => {
    this.setState({delete: !this.state.delete})
  }
  getCurriculum = () => {
    const { userDetails } = this.state;
    getCurriculumFromDB(userDetails.userId).onSnapshot(querySnapshot => {
      let content = [];
      querySnapshot.forEach(doc => {
        content.push(Object.assign({ id: doc.id }, doc.data()));
      });
      this.setState({ content });
    });
  };

  getNotifications = () => {
    const { userDetails, tabKey } = this.state;
    getNotificationsFromDB(userDetails.userId, userDetails.role).onSnapshot(
      querySnapshot => {
        let content = [];
        querySnapshot.forEach(doc => {
          content.push(Object.assign({ id: doc.id }, doc.data()));
        });
        if (content.length > 0) {
          content = content.filter(list => {
            if (tabKey === "reviewed") {
              return list.sstatus && list.tstatus;
            } else if (tabKey === "pendingreview") {
              return list.sstatus && !list.tstatus;
            } else if (tabKey === "rejected") {
              return list.sstatus === false;
            }
            return list;
          });
        }
        this.setState({ content });
      }
    );
  };

  handleUpload = () => {
    this.setState({
      upload: !this.state.upload
    });
  };

  handleError = error => {
    console.log(error);
  };

  handleSuccess = res => {
    if (res) {
      this.setState({
        upload: !this.state.upload
      });
    }
  };

  handleFilter = content => {
    this.setState({
      filter: content
    });
  };

  handleCheckbox = (checked, videoDetails,userId) => {
    if(this.map.has(videoDetails.id) && !checked) {
      this.map.delete(videoDetails.id)
    }else{
      this.map.set(videoDetails.id, {videoDetails, userId});
    }
  }

  handleKey = async key => {
    await this.setState({filter :''});
    await this.setState({ tabKey: key });
    this.getContent();
  };

  handleDelete = (type = 'one') => {
    if(type === 'all'){

    }else{
      if(this.map.size === 0) {
        toastr.warning('', 'Please Checked At Least One Video');
        return false;
      }
      deleteContentWithDocFromDB(this.map);
    }
  }

  render = () => {
    const {
      tabKey,
      tabs,
      upload,
      filter,
      content,
      userDetails,
      category
    } = this.state;
    return (
      <>
        <div className="container-fluid">
          <HeaderHome headeTitle="My Video(s)" />
          <div className="content-container main-wrapper col-12">
            {!upload && (
              <>
                <Filter content={content} filterContent={this.handleFilter} />
                <Tabs
                  id="video-tabs"
                  activeKey={tabKey}
                  onSelect={key => this.handleKey(key)}
                >
                  {tabs &&
                    tabs.map((tab, ind) => {
                      return (
                        <Tab key={ind} eventKey={tab.id} title={tab.name}>
                          <VideoList
                            heading={tab.name}
                            isDelete={this.state.delete}
                            videoDetails={filter ? filter : content}
                            handleCheckbox={this.handleCheckbox}
                          >
                            {tabKey === "myvideo" &&
                              userDetails.role === "Teacher" && (
                                <>
                                <button
                                  style={{ color: "#fff" }}
                                  onClick={this.handleUpload}
                                  className="btn"
                                  title="Upload Video"
                                >
                                  <i className="fa fa-plus" />
                                  <span className="home-header-text-link-status">
                                    &nbsp;Add Video
                                  </span>
                                </button>
                                {content.length > 0 && (
                                  <button
                                    style={{ color: "#fff" }}
                                    onClick={this.handleClick}
                                    className="btn"
                                    title={(!this.state.delete) ? "Delete Video" : "Cancel"}
                                  >
                                    <i className={(!this.state.delete) ? 'fa fa-trash' : 'fa fa-close'} />
                                    <span className="home-header-text-link-status">
                                      &nbsp;{(!this.state.delete) ? 'Delete Video' : 'Cancel' }
                                    </span>
                                  </button>
                                )}
                                {this.state.delete && (
                                <>
                                  <button
                                    style={{ color: "#fff" }}
                                    onClick={() => this.handleDelete()}
                                    className="btn"
                                    title="Delete"
                                  >
                                    <i className="fa fa-trash" />
                                    <span className="home-header-text-link-status">
                                      &nbsp;Delete
                                    </span>
                                  </button>                                   
                                </>
                                )}
                              </>
                              )}
                          </VideoList>
                        </Tab>
                      );
                    })}
                </Tabs>
              </>
            )}
            {upload && (
              <Curriculum
                heading="UPLOAD VIDEO"
                isUploadThumb={true}
                userDetails={userDetails}
                category={category}
                handleError={this.handleError}
                handleSuccess={this.handleSuccess}
              >
                {}
                <button
                  onClick={this.handleUpload}
                  className="btn"
                  style={{ backgroundColor: "#232838", color: "#fff" }}
                  title="close"
                >
                  Close
                </button>
              </Curriculum>
            )}
          </div>
        </div>
      </>
    );
  };
}
export default Video;
