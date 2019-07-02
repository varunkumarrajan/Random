import React, { Component } from 'react';

import './StatusCircle.css';

class StatusCircle extends Component {
  state = {
    modalOpen: false,
    userDetails: ''
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userProfile'))
    });
  };

  render() {
    const {
      backgroundColor,
      foregroundColor,
      height,
      width,
      payload
    } = this.props;

    return (
      <div
        className="status-container"
        style={{
          background: backgroundColor,
          color: foregroundColor,
          height: height,
          width: width
        }}
      >
        <span>{payload}</span>
      </div>
    );
  }
}

export default StatusCircle;
