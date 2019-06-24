import React from 'react';
import './Index.scss';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';
import Information from './Information/Index';

const Chatroom: React.FC = () => {
  return (
    <div className="chatroom">
      <Rooms/>
      <Channel/>
      <Information/>
    </div>
  );
}

export default Chatroom;
