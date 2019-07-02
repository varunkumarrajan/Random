import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Avatar from "../avatar/Avatar";
import "./HomeHeader.css";
import {TEACHER_DASHBOARD_LINKS, STUDENT_DASHBOARD_LINKS} from './../../../constant/Constant'
// import companyLogo from "../../../images/pearson-logo.png";
class Header extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default"
  };
  navigateTo = linkName => {
    this.props.history.push(linkName);
  };
  render() {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
      <header className="header-container">
        <div className="nav-btn">
          <div
            className="home-header-nav-item home-header-logo"
            style={{
              backgroundPosition: "center center",
              backgroundImage: "url('../../Assets/hdpi/logo.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain"
            }}
            onClick={() => this.navigateTo("/home")}
          />
        </div>
        {user && (
          <div className="home-header-nav-item home-header-nav-item--position">
            <Avatar dashboardLinks={(user && user.role === 'Teacher') ? TEACHER_DASHBOARD_LINKS : STUDENT_DASHBOARD_LINKS} userProfile={user} currentUser={currentUser} />
          </div>
        )}
      </header>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Header)
);
