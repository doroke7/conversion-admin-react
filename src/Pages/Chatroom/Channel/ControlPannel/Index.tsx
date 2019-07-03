import React from 'react';

import Input from 'antd/es/input';

const { TextArea } = Input;

import './Index.scss';

interface IProps {
  // className?: string | null;
  onSendMessage: any
}

class ControlPannel extends React.Component<IProps>  {
  constructor(props: any) {
    super(props);
    this.setText = this.setText.bind(this);
    this.state = {
      text: ''
    };
  }

  public state: any;

  public setText (oEvent: any) {
    this.setState({
      text: oEvent.target.value
    });
  }
  props :any;
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
          <TextArea rows={2} value={this.state.text} onChange={this.setText} onPressEnter={this.props.onSendMessage}/>
        </span>
        <span className="send-wrapper d-inline-block text-center pl-1 pr-1">
          <div>
            <i className="iconfont icon-telegram send"></i>
          </div>
          <div>
            发送
          </div>
        </span>
        <span className="plus-wrapper d-inline-block text-center pl-1 pr-1">
          <div>
            <i className="iconfont icon-plus plus"></i>
          </div>
          <div>
            更多
          </div>
        </span>
      </div>
    );
  }
}

export default ControlPannel;
