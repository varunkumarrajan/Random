import React from 'react';
import { Link } from 'react-router-dom';
import './Slider.scss';
import { connect } from "react-redux";
import { openModal } from './action';


import ItemsCarousel from 'react-items-carousel';
import "./Slider.scss";

class Slider extends React.Component {

  componentWillMount() {
    // const carouselRows = this.props.carouselRecords;
    this.setState({
      children: [],
      activeItemIndex: 0
      // carouselRows: carouselRows
    });
    setTimeout(() => {
      if (this.props.listTop10Items) {
        this.setState({
          children: this.createChildren(this.props.listTop10Items)
        });
      }

      if (this.props.listNewlyItems) {
        this.setState({
          children: this.createChildren(this.props.listNewlyItems)
        });
      }

      if (this.props.studentsReview) {
        this.setState({
          children: this.studentsReviewChildren(this.props.studentsReview)
        });
      }
    }, 100);
  }

  daysBetween(date1_seconds, date2_seconds) {
    if (date1_seconds && date2_seconds) {
      const one_day = 60 * 60 * 24;
      var difference_ms = Math.abs(date1_seconds - date2_seconds);
      return Math.round(difference_ms / one_day);
    } else {
      return "";
    }
  }
  // method for opening modal with teacher details
  teacherDetails = (carouselRecord) => {
    this.props.openModalForTeacher(carouselRecord);
  }

  

  listTop10Children = (records) => records.map((carouselRecord, index) => {
    const moreSymbol = '...';
    const today = Date.now() / 1000; // convert into second
    var noOfDays = this.daysBetween(carouselRecord.created_date ? carouselRecord.created_date.seconds : '', today);
    return (
      <div key={index} className="vd-wrapper">
         {/* onClick={() => this.teacherDetails(carouselRecord)} */}
         
        <Link className="nav-link" to={this.props.relativePath+'/1'} title={carouselRecord.name}>
          <div key={index} style={{ height: 150, background: '#000' }} className="vd-wrapper">
            {/* <iframe key={index} className="d-block w-100" src={carouselRecord.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div> */}
            <img alt="" src={carouselRecord.profile_image} />
          </div>

          <div className="vd-content">
            <h5>{
              (carouselRecord.name.length > 50) ? carouselRecord.name.substring(0, 50) + (moreSymbol) : (carouselRecord.name)} <i className="fas fa-ellipsis-v"></i></h5>
            <p>Rating. {carouselRecord.rating} and registered {noOfDays} days ago</p>
          </div>
        </Link>
      </div>
    )
  });
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });


  // createChildren = n => ['aa','bb','cc', 'ddd', 'ee','ff','gg','hh'].map(i => {
  //   let imgPath = "https://i.pinimg.com/originals/66/24/96/6624960f0062bd8b8845037c6776277c.jpg";
  //   return (
  //     <div key={i} style={{ height: 150, background: '#000' }} className="vd-wrapper">
  //       <img src={imgPath}/>
  //     </div>
  //   )
  // });

  createChildren = records =>
    records.map((carouselRecord, index) => {
      const moreSymbol = "...";
      const today = Date.now() / 1000; // convert into second
      var noOfDays = this.daysBetween(
        carouselRecord.created_date ? carouselRecord.created_date.seconds : "",
        today
      );

      let title = "";
      let profileImg = "";
      let rating = "";

      if (carouselRecord.name) {
        title = carouselRecord.name;
      } else if (carouselRecord.title) {
        title = carouselRecord.title;
      }

      if (carouselRecord.profile_image) {
        profileImg = carouselRecord.profile_image;
      } else {
        profileImg =
          "https://images.pexels.com/photos/901236/pexels-photo-901236.jpeg";
      }

      if (carouselRecord.rating) {
        rating = carouselRecord.rating;
      }

      if (carouselRecord.views) {
        rating = carouselRecord.views;
      }

      return (
        <div key={index} className="vd-wrapper"  onClick={() => this.teacherDetails(carouselRecord)}>
           <Link className="nav-link" to={this.props.relativePath+`/${index}`} title={carouselRecord.name}>
            <div
              key={index}
              style={{ height: 150, background: "#000" }}
              className="vd-wrapper"
            >
              {/* <iframe key={index} className="d-block w-100" src={carouselRecord.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div> */}
              <img alt="" src={profileImg} />
            </div>

            <div className="vd-content">
              <h5>
                {title.length > 50
                  ? title.substring(0, 50) + moreSymbol
                  : title}{" "}
                <i className="fas fa-ellipsis-v" />
              </h5>
              <p>
                Rating. {rating} and registered {noOfDays} days ago
              </p>
            </div>
          </Link>
        </div>
      );
    });

  studentsReviewChildren = records =>
    records.map((carouselRecord, index) => {
      const moreSymbol = "...";
      const stopSymbol = ".";
      return (
        <div key={index} className="vd-wrapper border_1px">
          <a href="#1" title={carouselRecord.name}>
            <div
              key={index}
              className="pad5 left"
              style={{ width: 170, height: 80 }}
            >
              <img alt="" src={carouselRecord.profile_image} />
            </div>
            <div className="pad5 left label-color">
              <h5>
                {carouselRecord.name.length > 50
                  ? carouselRecord.name.substring(0, 50) + moreSymbol
                  : carouselRecord.name}
              </h5>
            </div>
            <div className="clear" />
            <p className="pad5 label-color">
              {carouselRecord.comment.length > 130
                ? carouselRecord.comment.substring(0, 130) + moreSymbol
                : carouselRecord.comment + stopSymbol}
            </p>
          </a>
        </div>
      );
    });

  render() {
    const { activeItemIndex, children } = this.state;
    return (
      <div>
        {this.props.children}
        <ItemsCarousel
          // Placeholder configurations
          // enablePlaceholder
          // numberOfPlaceholderItems={5}
          // minimumPlaceholderTime={1000}
          // placeholderItem={<div style={{ height: 150, background: '#900' }}>Placeholder</div>}

          // Carousel configurations
          numberOfCards={5}
          gutter={5}
          showSlither={true}
          firstAndLastGutter={true}
          freeScrolling={false}

          // Active item configurations
          requestToChangeActive={this.changeActiveItem}
          activeItemIndex={activeItemIndex}
          activePosition={'center'}

          chevronWidth={24}
          rightChevron={'>'}
          leftChevron={'<'}
          // Active item configurations
          /* requestToChangeActive={this.changeActiveItem}
          activeItemIndex={activeItemIndex}
          activePosition={"center"}
          chevronWidth={24}
          rightChevron={">"}
          leftChevron={"<"} */
          outsideChevron={false}
        >
          {children}
        </ItemsCarousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    carouselRows: state.homeReducerStore.carouselData,
    teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalForTeacher: (carouselRecord) => dispatch(openModal({'value': carouselRecord})),
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Slider);
