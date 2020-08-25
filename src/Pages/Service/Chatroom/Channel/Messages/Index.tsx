import React from 'react';
import moment from 'moment';
import { EventEmitter } from 'events';
import { Service } from '@/Commons';
import store from '@/store';


import {
  EmitterHelper,
  AuthenticationHelper
} from '@/Helpers/';

import { STORAGE, SOCKET, MOMENT } from '@/CONFIGS';

import Message from './Message/Index';
import ScrollButton from './ScrollButton/Index';

import './Index.scss';

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');

moment.locale(MOMENT.LOCALE);
let oEventEmitter = new EventEmitter();

class Messages extends React.Component<any> {
  public static contextType = Service.Tool;
  public constructor(oProps: any) {
    
    super(oProps);
    
    this.ref = React.createRef();
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.setScrollTop = this.setScrollTop.bind(this);
    this.scrollTopToPosition = this.scrollTopToPosition.bind(this);
    this.scrollTopToBottom = this.scrollTopToBottom.bind(this);
    this.scrollTopToBottomForce = this.scrollTopToBottomForce.bind(this);
    this.scrollTop = this.scrollTop.bind(this);

    store.subscribe(() => {
      let oState = store.getState();
      let aRoomsMessages = oState.roomsMessages;
      let oUsers = oState.users; // TODO
      let sRoomId = oState.roomId; // TODO

      let _oState = {
        roomsMessages: aRoomsMessages,
        users: oUsers,
        roomId: sRoomId,
      };
      this.setState(_oState);
    });

  }

  public ref: any;
  public pros: any;
  public eventEmitter: any;
  public onScroll(oEvent: any) {
    this.setScrollTop();
  }

  public setScrollTop() {
    let oDom = this.ref.current;
    let sRoomId = this.state.roomId;
    let sUserId = AuthenticationHelper.getUserId();

    let fScrollTopRatio = oDom.scrollHeight - oDom.offsetHeight > 0 ? (oDom.scrollTop / (oDom.scrollHeight - oDom.offsetHeight)) : 1;
    let sScrollTopRatio = (Math.round(fScrollTopRatio * 100) / 100).toString();
    window.sessionStorage.setItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-top-ratio', sScrollTopRatio);
    window.sessionStorage.setItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-height', oDom.scrollHeight);

    let iScrollTopRatio = Number(sScrollTopRatio);
    let oState = {
      scrollTopRatio: iScrollTopRatio,
    };

    this.props.context.isScrolling = true;
    this.setState(oState);
  }

  public setScrollHeight() {
    let oDom = this.ref.current;
    let sRoomId = this.state.roomId;
    let sUserId = AuthenticationHelper.getUserId();
    window.sessionStorage.setItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-height', oDom.scrollHeight);

  }

  public onResize(oEvent: any) {
    this.scrollTopToPosition();
  }

