import React, { Component } from "react";

import Slider from "react-slick";
import BlogItem from "./blogItem";
import { Link } from "react-router-dom";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ""
    };
  }

  blogListChildren = records => {
    const blogList = records.map((carouselRecord, index) => {
      return (
        <div key={index} className="vd-wrapper">
          <Link
            className="nav-link"
            style={{ padding: "0px" }}
            to={`/blog/view/${carouselRecord.feedback.id}`}
            title={carouselRecord.name}
          >
            <BlogItem blogDetails={carouselRecord} />
          </Link>
        </div>
      );
    });

    return blogList;
  };

  render() {
    const { blogList } = this.props;
    let title = "";
    this.props.headeTitle
      ? (title = this.props.headeTitle)
      : (title = "Feedback");

    const settingsBlogList = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: blogList.length >= 6 ? 6 : blogList.length,
      slidesToScroll: 1,
      autoplay: false,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <React.Fragment>
        {blogList.length > 0 && (
          <div className="col-12 content-container--background container-margin-20">
            <h4 className="mt-30 pad10">{title}</h4>
            <div>
              <Slider {...settingsBlogList}>
                {this.blogListChildren(blogList)}
              </Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Blog;
