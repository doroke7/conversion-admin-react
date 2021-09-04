import React from 'react';
import moment from 'moment';

import { Service } from '@/Commons';
import store from '@/store';

import actions from '@/actions/';

import Helpers from '@/Helpers';

import './Index.scss';
import Top from './Top/Index';
import Room from './Room/Index';

class Rooms extends React.Component<any> {
  public static contextType = Service.Tool;

  public constructor(...oProps: any) {
    super(oProps);

    this.onClick = this.onClick.bind(this);

    store.subscribe(() => {
      let oState = store.getState();
      let oRooms = oState.rooms;

      let _oState = {
        rooms: oRooms
      };
      this.setState(_oState);
    });
  }

  public state: any = {
    rooms: []
  };

  public chatroomSocket: any;

  public onClick(sRoomId: string, iCount) {
    return () => {
      this.props.context.isScrolling = false;
      let oState = store.getState();
      let _sRoomId = oState.roomId;
      if (sRoomId !== _sRoomId) {
        let oBody = {
          jwt: Helpers.Authentication.getJwt(),
          room_id: this.state.roomId,
          count: iCount
        };
        this.chatroomSocket.emit('READ USER ROOM', oBody);
        store.dispatch(actions.service.resource.roomId.edit(sRoomId));
      }
    };
  }

  public UNSAFE_componentWillMount() {
    this.chatroomSocket = this.props.context.chatroom;
  }

  public componentDidMount() {}

  public componentDidUpdate() {}

  public render() {
    let aRooms = Object.values(this.state.rooms);
    aRooms = aRooms.sort((oRoom: any, _oRoom: any) => {
      let aMessages = [...oRoom.messages];
      let _aMessages = [..._oRoom.messages];
      let oMessage = aMessages.pop();
      let _oMessage = _aMessages.pop();
      let iDifferentTime =
        Number(moment(oMessage.addedTime).format('X')) - Number(moment(_oMessage.addedTime).format('X'));
      let iResult = 0;
      if (0 < iDifferentTime) {
        iResult = -1;
      }
      if (0 > iDifferentTime) {
        iResult = 1;
      }

      return iResult;
    });
    return (
      <div className="rooms">
        <Top />
        <div className="pseudo-rooms overflow-auto">
          {aRooms.map((oRoom: any, iIndex) => (
            <Room
              key={iIndex}
              icon={oRoom.icon}
              name={oRoom.name}
              messages={oRoom.messages}
              count={oRoom.count}
              id={oRoom._id}
              editedTime={oRoom.editedTime}
              onClick={this.onClick(oRoom._id, oRoom.count)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const Wrapper = (...oProps: any) => (
  <Service.Tool.Consumer>{(oValue) => <Rooms context={oValue}>{...oProps}</Rooms>}</Service.Tool.Consumer>
);
// 使用 Wrapper  >> this.props.context
// 使用 ..       >> this.context
export default Wrapper;
