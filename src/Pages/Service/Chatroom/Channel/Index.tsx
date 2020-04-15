import React, { useState } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import store from '@/store';

import None from './None/Index';
import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';
import Messages from './Messages/Index';

import './Index.scss';

interface IProps {
  // className?: string | null;
  onLogout: any,
}

class Channel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);

    store.subscribe(() => {
      let oState = store.getState();
      let sRoomId = oState.roomId;

      let _oState = {
        roomId: sRoomId ? sRoomId : ''
      };
      this.setState(_oState);
    });

  }

  public state: any = {
    roomId: '',
  };

  public render () {


    
    return (
      <div className="channel">
        <Top onLogout={this.props.onLogout}/>
        {this.state.roomId ?
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} className="room-wrapper position-relative">
              <Messages />
              <ControlPannel>
              </ControlPannel>
            </Col>
            <Col xs={0} sm={0} md={0} lg={0} xl={8} className="detail-wrapper position-relative">
              <Detail />
            </Col>
          </Row> : 
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="position-relative">
              <None />
            </Col>
          </Row>}
      </div>
    );
  }
}

export default Channel;
