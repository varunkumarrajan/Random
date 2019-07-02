import React, { Component } from "react";
import { Launcher } from "react-chat-window";

import {
  getChatFromDB,
  saveIndividualChatToDB
} from "./../../database/dal/firebase/chatDal";

class Chat extends Component {
  state = {
    messageList: []
  };

  componentDidMount = async () => {
    const { data: {sId, tId} } = this.props;
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
    await getChatFromDB(sId, tId).onSnapshot(doc => {
        if (doc.exists && doc.data().messageList.length > 0) {
            this.setState({
                messageList: doc.data().messageList
            });            
        }
    });    
  }

  onMessageWasSent = async message => {
    const { data: {sId, tId} } = this.props;
    const {
        userDetails: { userId }
    } = this.state;
    console.log(userId,sId)
    message.author = (sId === userId) ? 'me' : 'them';
    await this.setState({
      messageList: [...this.state.messageList, message]
    });
    saveIndividualChatToDB(sId, tId, this.state.messageList);
  };

  render() {
    const { data: {sId, tId} } = this.props;
    const { userDetails } = this.state;
    console.log(sId,tId)
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName : 'app sab ki chat',
            imageUrl: ""
          }}
          onMessageWasSent={this.onMessageWasSent}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}

export default Chat;
