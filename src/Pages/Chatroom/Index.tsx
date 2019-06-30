import React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

function Chatroom() {

  return (
    <Row className="chatroom">
      <Col xs={0} sm={8} md={8} lg={6} xl={6}>
        <Rooms/>
      </Col>
      <Col xs={24} sm={16} md={16} lg={18} xl={18}>
        <Channel/>
      </Col>
    </Row>
  );
}

export default Chatroom;
