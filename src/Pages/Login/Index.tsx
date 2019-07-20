import React from 'react';
import {withRouter} from "react-router-dom";

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';

import {
  Page as PageHOC
} from '@/HOCs/';

import store from '@/store';

import Top from './Top/Index';
import './Index.scss';

// import {
//   AuthenticationHelper,
//   SocketHelper,
//   AxiosHelper,
// } from '@/Helpers';

import {
  jwtAction
} from '@/actions/';

import {
  MODALS
} from '@/CONFIGS/';

interface IProps {
  history: any;
}

class Login extends React.Component<IProps> {

  public constructor(...props: any) {
    super(props);
    this.login = this.login.bind(this);
    this.setName = this.setName.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.state = {
      name: '',
      password: '',
    };
  }

  public state: any;

  public async login() {
    try {
      let oBody = {
        name: this.state.name,
        password: this.state.password
      };
  
      if (!oBody.name ) {
        throw new Error('THE_USER_NAME_IS_EMPTY');
      }
  
      if (!oBody.password) {

        throw new Error('THE_USER_PASSWORD_IS_EMPTY');
      }
  
      let oState = await store.dispatch(jwtAction.login(oBody));
      this.props.history.push('/chatroom');
    } catch (oException) {
      let sMessage = oException.message;
      let MODAL = MODALS[sMessage] || MODALS['IT_IS_UNKNOWN_ERROR'];
      Modal.info({
        title: MODAL.TITLE,
        content: MODAL.CONTENT,
      });
    }

    
  }

  public setName (oEvent: any){
    this.setState({
      name: oEvent.target.value
    });
  }

  public setPassword (oEvent: any){
    this.setState({
      password: oEvent.target.value
    });
  }

  public render() {
    return (
      <div className="login">
        <Row>
          <Col xs={0} sm={0} md={4} lg={7} xl={8}>
          </Col>
          <Col xs={24} sm={24} md={16} lg={10} xl={8}>
            <Top />
            <div className="middle pt-1 pb-1">
              <div className="username-wrapper p-1 ml-2 mr-2">
                <i className="iconfont icon-user d-inline"></i>
                <Input className="d-inline" placeholder="请输入账号" size="large" value={this.state.name} onChange={this.setName} onPressEnter={this.login}/>
              </div>
              <div className="password-wrapper p-1 ml-2 mr-2">
                <i className="iconfont icon-password d-inline"></i>
                <Input className="d-inline" placeholder="请输入密码" type="password" size="large" value={this.state.password} onChange={this.setPassword} onPressEnter={this.login}/>
              </div>
              <Divider/>
              <div className="button-wrapper ml-2 mr-2">
                <Button type="primary" shape="round" size="large" block onClick={this.login}>
                  登入
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={4} lg={7} xl={8}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(PageHOC(Login));
