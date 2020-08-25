import React from 'react';
import { Link } from 'react-router-dom';

import Modal from 'antd/es/modal';
import Drawer from 'antd/es/drawer';

import './Index.scss';

class Top extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public state = {
    modal: false,
    drawer: false
  };

  public showModal = () => {
    this.setState({
      modal: true
    });
  };

  public handleOk = (e: any) => {
    this.setState({
      modal: true
    });
  };

  public handleCancel = (e: any) => {
    this.setState({
      modal: false
    });
  };

  showDrawer = () => {
    this.setState({
      drawer: true
    });
  };

  onClose = () => {
    this.setState({
      drawer: false
    });
  };

  public componentDidMount() {}

  public componentDidUpdate() {}

  public render() {
    return (
      <div className="top text-center color-white position-relative">
        <span>聊天室</span>
      </div>
    );
  }
}

export default Top;
