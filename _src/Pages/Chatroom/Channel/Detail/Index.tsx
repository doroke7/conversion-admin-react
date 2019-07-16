import React from 'react';

import {
  Socket
} from '@/Commons/index';
import './Index.scss';

class Detail extends React.Component {
  static contextType = Socket;
  public render(){
    return (
      <Socket.Consumer>
        {value => 
        <div className="detail" data-a={value}>
        </div>}
      </Socket.Consumer>

    );
  }
}

export default Detail;
