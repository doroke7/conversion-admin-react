import React from 'react';
import './Index.scss';
import Top from './Top/Index';
import Room from './Room/Index';

const Rooms: React.FC = () => {
  
  return (
    <div className="rooms">
      <Top />
      <div className="pseudo-rooms overflow-auto">
      {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((iNumber, iIndex) => <Room/>)}
      </div>
    </div>
  );
}

export default Rooms;
