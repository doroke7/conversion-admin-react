import React from 'react';
import htmlReactParser from 'html-react-parser';

import Spin from 'antd/es/spin';

import {
  AuthenticationHelper
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
  messageId?: any;
  loading?: any;
}

let sUserId = AuthenticationHelper.getUserId(); 

class Message extends React.Component<IProps> {

  public shouldComponentUpdate(oNextProps: any, oNextState: any){
    if (oNextProps.messageId === this.props.messageId && oNextProps.loading === this.props.loading) {
      return false;
    }
    return true;
  }

  public render() {
    let _sUserId = this.props.userId;
    let position = _sUserId === sUserId ? 'right' : 'left';
    let sIcon = (this.props.icon && 0 === this.props.icon.indexOf("http") ? this.props.icon : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + this.props.icon)
    let sSrc = (!this.props.src || 0 === this.props.src.indexOf("http") ? this.props.src : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + this.props.src)
  
    return (
      <div className={"message d-flex justify-content-end "+ (position === 'right' ? "flex-row " : "flex-row-reverse ") + " " + (position === 'right' ? "text-right " : "text-left ") + position + " " + this.props.role.toLowerCase()}>
        <span className={"loading-wrapper d-inline-block align-bottom " + (this.props.loading ? "" : "d-none")}>
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
          <div className={"time-name d-flex justify-content-end " + (position === 'right' ? 'flex-row' : 'flex-row-reverse')}>
            <span className="time">{this.props.time}</span>
            <span className="name">{this.props.name}</span>
          </div>
          <span className={"content text-left d-inline-block"}>
            <div className="image">
              {sSrc ? (<img src={sSrc}/>) : null}
            </div>
            <div className="text">
              {htmlReactParser(this.props.text.replace(new RegExp("\n", "gm"),'<br />'))}
            </div>
          </span>
        </span>
        <span className="d-inline-block align-top">
          <div className="triangle">
          </div>
        </span>
        <span className="d-inline-block align-top">
          <div className="avator">
            <img src={sIcon} data-user-id={_sUserId}/>
          </div>
        </span>
      </div>
    );
  }
}

export default Message;
