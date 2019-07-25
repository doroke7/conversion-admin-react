import React from 'react';
import htmlReactParser from 'html-react-parser';

import Spin from 'antd/es/spin';
import Progress from 'antd/es/progress';

import store from '@/store';

import {
  AuthenticationHelper
} from '@/Helpers';

import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');


import './Index.scss';
import { string } from 'prop-types';

const ERROR_SRC = 'room/message/image-error.png';

interface IProps {
  role?: any;
  icon?: any;
  time?: any;
  name?: any;
  src?: any;
  text?: any;
  userId?: any;
  scrollTopToBottom: any;
  scrollTopToPosition: any;
  setScrollHeight: any;
  key?: any;
  messageId?: any;
  loading?: any;
  uploaderId?: any;
}

let sUserId = AuthenticationHelper.getUserId(); 

class Message extends React.Component<IProps> {

  public constructor(...oProps: any) {
    super(oProps);
    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);

  }

  public state: any = {
    uploaders: {},
    users: {},
    progressDispaly: true,
    src: '',
    srcDisplay: true,
  };

  public progress: number | void;
  public src: string;


  public onLoad(oEvent: any) {
    this.props.scrollTopToPosition();
    // this.setState({
    //   srcDisplay: true,
    // });
    // this.props.setScrollHeight();

  }
  public onError(oEvent: any) {
    let sSrc = 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + ERROR_SRC;
    this.setState({
      src: sSrc,
      srcDisplay: true,
    });
  }

  public componentWillMount() {
    let sSrc = (!this.props.src || 0 === this.props.src.indexOf("http") || 0 === this.props.src.indexOf("data:") ? this.props.src : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + this.props.src)

    this.setState({
      src: sSrc
    });
    store.subscribe(() => {
      let oState = store.getState();
      let oUploaders = oState.uploaders;
      let oUsers = oState.users;
      let _oState: any = {};
      if (oUploaders[this.props.uploaderId]) {

        _oState['uploaders'] = {
          [this.props.uploaderId]: oUploaders[this.props.uploaderId]
        }
      }

      if (oUsers[this.props.userId]) {
        _oState['users'] = {
          [this.props.userId]: oUsers[this.props.userId]
        }
      }
      this.setState(_oState);
    });
  }

  public componentDidUpdate(a: any){
    // if (100 === this.progress) {
    //   let oState = {
    //     progressDispaly: false
    //   }
    //   this.setState(oState);
    // }
  }


  public shouldComponentUpdate(oNextProps: any, oNextState: any){
    return true;

    let sUploaderId = this.props.uploaderId;
    // if (oNextProps.messageId === this.props.messageId && 
    //     oNextProps.loading === this.props.loading && 
    //     !this.props.uploaderId ) {
    //   return false;
    // }
  }

  public render() {
    let _sUserId = this.props.userId;
    let position = _sUserId === sUserId ? 'right' : 'left';
    let sIcon = (this.props.icon && 0 === this.props.icon.indexOf("http") ? this.props.icon : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + this.props.icon)
    let sUploaderId = this.props.uploaderId;
    let iProgess = 0;
    if (this.state && this.state.uploaders[sUploaderId] && (0 <= this.state.uploaders[sUploaderId].sent || 0 <= this.state.uploaders[sUploaderId].wrote) && 0 < this.state.uploaders[sUploaderId].size) {
      let fProgress = ((this.state.uploaders[sUploaderId].sent || this.state.uploaders[sUploaderId].wrote) / this.state.uploaders[sUploaderId].size) * 100;
      this.progress = Math.floor(fProgress);
    }

    if (100 === this.progress && this.state.progressDispaly) {
      let oState = {
        progressDispaly: false
      }
      setTimeout(async () => {
        this.setState(oState);
      }, 1)
    }
    if (this.props.userId && this.state.users && this.state.users[this.props.userId]) {
      debugger;
    }

    return (
      <div className={"message d-flex justify-content-end "+ (position === 'right' ? "flex-row " : "flex-row-reverse ") + " " + (position === 'right' ? "text-right " : "text-left ") + position + " " + this.props.role.toLowerCase()}>
        <span className={"loading-wrapper d-inline-block align-bottom " + (!this.props.loading || this.state.src  ? "d-none" : "" )}>
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
            <span className="name">{this.props.userId && this.state.users && this.state.users[this.props.userId] ? this.state.users[this.props.userId].nickname : ""}</span>
          </div>
          <span className={"content text-left d-inline-block"}>
            <div className="image position-relative">
              {sUploaderId && this.state && this.state.uploaders && this.state.uploaders[sUploaderId] ? 
               <Progress 
                className={"position-absolute progress " + (!this.state.progressDispaly ? "d-none" : "")}
                type="dashboard" 
                percent={this.progress ? this.progress : 0} 
                strokeColor={{
                '0%': '#dddddd',
                '100%': '#111111',
              }}/> : 
               null}

              {this.state.src ? (<img 
                            onLoad={this.onLoad}
                            onError={this.onError}
                            src={this.state.src}
                            className={(undefined === this.progress || !this.state.progressDispaly ? "" : "opacity ") + (false === this.state.srcDisplay ? "d-none" : "")}/>) : null}
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
