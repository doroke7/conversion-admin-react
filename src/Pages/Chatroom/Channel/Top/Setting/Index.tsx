import React from 'react';

import store from '@/store';

import {
  AuthenticationHelper,
} from '@/Helpers/';

import {
  STORAGE
} from "@/CONFIGS/";

import Divider from 'antd/es/divider';
import Avatar from 'antd/es/avatar';

import './Index.scss';

interface IProps {
}

class Top extends React.Component<IProps> {
  public constructor(...props: any) {
    super(props);
  }

  public state: any = {
    users: {}
  };


  public componentDidMount() {


    store.subscribe(() => {
      let sUserId = AuthenticationHelper.getUserId();
      let oState = store.getState();
      let oUsers = oState.users;
      let _oState: any = {};


      if (oUsers[sUserId]) {
        _oState['users'] = {
          [sUserId]: oUsers[sUserId]
        }
      }
      this.setState(_oState);
    });

  }
  public componentDidUpdate() {
  }

  public render() {
    let sUserId = AuthenticationHelper.getUserId();
    let sUrl = sUserId && this.state.users[sUserId] ? this.state.users[sUserId].url : '';
    sUrl = (sUrl && 0 === sUrl.indexOf("http") ? sUrl : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + sUrl);

    return (
      <div className="mt-3 mb-2">
          <span>头像</span><Avatar className="float-right" src={sUrl}/>
          <Divider/>
          <span>昵称</span><span className="float-right">{sUserId && this.state.users[sUserId] ? this.state.users[sUserId].nickname : ''}</span>
          <Divider/>
          <span>我的等级</span><span className="float-right">{sUserId && this.state.users[sUserId] ? this.state.users[sUserId].level : ''}</span>
          <Divider/>
          <span>我的关注</span><span className="float-right">0</span>
          <Divider/>
          <span>我的赞</span><span className="float-right">0</span>
          <Divider/>
          <span>显示我的投注</span>
          <Divider/>
          <span>蔽所有投注</span>
          <Divider/>
      </div>
    );
  }
}

export default Top;
