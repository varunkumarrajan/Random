import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { connect } from "react-redux";

import { withRouter } from "react-router";
import Navbar from "./../../shared/components/Navbar";

import HeaderHome from "../../components/layout/header/HeaderHome";

import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";

import TeacherNotificationDetails from "./../Teacher/Notification/notificationsDetails";

import NotificationsDetails from "./../Student/Notification/notificationsDetails";

import { setNotificationDetails, deleteNotificationDetails } from "./action";
import { TEACHER_DASHBOARD_LINKS } from "../../constant/Constant";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterByDate from '../../shared/components/filter-by-date';
import "./style.css";

// import Modal from 'react-responsive-modal'

class Notification extends Component {
  state = {
    key: "chatNotification",
    open: false,

    userDetails: "",
    notificationsList: ""
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };

  componentDidMount = () => {
    const { userDetails } = this.state;
    console.log(
      "this.props.getTeacherNotification",
      this.props.getTeacherNotification
    );
    if (this.props.getNotificationMessage === "NotificationDetails") {
      this.setState({
        key: "notification"
      });
    }

    if (this.props.getStudnetNotification === "chatNotificationDetails") {
      console.log(
        "Sachin Test => getStudnetNotification ",
        this.props.getStudnetNotification
      );
      this.setState({
        key: "chatNotification"
      });
    }

    if (this.props.getTeacherNotification === "chatNotificationDetails") {
      console.log(
        "Sachin Test getTeacherNotification => ",
        this.props.getTeacherNotification
      );
      this.setState({
        key: "chatNotification"
      });
    }

    getNotificationsFromDB(userDetails.userId, userDetails.role).onSnapshot(

      querySnapshot => {
        let notificationsList = [];
        querySnapshot.forEach(doc => {
          notificationsList.push(Object.assign({ id: doc.id }, doc.data()));
        });
        this.setState({ notificationsList });
      }
    );
  };





  notificationStatus = (notificationDetails, type) => {
    const { userDetails } = this.state;
    const classStatus =
      notificationDetails.sstatus && notificationDetails.tstatus
        ? "alert alert-success"
        : notificationDetails.status && !notificationDetails.tstatus
          ? "alert alert-warning"
          : "alert alert-danger";
    const userWiseStatus =
      userDetails.role === "Teacher"
        ? `Notification from  ${notificationDetails.sname}`
        : `Notification from  ${notificationDetails.tname}`;
    return type === "message" ? userWiseStatus : classStatus;
  };

  getDateParameter = () => {

    this.setState({
      notificationsList: this.state.notificationsList.reverse()
    })

  }


  goToNotificationDetails = notification => {
    console.log(this.props);
    this.props.history.push("/notificationdetails/" + notification.id);
  };

  deleteNotification = (notification, parameter) => {
    if (parameter === "deleteNotification") {
      // if (
      //   notification.tRejected ||
      //   notification.tAccepted ||
      //   (notification.sstatus == true && notification.tstatus == false)
      // ) {
      //   this.props.deleteNotificationDetails(notification);
      // } else {
      //   toastr.info("Request can not be deleted");
      // }
      this.props.deleteNotificationDetails(notification);
    } else {
      this.goToNotificationDetails(notification);
    }
  };

  notificationStatus = (notificationDetails, type) => {
    const { userDetails } = this.state;
    let classStatus = "";
    if (notificationDetails.sstatus && notificationDetails.tstatus) {
      classStatus = "alert alert-success";
    }

    if (notificationDetails.sstatus && !notificationDetails.tstatus) {
      classStatus = "alert alert-warning";
    }

    if (!notificationDetails.sstatus && !notificationDetails.tstatus) {
      classStatus = "alert alert-danger";
    }
    const userWiseStatus =
      userDetails.role === "Teacher"
        ? `Notification from  ${notificationDetails.sname}`
        : `Notification from  ${notificationDetails.tname}`;
    return type === "message" ? userWiseStatus : classStatus;
  };

  goToNotificationDetails = notification => {
    this.props.setNotificationDetails(notification.id);
    this.props.history.push("/notificationdetails/" + notification.id);
  };

  render = () => {
    const { notificationsList, userDetails } = this.state;

    return (
      <div className="container-fluid">
        <HeaderHome
          headeTitle="My Request\Review"
          dashboardLinks={TEACHER_DASHBOARD_LINKS}
        />

        <div className="content-container">
          <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
            <Tabs
              id="tabs"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >

              <Tab eventKey="chatNotification" title="Chat ReChat Request">
                <div className="card notification-container">
                  <div className="card-body notification-container">
                    {userDetails.role === "Teacher" && (
                      <TeacherNotificationDetails />
                    )}
                    {userDetails.role === "Student" && <NotificationsDetails />}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="notification" title="Review Request">
              
              <button>Initiate Chat</button>
                <div className="card notification-container">
                  <div className="card-body notification-container">
                    <div className="filterByDate main-wrapper">
                      <Col sm={6}>
                        <FilterByDate onChangeDate={this.getDateParameter} />
                      </Col>
                    </div>
                    {notificationsList &&
                      notificationsList.map((notification, ind) => {
                        return (
                          <div className="col-12" key={ind}>
                            <div
                              className={this.notificationStatus(
                                notification,
                                "classes"
                              )}
                            >
                              <div className="container">


                                <div className="delete-notification delete-notification-icon ">
                                  <i
                                    className="fa fa-trash delete-icon"
                                    aria-hidden="true"
                                    title="Delete"
                                    onClick={() =>

                                      this.deleteNotification(
                                        notification,
                                        "deleteNotification"
                                      )
                                    }
                                  />
                                </div>
                                <div
                                  className="delete-notification"
                                  onClick={() =>
                                    this.deleteNotification(
                                      notification,
                                      "navigateNotification"
                                    )
                                  }
                                >
                                  <b>Message: </b>{" "}
                                  {this.notificationStatus(
                                    notification,
                                    "message"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {notificationsList.length == 0 ? (
                      <p className="no-Record">No Record</p>
                    ) : (
                        ""
                      )}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };
}
const mapStateToProps = state => {
  console.log("state", state);

  return {
    getNotificationMessage: state.notificationAcceptREducer.keyForNotification,
    getStudnetNotification: state.studentReducer.keyForNotification,
    getTeacherNotification: state.notificationReducer.keyForNotification
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNotificationDetails: details =>
      dispatch(setNotificationDetails(details)),
    deleteNotificationDetails: details =>
      dispatch(deleteNotificationDetails(details))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notification)
);
