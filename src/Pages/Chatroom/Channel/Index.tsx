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
      <Row>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          <ControlPannel/>
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} xl={4}>
          <Detail />
        </Col>
      </Row>
    </div>

  );
}

export default Channel;
