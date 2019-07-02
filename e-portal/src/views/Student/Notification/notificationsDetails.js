import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../shared/components/Navbar";
import { connect } from "react-redux";
import FilterByDate from '../../../shared/components/filter-by-date';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  getNotification,
  getTeachers,
  getStudents,
  getTeacherFromStudentIdFromDB,
  getStudentNotification
} from "../../Teacher/Notification/notificationAction";
import "./style.scss";
import Notification from "./notifications";

import { getUserProfile } from "../../../database/dal/firebase/chatNotificationDal";

import Modal from "react-responsive-modal";
import HeaderHome from "../../../components/layout/header/HeaderHome";

class NotificationsDetails extends Component {
  variableName = "";
  state = {
    open: false,
    gender: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    mobile: "",
    email: "",
    role: "",
    subject: "",
    charge: "",
    currency: "",
    summary: "",
    isUploading: false,
    profileImage:
      "https://firebasestorage.googleapis.com/v0/b/e-project-4e023.appspot.com/o/profilepic%2FuserProfile.png?alt=media&token=cfb3e9a8-8508-4acd-8e45-dd97e2ea3dec",
    submitted: false,
    errorMessage: "",
    userData: {},
    notificationData: {},
    mName: "",
    teacherId: ""
  };

  componentDidMount() {
    let user;
    let data;
    const loggedInUSer = JSON.parse(localStorage.getItem("user"));
    //const loggedInUSer = "sGeyNegb2cZZcq7C76ndjaGUNSk1";
    //loggedInUSer.user.id change this from hardcoding
    console.log("Logged in details", loggedInUSer);

    this.props.getStudentNotification(loggedInUSer.user.uid);
    //if (this.props.notificationDetails != null) {
    // console.log(" 100 componentDidMount Notification details Page", this.props.notificationDetails)
    // }

    // getNotificationData(loggedInUSer).then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //         user = doc.data();
    //         if (doc.exists) {
    //             this.setState({
    //                 notificationData: user
    //             });

    //             getUserProfile(user.tId).then(querySnapshot => {
    //                 querySnapshot.forEach(doc => {
    //                     data = doc.data();
    //                     if (doc.exists) {

    //                         this.setState({
    //                             userData: data
    //                         });
    //                     }
    //                 });
    //             });

    //         }
    //     });
    // });

    //console.log("Notification data componentDidMount => ", this.props.notificationDetails)
    //this.props.getTeachers("55dh2K881oSaWBFn8mZOGiSeTny2");
    //this.props.getStudents("DrFophiJl9PsAZhrhFzd11opaPH2");

    console.log("teacher id", this.state);
  }
  getDateParameterInChat = () => {
    this.setState({
      notificationDetails: this.state.notificationDetails.reverse()
    })
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getClassName(status) {
    let alertClassName;
    if (status === -1) {
      alertClassName = "alert alert-warning";
    }
    if (status === 0) {
      alertClassName = "alert alert-danger";
    }
    if (status === 1) {
      alertClassName = "alert alert-success";
    }
    return alertClassName;
  }

  render = () => {
    console.log("Notification data  => ", this.props.notificationDetails);
    // this.state.notificationData.comment ?
    //     Object.keys(this.state.notificationData.comment).map(data => {
    //         console.log(this.state.notificationData.comment[data].details)
    //     }) : null;

    //console.log("USER DATA", this.state.userData);

    //console.log("Notification data => ", this.props.notificationDetails)
    //console.log("Teacher data => ", this.props.teacherDetails);

    let teacherName;
    // if (this.props.teacherDetails != null) {
    //     this.props.teacherDetails.map(data => {
    //         teacherName = data.firstName + " " + data.lastName;
    //     })
    // }
    teacherName = "";
    // if (this.state.userData) {

    //     teacherName = this.state.userData.firstName + this.state.userData.lastName
    // }
    //console.log("Student data => ", this.props.studentDetails)

    const { open } = this.state;
    const { notificationDetails } = this.props;


    return (
      <>
        <div className="container-fluid">
          <div>
            <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12 col-without--padding">
              <div className="filterByDate main-wrapper">
                <Col sm={6}>
                  <FilterByDate onChangeDate={this.getDateParameterInChat} />
                </Col>
              </div>
              {
                Object.keys(notificationDetails).length > 0 ?
                  Object.keys(notificationDetails).map(
                    (notificationDetail, index) => (
                      <div
                        key={index}
                        className={this.getClassName(
                          notificationDetails[notificationDetail].status
                        )}
                      >
                        <Link
                          to={
                            `/student/notificationsDescription/` +
                            notificationDetails[notificationDetail].nId
                          }
                          className="active"
                        >
                          <div>
                            <div style={{ float: "left" }}>
                              <img
                                src="../Assets/hdpi/avatar.png"
                                name="aboutme"
                                width="70"
                                height="50"
                                border="0"
                                className="img-circle"
                              />
                            </div>
                            <div
                              className="container"
                              onClick={this.onOpenModal}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="alert-icon">
                                <i className="material-icons">
                                  Teacher{" "}
                                  {notificationDetails[notificationDetail].tId}{" "}
                                </i>
                              </div>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">
                                  <i className="material-icons">clear</i>
                                </span>
                              </button>
                              {console.log(
                                "Request Details : ",
                                notificationDetails[notificationDetail].comment
                              )}
                              <b>Message:</b>{" "}
                              {notificationDetails[notificationDetail].comment ? (
                                Object.keys(
                                  notificationDetails[notificationDetail].comment
                                ).map(
                                  data =>
                                    notificationDetails[notificationDetail].comment[
                                      data
                                    ].details
                                )
                              ) : (
                                  <span>Loading...</span>
                                )}
                            </div>
                          </div>
                        </Link>
                        {notificationDetails[notificationDetail].paymentStatus !=
                          false ? (
                            {/* <Chat data={notificationDetails[notificationDetail]} /> */}
                          ) : (
                            <div />
                          )}
                      </div>
                    )
                  ) : <div>No Record Found</div>}
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    notificationDetails: state.notificationReducer.notificationDetails,
    teacherDetails: state.notificationReducer.teacherDetails,
    studentDetails: state.notificationReducer.studentDetails
  };
};
const mapDispatchToProps = dispatch => {
  console.log("dispatched action");
  return {
    getStudentNotification: uid => dispatch(getStudentNotification(uid)),
    getTeachers: uid => dispatch(getTeachers(uid)),
    getStudents: uid => dispatch(getStudents(uid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDetails);
