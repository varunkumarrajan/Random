import React, { Component } from "react";
import {
  saveNotification,
  saveNotificationDetails,
  getVideoUrl /* , getNotificationFromDB */
} from "../../../database/dal/firebase/notificationdal";
// import ReactDOM from 'react-dom';
import { getNotifications } from "./modalAction";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { closeModalPopUp } from "./modalAction";
import Progress from "./progress";

import "./modalpopup.css";
class ModalPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: "",
      teacherName: "",
      notificationDescription: "",
      validationMessage: "",
      notificationPermission: true,
      videoName: "",
      isUploading: false
    };
    this.createNotification = this.createNotification.bind(this);
    this.notoficationDescription = this.notoficationDescription.bind(this);
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };
  componentDidMount() {
    // if notofication already has been created
    this.props.getNotifications();
    const studentDetails = localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null;
    if (studentDetails) {
      this.setState({
        studentName: studentDetails.firstName + " " + studentDetails.lastName,
        userDetails: studentDetails
      });
    }
  }

  randomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      teacherName: nextProps.teacherDeatils.title,
      tid: nextProps.teacherDeatils.teacherId
    });
    // if notofication already has been created
    this.props.savedNotifications.forEach(notification => {
      if (
        notification.tId === this.state.tid &&
        notification.sId === this.state.userDetails.userId
      ) {
        this.setState({
          notificationPermission: false
        });
      } else {
        this.setState({
          notificationPermission: true
        });
      }
    });
  }
  componentWillUnmount() {
    this.props.closePopModal();
  }
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleVideoUploadSuccess = fileName => {
    this.setState({
      progress: 100,
      isUploading: false,
      videoName: fileName,
      validationMessage: ""
    });
  };

  notoficationDescription = event => {
    this.setState({
      notificationDescription: event.target.value
    });
  };

  createNotification = () => {
    const id = this.randomString(20);
    console.log(id);
    const loggedInUSerDetails = JSON.parse(localStorage.getItem("userProfile"));
    let tId,
      sId,
      tname,
      sname = "";
    let sstatus = true;
    let tstatus = false;
    if (loggedInUSerDetails.role === "Teacher") {
      tId = loggedInUSerDetails.userId;
      sId = "";
    } else {
      sId = loggedInUSerDetails.userId;
    }

    tId = this.state.tid;
    tname = this.state.teacherName;
    sname = this.state.studentName;
    const tAccepted = false;
    const tRejected = false;
    const notificationDetails = {
      notificationDesc: this.state.notificationDescription,
      id,
      tId,
      sId,
      loggedInUserId: loggedInUSerDetails.userId,
      tname,
      sname,
      sstatus,
      tstatus,
      tAccepted,
      tRejected
    };
    if (
      this.state.videoName !== "" &&
      this.state.notificationDescription !== ""
    ) {
      this.setState({
        validationMessage: ""
      });
      getVideoUrl(
        this.state.videoName,
        notificationDetails.loggedInUserId
      ).then(url => {
        let sVideo = "",
          tVideo = "";
        loggedInUSerDetails.role === "Teacher"
          ? (tVideo = url)
          : (sVideo = url);
        notificationDetails.tvideo = tVideo;
        //notificationDetails.status = false;
        notificationDetails.sVideo = sVideo;
        notificationDetails.comments = [];
        saveNotification(notificationDetails);
        saveNotificationDetails({
          ...notificationDetails
        });
        this.onCloseModal();
        console.log(this.state);
      });
    } else {
      this.setState({
        validationMessage: "Notification Description or video can not be empty"
      });
    }
  };
  render() {
    const studentDetails = localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null;
    // const { userDetails } = this.props
    const openModal = this.props.modalState;
    const teacherDetails = this.props.title;
    console.log("teacherDetails", teacherDetails);
    return (
      <div>
        <Modal open={openModal} onClose={this.onCloseModal} center>
          <div>
            <div className="header">
              <h3>New Request for Review</h3>
            </div>
            <div className="body">
              <form>
                <div className="form-group">
                  <div className="teacher-student">
                    <div className="btn btn-sm btn-info small-btn">
                      <span className="hide-teacher-student">Student :</span>{" "}
                      {this.state.studentName}
                    </div>
                    {/* <div className ="student-teacher-notifying"><b><i className="fa fa-angle-right">Notifying to </i></b></div> */}
                    <div className="btn btn-sm btn-info teacher small-btn">
                      <span className="hide-teacher-student"> Teacher :</span>{" "}
                      {this.state.teacherName}
                    </div>
                  </div>
                  <div>
                    <span class="red-star">*</span>
                    <textarea
                      rows="4"
                      cols="50"
                      className="form-control"
                      placeholder="Please add details here"
                      onChange={this.notoficationDescription}
                    />{" "}
                    <div className="progressbar-spacing">
                      {this.state.isUploading && (
                        <>
                          <br />
                          <Progress
                            bgColor="#232838"
                            progress={this.state.progress}
                          />
                          <br />
                        </>
                      )}
                    </div>
                    <span class="red-star">*</span>
                    <br />
                    <FileUploader
                      accept="video/*"
                      className="upload-video"
                      storageRef={firebase
                        .storage()
                        .ref(`notification/${studentDetails.userId}`)}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleVideoUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                  </div>
                </div>
                <p className="help-block">{this.state.validationMessage}</p>

                <button
                  type="button"
                  disabled={this.state.isUploading}
                  className="btn btn-dark submit"
                  onClick={this.createNotification}

                  // toastr.success('Comment saved successfully.');
                >
                  New Request
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.teacherDetailsReducer.requestForReviewPop,
    savedNotifications: state.modalReducer.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp()),
    getNotifications: () => dispatch(getNotifications())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPopUp);