  public scrollTopToPosition(bSetForce?: any, bScrollForce?: any) {
    let oState = store.getState();

    let sRoomId = oState.roomId; // TODO
    let sUserId = AuthenticationHelper.getUserId();
    
    let sScrollTopRatio = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-top-ratio');
    
    let sScrollHeight = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-height');

    let iScrollTopRatio = Number(sScrollTopRatio);

    if (bSetForce) {
      let _oState = {
        scrollTopRatio: iScrollTopRatio
      };
      this.setState(_oState);
          // <img src=... 还没读取完毕... 不改变 scrollTop
    }

    if (bScrollForce) {
          // <img src=... 还没读取完毕... 不改变 scrollTop
      let fScrollTop = iScrollTopRatio * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );

      this.ref.current.scrollTop = fScrollTop;
    }

  }

  public scrollTop(iLength: any){

    if (this.ref.current.scrollTop + iLength > this.ref.current.scrollHeight - this.ref.current.offsetHeight) {
      this.ref.current.scrollTop = this.ref.current.scrollTop + iLength;
      return; 
    }
    this.ref.current.scrollTop = this.ref.current.scrollHeight - this.ref.current.offsetHeight;

  }

  public scrollTopToBottom() {
    let sRoomId = this.state.roomId;
    let sUserId = AuthenticationHelper.getUserId();
    let sScrollTopRatio = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-top-ratio');
    let sScrollHeight = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-height');

    let iScrollTopRatio = Number(sScrollTopRatio);
    let iScrollHeight = Number(sScrollHeight);

    // 只有 scroll 最底下 时候, 接收到讯息才会自动到最下面
    if (1 === iScrollTopRatio && this.ref.current.scrollHeight > iScrollHeight) {
      if (this.ref.current.scrollHeight - this.ref.current.offsetHeight != this.ref.current.scrollTop){
        this.ref.current.scrollTop = 1 * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
      }
      
    }
  }

  public scrollTopToBottomForce() {
    let sRoomId = this.state.roomId;
    let sUserId = AuthenticationHelper.getUserId();
    window.sessionStorage.setItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-top-ratio', '1');
    this.ref.current.scrollTop = 1 * (this.ref.current.scrollHeight - this.ref.current.offsetHeight );
  }

  public componentWillMount() {


  }
  
  public state: any = {
    roomsMessages: [],
    words: [],
    users: {},
    scrollTopRatio: 1,
  };

  public componentDidMount() {
    let oState = store.getState();
    let aRoomsMessages = oState.roomsMessages;
    let oUsers = oState.users; // TODO
    let sRoomId = oState.roomId; // TODO
    let sUserId = AuthenticationHelper.getUserId();

    window.addEventListener('resize', this.onResize);
    this.eventEmitter = EmitterHelper.on('messagesScrollToBottom', this.scrollTopToBottomForce);

    let sScrollTopRatio = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-top-ratio');

    let iScrollTopRatio = Number(sScrollTopRatio);



    let _oState = {
      roomsMessages: aRoomsMessages,
      roomId: sRoomId,
      users: oUsers,
      scrollTopRatio: iScrollTopRatio,
    };
    this.setState(_oState);
  }

  public componentDidUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public componentWillUpdate() {
  }

  public componentDidUpdate(oPreviousProps: any, oPreviousState: any) {


    if(oPreviousState.roomId != this.state.roomId) {
      this.scrollTopToPosition(true, false);
      return;
    }

    let oState = store.getState();

    let sRoomId = oState.roomId; // TODO
    let sUserId = AuthenticationHelper.getUserId();
    let sScrollHeight = window.sessionStorage.getItem('user_id:' + sUserId + '-room_id:' + sRoomId + '-messages:scroll-height');

    let iScrollHeight = Number(sScrollHeight);

    // 2. 首次进入时候 fasle, true
    if (oPreviousState.roomId == this.state.roomId && !this.props.context.isScrolling) {
      this.scrollTopToPosition(false, true);
      return;
    }
    // 1. 滑动  的时候 false, false
    if (oPreviousState.roomId == this.state.roomId && this.props.context.isScrolling) {
      this.scrollTopToPosition(false, false);
      return;
    } 
    if (oPreviousState.roomsMessages.length === 0 && oPreviousState.roomsMessages.length < this.state.roomsMessages.length) {
      this.scrollTopToPosition(false, false);
      return;
    } 
    if (oPreviousState.roomsMessages.length !== this.state.roomsMessages.length) {
      this.scrollTopToPosition(false, false);
      return;
    }
  

  }

  public render() {
    
    let aMessages = this.state.roomId && this.state.roomsMessages && this.state.roomsMessages[this.state.roomId] && this.state.roomsMessages[this.state.roomId].messages ? this.state.roomsMessages[this.state.roomId].messages : []
    let fOpacity =this.state.scrollTopRatio > 0.9 && this.state.scrollTopRatio <= 1 ? ( 1 - this.state.scrollTopRatio) * 10 : 1;
    
    const oStyle = {
      opacity: fOpacity,
    }

    let sClassName = '';
    if (this.props.pannelStatus == 'EMOJI') {
      sClassName = 'emoji-picker-on';
    }

    if (this.props.pannelStatus == 'PLUS') {
      sClassName = 'plus-picker-on';
    }

    return (
      <div className="position-relative">
        <div ref={this.ref} className={'messages pt-4 pl-2 pr-2 pb-4 overflow-auto ' + sClassName} onScroll={this.onScroll}>
          {aMessages.map((oMessage: any, iIndex: any) => (
          <Message
            src={oMessage.src}
            text={oMessage.text}
            time={oMessage.addedTime}
            userId={oMessage.user_id}
            messageId={oMessage._id}
            uploaderId={oMessage.uploaderId ? oMessage.uploaderId : ''}
            loading={oMessage.loading ? oMessage.loading : false}
            scrollTopToBottom={this.scrollTopToBottom}
            scrollTopToPosition={this.scrollTopToPosition}
            setScrollHeight={this.setScrollHeight}
            />))
          }
        </div>
        <ScrollButton
          className={this.state.scrollTopRatio >= 1 ? 'd-none' : ''}
          style={oStyle}
          onClick={this.scrollTopToBottomForce}/>
      </div>

    );
  }
}

const Wrapper = (oProps: any) => (
  <Service.Tool.Consumer>{oContext => <Messages context={oContext} {...oProps}></Messages>}</Service.Tool.Consumer>
);

export default Wrapper;
