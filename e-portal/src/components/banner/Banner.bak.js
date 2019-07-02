import React, { Component } from "react";
import { handleResize } from "../../shared/library/window_resize";
import Slider from "react-slick";

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ""
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", handleResize);
  }

  componentDidMount = () => {
    handleResize(prop => {
      this.setState({
        noOfCarouselImage: prop.noOfCarouselImage
      });
    });
    window.addEventListener("resize", () => {
      handleResize(prop => {
        this.setState({
          noOfCarouselImage: prop.noOfCarouselImage
        });
      });
    });
  };

  render() {
    const { bannerRows } = this.props;
    const settingsBanner = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };

    let listAwaitingItems = "";
    if (bannerRows && bannerRows.length > 0) {
      listAwaitingItems = bannerRows.map((bannerRow, index) => (
        <div key={index}>
          {bannerRow.banner_image && (
            <img src={bannerRow.banner_image} className="d-block w-100" />
          )}
        </div>
      ));
    }
    return (
      <React.Fragment>
        {listAwaitingItems.length > 0 && (
          <div className="col-12 content-container--background">
            <div style={{ background: "#FFF", textAlign: "center" }}>
              <Slider {...settingsBanner}>{listAwaitingItems}</Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Banner;
