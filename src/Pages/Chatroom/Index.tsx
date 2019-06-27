import React from 'react';
import './Index.scss';

import Row from 'antd/es/row';
import 'antd/es/row/style/css';

import Col from 'antd/es/col';
import 'antd/es/col/style/css';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

function Chatroom() {

  return (
    <Row >
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
