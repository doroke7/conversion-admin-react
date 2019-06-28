import React from 'react';
import './Index.scss';
interface IProps {
  // className?: string | null;
  name?: string | null
}

class Chatroom extends React.Component<IProps>  {
  public render(){
    return (
      <div className="chatroom ">
        CHATROOM
        <i className="iconfont icon-game game"></i>
        <i className="iconfont icon-telegram send"></i>
        <i className="iconfont icon-plus plus"></i>
      </div>
    );
  }
}

export default Chatroom;
