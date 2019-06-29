import React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';

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
          <div className="username-wrapper p-1 mt-1 mb-1 ml-2 mr-2">
            <i className="iconfont icon-user d-inline"></i>
            <Input className="d-inline" placeholder="请输入账号" size="large"/>
          </div>
          <div className="password-wrapper p-1 mt-1 mb-1 ml-2 mr-2">
            <i className="iconfont icon-password d-inline"></i>
            <Input className="d-inline" placeholder="请输入密码" type="password" size="large"/>
          </div>
        </Col>
        <Col xs={0} sm={0} md={4} lg={7} xl={8}>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
