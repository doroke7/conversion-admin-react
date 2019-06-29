import React from 'react';
import './Index.scss';

import Message from './Message';

const Messages: React.FC = () => {
  return (
    <div className="messages p-1">
      <Message/>
    </div>
  );
}

export default Messages;
