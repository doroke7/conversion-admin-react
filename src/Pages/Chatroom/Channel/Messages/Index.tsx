import React from 'react';
import './Index.scss';

import Message from './Message/Index';

const Messages: React.FC = () => {
  return (
    <div className="messages p-2 overflow-auto">
      <Message
        role="admin"
        icon="http://dev.socket.chatroom.ques98.cn/storage/user/admin.png" 
        time="20:10:43" 
        name="管理者"/>
    </div>
  );
}

export default Messages;
