import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faList, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Modal from 'antd/es/Modal'; // 加载 JS
import 'antd/es/date-picker/style/css'; // 加载 CSS

import './Index.scss';

type Props = {
  toggleDrawer: any
};

class Top extends React.Component<Props> {
  public constructor(props: any) {
    super(props);
  }

  public state = { visible: false };

  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: true,
    });
  };

  public handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
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
        <span className="position-absolute gear"><FontAwesomeIcon icon={faCog} /></span>
        <span onClick={this.props.toggleDrawer(true)} className="position-absolute info"><FontAwesomeIcon icon={faList} /></span>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
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
