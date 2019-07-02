import React, { Component } from "react";

import "./modalpopup.css";

class Progress extends Component {
  render = () => {
    const { bgColor, progress } = this.props;
    const width = {
      width: progress + "%",
      backgroundColor: bgColor
    };
    return (
      <div className="own-progress">
        <div className="own-progress-bar" style={width}>
          {this.props.progress}%
        </div>
      </div>
    );
  };
}
export default Progress;
