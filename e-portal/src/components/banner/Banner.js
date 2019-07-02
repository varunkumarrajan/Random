import React, { Component } from "react";
import GLOBAL_VARIABLES from "../../config/config";
import Slider from "react-slick";

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ""
    };
  }

  render() {
    const { bannerRows, pageName } = this.props;
    const settingsBanner = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true
    };

    let listAwaitingItems = "";
    if (bannerRows && bannerRows.length > 0) {
      listAwaitingItems = bannerRows.map((bannerRow, index) => (
        <div key={index}>
          {bannerRow.banner_image && (
            <React.Fragment>
              <img
                alt=""
                src={
                  GLOBAL_VARIABLES.BANNER_PATH +
                  pageName +
                  "/" +
                  bannerRow.banner_image
                }
                className="d-block banner"
              />

              {/* <div className="caption-wrapper">
                <div className="container-fluid">
                  <h1>Free</h1>
                  <h2>Online Courses from experts</h2>
                  <p>We are proud to say that since our opening in 2019</p>
                </div>
              </div> */}
            </React.Fragment>
          )}
        </div>
      ));
    }
    return (
      <React.Fragment>
        {listAwaitingItems.length > 0 && (
          <div className="col-12 content-container--background col-without--padding">
            <div className="banner-container" style={{ textAlign: "center" }}>
              <Slider {...settingsBanner}>{listAwaitingItems}</Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Banner;
