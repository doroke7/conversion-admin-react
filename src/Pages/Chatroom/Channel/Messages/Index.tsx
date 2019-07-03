import React from 'react';
import { findDOMNode } from 'react-dom';

import store from '@/store';
import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

import Message from './Message/Index';
import './Index.scss';

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');



class Messages extends React.Component {
  public constructor(oProps: any) {
    super(oProps);
    this.ref = React.createRef();
  }

  public ref: any;

  public componentWillMount() {
    store.subscribe(() => {
      let oState = store.getState();
      let aRoomMessages = oState.roomMessages;
      let _oState = {
        roomMessages: aRoomMessages
      };
      this.setState(_oState);
    });

  }
  
  public state: any = {
    roomMessages: []
  };

  public componentDidUpdate() {
    let oDom = this.ref.current;
    oDom.scrollTop = oDom.scrollHeight;
  }
  public render() {

    return (
      <div ref={this.ref} className="messages p-2 overflow-auto">
        {this.state.roomMessages.map((oMessage: any, iIndex: any) => (
        <Message
          role={oMessage.user.role}
          icon={oMessage.user.url}
          src={oMessage.src}
          text={oMessage.text}
          time={oMessage.addedTime}
          name={oMessage.user.nickname}
          userId={oMessage.user._id}

          />))}
      </div>
    );
  }
}

export default Messages;
