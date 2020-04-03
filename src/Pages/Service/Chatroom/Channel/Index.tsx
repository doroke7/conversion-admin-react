import React, { useState } from 'react';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Messages from './Messages/Index';

import './Index.scss';

interface IProps {
  // className?: string | null;
  onLogout: any,
}

class Channel extends React.Component<IProps> {

  public render () {
    return (
      <div className="channel">
        <Top onLogout={this.props.onLogout}/>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} className="room-wrapper position-relative">
            <Messages />
            <ControlPannel 
              className="position-absolute" 
            >
              
            </ControlPannel>
          </Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={8} className="detail-wrapper position-relative">
            <Detail />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Channel;
