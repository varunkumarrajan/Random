import React, { Component } from 'react';
import NavBar from '../../../shared/components/Navbar';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { getNotification, getTeachers, getStudents } from '../../Teacher/Notification/notificationAction';

class Notifications extends Component {
    state = {}

    componentDidMount() {
        const loggedInUSer = JSON.parse(localStorage.getItem('user'));
        if (this.props.notificationDetails != null) {
            console.log(" 1componentDidMount Notification details", this.props.notificationDetails)
        }
        //console.log(this.props.notificationDetails);

        this.props.getTeachers("55dh2K881oSaWBFn8mZOGiSeTny2");
        //this.props.getStudents("DrFophiJl9PsAZhrhFzd11opaPH2");
    }
    render() {
        //console.log("render Notification details", this.props.notificationDetails);
        const teacherName = "Sachin Tyagi";
        // const { notificationDetails } = this.props.notificationDetails;

        return (
            <div className="row margin-bottom">
                <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4>Notification</h4><hr />
                            {Object.keys(this.props.notificationDetails).map((notificationDetail) => (

                                <Link>
                                    <div className="alert alert-info">
                                        <div style={{ float: "left" }}><img src="../Assets/hdpi/avatar.png" name="aboutme" width="70" height="50" border="0" className="img-circle" /></div>
                                        <div style={{ float: "left" }} className="container" onClick={this.onOpenModal} style={{ cursor: "pointer" }}>

                                            <div className="alert-icon">
                                                <i className="material-icons">From {teacherName} </i>
                                            </div>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                            </button>

                                            <b>Message:</b> {this.props.notificationDetails[notificationDetail].comment[0].details}
                                        </div>
                                        {this.props.notificationDetails[notificationDetail].paymentStatus != false ? <button type="button" className="btn btn-success" data-dismiss="modal">Start Chat</button> : <div></div>}

                                    </div>

                                </Link>
                            ))
                            }




                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        teacherDetails: state.notificationReducer.teacherDetails,
    }
}
const mapDispatchToProps = dispatch => {
    console.log("dispatched action")
    return {

        getTeachers: (uid) => dispatch(getTeachers(uid)),

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));
