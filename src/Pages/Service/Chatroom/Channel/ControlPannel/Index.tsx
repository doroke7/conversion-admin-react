import React from 'react';

import { EventEmitter } from 'events';

import moment from 'moment';

import Input from 'antd/es/input';
import Modal from 'antd/es/modal';
import Message from 'antd/es/message';

import store from '@/store';

import { Service } from '@/Commons';

import { AuthenticationHelper, EmitterHelper } from '@/Helpers/';

import { roomMessage, uploaderAction } from '@/actions/';

import './Index.scss';

import { MOMENT, MESSAGES, SOCKET } from '@/CONFIGS/';

import emptyImage from '@/images/empty-image.gif';
const ENTER_KEY_CODE = 13;
const { TextArea } = Input;
let oEventEmitter = new EventEmitter();

interface IProps {
  // className?: string | null;
  roomId: any;
  onOKControlPannelModal: any;
}

class ControlPannel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.fileRef = React.createRef();
    this.ref = React.createRef();

    this.showImageModal = this.showImageModal.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOK = this.onOK.bind(this);
    this.setText = this.setText.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);

    this.onStart = this.onStart.bind(this);
    this.onStream = this.onStream.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onError = this.onError.bind(this);
    this.onAbort = this.onAbort.bind(this);
  }

  public static contextType = Service.Socket;
  public props: any;
  public fileRef: any;
  public ref: any;
  public chatroomSocket: any;
  public chatroomFileSocket: any;
  public chatroomUploaderSocket: any;
  public state: any = {
    modal: false,
    src: emptyImage,
    file: null,
    text: '',
  };

  public onFileChange(oEvent: any) {
    let oFile = oEvent.target.files[0];
    let sRegular = /\.(jpe?g|png|gif)$/i;

    if (!sRegular.test(oFile.name)) {
      return;
    }

    this.setState({
      file: oFile,
    });

    this.showImageModal();

    let oFileReader = new FileReader();
    oFileReader.addEventListener(
      'load',
      (_oEvent: any) => {
        let oImage = new Image();
        oImage.title = oFile.name;
        oImage.src = _oEvent.target.result;
        this.setState({
          src: _oEvent.target.result,
        });
      },
      false,
    );
    oFileReader.readAsDataURL(oFile);
  }

  public onLoad(oEvent: any) {}

  public setText(oEvent: any) {
    this.setState({
      text: oEvent.target.value,
    });
  }

  public onCancel() {
    let oFile = this.ref.current;

    this.setState({
      modal: false,
    });
    oFile.value = null;

    setTimeout(() => {
      this.setState({
        src: emptyImage,
      });
    }, 200);
  }

  public onOK() {
    EmitterHelper.emit('messagesScrollToBottom', 1);

    let oFile = this.ref.current;

    this.setState({
      modal: false,
    });

    setTimeout(() => {
      this.setState({
        src: emptyImage,
      });
    }, 200);

    let oMessage: any = {
      roomId: this.props.roomId,
      user: {
        _id: AuthenticationHelper.getUserId(),
      },
      user_id: AuthenticationHelper.getUserId(),
      text: this.state.text,
      addedTime: moment(new Date()).format(MOMENT.FORMAT),
      loading: true,
    };

    let aIds = this.chatroomFileSocket.upload(oFile, {
      uploadTo: 'roomMessage',
      data: {
        ...oMessage,
        jwt: AuthenticationHelper.getJwt(),
      },
    });
    // this.chatroomFileSocket.abort(aIds[0]);
    oFile.value = null;
    let oState = {
      text: '',
    };
    this.setState(oState);
  }

  public showImageModal() {
    this.setState({
      modal: true,
    });
  }

  public onKeyDown(oEvent: any) {
    if (ENTER_KEY_CODE === oEvent.keyCode && !oEvent.shiftKey) {
      oEvent.preventDefault();
    }
  }

  public onSendMessage(oEvent: any) {
    let sText = this.state.text;

    if ('' === sText || null === sText || undefined === sText) {
      return;
    }

    if (oEvent.type === 'keyup' && (ENTER_KEY_CODE !== oEvent.keyCode || oEvent.shiftKey)) {
      return;
    }
    if (oEvent.type === 'click' && this.state.text === '') {
      return;
    }

    try {
      if (!AuthenticationHelper.getUserId()) {
        let sMessage = MESSAGES['THE_GUEST_CAN_NOT_SEND_MESSAGE'];
        Message.warning(sMessage);
        return;
      }

      let oMessage: any = {
        roomId: this.props.roomId,
        user: {
          _id: AuthenticationHelper.getUserId(),
        },
        text: this.state.text,
        addedTime: moment(new Date()).format(MOMENT.FORMAT),
        virtualId: AuthenticationHelper.getUserId() + '-' + Date.now(),
        loading: true,
      };

      if (!('' === sText || null === sText || undefined === sText)) {
        let aMessages = [oMessage];
        store.dispatch(roomMessage.willSend(aMessages));
        let sJwt = AuthenticationHelper.getJwt();
        let sAccessToken = AuthenticationHelper.getAccessToken();

        oMessage['jwt'] = sJwt;
        oMessage['accessToken'] = sAccessToken;

        this.chatroomSocket.emit('MESSAGE', oMessage);
      }
    } catch (oException) {
    } finally {
      this.setState({
        text: '',
      });
      EmitterHelper.emit('messagesScrollToBottom', 1);
    }
  }

  public onStart(oFileInfo: any) {
    let oUploaders = {
      [oFileInfo.uploadId]: oFileInfo,
    };
    let oMessage: any = {
      roomId: this.props.roomId,
      user: {
        _id: AuthenticationHelper.getUserId(),
      },
      text: this.state.text,
      uploaderId: oFileInfo.uploadId,
      src: this.state.src,
      addedTime: moment(new Date()).format(MOMENT.FORMAT),
      virtualId: AuthenticationHelper.getUserId() + '-' + Date.now(),
      loading: true,
    };

    let aMessages = [oMessage];
    store.dispatch(roomMessage.willSend(aMessages));
    store.dispatch(uploaderAction.willSend(oUploaders));
    let sJwt = AuthenticationHelper.getJwt();
    let sAccessToken = AuthenticationHelper.getAccessToken();
    oMessage['jwt'] = sJwt;
    oMessage['accessToken'] = sAccessToken;

    // this.chatroomSocket.emit("MESSAGE", oMessage);
  }

  public onStream(oFileInfo: any) {
    let oUploaders = {
      [oFileInfo.uploadId]: oFileInfo,
    };
    store.dispatch(uploaderAction.isSending(oUploaders));
  }

  public onComplete(oFileInfo: any) {
    let oUploaders = {
      [oFileInfo.uploadId]: oFileInfo,
    };
    store.dispatch(uploaderAction.didSend(oUploaders));
  }

  public onError(oError: any) {}

  public onAbort(oFileInfo: any) {}

  public componentWillMount() {
    this.chatroomSocket = this.props.context.chatroom;
    this.chatroomFileSocket = this.props.context.chatroomFile;
    this.chatroomUploaderSocket = this.props.context.chatroomUploader;

    this.chatroomFileSocket.on('start', this.onStart);
    this.chatroomFileSocket.on('stream', this.onStream);
    this.chatroomFileSocket.on('complete', this.onComplete);
    this.chatroomFileSocket.on('error', this.onError);
    this.chatroomFileSocket.on('abort', this.onAbort);
  }

  public render() {
    return (
      <div className={'control-pannel pb-1 pt-1' + (this.props.className ? ' ' + this.props.className : '')}>
        <span className="game-wrapper d-inline-block text-center pl-1 pr-1">
          <div>
            <i className="iconfont icon-game game"></i>
          </div>
          <div>游戏</div>
        </span>
        <span className="d-inline-block textarea-wrapper">
          <TextArea
            className={'texarea'}
            rows={2}
            value={this.state.text}
            onChange={this.setText}
            onKeyUp={this.onSendMessage}
            onKeyDown={this.onKeyDown}
          />
        </span>
        <span className="send-wrapper d-inline-block text-center pl-1 pr-1" onClick={this.onSendMessage}>
          <div>
            <i className="iconfont icon-telegram send"></i>
          </div>
          <div>发送</div>
        </span>
        <span className="image-wrapper position-relative d-inline-block text-center pl-1 pr-1">
          <input type="file" className="file position-absolute" ref={this.ref} onChange={this.onFileChange} />
          <div>
            <i className="iconfont icon-image image"></i>
          </div>
          <div>档案</div>
        </span>
        <Modal
          wrapClassName="control-pannel"
          visible={this.state.modal}
          closable={false}
          onCancel={this.onCancel}
          centered={true}
          cancelText="取消"
          onOk={this.onOK}
          okText="送出"
        >
          <div className="preview-image-wrapper">
            <img className="preview-image" src={this.state.src} />
          </div>
          <Input
            className="d-inline mt-2"
            placeholder="描述"
            size="large"
            value={this.state.text}
            onChange={this.setText}
            onPressEnter={this.onOK}
          />
        </Modal>
      </div>
    );
  }
}

function ControlPannelWrapper(oProps: any) {
  return (
    <Service.Socket.Consumer>
      {oContext => <ControlPannel context={oContext} {...oProps}></ControlPannel>}
    </Service.Socket.Consumer>
  );
}
export default ControlPannelWrapper;
