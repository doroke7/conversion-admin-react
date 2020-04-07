import React from 'react';
import moment from 'moment';
import './Index.scss';
import store from '@/store';
import {
  STORAGE
} from '@/CONFIGS/';

import { Badge } from 'antd';

interface IProps {
  // className?: string | null;
  name?: string | null
  icon?: string
  editedTime?: string
  messages ?: any[]
  onClick?: ()=> void
}

class Room extends React.Component<IProps> {
  
  public constructor(...oProps: any) {
    super(oProps);


    store.subscribe(() => {
      let oState = store.getState();
      let oUsers = oState.users;

      let _oState = {
        users: oUsers,
      };
      this.setState(_oState);
    });
  }

  public state: any = {
    users: {},
  };

  public render() {
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + this.props.icon;
    let sEditedTime = moment.unix(new Date(this.props.editedTime).getTime() / 1000).format('HH:mm');
    let iCount = 5;
    let aMessages = [...this.props.messages];
    let oMessage = aMessages.pop();
    let sMessage = '';
    let oUser = oMessage.user_id && this.state.users && this.state.users[oMessage.user_id] ? this.state.users[oMessage.user_id] : {};
    if(oMessage.type == 'TEXT') {
      sMessage = oUser && oUser.nickname ? oUser.nickname + ': ' + oMessage.text : oMessage.text;
    } else if (oMessage.type == 'IMAGE') {
      sMessage = oUser && oUser.nickname ? oUser.nickname + '上传了图片' : '上传了图';
    }
    return (
      <div className="room align-baseline position-relative" onClick={this.props.onClick}>
        <span className="icon d-inline-flex justify-content-center align-middle overflow-hidden">
          <img src={sSrc}/>
        </span>
        <span className="name-text d-inline-flex flex-column align-middle justify-content-between ml-1">
          <div className="name font-weight-bold text-truncate">
            {this.props.name}
          </div>
          <div className="text text-truncate">
            {sMessage}
          </div>
        </span>
        <span className="time-count d-inline-flex flex-column align-middle justify-content-between text-right position-absolute">
          <div >
            {sEditedTime}
          </div>
          <div >
            { 
              iCount > 0 ? 
              <Badge count={iCount}
                style={{ backgroundColor: '#1890ff', color: '#ffffff'}}
              /> :
              ""
            }
          </div>
        </span>
      </div>
    );
  }
}


export default Room;
