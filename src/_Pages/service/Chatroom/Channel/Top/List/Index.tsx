import React from 'react';
import { Link } from 'react-router-dom'

import Modal from 'antd/es/modal';
import Drawer from 'antd/es/drawer';
import Divider from 'antd/es/divider';

import './Index.scss';

interface IProps {
  onLogout: any,
}

class Top extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);
  }


  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <span className="logout-wrapper" onClick={this.props.onLogout}>
      <i className="iconfont icon-logout"></i><span className="ml-1">登出</span>
      </span>
    );
  }
}

export default Top;
