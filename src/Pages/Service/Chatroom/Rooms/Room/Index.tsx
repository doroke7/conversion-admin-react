import React from 'react';
import './Index.scss';

import STORAGE from '@/CONFIGS/STORAGE';

interface IProps {
  // className?: string | null;
  name?: string | null
  icon?: string
}

class Room extends React.Component<IProps> {
  public render() {
    return (
      <div className="room">
        <span className="icon d-inline-flex justify-content-center overflow-hidden">
          <img src={STORAGE.HOST + this.props.icon}/>
        </span>
        <span className="d-inline-flex">
          <div className="name">
            {this.props.name}
          </div>
          <div>
            ...
          </div>
        </span>
        <span className="d-inline-flex">
          <div>
            13:12 am
          </div>
          <div>
            5
          </div>
        </span>
      </div>
    );
  }
}


export default Room;
