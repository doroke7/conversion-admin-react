import React, { useState } from 'react';
import './Index.scss';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';

import Row from 'antd/es/row';
import Col from 'antd/es/col';

// import Message from './Message/Index';
const Channel: React.FC = () => {
  
  return (
    <div className="channel">
      <Top />
      <Row className="position-relative">
        <Col xs={24} sm={24} md={12} lg={16} xl={16}>
          <ControlPannel className="position-absolute"/>
        </Col>
        <Col xs={0} sm={0} md={12} lg={8} xl={8}>
          <Detail />
        </Col>
      </Row>
    </div>

  );
}

export default Channel;
