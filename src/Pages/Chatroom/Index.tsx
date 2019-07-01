import React from 'react';
import { Motion, spring, presets } from 'react-motion'

import Row from 'antd/es/row';
import Col from 'antd/es/col';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

function Chatroom() {

  return (
    <Motion defaultStyle={{opacity: 0}}  style={{ opacity: spring(1, {stiffness: 300, damping: 40}) }}>
      {(oStyles: any) => (
        <Row className="chatroom" style={ oStyles }>
          <Col xs={0} sm={8} md={8} lg={6} xl={6}>
            <Rooms/>
          </Col>
          <Col xs={24} sm={16} md={16} lg={18} xl={18}>
            <Channel/>
          </Col>
        </Row>
        )}
    </Motion>

  );
}

export default Chatroom;