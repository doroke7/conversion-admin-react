import React, { useState } from 'react';

import './Index.scss';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Messages from './Messages/Index';

interface IProps {
  // className?: string | null;
  onSendMessage: any,
  onLogout: any,
  fileRef: any,
  onOKControlPannelModal: any,
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
              onSendMessage={this.props.onSendMessage} 
              fileRef={this.props.fileRef}
              onOKControlPannelModal={this.props.onOKControlPannelModal}/>
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
