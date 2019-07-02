import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./navbar.scss";
import {
  TEACHER_DASHBOARD_LINKS,
  STUDENT_DASHBOARD_LINKS
} from "./../../../constant/Constant";

class Navbar extends Component {
  render = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const links =
      user && user.role === "Teacher"
        ? TEACHER_DASHBOARD_LINKS
        : STUDENT_DASHBOARD_LINKS;
    return (
      <footer
        className="header-container"
        style={{ top: "unset", bottom: "0px" }}
      >
        {user &&
          links &&
          links.map((link, index) => {
            return (
              <div
                key={index}
                className="home-header-nav-item home-header-nav-item--position unset-style"
              >
                <NavLink
                  to={link.link}
                  exact
                  activeClassName="active"
                  className="home-header-link"
                  title={link.title}
                >
                  <i className={link.icon} aria-hidden="true" />
                  <span
                    className="home-header-text-link-status"
                    style={link.style}
                  >
                    {link.name}
                  </span>
                </NavLink>
              </div>
            );
          })}
      </footer>
    );
  };
}
export default withRouter(Navbar);
