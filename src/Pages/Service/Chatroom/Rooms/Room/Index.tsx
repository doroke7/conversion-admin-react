import React from 'react';
import moment from 'moment';
import './Index.scss';
import store from '@/store';
import {
  STORAGE,
  MOMENT
} from '@/CONFIGS/';
import { AuthenticationHelper } from '@/Helpers/';
import { Badge } from 'antd';

interface IProps {
  // className?: string | null;
  name?: string | null
  icon?: string
  editedTime?: string
  messages ?: any[]
  count ?: number
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
    let sUserId = AuthenticationHelper.getUserId();
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + this.props.icon;

    let aMessages = [...this.props.messages];
    let oMessage = aMessages.pop();
    let sMessage = '';
    let iCount = this.props.count;

    let _sTime :any = moment().format('YYYY-MM-DD 00:00:00');
    
    let iSecond = Number(moment(oMessage.addedTime).format('X')) - Number(moment(_sTime).format('X'));

    let sTime = iSecond > 0 ? moment(oMessage.addedTime).format(MOMENT.FORMAT2) : moment(oMessage.addedTime
      ).format(MOMENT.FORMAT1);

    let sNickname = '用户';

    if(oMessage.user_id == sUserId) {
      sNickname = '您';
    }
    else if(oMessage.user_id && this.state.users && this.state.users[oMessage.user_id] && this.state.users[oMessage.user_id].nickname) {
      sNickname = this.state.users[oMessage.user_id].nickname;
    }

    if(oMessage.text && !oMessage.src) {
      sMessage = oMessage.text;
    } else if (oMessage.src == 'IMAGE') {
      sMessage = '上传了图';
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
            <span className="nickname">{sNickname}</span>
            {sNickname ? <span className="colon">: </span>: ""}
            <span className="message">{sMessage}</span>
            
          </div>
        </span>
        <span className="time-count d-inline-flex flex-column align-middle justify-content-between text-right position-absolute">
          <div >
            {sTime}
          </div>
          <div >
            { 
              iCount > 0 ? 
              <Badge 
                count={iCount}
                overflowCount={99}
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
