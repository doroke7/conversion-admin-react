import React from 'react';
import './Index.scss';


const Message: React.FC = () => {
  let role = 'admin';
  let position = 'right';
  let icon = 'http://dev.socket.chatroom.ques98.cn/storage/user/admin.png';
  return (
    <div className={"message" + " " + "text-right " + position + " " + role}>
      <span className="d-inline-block align-top">
        <div className="text-right">
          <span className="time">20:10:43</span>
          <span className="name">管理员</span>
        </div>
        <div className={"content text-left"}>
          <div className="image">
            
          </div>
          <div className="text">
            I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!I LOVE U!
          </div>
        </div>
      </span>
      <span className="d-inline-block align-top">
        <div className="triangle">
        </div>
      </span>
      <span className="d-inline-block align-top">
        <div className="avator">
          <img src={icon} />
        </div>
      </span>
    </div>
  );
}

export default Message;
