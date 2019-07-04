import React, { AnchorHTMLAttributes } from 'react';

import Input from 'antd/es/input';

const { TextArea } = Input;

import './Index.scss';

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
  }

  public props :any;

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
        <span className="image-wrapper d-inline-block text-center pl-1 pr-1">
          <div>
            <i className="iconfont icon-image image"></i>
          </div>
          <div>
            档案
          </div>
        </span>
      </div>
    );
  }
}

export default ControlPannel;
