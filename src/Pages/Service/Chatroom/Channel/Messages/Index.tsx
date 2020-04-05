import React from 'react';
import moment from 'moment';
import { EventEmitter } from "events";

import store from '@/store';


import {
  EmitterHelper
} from '@/Helpers/';

import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

import Message from './Message/Index';
import ScrollButton from './ScrollButton/Index';

import './Index.scss';

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');

moment.locale(MOMENT.LOCALE);
let oEventEmitter = new EventEmitter();

class Messages extends React.Component {
  public constructor(oProps: any) {
    super(oProps);
    this.ref = React.createRef();
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.setScrollTop = this.setScrollTop.bind(this);
    this.scrollTopToPosition = this.scrollTopToPosition.bind(this);
    this.scrollTopToBottom = this.scrollTopToBottom.bind(this);
    this.scrollTopToBottomForce = this.scrollTopToBottomForce.bind(this);

    store.subscribe(() => {
      let oState = store.getState();
      let aRoomMessages = oState.roomMessages;
      let oUsers = oState.users; // TODO
      let sRoomId = oState.roomId; // TODO

      let _oState = {
        roomMessages: aRoomMessages,
        users: oUsers,
        roomId: sRoomId,
      };
      this.setState(_oState);
    });

  }

  public ref: any;
  public eventEmitter: any;
  public onScroll(oEvent: any) {
    this.setScrollTop();
  }

  public setScrollTop() {
    let oDom = this.ref.current;

    let sScrollTopRatio = oDom.scrollHeight - oDom.offsetHeight > 0 ? (oDom.scrollTop / (oDom.scrollHeight - oDom.offsetHeight)).toString() : '1';
    window.sessionStorage.setItem('messages:scroll-top-ratio', sScrollTopRatio);
    window.sessionStorage.setItem('messages:scroll-height', oDom.scrollHeight);

    let iScrollTopRatio = Number(sScrollTopRatio);
    let oState = {
      scrollTopRatio: iScrollTopRatio
    };
    this.setState(oState);
  }

  public setScrollHeight() {
    let oDom = this.ref.current;

    window.sessionStorage.setItem('messages:scroll-height', oDom.scrollHeight);

  }

  public onResize(oEvent: any) {
    this.scrollTopToPosition();
  }

  public scrollTopToPosition() {
    let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');
    let sScrollHeight = window.sessionStorage.getItem('messages:scroll-height');

    let iScrollTopRatio = Number(sScrollTopRatio);
    let oState = {
      scrollTopRatio: iScrollTopRatio
    };
    this.setState(oState);
    let iScrollHeight = Number(sScrollHeight);
    // <img src=... 还没读取完毕... 不改变 scrollTop
    if(this.ref.current.scrollHeight >= iScrollHeight) {
      this.ref.current.scrollTop = iScrollTopRatio * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
    }

  }

  public scrollTopToBottom() {
    let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');
    let sScrollHeight = window.sessionStorage.getItem('messages:scroll-height');

    let iScrollTopRatio = Number(sScrollTopRatio);
    let iScrollHeight = Number(sScrollHeight);

    // 只有 scroll 最底下 时候, 接收到讯息才会自动到最下面
    if (1 === iScrollTopRatio && this.ref.current.scrollHeight > iScrollHeight) {
      this.ref.current.scrollTop = 1 * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
    }
  }

  public scrollTopToBottomForce() {
    window.sessionStorage.setItem('messages:scroll-top-ratio', '1');
    this.ref.current.scrollTop = 1 * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
  }

  public componentWillMount() {


  }
  
  public state: any = {
    roomMessages: [],
    words: [],
    users: {},
    scrollTopRatio: 1
  };

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.eventEmitter = EmitterHelper.on('messagesScrollToBottom', this.scrollTopToBottomForce);

    let sScrollTopRatio = window.sessionStorage.getItem('messages:scroll-top-ratio');

    let iScrollTopRatio = Number(sScrollTopRatio);

    let oState = store.getState();
    let aRoomMessages = oState.roomMessages;
    let oUsers = oState.users; // TODO
    let sRoomId = oState.roomId; // TODO

    let _oState = {
      roomMessages: aRoomMessages,
      roomId: sRoomId,
      users: oUsers,
      scrollTopRatio: iScrollTopRatio
    };
    this.setState(_oState);

  }

  public componentDidUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public componentWillUpdate() {
  }

  public componentDidUpdate(oPreviousProps: any, oPreviousState: any) {
    if (oPreviousState.roomMessages.length === 0 && oPreviousState.roomMessages.length < this.state.roomMessages.length) {
      this.scrollTopToPosition();
      return;
    }

    if (oPreviousState.roomMessages.length !== this.state.roomMessages.length) {
      this.scrollTopToPosition();
      return;
    }

  }

  public render() {
    let aMessages = this.state.roomId && this.state.roomMessages && this.state.roomMessages[this.state.roomId] && this.state.roomMessages[this.state.roomId].messages ? this.state.roomMessages[this.state.roomId].messages : []
    return (
      <div className="position-relative">
        <div ref={this.ref} className="messages pt-4 pl-2 pr-2 pb-2 overflow-auto" onScroll={this.onScroll}>
          {aMessages.map((oMessage: any, iIndex: any) => (
          <Message
            src={oMessage.src}
            text={oMessage.text}
            time={oMessage.addedTime}
            userId={oMessage.user_id}
            messageId={oMessage._id}
            uploaderId={oMessage.uploaderId ? oMessage.uploaderId : ""}
            loading={oMessage.loading ? oMessage.loading : false}
            scrollTopToBottom={this.scrollTopToBottom}
            scrollTopToPosition={this.scrollTopToPosition}
            setScrollHeight={this.setScrollHeight}
            />))
          }
        </div>
        <ScrollButton
          className={this.state.scrollTopRatio === 1 ? "d-none" : ""}
          onClick={this.scrollTopToBottomForce}/>
      </div>

    );
  }
}

export default Messages;
