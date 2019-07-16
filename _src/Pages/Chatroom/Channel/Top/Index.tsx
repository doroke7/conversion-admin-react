import React from 'react';
import { Link } from 'react-router-dom'

import Modal from 'antd/es/modal';
import Drawer from 'antd/es/drawer';
import Divider from 'antd/es/divider';

import Setting from './Setting/Index';
import List from './List/Index';

import './Index.scss';

interface IProps {
  onLogout: any,
}

class Top extends React.Component<IProps> {
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

  public showDrawer = () => {
    this.setState({
      drawer: true,
    });
  };

  public onClose = () => {
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
        <Link to={{ pathname: '/login'}} className="sm-d-none md-d-none lg-d-none xl-d-none">
          <span className="position-absolute left">
            <i className="iconfont icon-left"></i>
          </span>
        </Link>
        <span className="title">聊天室</span>
        <span onClick={this.showModal} className="position-absolute setting">
          <i className="iconfont icon-setting"></i>
        </span>
        <span onClick={this.showDrawer} className="position-absolute list">
        <i className="iconfont icon-list"></i>
        </span>
        <Modal
          mask={true}
          wrapClassName="wrapper-modal"
          // centered={true}
          footer={null}
          visible={this.state.modal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Setting/>

        </Modal>
        <Drawer className="top"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawer}
        >
          <List onLogout={this.props.onLogout}/>
          <Divider/>
        </Drawer>
      </div>
    );
  }
}

export default Top;
