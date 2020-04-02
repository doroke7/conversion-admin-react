import React from 'react';
import moment from 'moment';
import './Index.scss';

import STORAGE from '@/CONFIGS/STORAGE/INDEX';

import { Badge } from 'antd';

interface IProps {
  // className?: string | null;
  name?: string | null
  icon?: string
  editedTime?: string
}

class Room extends React.Component<IProps> {
  
  public render() {
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + this.props.icon;
    let sEditedTime = moment.unix(new Date(this.props.editedTime).getTime() / 1000).format('HH:mm');
    let iCount = 5;
    return (
      <div className="room align-baseline position-relative">
        <span className="icon d-inline-flex justify-content-center align-middle overflow-hidden">
          <img src={sSrc}/>
        </span>
        <span className="name-text d-inline-flex flex-column align-middle justify-content-between ml-1">
          <div className="name font-weight-bold text-truncate">
            {this.props.name}
          </div>
          <div className="text text-truncate">
            我们的东西有问题？
          </div>
        </span>
        <span className="time-count d-inline-flex flex-column align-middle justify-content-between text-right position-absolute">
          <div >
            {sEditedTime}
          </div>
          <div >
            { 
              iCount > 0 ? 
              <Badge count={4}
                style={{ backgroundColor: '#1890ff', color: '#ffffff'}}
              /> :
              ""
            }
          </div>
        </span>
      </div>
    );
  }
}


export default Room;
