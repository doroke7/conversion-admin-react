import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faList, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Modal from 'antd/es/modal';
import 'antd/es/modal/style/css';

import Drawer from 'antd/es/drawer';
import 'antd/es/drawer/style/css';

import './Index.scss';


class Top extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public state = { modal: false };

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


  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <div className="top text-center color-white position-relative">
        <span className="position-absolute left"><FontAwesomeIcon icon={faChevronLeft} /></span>
        <span>聊天室</span>
        <span onClick={this.showModal} className="position-absolute gear"><FontAwesomeIcon icon={faCog} /></span>
        <span className="position-absolute info"><FontAwesomeIcon icon={faList} /></span>
        <Modal
          title="Basic Modal"
          visible={this.state.modal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Top;
