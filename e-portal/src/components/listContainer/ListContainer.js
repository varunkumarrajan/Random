import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TeacherItem from '../teacherItem/TeacherItem';
import VideoItem from '../videoItem/VideoItem';
import InfiniteScroll from 'react-infinite-scroll-component';

class ListContainer extends Component {
  state = {
    teacherList: [],
    noOfTeacherItems: 4
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    const teachers = nextProps.itemList.slice(0, 4);
    this.setState({ teacherList: teachers });
  }

  fetchNextTeacherItems = () => {
    const itemCounter = this.state.noOfTeacherItems + 4;
    const newItems = this.props.itemList.slice(
      this.state.noOfTeacherItems,
      itemCounter
    );
    const updatedTeacherList = [...this.state.teacherList, ...newItems];

    this.setState({
      teacherList: updatedTeacherList,
      noOfTeacherItems: itemCounter
    });
  };

  render() {
    const { listType, itemList } = this.props;
    const videoList = itemList.map((item, index) => {
      return (
        <div key={index} className="col-xs-12">
          <Link
            className="nav-link"
            style={{ padding: '0px' }}
            to={`/home/teacher/${item.userId}`}
            title={item.firstName}
          >
            <VideoItem videoDetails={item} />;
          </Link>
        </div>
      );
    });

    return (
      <React.Fragment>
        {listType === 'Teacher' && (
          <div className="row row-without--margin">
            <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8  content-container--background col-without--padding list-container--margin">
              <div style={{ textAlign: 'center' }}>
                <InfiniteScroll
                  dataLength={this.state.teacherList.length}
                  next={this.fetchNextTeacherItems}
                  hasMore={true}
                >
                  {this.state.teacherList.map((item, index) => (
                    <Link
                      key={index}
                      className="nav-link"
                      style={{ padding: '0px' }}
                      to={`/home/teacher/${item.userId}`}
                      title={item.firstName}
                    >
                      <TeacherItem userProfile={item} isTrayItem={true} />
                    </Link>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        )}
        {listType === 'Video' && (
          <div className="col-12 content-container--background">
            <div style={{ background: '#FFF', textAlign: 'center' }}>
              {videoList}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ListContainer;
