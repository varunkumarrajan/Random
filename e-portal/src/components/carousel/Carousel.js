import React from 'react'
import AliceCarousel from './react-alice-carousel'
import { connect } from 'react-redux';
import "./css/_fade-animation.css";
import "./css/alice-carousel.css";
import "./css/main.css";
import { getCurriculum } from './action';

class Carousel extends React.Component {
  responsive = {
    0: { items: 2 },
    600: { items: 2 },
    960: { items: 3 }
  }

  stagePadding = {
    paddingLeft: 30,
    paddingRight: 30,
  }

  // constructor(props) {
  //   super(props);
  // }
  
  carouselModal = (imageType, imageSrc) =>{
    this.props.toggleModal(imageType, imageSrc)
  }
  componentDidMount(){
    this.props.getCurriculum();
  }
 
  render() {    
    // const numbers = [1, 2, 3, 4, 5];
    // const listNumberItems = numbers.map((number) =>
    //   <div className="item" key={number.toString()} onClick={() => this.carouselModal('video', 'https://www.youtube.com/embed/JKCgwL-IfgM')}>
    //       <iframe className="img-thumbnail" src="https://www.youtube.com/embed/JKCgwL-IfgM" frameBorder="0"></iframe><div key="layer{CurriculumRowsIndex}" className="item-over layer img-thumbnail"></div>
    //   </div>
    // );

    const { carouselAwaitingRows } = this.props;
    // console.log('--carouselAwaitingRows--', carouselAwaitingRows);
    const listAwaitingItems = carouselAwaitingRows.map((awaitingRows, index) =>
      <div className="item" key={index} onClick={() => this.carouselModal('video', awaitingRows.src)}>
          <iframe title="iframe carousel" className="img-thumbnail" src={awaitingRows.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer img-thumbnail"></div>
      </div>
    );

    const newlyAddedVideos = listAwaitingItems;
    const trendingVideos = listAwaitingItems;
    
    return (
      <React.Fragment>
      <div className="app-carousel">
      <h1>Top 10 ></h1>
        <AliceCarousel
          duration={1000}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          onSlideChanged={console.debug}
          infinite={true}
          responsive={this.responsive}
          stagePadding={this.stagePadding}
          autoPlay={true}
        > 
          {listAwaitingItems}          
        </AliceCarousel>        
      </div>

      <div className="app-carousel">
      <h1>NEWLY ADDED VIDEOS ></h1>
        <AliceCarousel
          duration={1000}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          onSlideChanged={console.debug}
          infinite={true}
          responsive={this.responsive}
          stagePadding={this.stagePadding}
          autoPlay={false}
        > 
          {newlyAddedVideos}          
        </AliceCarousel>        
      </div>

      <div className="app-carousel">
      <h1>TRENDING VIDEOS  ></h1>
        <AliceCarousel
          duration={1000}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          onSlideChanged={console.debug}
          infinite={true}
          responsive={this.responsive}
          stagePadding={this.stagePadding}
          autoPlay={false}
        > 
          {trendingVideos}          
        </AliceCarousel>        
      </div>      
     </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
      carouselAwaitingRows: state.carouselStore.carouselData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),        
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
