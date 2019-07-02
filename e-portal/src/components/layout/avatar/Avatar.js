import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  ButtonToolbar,
  OverlayTrigger,
  Popover,
  Button
} from "react-bootstrap";
import "./index.css";
import AuthGuard from "../../../authguard/AuthGuard";
import * as actionTypesAuth from "../../../authguard/actions";
class Avatar extends Component {
  navigateTo = linkName => {
    this.props.history.push(linkName);
  };

  render() {
    const { dashboardLinks } = this.props;
    return (
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          rootClose
          overlay={
            <Popover
              id="popover-positioned-bottom"
              title={
                this.props.userProfile.firstName +
                " " +
                this.props.userProfile.lastName
              }
            >
              {dashboardLinks &&
                dashboardLinks.map((link, index) => {
                  const href = link.link;
                  return (
                    <div
                      key={index}
                      className="avatar-item"
                      onClick={() => this.navigateTo(href)}
                    >
                      <i className={link.icon}> {link.name}</i>{" "}
                    </div>
                  );
                })}

              <div
                className="avatar-item"
                onClick={() => this.navigateTo("/profile")}
              >
                <i className="fa fa-user"> Profile</i>{" "}
              </div>
              {this.props.currentUser.additionalUserInfo.providerId ===
                "password" && (
                <div
                  className="avatar-item"
                  onClick={() => this.navigateTo("/changePassword")}
                >
                  <i className="fa fa-refresh"> Change Password</i>{" "}
                </div>
              )}
              <div
                className="avatar-item"
                onClick={() =>
                  AuthGuard.signout(() => {
                    this.props.setAuthenticationStatus(false);
                    this.navigateTo("/home");
                  })
                }
              >
                <i className="fa fa-sign-out"> Sign Out</i>{" "}
              </div>
            </Popover>
          }
        >
          <Button variant="default" className="custom-btn">
            <i className="fa fa-user-circle home-header-nav-item home-header-nav-item--position avatar-icon" />
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAuthenticationStatus: value => {
      dispatch({ type: actionTypesAuth.AUTHENTICATION_STATUS, payload: value });
    }
  };
};
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Avatar)
);
