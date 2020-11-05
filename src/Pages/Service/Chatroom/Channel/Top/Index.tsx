import React from 'react';
import { Link } from 'react-router-dom';

import Modal from 'antd/es/modal';
import Drawer from 'antd/es/drawer';
import Divider from 'antd/es/divider';

import Setting from './Setting/Index';
import List from './List/Index';

import store from '@/store';

import actions from '@/actions/';

let userAction = actions.service.user;

import { AuthenticationHelper } from '@/Helpers/';

import './Index.scss';

interface IProps {
  onLogout: any;
}

class Top extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);
    this.getUserAndshowModal = this.getUserAndshowModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  public state = {
    modal: false,
    drawer: false
  };

  public getUserAndshowModal(): void {
    this.getUser();

    this.showModal();
  }

  public async getUser(): Promise<void> {
    try {
      let sUserId = AuthenticationHelper.getUserId();
      store.dispatch(userAction.show(sUserId));
    } catch (oException) {
      // DO NOTHING
    }
  }
  public showModal(): void {
    this.setState({
      modal: true
    });
  }

  public handleOk(e: any): void {
    this.setState({
      modal: true
    });
  }

  public handleCancel(e: any): void {
    this.setState({
      modal: false
    });
  }

  public showDrawer(): void {
    this.setState({
      drawer: true
    });
  }

  public onClose(): void {
    this.setState({
      drawer: false
    });
  }

  public componentDidMount() {}

  public componentDidUpdate() {}

  public render() {
    return (
      <div className="top text-center color-white position-relative">
        <Link to={{ pathname: '/login' }} className="sm-d-none md-d-none lg-d-none xl-d-none">
          <span className="position-absolute left">
            <i className="iconfont icon-left"></i>
          </span>
        </Link>
        <span className="title">聊天室</span>
        <span onClick={this.getUserAndshowModal} className="position-absolute setting">
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
          <Setting />
        </Modal>
        <Drawer className="top" placement="right" closable={false} onClose={this.onClose} visible={this.state.drawer}>
          <List onLogout={this.props.onLogout} />
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default Top;
