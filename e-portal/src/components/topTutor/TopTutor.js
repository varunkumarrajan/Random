import React, { Component } from "react";
// Date format Plugin
// import moment from 'moment';
// Slider Component Plugin
import Slider from "react-slick";
// Link Plugin
import { Link } from "react-router-dom";
import TeacherItem from "../../components/teacherItem/TeacherItem";

class TopTutor extends Component {
  createChildren = records => {
    const carouselRows = records.map((carouselRecord, index) => {
      // carouselRecord.noOfDays = moment(
      //   carouselRecord.createdAt.toDate()
      // ).fromNow();
      return (
        <div key={index} className="vd-wrapper  col-xs-12">
          <Link
            className="nav-link"
            style={{ padding: "0px" }}
            to={`/home/teacher/${carouselRecord.userId}`}
            title={carouselRecord.name}
          >
            <TeacherItem userProfile={carouselRecord} />
          </Link>
        </div>
      );
    });

    return carouselRows;
  };

  render() {
    const { headeTitle, carouselTop10Items } = this.props;
    const title = headeTitle ? headeTitle : "World Class Experts";

    const settingsTop10 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:
        carouselTop10Items.length >= 7 ? 7 : carouselTop10Items.length,
      slidesToScroll: 1,
      autoplay: false,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              carouselTop10Items.length >= 4 ? 4 : carouselTop10Items.length,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow:
              carouselTop10Items.length >= 2 ? 2 : carouselTop10Items.length,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow:
              carouselTop10Items.length >= 2 ? 2 : carouselTop10Items.length,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <React.Fragment>
        {carouselTop10Items.length > 0 && (
          <div className="col-12 content-container--background container-margin-20">
            <h4 className="mt-30 pad_top5">{title}</h4>
            <div className="tray-background--color">
              <Slider {...settingsTop10}>
                {this.createChildren(carouselTop10Items)}
              </Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TopTutor;
