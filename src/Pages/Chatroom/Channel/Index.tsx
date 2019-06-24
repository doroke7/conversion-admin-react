import React from 'react';
import './Index.scss';

import ControlPannel from './ControlPannel/Index';
// import Message from './Message/Index';


const Channel: React.FC = () => {
  return (
    <div className="channel">
      <ControlPannel/>
    </div>
  );
}

export default Channel;
