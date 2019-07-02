import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";

class ContactUs extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="ContactUs" />

        <div className="content-container">Contact Us</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
