import React from 'react';
import moment from 'moment';
import './Index.scss';
import store from '@/store';

import CONFIGS from '@/CONFIGS/';

import { AuthenticationHelper } from '@/Helpers/';
import { Badge } from 'antd';

let STORAGE = CONFIGS.STORAGE;
let MOMENT = CONFIGS.MOMENT;

interface IProps {
  // className?: string | null;
  id: string;
  name?: string | null;
  icon?: string;
  editedTime?: string;
  messages?: any[];
  count?: number;
  onClick?: () => void;
}

class Room extends React.Component<IProps> {
  public constructor(...oProps: any) {
    super(oProps);

    store.subscribe(() => {
      let oState = store.getState();
      let oUsers = oState.users;
      let oUsersRooms = oState.usersRooms;
      let sRoomId = oState.roomId;

      let _oState = {
        users: oUsers,
        usersRooms: oUsersRooms,
        roomId: sRoomId
      };
      this.setState(_oState);
    });
  }

  public state: any = {
    users: {},
    usersRooms: false
  };

  public render() {
    let sUserId = AuthenticationHelper.getUserId();
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + this.props.icon;

    let aMessages = [...this.props.messages];
    let oMessage = aMessages.pop();
    let sMessage = '';
    let sRoomId = this.props.id;
    let iCount = 0;
    let iUserCount = 0;
    // 当下的 聊天室, 还没读取到 当下 用户 读取数 预设 0 个未读

    iUserCount =
      sUserId &&
      this.state.usersRooms[sUserId] &&
      sRoomId &&
      this.state.usersRooms[sUserId].rooms[sRoomId] &&
      this.state.usersRooms[sUserId].rooms[sRoomId].count
        ? this.state.usersRooms[sUserId].rooms[sRoomId].count
        : 0;
    iCount = this.props.count - iUserCount;

    if (this.props.id == this.state.roomId || !this.state.usersRooms) {
      iCount = 0;
    }

    let _sTime: any = moment().format('YYYY-MM-DD 00:00:00');

    let iSecond = Number(moment(oMessage.addedTime).format('X')) - Number(moment(_sTime).format('X'));

    let sTime =
      iSecond > 0
        ? moment(oMessage.addedTime).format(MOMENT.FORMAT2)
        : moment(oMessage.addedTime).format(MOMENT.FORMAT1);

    let sNickname = '用户';

    if (oMessage.user_id == sUserId) {
      sNickname = '您';
    } else if (
      oMessage.user_id &&
      this.state.users &&
      this.state.users[oMessage.user_id] &&
      this.state.users[oMessage.user_id].nickname
    ) {
      sNickname = this.state.users[oMessage.user_id].nickname;
    }

    if (oMessage.text && !oMessage.src) {
      sMessage = oMessage.text;
    } else if (oMessage.src == 'IMAGE') {
      sMessage = '上传了图';
    }
    return (
      <div className="room align-baseline position-relative" onClick={this.props.onClick}>
        <span className="icon d-inline-flex justify-content-center align-middle overflow-hidden">
          <img src={sSrc} />
        </span>
        <span className="name-text d-inline-flex flex-column align-middle justify-content-between ml-1">
          <div className="name font-weight-bold text-truncate">{this.props.name}</div>
          <div className="text text-truncate">
            <span className="nickname">{sNickname}</span>
            {sNickname ? <span className="colon">: </span> : ''}
            <span className="message">{sMessage}</span>
          </div>
        </span>
        <span className="time-count d-inline-flex flex-column align-middle justify-content-between text-right position-absolute">
          <div>{sTime}</div>
          <div>
            {/* {this.props.count} - {iUserCount} */}
            {iCount > 0 ? (
              <Badge count={iCount} overflowCount={99} style={{ backgroundColor: '#1890ff', color: '#ffffff' }} />
            ) : (
              ''
            )}
          </div>
        </span>
      </div>
    );
  }
}

export default Room;
