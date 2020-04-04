import React from 'react';

import store from '@/store';

import { STORAGE } from "@/CONFIGS";


import './Index.scss';

class Detail extends React.Component {
  public constructor(oProps: any) {
    super(oProps);

    store.subscribe(() => {
      let oState = store.getState();
      let sRoomId = oState.roomId;
      let oRooms = oState.rooms;

      let _oState = {
        room: sRoomId in oRooms ? oRooms[sRoomId] : {},
        roomId: sRoomId ? sRoomId : ''
      };
      this.setState(_oState);
    });

  }

  public componentDidMount() {
    let oState = store.getState();
    let sRoomId = oState.roomId;
    let oRooms = oState.rooms;

    let _oState = {
      room: sRoomId in oRooms ? oRooms[sRoomId] : {},
      roomId: sRoomId ? sRoomId : ''
    };
    this.setState(_oState);
  }

  public state: any = {
    room: {},
    roomId: ''
  };

  public render() {
    let sSrc = this.state.room.icon ? window.location.protocol + '//' + STORAGE.HOST + this.state.room.icon : window.location.protocol + '//' + STORAGE.HOST + '/rooms/_/icon/room-icon.png';
    let sName = this.state.room.name ? this.state.room.name : '聊天室基本讯息';
    return (
      <div className="detail">
        <div className="info-wrapper">
          <div className="info d-flex justify-content-center align-middle border border-secondary overflow-hidden text-center">
            <img src={sSrc} />
          </div>
          <div className="name font-weight-bold text-center">
            {sName}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
