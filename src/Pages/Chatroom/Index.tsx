import React from 'react';
import {withRouter} from "react-router-dom";

import { Motion, spring, presets } from 'react-motion'
import {
  Authentication as AuthenticationHelper,
  Socket as SocketHelper,
} from '@/Helpers';

import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import {
  Page as PageHOC
} from '@/HOCs/';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

import store from '@/store';
import { roomMessage } from '@/Actions/Index';

const ENTER_KEY_CODE = 13;


class Chatroom extends React.Component {


  public constructor(...oProps: any){
    super(oProps);
    this.ref = React.createRef();
    this.onEnterRoom = this.onEnterRoom.bind(this);
    this.onShowMessage = this.onShowMessage.bind(this);
    this.setText = this.setText.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);

    this.state = {
      text: ''
    };
  }

  public componentWillMount() {
    SocketHelper.chatroom.emit("ENTER ROOM", void 0);
    SocketHelper.chatroom.on("ENTER ROOM", this.onEnterRoom);
    SocketHelper.chatroom.on("SHOW MESSAGE", this.onShowMessage);
    SocketHelper.chatroom.on("connect", () => {});
    SocketHelper.chatroom.on("MESSAGE", this.onMessage);
    SocketHelper.chatroom.on("disconnet", () => {});

  }

  public ref: any;

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
    store.dispatch(roomMessage.show(aMessages))
    this.setState({
      loading: false,
    });
  }

  public onMessage(oBody: any){

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
      addedTime: new Date(),
      virtualId:  AuthenticationHelper.getUserId() + '-' + Date.now()
    };

    let sText = oMessage.text;
    if (!('' === sText || null === sText || undefined === sText)) {
      SocketHelper.chatroom.emit("MESSAGE", oMessage);
    }

    this.setState({
      text: ''
    });
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
        <Row className="chatroom">
          <Col xs={0} sm={8} md={8} lg={6} xl={6}>
            <Rooms/>
          </Col>
          <Col xs={24} sm={16} md={16} lg={18} xl={18}>
            <Channel 
              text={this.state.text} 
              setText={this.setText} 
              onSendMessage={this.onSendMessage}
              onKeyDown={this.onKeyDown}
              />
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default withRouter(PageHOC(Chatroom));