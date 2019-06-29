import React from 'react';
import './Index.scss';

import Message from './Message/Index';

const Messages: React.FC = () => {
  return (
    <div className="messages p-2 overflow-auto">
      <Message/>
    </div>
  );
}

export default Messages;
