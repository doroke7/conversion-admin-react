import React from 'react';
import moment from 'moment';

import store from '@/store';
import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

import Message from './Message/Index';
import './Index.scss';

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');

moment.locale(MOMENT.LOCALE);

class Messages extends React.Component {
  public constructor(oProps: any) {
    super(oProps);
    this.ref = React.createRef();
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);

  }

  public ref: any;

  public onScroll(oEvent: any) {
    let oDom = oEvent.target;
    let iScrollTopRatio = oDom.scrollHeight - oDom.offsetHeight > 0 ? (oDom.scrollTop / (oDom.scrollHeight - oDom.offsetHeight)).toString() : '1';
    window.sessionStorage.setItem('messages:scroll-top-ratio', iScrollTopRatio);
  }

  public onResize(oEvent: any) {
    let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');
    let iScrollTopRatio = Number(sScrollTopRatio);
    this.ref.current.scrollTop = iScrollTopRatio * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
  
  }

  public componentWillMount() {
    store.subscribe(() => {
      let oState = store.getState();
      let aRoomMessages = oState.roomMessages;
      let aWords = oState.words; // TODO
      let _oState = {
        roomMessages: aRoomMessages,
        words: aWords
      };
      this.setState(_oState);
    });

  }
  
  public state: any = {
    roomMessages: [],
    words: []
  };

  public componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  public componentDidUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  public componentWillUpdate() {
  }

  public componentDidUpdate(oPreviousProps: any, oPreviousState: any) {

    if (oPreviousState.roomMessages.length === 0 && oPreviousState.roomMessages.length < this.state.roomMessages.length) {
      let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');
      let iScrollTopRatio = Number(sScrollTopRatio);
      this.ref.current.scrollTop = iScrollTopRatio * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
      return;
    }

    if (oPreviousState.roomMessages.length !== this.state.roomMessages.length) {
      this.ref.current.scrollTop = this.ref.current.scrollHeight;
      return;
    }

  }

  public render() {
    console.log(this.state.roomMessages);
    return (
      <div ref={this.ref} className="messages p-2 overflow-auto" onScroll={this.onScroll}>
        {this.state.roomMessages.map((oMessage: any, iIndex: any) => (
        <Message
          role={oMessage.user.role}
          icon={oMessage.user.url}
          src={oMessage.src}
          text={oMessage.text}
          time={moment(oMessage.addedTime).format(MOMENT.FORMAT)}
          name={oMessage.user.nickname}
          userId={oMessage.user._id}
          messageId={oMessage._id}
          loading={oMessage.loading}
          />))}
      </div>
    );
  }
}

export default Messages;
