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
    this.handleScroll = this.handleScroll.bind(this);
  }

  public ref: any;

  public handleScroll(oEvent: any) {
    let oDom = oEvent.target;
    let iScrollTop = oDom.scrollTop;
    window.localStorage.setItem('messages:scroll-top', iScrollTop);
  }

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

  public componentDidMount() {
    let sScrollTop = window.localStorage.getItem('messages:scroll-top');
    let iScrollTop = parseInt(sScrollTop);
    this.ref.current.scrollTop = 'number'=== typeof (iScrollTop) ? iScrollTop : this.ref.current.scrollHeight;
  }

  public componentDidUpdate(oPreviousProps: any, oPreviousState: any, oSnapshot: any) {
    if (oPreviousState.roomMessages.length !== this.state.roomMessages.length) {
      this.ref.current.scrollTop = this.ref.current.scrollHeight;
    }
  }

  public render() {

    return (
      <div ref={this.ref} className="messages p-2 overflow-auto" onScroll={this.handleScroll}>
        {this.state.roomMessages.map((oMessage: any, iIndex: any) => (
        <Message
          role={oMessage.user.role}
          icon={oMessage.user.url}
          src={oMessage.src}
          text={oMessage.text}
          time={oMessage.addedTime}
          name={oMessage.user.nickname}
          userId={oMessage.user._id}
          messageId={oMessage._id}
          />))}
      </div>
    );
  }
}

export default Messages;
