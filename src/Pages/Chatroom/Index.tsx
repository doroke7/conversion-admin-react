import React from 'react';
import { withRouter } from "react-router-dom";
import { Motion, spring, presets } from 'react-motion'
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import oIo from "socket.io-client";

import moment from 'moment';

import {
  Authentication as AuthenticationHelper,
  Socket as SocketHelper,
} from '@/Helpers';

import store from '@/store';
import {
  roomMessage,
  word,
} from '@/Actions/Index';

import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Message from 'antd/es/message';


import {
  Page as PageHOC
} from '@/HOCs/';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

import {
  MOMENT,
  MESSAGES,
  SOCKET,
} from '@/CONFIGS/';

moment.locale(MOMENT.LOCALE);

const ENTER_KEY_CODE = 13;

class Chatroom extends React.Component<any> {

  public constructor(...oProps: any){
    super(oProps);
    this.ref = React.createRef();
    this.onEnterRoom = this.onEnterRoom.bind(this);
    this.onShowMessage = this.onShowMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.setText = this.setText.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      text: ''
    };
    let sJwt = AuthenticationHelper.getJwt();
    
    let sAccessToken = AuthenticationHelper.getAccessToken();

    if (sAccessToken && !sJwt) {
      SocketHelper.chatroom.emit("LOGIN VIA ACCESS TOKEN", void 0);
    }
    SocketHelper.chatroom.emit("SHOW WORD", void 0);

    SocketHelper.chatroom.on("LOGIN VIA ACCESS TOKEN",this.onLoginViaAccessToken);
    SocketHelper.chatroom.on("ENTER ROOM", this.onEnterRoom);
    SocketHelper.chatroom.on("SHOW WORD", this.onShowWord);
    SocketHelper.chatroom.on("SHOW MESSAGE", this.onShowMessage);
    SocketHelper.chatroom.on("connect", () => {});
    SocketHelper.chatroom.on("MESSAGE", this.onMessage);
    SocketHelper.chatroom.on("disconnet", () => {});
    this.socketIOFileClient = new SocketIOFileClient(SocketHelper.chatroom);
  }

  public onLoginViaAccessToken(oBody: any) {
    if (1 === oBody.result && oBody.jwt) {
      AuthenticationHelper.setJwt(oBody.jwt);
      let sJwt = AuthenticationHelper.getJwt();
    
      let sChatroomUrl =
        SOCKET.HOST +
        (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
          ? ":" + SOCKET.PORT
          : "") +
        "/chatroom";

      let oOption = {
        query: {
          jwt: sJwt,
          forceNew: true,
        }
      };
      
      let oChatroomSocket = oIo(sChatroomUrl, oOption);
      SocketHelper.chatroom = oChatroomSocket;
      SocketHelper.chatroom.emit("ENTER ROOM", void 0);
    }

    
  }

  public onShowWord(oBody: any) {
    let aWords = oBody.data.words;
    store.dispatch(word.show(aWords));
    SocketHelper.chatroom.emit("ENTER ROOM", void 0);
  }

  public componentWillMount() {

  }

  public ref: any;

  public socketIOFileClient: any;
  public state: any = {
    roomMessages: [],
    roomId: '',
    loading: true,
    text: '',
  };


  public roomId: any;

  public onEnterRoom(oBody: any){
    let oData = oBody["data"];
    let aRooms = oData["rooms"];
    let oRoom = aRooms.pop();
    let sRoomId = oRoom._id;
    this.roomId = sRoomId;
    let _oBody = {
      roomId: sRoomId,
    };
    this.setState({
      roomId: sRoomId
    });
    SocketHelper.chatroom.emit("SHOW MESSAGE", _oBody);
  }

  public onShowMessage(oBody: any){
    let aMessages = oBody.data.messages;
    store.dispatch(roomMessage.show(aMessages));
    this.setState({
      loading: false,
    });
  }

  public onMessage(oBody: any){
    if (-1 === oBody.result && -0.01 === oBody.code) {
      let sMessage = MESSAGES['IT_IS_UNKNOWN_ERROR'];
      Message.warning(sMessage);
      return;
    }
    let aMessages = [oBody];
    store.dispatch(roomMessage.didSend(aMessages));
  }
  public onKeyDown(oEvent: any) {
    if (ENTER_KEY_CODE === oEvent.keyCode && !oEvent.shiftKey) {
      oEvent.preventDefault();
    }
  }

  public setText(oEvent: any) {
    this.setState({
      text: oEvent.target.value
    });
  }

  public onSendMessage(oEvent: any) {
    let sText = this.state.text;

    if ('' === sText || null === sText || undefined === sText) {
      return;
    }

    if (oEvent.type === 'keyup' && (ENTER_KEY_CODE !== oEvent.keyCode || oEvent.shiftKey) ) {
      return;
    }

    if (oEvent.type === 'click' && this.state.text === '') {
      return;
    }

    let oMessage = {
      roomId: this.state.roomId,
      user: {
        '_id': AuthenticationHelper.getUserId(),
        'nickname': AuthenticationHelper.getUserNickname(),
        'role': AuthenticationHelper.getUserRole(),
        'level': AuthenticationHelper.getUserLevel(),
        'url': AuthenticationHelper.getUserUrl(),
      },
      text: this.state.text,
      addedTime: moment(new Date()).format(MOMENT.FORMAT),
      virtualId:  AuthenticationHelper.getUserId() + '-' + Date.now(),
      loading: true,
    };

    if (!('' === sText || null === sText || undefined === sText)) {
      let aMessages = [oMessage];
      debugger;
      store.dispatch(roomMessage.willSend(aMessages));
      SocketHelper.chatroom.emit("MESSAGE", oMessage);
    }

    this.setState({
      text: ''
    });
  }

  public onLogout() {
    AuthenticationHelper.removeJwt();
  }
  
  public componentDidMount(){
    // setInterval(() => {
    //   store.dispatch(Counter.increase())
    // }, 1000);

  }

  public componentDidUpdate(){

  }

  public render() {
    return (
      <Spin ref={this.ref} tip="进入聊天室..." spinning={this.state.loading} delay={0}>
        <Row className="chatroom" onFocus={this.props.onFocus} onMouseMove={this.props.onMouseMove}>
          <Col xs={0} sm={8} md={8} lg={6} xl={6}>
            <Rooms/>
          </Col>
          <Col xs={24} sm={16} md={16} lg={18} xl={18}>
            <Channel 
              text={this.state.text} 
              setText={this.setText} 
              onSendMessage={this.onSendMessage}
              onKeyDown={this.onKeyDown}
              onLogout={this.onLogout}
              />
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default withRouter(PageHOC(Chatroom));