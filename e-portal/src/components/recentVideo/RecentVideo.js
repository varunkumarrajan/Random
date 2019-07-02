import React, { Component } from "react";
// Date format Plugin
import moment from "moment";
// Slider Component Plugin
import Slider from "react-slick";
import "./RecentVideo.scss";

// Video Item Component
import VideoItem from "../../components/videoItem/VideoItem";
import GLOBAL_VARIABLES from "../../config/config";

class RecentVideo extends Component {
  createChildren = records => {
    return records.map((carouselRecord, index) => {
      carouselRecord.date = carouselRecord.created
        ? moment(carouselRecord.created.toDate()).fromNow()
        : "";
      carouselRecord.thumb = carouselRecord.thumb
        ? carouselRecord.thumb
        : GLOBAL_VARIABLES.VIDEO_PLACEHOLDER;

      return (
        <div key={index} className="vd-wrapper col-xs-12">
          <VideoItem
            isNotVisibleVideoMeta={this.props.isNotVisibleVideoMeta}
            videoDetails={carouselRecord}
          />
        </div>
      );
    });
  };

  render() {
    const { headeTitle, carousellistNewlyItems } = this.props;
    const title = headeTitle ? headeTitle : "Recent Videos";
    const settingsNewlyItems = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:
        carousellistNewlyItems.length >= 7 ? 7 : carousellistNewlyItems.length,
      slidesToScroll: 1,
      autoplay: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              carousellistNewlyItems.length >= 3
                ? 3
                : carousellistNewlyItems.length,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow:
              carousellistNewlyItems.length >= 2
                ? 2
                : carousellistNewlyItems.length,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow:
              carousellistNewlyItems.length >= 2
                ? 2
                : carousellistNewlyItems.length,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="col-12 content-container--background container-margin-20">
        <h4 className="mt-30">{title}</h4>
        <div className="tray-background--color text-center">
          {carousellistNewlyItems.length > 0 && (
            <Slider {...settingsNewlyItems}>
              {this.createChildren(carousellistNewlyItems)}
            </Slider>
          )}
          {carousellistNewlyItems.length === 0 && (
            <span>
              <b>No Records</b>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default RecentVideo;
