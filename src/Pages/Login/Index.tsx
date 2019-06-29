import React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { AInput } from './../../Components';

import Top from './Top/Index';
import './Index.scss';

const Login: React.FC = () => {
  return (
    <div className="login">
      <Row>
        <Col xs={0} sm={0} md={4} lg={7} xl={8}>
        </Col>
        <Col xs={24} sm={24} md={16} lg={10} xl={8}>
          <Top />
          LOGIN
          <AInput />
        </Col>
        <Col xs={0} sm={0} md={4} lg={7} xl={8}>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
