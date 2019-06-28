import React from 'react';

import Input from 'antd/es/input';

const { TextArea } = Input;

import './Index.scss';

interface IProps {
  // className?: string | null;
}

class ControlPannel extends React.Component<IProps>  {
  constructor(props: any) {
    super(props);
    this.props = props;
  }
  props :any;
  public render(){
    return (
      <div className={"control-pannel" + (this.props.className ? " " + this.props.className : "")}>
        <span className="d-inline-block">
          <div>
            <i className="iconfont icon-game game"></i>
          </div>
          <div>
            游戏
          </div>
        </span>
        <span className="d-inline-block textarea-wrapper">
          <TextArea rows={2} />
        </span>
        <span className="d-inline-block">
          <div>
            <i className="iconfont icon-telegram send"></i>
          </div>
          <div>
            发送
          </div>
        </span>
        <span className="d-inline-block">
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
