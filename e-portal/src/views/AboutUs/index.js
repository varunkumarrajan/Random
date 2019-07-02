import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";

class AboutUs extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="AboutUs" />
        <div className="content-container">About Us</div>
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
)(AboutUs);
