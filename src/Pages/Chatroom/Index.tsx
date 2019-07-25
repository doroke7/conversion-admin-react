import React from 'react';
import { withRouter } from "react-router-dom";
import { Motion, spring, presets } from 'react-motion'
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';
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
  userAction
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
    this.onLogout = this.onLogout.bind(this);
  }

  public static contextType = Socket;

  public async componentWillMount() {
    this.chatroomSocket = this.props.context.chatroom;
    this.chatroomFileSocket = this.props.context.chatroomFile;

    this.chatroomSocket.on("ENTER ROOM", this.onEnterRoom);
    this.chatroomSocket.on("SHOW MESSAGE", this.onShowMessage);
    this.chatroomSocket.on("connect", () => {});
    this.chatroomSocket.on("MESSAGE", this.onMessage);
    this.chatroomSocket.on("disconnet", () => {});
    // this.chatroomFileSocket = new SocketIOFileClient(this.chatroomSocket);

    store.dispatch(jwtAction.accessTokenToJwt());
    store.dispatch(jwtAction.refresh());

    this.chatroomSocket.emit("ENTER ROOM", void 0);
  }



  public ref: any;
  public fileRef: any = React.createRef();
  public props :any;
  public chatroomSocket: any;
  public chatroomFileSocket: any;
  
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
    this.chatroomSocket.emit("SHOW MESSAGE", _oBody);
  }

  public onShowMessage(oBody: any){
    this.setState({
      loading: false,
    });
    let aMessages = oBody.data.messages;
    store.dispatch(roomMessage.show(aMessages))
    store.dispatch(userAction.showViaMessage(aMessages))

  }

  public async onMessage(oBody: any){
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
              onLogout={this.onLogout}
              roomId={this.state.roomId}
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