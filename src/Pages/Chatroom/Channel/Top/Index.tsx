import React from 'react';
import { Link } from 'react-router-dom'

import Modal from 'antd/es/modal';
import Drawer from 'antd/es/drawer';
import Divider from 'antd/es/divider';

import './Index.scss';

class Top extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public state = {
    modal: false,
    drawer: false,
  };

  public showModal = () => {
    this.setState({
      modal: true,
    });
  };

  public handleOk = (e: any) => {
    console.log(e);
    this.setState({
      modal: true,
    });
  };

  public handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      modal: false,
    });
  };

  showDrawer = () => {
    this.setState({
      drawer: true,
    });
  };

  onClose = () => {
    this.setState({
      drawer: false,
    });
  };


  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <div className="top text-center color-white position-relative">
        <Link to={{ pathname: '/login'}}>
          <span className="position-absolute left">
            <i className="iconfont icon-left"></i>
          </span>
        </Link>
        <span>聊天室</span>
        <span onClick={this.showModal} className="position-absolute setting">
          <i className="iconfont icon-setting"></i>
        </span>
        <span onClick={this.showDrawer} className="position-absolute list">
        <i className="iconfont icon-list"></i>
        </span>
        <Modal
          mask={false}
          visible={this.state.modal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>头像</p>
          <p>昵称</p>
          <p>等级</p>
        </Modal>
        <Drawer className="top"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawer}
        >
          <span className="logout-wrapper">
            <i className="iconfont icon-logout"></i><span className="ml-1">登出</span>
          </span>
          <Divider/>
        </Drawer>
      </div>
    );
  }
}

export default Top;
