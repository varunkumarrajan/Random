import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Navbar from "../../../shared/components/Navbar";

class Footer extends Component {
  render() {
    return (
      <div className="col-12 main-wrapper">
        <Navbar />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Footer)
);
