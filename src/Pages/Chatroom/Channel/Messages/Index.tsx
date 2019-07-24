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
    this.scrollTopToPosition = this.scrollTopToPosition.bind(this);
    this.scrollTopToBottom = this.scrollTopToBottom.bind(this);

    let _oState;
    store.subscribe(() => {
      let oState = store.getState();
      let aRoomMessages = oState.roomMessages;
      let aWords = oState.words; // TODO
      let _oState = {
        roomMessages: [...aRoomMessages],
        words: aWords
      };
      _oState = { ..._oState};
      this.setState(_oState);
    });

  }

  public ref: any;

  public onScroll(oEvent: any) {
    let oDom = oEvent.target;
    let iScrollTopRatio = oDom.scrollHeight - oDom.offsetHeight > 0 ? (oDom.scrollTop / (oDom.scrollHeight - oDom.offsetHeight)).toString() : '1';
    window.sessionStorage.setItem('messages:scroll-top-ratio', iScrollTopRatio);
    window.sessionStorage.setItem('messages:scroll-height', oDom.scrollHeight);

    console.log(this.ref.current.scrollTop, this.ref.current.scrollHeight, this.ref.current.offsetHeight);

  }

  public onResize(oEvent: any) {
    this.scrollTopToPosition();
  }

  public scrollTopToPosition() {
    let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');
    let sScrollHeight = window.sessionStorage.getItem('messages:scroll-height');

    let iScrollTopRatio = Number(sScrollTopRatio);
    let iScrollHeight = Number(sScrollHeight);
    // <img src=... 还没读取完毕... 不改变 scrollTop
    if(this.ref.current.scrollHeight < iScrollHeight) {
      return;
    }

    this.ref.current.scrollTop = iScrollTopRatio * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
  }

  public scrollTopToBottom() {
    this.ref.current.scrollTop = 1 * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
  }

  public componentWillMount() {


  }
  
  public state: any = {
    roomMessages: [],
    words: []
  };

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
    console.log('77!!', this.ref.current.scrollTop, this.ref.current.scrollHeight, this.ref.current.offsetHeight);

  }

  public componentDidUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public componentWillUpdate() {
  }

  public componentDidUpdate(oPreviousProps: any, oPreviousState: any) {
    if (oPreviousState.roomMessages.length === 0 && oPreviousState.roomMessages.length < this.state.roomMessages.length) {
      // this.scrollTopToPosition();
      // debugger;
      return;
    }

    if (oPreviousState.roomMessages.length !== this.state.roomMessages.length) {
      this.scrollTopToPosition();
      return;
    }

  }

  public render() {
    return (
      <div ref={this.ref} className="messages pt-4 pl-2 pr-2 pb-2 overflow-auto" onScroll={this.onScroll}>
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
          uploaderId={oMessage.uploaderId}
          loading={oMessage.loading}
          scrollTopToBottom={this.scrollTopToBottom}
          scrollTopToPosition={this.scrollTopToPosition}
          />))}
      </div>
    );
  }
}

export default Messages;
