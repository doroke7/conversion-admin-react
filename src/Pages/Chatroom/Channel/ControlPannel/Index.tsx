import React, { AnchorHTMLAttributes } from 'react';

import Input from 'antd/es/input';
import Modal from 'antd/es/modal';

const { TextArea } = Input;

import './Index.scss';

import emptyImage from '@/images/empty-image.gif';

interface IProps {
  // className?: string | null;
  onSendMessage: any,
  onKeyDown: any,
  setText: any,
  text: any
}

class ControlPannel extends React.Component<IProps>  {
  constructor(props: any) {
    super(props);
    this.showImageModal = this.showImageModal.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCancel = this.onCancel.bind(this);

  }

  public props :any;
  public state: any ={
    modal: false,
    src: emptyImage,
    file: null,
  }

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
    oFileReader.addEventListener("load",
      (_oEvent: any) => {
        let oImage = new Image();
        oImage.title = oFile.name;
        oImage.src = _oEvent.target.result;
        this.setState({
          src: _oEvent.target.result,
        });
      },
      false
    );
    oFileReader.readAsDataURL(oFile);
  }

  public onLoad(oEvent: any) {

  }
  public onOK(oEvent: any) {
    let oFile = this.state.file;
    oFile.reset();
    // this.moreFlag = false;
    // let oFile: any =  $("#files")[0];
    // oFile.reset();
  }

  public onCancel() {
    this.setState({
      modal: false,
    });

    setTimeout(() => {
      this.setState({
        src: emptyImage,
      });
    }, 200);
  };

  public showImageModal(){
    this.setState({
      modal: true,
    });
  }

  public render(){
    return (
      <div className={"control-pannel pb-1 pt-1" + (this.props.className ? " " + this.props.className : "")}>
        <span className="game-wrapper d-inline-block text-center pl-1 pr-1">
          <div>
            <i className="iconfont icon-game game"></i>
          </div>
          <div>
            游戏
          </div>
        </span>
        <span className="d-inline-block textarea-wrapper">
          <TextArea 
            rows={2} 
            value={this.props.text} 
            onChange={this.props.setText} 
            onKeyUp={this.props.onSendMessage}
            onKeyDown={this.props.onKeyDown}
            />
        </span>
        <span className="send-wrapper d-inline-block text-center pl-1 pr-1" onClick={this.props.onSendMessage}>
          <div>
            <i className="iconfont icon-telegram send"></i>
          </div>
          <div>
            发送
          </div>
        </span>
        <span className="image-wrapper position-relative d-inline-block text-center pl-1 pr-1">
          <input type="file" className="file position-absolute" onChange={this.onFileChange}/>
          <div>
            <i className="iconfont icon-image image"></i>
          </div>
          <div>
            档案
          </div>
        </span>
        <Modal wrapClassName="control-pannel"
          visible={this.state.modal}
          closable={false}
          onCancel={this.onCancel}
          centered={true}

        >
          <div className="preview-image-wrapper">
            <img className="preview-image" src={this.state.src} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ControlPannel;
