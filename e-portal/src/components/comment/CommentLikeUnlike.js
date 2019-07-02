import React, { Component } from "react";
import Like from "../../shared/components/like/Like";
import Dislike from "../../shared/components/dislike/Dislike";
import { saveLike } from "../../database/dal/firebase/commentDal";

class CommentLikeUnlike extends Component {
  constructor(props) {
      super(props);
      this.state = {
        like: 0,
        dislike: 0,
        userRating: {},
        totalLike:0,
        totalDisLike: 0,
        feedbackby:''
      };
  }

  componentDidMount(){
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null;
      this.user = user;
  }
    
  /* Like Dislike */
  handleLikeDislike= (commentId, currentButton, feedbackby) => {
    if (this.user) {
        const userId = this.user.user.uid;         

        if (currentButton) {            
          // this.getFeedbackByData(commentId, (properties) => {
                
          //   const getFeedback = properties.feedbackby;
          //   const getPrevFeedback = getFeedback ? getFeedback.filter(
          //       function(feedback) {                      
          //           return feedback.userId !== userId;
          //       }
          //   ) : '';
          //   this.setState({
          //     feedbackby : getPrevFeedback
          //   })
          // });
          
          const getPrevFeedback = feedbackby ? feedbackby.filter(
              function(feedback) {                      
                  return feedback.userId !== userId;
              }
          ) : '';     
          
          const userRating = this.setUserRating(userId, getPrevFeedback, currentButton);
            saveLike(commentId, userRating).then(success=>{
            }, error=> error.message);
        }
    };        
  }

  setUserRating = (userId, getPrevFeedback, userLikeDislike) => {
                
    let totalLike = getPrevFeedback? this.getTotalLike(getPrevFeedback): 0;
    let totalDisLike = getPrevFeedback? this.getTotalDisLike(getPrevFeedback): 0;           
    
    let like;
    let disLike;

    if(userLikeDislike === 'like'){
      like = 1;
      disLike = 0;
      totalLike +=1;
      this.setState({userLike: true})
    } else if(userLikeDislike === 'dislike'){ 
      like = 0;
      disLike = 1;
      totalDisLike +=1;
      this.setState({userDislike: true})
    } else {
      like = 0;
      disLike = 0;
    }

    let userRating = '';
    if(getPrevFeedback){
      getPrevFeedback.push({
        'like': like,
        'dislike':disLike,
        'userId':userId,
        'created_date': new Date()
      });

      userRating = {'feedbackby': getPrevFeedback,
      'like': totalLike,
      'dislike': totalDisLike
      };
    } else {
        userRating = {'feedbackby':[{
            'like': like,
            'dislike':disLike,
            'userId':userId,
            'created_date': new Date()
            }
        ],
        'like': like,
        'dislike':disLike
      };
    }
    return userRating;
  }
    
  getTotalLike(ratings) {
    if(ratings){
      const totalLikeObj = ratings.filter(user => user.like === 1);
      return totalLikeObj.length;
    } else {
      return 0;
    }
  }

  getTotalDisLike(ratings) {
    if(ratings){
      const totalDislikeObj = ratings.filter(user => user.dislike === 1);
      return totalDislikeObj.length;
    } else {
      return 0;
    }
  }

  render() {
    const { feedbackId, totalLike, totalUnLike, userLike, userDislike, feedbackby } = this.props;

    const isLogedIn = localStorage.getItem("user");
    return (
      <div className="icon-section d-flex">
        <div className="icon">
          <Like
            isDisabled={!isLogedIn}
            userLike={userLike}
            totalLike={totalLike}
            onLike={e => this.handleLikeDislike(feedbackId, "like", feedbackby)}
          />
        </div>
        <div className="icon">
          <Dislike
            isDisabled={!isLogedIn}
            userDislike={userDislike}
            totalDislike={totalUnLike}
            onDislike={e => this.handleLikeDislike(feedbackId, "dislike", feedbackby)}
          />
        </div>
        <div className="icon">
          <button className="btn btn-transparent" disabled={!isLogedIn}>
            <i className="fas fa-comment-alt" />
          </button>
        </div>
      </div>
    );
  }
}

export default CommentLikeUnlike;
