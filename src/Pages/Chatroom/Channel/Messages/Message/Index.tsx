import React from 'react';
import Spin from 'antd/es/spin';

import {
  Authentication as AuthenticationHelper
} from '@/Helpers';

import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');


import './Index.scss';

interface IProps {
  role?: any;
  icon?: any;
  time?: any;
  name?: any;
  src?: any;
  text?: any;
  userId?: any;
  key?: any;
}

let sUserId = AuthenticationHelper.getUserId(); 

const Message: React.FC<IProps> = (oProps: IProps) => {
  let _sUserId = oProps.userId;
  let position = 'right';
  oProps.icon = (oProps.icon && 0 === oProps.icon.indexOf("http") ? oProps.icon : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + oProps.icon)
  oProps.src = (!oProps.src || 0 === oProps.src.indexOf("http") ? oProps.src : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + oProps.src)

  return (
    <div className={"message" + " " + (position === 'right' ? "text-right " : "text-left ") + position + " " + oProps.role.toLowerCase()}>
      <span className="loading-wrapper d-inline-block align-bottom">
        <Spin indicator={
          <div className="loading">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
          </div>} />
      </span>
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
