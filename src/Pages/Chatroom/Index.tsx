import React from 'react';
import { withRouter } from "react-router-dom";
import { Motion, spring, presets } from 'react-motion'
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';
import oIo from "socket.io-client";
import moment from 'moment';

import {
  Socket
} from '@/Commons';

import {
  AuthenticationHelper,
} from '@/Helpers/';

import store from '@/store';
import {
  roomMessage,
  word,
  jwtAction,
} from '@/actions/';

import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Message from 'antd/es/message';

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
    this.onOKControlPannelModal = this.onOKControlPannelModal.bind(this);
    this.onStream = this.onStream.bind(this);
    this.state = {
      text: ''
    };
  }

  public static contextType = Socket;

  public async componentWillMount() {
    this.chatroomSocket = this.props.context.chatroom;
    this.chatroomSocket

    this.chatroomSocket.on("ENTER ROOM", this.onEnterRoom);
    this.chatroomSocket.on("SHOW MESSAGE", this.onShowMessage);
    this.chatroomSocket.on("connect", () => {});
    this.chatroomSocket.on("MESSAGE", this.onMessage);
    this.chatroomSocket.on("disconnet", () => {});
    this.socketIOFileClient = new SocketIOFileClient(this.chatroomSocket);
    let oSocketIOFileUpload = new SocketIOFileUpload(this.chatroomSocket);

    this.socketIOFileClient.on("start", this.onStart);
    this.socketIOFileClient.on("stream", this.onStream);
    this.socketIOFileClient.on("complete", this.onComplete);

    await store.dispatch(jwtAction.accessTokenToJwt());
    store.dispatch(jwtAction.refresh());

    this.chatroomSocket.emit("ENTER ROOM", void 0);
  }

  public onStart(oFileInfo: any) {
    console.log('start: ' , oFileInfo);

  }

  public onStream(oFileInfo: any) {
    console.log('rate: ' + (oFileInfo.sent / oFileInfo.size) * 100 + '%');

  }

  public onComplete(oFileInfo: any) {
    console.log('complete: ' , oFileInfo);

  }

  public onLoginViaAccessToken(oBody: any) {
    if (1 === oBody.result && oBody.jwt) {
      AuthenticationHelper.setJwt(oBody.jwt);
      let sJwt = AuthenticationHelper.getJwt();
    
    }    
  }


  public ref: any;
  public fileRef: any = React.createRef();
  public props :any;
  public chatroomSocket: any;
  public socketIOFileClient: any;
  public state: any = {
    roomMessages: [],
    roomId: '',
    loading: true,
    text: '',
  };


  public roomId: any;

  public get submitRef() {
    return ;
  }

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
    this.chatroomSocket.emit("SHOW MESSAGE", _oBody);
  }

  public onShowMessage(oBody: any){
    let aMessages = oBody.data.messages;
    store.dispatch(roomMessage.show(aMessages));
    this.setState({
      loading: false,
    });
  }

  public onMessage(oBody: any){
    try {
      if (-1 === oBody.result && -1.05 === oBody.code) {
        throw new Error('THE_GUEST_CAN_NOT_SEND_MESSAGE');
      }

      if (-1 === oBody.result || !oBody.data || !oBody.data.messages) {
        throw new Error('THE_USER_CAN_NOT_SEND_MESSAGE');
      }
      
      let aMessages = oBody.data.messages;
      store.dispatch(roomMessage.didSend(aMessages));
    } catch (oExeption) {
      let sMessage = oExeption.message;
      Message.warning(MESSAGES[sMessage]);

    }
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

    try {

      if (!AuthenticationHelper.getUserId()) {
        let sMessage = MESSAGES['THE_GUEST_CAN_NOT_SEND_MESSAGE'];
        Message.warning(sMessage);
        return;
      }
  
      let oMessage: any = {
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
        store.dispatch(roomMessage.willSend(aMessages));
        let sJwt = AuthenticationHelper.getJwt();
        let sAccessToken = AuthenticationHelper.getAccessToken();

        oMessage['jwt'] = sJwt;
        oMessage['accessToken'] = sAccessToken;

        this.chatroomSocket.emit("MESSAGE", oMessage);
      }
  

    } catch (sException) {

    } finally {
      this.setState({
        text: ''
      });
    }
  }

  public onLogout() {
    AuthenticationHelper.removeJwt();
  }

  public onOKControlPannelModal() {
    let oFile = this.fileRef.current;
    this.socketIOFileClient.upload(oFile, {
      data: { }
    });

    // let oFile = this.state.file;
    // oFile.reset();

  }
  
  public componentDidMount(){
    // setInterval(() => {
    //   store.dispatch(Counter.increase())
    // }, 1000);
    console.log(267,this.props.context);

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
              fileRef={this.fileRef}
              text={this.state.text} 
              setText={this.setText} 
              onSendMessage={this.onSendMessage}
              onKeyDown={this.onKeyDown}
              onLogout={this.onLogout}
              onOKControlPannelModal={this.onOKControlPannelModal}
              />
          </Col>
        </Row>
      </Spin>
    );
  }
}

const Wrapper = (...oProps: any) => (
  <Socket.Consumer>
    {(oContext) => (
      <Chatroom
        context={oContext}>
        {...oProps}             
      </Chatroom>
    )}
  </Socket.Consumer>
);

export default withRouter(Wrapper);