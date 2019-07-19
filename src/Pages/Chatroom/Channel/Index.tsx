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
  onKeyDown: any,
  onLogout: any,
  setText: any,
  text: string,
  fileRef: any,
  onOKControlPannel: any,
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
              text={this.props.text} 
              setText={this.props.setText} 
              onSendMessage={this.props.onSendMessage} 
              onKeyDown={this.props.onKeyDown}
              fileRef={this.props.fileRef}
              onOKControlPannel={this.props.onOKControlPannel}/>
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
