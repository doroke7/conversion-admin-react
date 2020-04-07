import React from 'react';
import { withRouter } from 'react-router-dom';
import { Motion, spring, presets } from 'react-motion';
// @ts-ignore
import SocketIOFileClient from 'socket.io-file-client';
import SocketIOFileUpload from 'socketio-file-upload';
import moment from 'moment';

import { Service } from '@/Commons';

import { AuthenticationHelper } from '@/Helpers/';

import store from '@/store';

import { 
  roomMessage,
  authenticationAction,
  userAction,
  room
} from '@/actions/';

import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Message from 'antd/es/message';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

import { MOMENT, MESSAGES } from '@/CONFIGS/';

moment.locale(MOMENT.LOCALE);

class Chatroom extends React.Component<any> {
  public constructor(...oProps: any) {


    super(oProps);

    store.subscribe(() => {
      let oState = store.getState();
      let oUsers = oState.users;

      let _oState = {
        users: oUsers
      };
      this.setState(_oState);
    });
    this.ref = React.createRef();
    this.onShowRoom = this.onShowRoom.bind(this);

    this.onShowRoomMessage = this.onShowRoomMessage.bind(this);
    this.onShowUser = this.onShowUser.bind(this);
    this.onPostRoomMessage = this.onPostRoomMessage.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  public static contextType = Service.Tool;

  public async componentWillMount() {
    debugger;
    this.chatroomSocket = this.props.context.chatroom;
    this.chatroomFileSocket = this.props.context.chatroomFile;

    this.chatroomSocket.on('SHOW ROOM', this.onShowRoom);
    this.chatroomSocket.on('SHOW ROOM MESSAGE', this.onShowRoomMessage);
    this.chatroomSocket.on('SHOW USER', this.onShowUser);
    this.chatroomSocket.on('connect', () => {});
    this.chatroomSocket.on('POST ROOM MESSAGE', this.onPostRoomMessage);
    this.chatroomSocket.on('disconnet', () => {});
    try {
      await store.dispatch(authenticationAction.accessTokenToJwt());
      await store.dispatch(authenticationAction.refresh());
    } catch (oExeption) {
      let sMessage = oExeption.message;
      Message.warning(MESSAGES[sMessage]);
    }

    this.chatroomSocket.emit('SHOW ROOM', void 0);
    this.chatroomSocket.emit('SHOW ROOM MESSAGE', void 0);
    this.chatroomSocket.emit('SHOW USER', void 0);

  }

  public ref: any;
  public fileRef: any = React.createRef();
  public props: any;
  public chatroomSocket: any;
  public chatroomFileSocket: any;

  public state: any = {
    users: {},
    roomMessages: [],
    roomId: '',
    loading: true,
    text: '',
  };

  public roomId: any;

  public onShowRoom(oBody: any) {
    let oData = oBody['data'];
    let aRooms = oData['rooms'];
    store.dispatch(room.show(aRooms));

    this.setState({
      rooms: aRooms,
    });
  }

  public onShowRoomMessage(oBody: any) {
    this.setState({
      loading: false,
    });
    let oData = oBody['data'];
    let aRooms = oData['rooms'];

    store.dispatch(roomMessage.show(aRooms));
  }

  public async onPostRoomMessage(oBody: any) {
  

    try {
      if (-1 === oBody.result && -1.05 === oBody.code) {
        throw new Error('THE_GUEST_CAN_NOT_SEND_MESSAGE');
      }

      if (-1 === oBody.result || !oBody.data || !oBody.data.rooms) {
        throw new Error('THE_USER_CAN_NOT_SEND_MESSAGE');
      }

      let aRooms = oBody.data.rooms;
      let oRoom = aRooms.pop();
      let aMessages = oRoom.messages;
      let oMessage = aMessages.pop();
      let sUserId = oMessage.user_id;
      if(sUserId && !this.state.users[sUserId]) {
        this.chatroomSocket.emit('SHOW USER', sUserId);

      }

      let _aRooms = [
        {
          ...oRoom,
          messages: [
            oMessage
          ]
        }
      ];
      debugger;

      if (!oMessage.virtualId) {
        this.props.context.notifacation = true;
      }

      await store.dispatch(roomMessage.didSend(_aRooms));
    } catch (oExeption) {
      let sMessage = oExeption.message;
      Message.warning(MESSAGES[sMessage]);
    }
  }

  public async onShowUser(oBody: any) {

    let oData = oBody['data'];
    let aUsers = oData['users'];

    store.dispatch(userAction.show(aUsers));
  }

  public onLogout() {
    AuthenticationHelper.removeJwt();
  }

  public componentDidMount() {
    let sTitle = document.title;
    setInterval(() => {
      let bNotification = this.props.context.notifacation;
      if ( bNotification) {
        document.title = '您有新讯息...';
        setTimeout(() => {
          document.title = sTitle;
  
        }, 2500);
      }

    }, 4000);
  }

  public componentDidUpdate() {}

  public onFocus () {
    this.props.context.notifacation = false;
  }

  public render() {
    return (
      <div className="chatroom" onFocus={this.onFocus}>
        <Spin ref={this.ref} tip="进入聊天室" spinning={this.state.loading} delay={0}>
          <Row onFocus={this.props.onFocus} onMouseMove={this.props.onMouseMove}>
            <Col xs={0} sm={8} md={8} lg={6} xl={6}>
              <Rooms />
            </Col>
            <Col xs={24} sm={16} md={16} lg={18} xl={18}>
              <Channel onLogout={this.onLogout} />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

const Wrapper = (...oProps: any) => (
  <Service.Tool.Consumer>{oContext => <Chatroom context={oContext}>{...oProps}</Chatroom>}</Service.Tool.Consumer>
);

export default withRouter(Wrapper);
