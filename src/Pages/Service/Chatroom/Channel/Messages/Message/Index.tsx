import React from 'react';

import htmlReactParser from 'html-react-parser';

import Spin from 'antd/es/spin';
import Progress from 'antd/es/progress';

import store from '@/store';

import {
  AuthenticationHelper
} from '@/Helpers';

import './Index.scss';

import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";

STORAGE.HOST = STORAGE.HOST.replace(/^http:\/\//, '');


const ERROR_SRC = '/rooms/_/messages/_/src/not-found.jpg';

interface IProps {
  time?: any;
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

  public eventEmitter: any;
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
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + STORAGE.PRE_PATH + ERROR_SRC;
    this.setState({
      src: sSrc,
      srcDisplay: true,
    });
  }

  public componentDidMount() {


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
    this.props.scrollTopToBottom();

  }

  public componentWillReceiveProps(oNextProps: any){

  }

  public static getDerivedStateFromProps(oNextProps: any, oPrevState: any) {
    let sSrc = (!oNextProps.src || 0 === oNextProps.src.indexOf("http") || 0 === oNextProps.src.indexOf("data:") ? oNextProps.src : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + oNextProps.src);

    if (sSrc !== oPrevState.src  && oPrevState.src !== 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + ERROR_SRC) {
      return {
        src: sSrc
      };
    }

    return {
      src: oPrevState.src
    };
  }

  public componentDidUpdate(a: any){
    // if (100 === this.progress) {
    //   let oState = {
    //     progressDispaly: false
    //   }
    //   this.setState(oState);
    // }
    this.props.scrollTopToBottom();

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

  public componentWillUnmount() {
  }

  public render() {
    let position = this.props.userId === sUserId || !this.props.userId ? 'right' : 'left';
    let sUrl = this.state.users && this.state.users[this.props.userId] ? this.state.users[this.props.userId].url : '';
    sUrl = (!sUrl || 0 === sUrl.indexOf("http") ? sUrl : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + sUrl);
    let sRole = this.state.users && this.state.users[this.props.userId] ? (this.state.users[this.props.userId].role).toLowerCase() : '';
    let sUploaderId = this.props.uploaderId;

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

    return (
      <div className={"message d-flex justify-content-end "+ (this.state.users[this.props.userId] ? "" : "d-none " ) +(position === 'right' ? "flex-row " : "flex-row-reverse ") + " " + (position === 'right' ? "text-right " : "text-left ") + position + " " + sRole}>
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
                percent={this.progress ? this.progress : 0} /> : 
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
            <img src={sUrl} data-user-id={this.props.userId}/>
          </div>
        </span>
      </div>
    );
  }
}

export default Message;
