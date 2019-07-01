import React from 'react';
import { Motion, spring, presets } from 'react-motion'

import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

import './Index.scss';

class Chatroom extends React.Component {

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 800);

  }

  public state = {
    loading: true,
  };

  public render() {
    return (
      <Spin tip="进入聊天室..." spinning={this.state.loading} delay={0}>
        <Row className="chatroom">
          <Col xs={0} sm={8} md={8} lg={6} xl={6}>
            <Rooms/>
          </Col>
          <Col xs={24} sm={16} md={16} lg={18} xl={18}>
            <Channel/>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default Chatroom;