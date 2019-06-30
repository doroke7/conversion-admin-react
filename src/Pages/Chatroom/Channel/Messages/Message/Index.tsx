import React from 'react';
import {
  Authentication as AuthenticationHelper
} from '@/Helpers';

import './Index.scss';

interface IProps {
  role?: any;
  icon?: any;
  time?: any;
  name?: any;
  src?: any;
  text?: any;
  userId?: any;
}

let sUserId = AuthenticationHelper.getUserId(); 

const Message: React.FC<IProps> = (oProps: IProps) => {
  let _sUserId = oProps.userId;
  let position = 'right';
  return (
    <div className={"message" + " " + "text-right " + position + " " + oProps.role}>
      <span className="time-name-conten-wrapper d-inline-block align-top">
        <div className="text-right time-name">
          <span className="time">{oProps.time}</span>
          <span className="name">{oProps.name}</span>
        </div>
        <div className={"content text-left"}>
          <div className="image">
            {oProps.src ? (<img src={oProps.src}/>) : null}
          </div>
          <div className="text">
            {oProps.text}
          </div>
        </div>
      </span>
      <span className="d-inline-block align-top">
        <div className="triangle">
        </div>
      </span>
      <span className="d-inline-block align-top">
        <div className="avator">
          <img src={oProps.icon} />
        </div>
      </span>
    </div>
  );
}

export default Message;
