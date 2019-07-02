import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveChatNotificationDetails,
  udpateChatNotificationDetails,
  getNotificationDataFromNid,
  getUserProfile
} from "../../../database/dal/firebase/chatNotificationDal";

import {
  getNotification,
  getTeachers,
  getStudents,
  setKeyForNotificationPage,

} from "../../Teacher/Notification/notificationAction";

import UpdateDataModal from "../../../shared/components/calendar-modal/updateDataModal";
import HeaderHome from "../../../components/layout/header/HeaderHome";
import StatusCircle from "../../../components/statusCircle/StatusCircle"

class notificationsDescription extends Component {
  state = {
    calendarModal: false,
    teacherData: "",
    notificationData: ""
  };

  componentDidMount() {
    let user;
    let notification;
    getNotificationDataFromNid(this.props.match.params.sid).then(
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

        getUserProfile(notification.tId).then(
          querySnapshot => {
            querySnapshot.forEach(doc => {
              user = doc.data();
              //console.log("User Data information: ", user)
              if (doc.exists) {
                this.setState({
                  studentDataFromDB: user
                });
              }
            });
          }
        );
      }
    );
  }

  wrapperFunction = data => {
    this.openCalendarModal();
    this.setStudentData(data);
  };
  openCalendarModal = () => {
    this.setState({ calendarModal: true });
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
            details:
              "Hey, Student have rejected chat offer."
          }
        ]
      };
      udpateChatNotificationDetails({
        ...rejectedNotificationDetails
      });
    }
    this.handleBack();
  };

  handlePay = id => {
    console.log("Pay", id);
    const updatedAt = new Date();
    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem("user"));
    if (loggedInUSer) {
      const acceptedNotificationDetails = {
        nId: id,
        updatedAt,
        status: 1,
        paymentStatus: true
      };
      udpateChatNotificationDetails({
        ...acceptedNotificationDetails
      });
    }
    this.handleBack();
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

  handleBack = () => {
    this.props.setKeyForNotificationPage('chatNotificationDetails');
    this.props.history.goBack();
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

    if (studentDataFromDB != null && notificationData != null) {
      console.log("studentDataFromDB  => ", studentDataFromDB.firstName)
    }

    const { open } = this.state;
    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="Chat Request" />
        <div className="content-container  col-12">
          {studentDataFromDB != null && notificationData != null ? (
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                />

                <h4 className="modal-title" id="myModalLabel">
                  <span ></span>
                  <button
                    onClick={this.handleBack}
                    type="button"
                    className="btn btn-light back-btn"
                    data-dismiss="modal"
                  >
                    <i className="fa fa-arrow-left" />
                  </button> &nbsp;
                  More About Teacher {studentDataFromDB.firstName} {studentDataFromDB.lastName} Request

                </h4>
              </div>
              <div className="modal-body">
                <center>
                  <img
                    src="../../Assets/hdpi/avatar.png"
                    name="aboutme"
                    width="140"
                    height="140"
                    border="0"
                    className="img-circle"
                  />
                  <p> {studentDataFromDB.firstName} {studentDataFromDB.lastName}</p>
                  <h3 className="media-heading" />
                  <StatusCircle backgroundColor={this.getColorCode(notificationData.status)} foregroundColor="#000" height="80px" width="80px" payload={this.getMessageText(notificationData.status)}
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
                  {notificationData.comment != null ? (
                    Object.keys(notificationData.comment).map(
                      notifyData => notificationData.comment[notifyData].details
                    )
                  ) : (
                      <span>Loading...</span>
                    )}
                </p>
              </div>
              <div className="modal-footer">
                {/* <button
                  onClick={this.handleBack}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Back
                </button> */}
                {notificationData.status == -1 &&
                  notificationData.reqForReSchedule === true ? (
                    <button
                      onClick={() => this.handleReject(notificationData.nId)}
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Reject
                  </button>
                  ) : null}
                {(notificationData.paymentStatus == false &&
                  notificationData.status == 1) ||
                  (notificationData.status == -1 &&
                    notificationData.reqForReSchedule === true &&
                    notificationData.paymentStatus == false) ? (
                    <button
                      onClick={() => this.handlePay(notificationData.nId)}
                      type="button"
                      className="btn btn-success"
                      data-dismiss="modal"
                    >
                      Pay
                  </button>
                  ) : null}

                {notificationData.paymentStatus === false &&
                  notificationData.status === -1 && notificationData.deleted === false ? (
                    <button
                      onClick={() => this.handleDelete(notificationData.nId)}
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Delete
                        </button>
                  ) : null}


              </div>
            </div>
          ) : (
              <div>Loading....</div>
            )}
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
