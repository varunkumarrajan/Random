import React, { Component } from "react";
import { connect } from "react-redux";
import {
  udpateChatNotificationDetails,
  getNotificationDataFromNid,
  getUserProfile
} from "../../../database/dal/firebase/chatNotificationDal";
import {
  getNotification,
  getTeachers,
  getStudents,
  setKeyForNotificationPage,
} from "./notificationAction";

import UpdateDataModal from "../../../shared/components/calendar-modal/updateDataModal";
import StatusCircle from "../../../components/statusCircle/StatusCircle";
import HeaderHome from "../../../components/layout/header/HeaderHome";

class notificationsDescription extends Component {
  state = {
    calendarModal: false,
    teacherData: "",
    notificationData: "",
    studentDataFromDB: "",
    notificationData: ""
  };

  componentDidMount() {
    let user;
    let notification;
    getNotificationDataFromNid(this.props.match.params.nid).then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          notification = doc.data();
          //console.log("Notification Data information: ", notification)
          if (doc.exists) {
            this.setState({
              notificationData: notification
            });
          }
        });
        console.log("UserID get : ", notification.sId);
        getUserProfile(notification.sId).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            user = doc.data();
            //console.log("User Data information: ", user)
            if (doc.exists) {
              this.setState({
                studentDataFromDB: user
              });
            }
          });
        });
      }
    );
  }

  wrapperFunction = (notificationData, studentData) => {
    this.openCalendarModal();
    this.setNotificationData(notificationData);
    this.setStudentData(studentData);
  };
  openCalendarModal = () => {
    this.setState({ calendarModal: true });
  };
  setNotificationData = data => {
    this.setState({ notificationData: data });
  };
  setStudentData = data => {
    this.setState({ studentData: data });
  };
  closeCalendarModal = () => {
    this.setState({ calendarModal: false });
  };

  //get the user all data and save it again
  handleReject = id => {
    console.log("Rejected", id);
    const updatedAt = new Date();
    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem("user"));
    if (loggedInUSer) {
      const rejectedNotificationDetails = {
        nId: id,
        updatedAt,
        status: 0,
        comment: [
          {
            by: loggedInUSer.user.uid,
            date: createdAt,
            details: "Hey, Teacher have rejected chat offer."
          }
        ]
      };
      udpateChatNotificationDetails({
        ...rejectedNotificationDetails
      });
    }

    this.handleBack();
  };

  handleAccept = id => {
    console.log("Accepted", id);
    const updatedAt = new Date();
    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem("user"));
    if (loggedInUSer) {
      const acceptedNotificationDetails = {
        nId: id,
        updatedAt,
        status: 1,
        comment: [
          {
            by: loggedInUSer.user.uid,
            date: createdAt,
            details: "Hey, I have accepted chat offer. Let's meet on time."
          }
        ]
      };
      udpateChatNotificationDetails({
        ...acceptedNotificationDetails
      });
    }
    this.handleBack();
  };

  handleBack = () => {
    this.props.setKeyForNotificationPage('chatNotificationDetails');
    this.props.history.goBack();
  };

  handleDelete = id => {
    console.log("handleDelete", id);
    const updatedAt = new Date();
    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem("user"));
    if (loggedInUSer) {
      const acceptedNotificationDetails = {
        nId: id,
        updatedAt,
        status: 0,
        deleted: true
      };
      udpateChatNotificationDetails({
        ...acceptedNotificationDetails
      });
    }
    this.handleBack();
  };

  getMessageText(status) {
    let message;
    if (status === -1) {
      message = "Pending";
    }
    if (status === 0) {
      message = "Rejected";
    }
    if (status === 1) {
      message = "Approved";
    }
    return message;
  }

  getColorCode(status) {
    let color;
    if (status === -1) {
      color = "#fff3cd";
    }
    if (status === 0) {
      color = "#f8d7da";
    }
    if (status === 1) {
      color = "#d4edda";
    }
    return color;
  }

  render() {
    const { notificationData, studentDataFromDB } = this.state;
    console.log("notificationData 22: ", notificationData);
    console.log("studentDataFromDB 22: ", studentDataFromDB)

    const { open } = this.state;

    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="My Review" />
        <div className="content-container main-wrapper">
          <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
            <div className="card card-without--padding">
              <div
                className="card-body card-without--padding"
                style={{ background: " #333546" }}
              >
                {notificationData != null && studentDataFromDB != null ? (
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                      />
                      <h4 className="modal-title" id="myModalLabel">
                        <button
                          onClick={this.handleBack}
                          type="button"
                          className="btn btn-light back-btn"
                          data-dismiss="modal"
                        >
                          <i class="fa fa-arrow-left" />
                        </button>
                        &nbsp; More About Student {studentDataFromDB.firstName}{" "}
                        {studentDataFromDB.lastName} Review
                      </h4>
                    </div>
                    <div className="modal-body">
                      <center>
                        <img
                          src="../../Assets/hdpi/avatar.png"
                          name="aboutme"
                          alt="avatar"
                          width="140"
                          height="140"
                          border="0"
                          className="img-circle"
                        />
                        <p>
                          {studentDataFromDB.firstName}{" "}
                          {studentDataFromDB.lastName}
                        </p>
                        <h3 className="media-heading">
                          {notificationData.nid}
                        </h3>
                        <StatusCircle
                          backgroundColor={this.getColorCode(
                            notificationData.status
                          )}
                          foregroundColor="#000"
                          height="80px"
                          width="80px"
                          payload={this.getMessageText(notificationData.status)}
                        />
                      </center>
                      <span>
                        <strong>Date & Timing: </strong>
                      </span>
                      <span className="label label-warning">
                        {studentDataFromDB === "" ? <span>Lading...</span> : new Date(notificationData.scheduleDate).toUTCString()}
                      </span>
                      &nbsp;
                      <p className="text-left">
                        <strong>Message: </strong>
                        {notificationData.details}.
                      </p>
                    </div>
                    <div className="modal-footer">
                      {/* <button
                        onClick={this.handleBack}
                        type="button"
                        className="btn btn-dark"
                        data-dismiss="modal"
                      >
                        Back
                      </button> */}

                      {notificationData.paymentStatus === false &&
                        notificationData.status === -1 ? (
                          <button
                            onClick={() =>
                              this.handleAccept(notificationData.nId)
                            }
                            type="button"
                            className="btn btn-success"
                            data-dismiss="modal"
                          >
                            Accept
                        </button>
                        ) : null}

                      {notificationData.paymentStatus === false &&
                        notificationData.status === -1 ? (
                          <button
                            onClick={() =>
                              this.handleReject(notificationData.nId)
                            }
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Reject
                        </button>
                        ) : null}

                      {notificationData.paymentStatus === false &&
                        notificationData.status === -1 ? (
                          <button
                            onClick={() =>
                              this.wrapperFunction(
                                notificationData,
                                studentDataFromDB
                              )
                            }
                            type="button"
                            className="btn btn-warning"
                            data-dismiss="modal"
                          >
                            Discuss on Time
                        </button>
                        ) : null}

                      {/* {notificationData.paymentStatus === false &&
                        notificationData.status === -1 && notificationData.deleted === false ? (
                          <button
                            onClick={() => this.handleDelete(notificationData.nId)}
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Delete
                        </button>
                        ) : null} */}

                    </div>

                    <div>
                      <UpdateDataModal
                        studentData={this.state.studentData}
                        notificationData={this.state.notificationData}
                        modalState={this.state.calendarModal}
                        closeCalendarModal={this.closeCalendarModal}
                        classes="calendar-modal"
                      />
                    </div>
                  </div>
                ) : (
                    <div>Loading....</div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notificationDetails: state.notificationReducer.notificationDetails,
    teacherDetails: state.notificationReducer.teacherDetails,
    studentDetails: state.notificationReducer.studentDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNotification: uid => dispatch(getNotification(uid)),
    getTeachers: uid => dispatch(getTeachers(uid)),
    getStudents: uid => dispatch(getStudents(uid)),
    setKeyForNotificationPage: NotificationDetails =>
      dispatch(setKeyForNotificationPage(NotificationDetails)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationsDescription);
