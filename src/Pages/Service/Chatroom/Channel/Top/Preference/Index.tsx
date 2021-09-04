import React from 'react';

import store from '@/store';

import Helpers from '@/Helpers/';

import CONFIGS from '@/CONFIGS/';

import Divider from 'antd/es/divider';
import Avatar from 'antd/es/avatar';
import Input from 'antd/es/input';
import Switch from 'antd/es/switch';
import Button from 'antd/es/button';

import './Index.scss';
const STORAGE = CONFIGS.STORAGE;

interface IProps {}

// TO DO  改成 Preference
class Preference extends React.Component<IProps> {
  public constructor(...props: any) {
    super(props);
    this.enableNickname = this.enableNickname.bind(this);
  }

  public state: any = {
    users: {},
    disabledNickname: true
  };

  public enableNickname() {
    let oState = {
      disabledNickname: false
    };

    this.setState(oState);
  }

  public componentDidMount() {
    store.subscribe(() => {
      let sUserId = Helpers.Authentication.getUserId();
      let oState = store.getState();
      let oUsers = oState.users;
      let _oState: any = {};

      if (oUsers[sUserId]) {
        _oState['users'] = {
          [sUserId]: oUsers[sUserId]
        };
      }
      this.setState(_oState);
    });
  }
  public componentDidUpdate() {}

  public render() {
    let sUserId = Helpers.Authentication.getUserId();
    let sUrl = sUserId && this.state.users[sUserId] ? this.state.users[sUserId].url : '';
    sUrl = sUrl && 0 === sUrl.indexOf('http') ? sUrl : 'http://' + STORAGE.HOST + STORAGE.PRE_PATH + sUrl;
    let sNickname = sUserId && this.state.users[sUserId] ? this.state.users[sUserId].nickname : '';
    let iLevel = sUserId && this.state.users[sUserId] ? this.state.users[sUserId].level : 1;
    iLevel = iLevel && iLevel >= 0 && iLevel <= 6 ? iLevel : 1;
    let sRole = sUserId && this.state.users[sUserId] ? this.state.users[sUserId].role.toLowerCase() : 'member';
    let sLevel = String(iLevel).padStart(2, '0');
    let sLevelClassName = 'user-' + sRole + (sRole === 'member' ? '-' + sLevel : '');

    return (
      <div className="setting mt-4 mb-3">
        <div className="list">
          <div className="text-center">
            <Avatar className="" size={100} src={sUrl} />
          </div>
          <div className="text-center mt-1">
            <Button type="primary" shape="round" icon="upload">
              上传
            </Button>
          </div>
        </div>
        <Divider />
        <div className="list">
          <span>昵称</span>
          <span className="float-right">
            <span className="nicknam-wrapper" onClick={this.enableNickname}>
              <Input className="d-inline text-right" disabled={this.state.disabledNickname} value={sNickname} />
            </span>
          </span>
        </div>
        <Divider />
        <div className="list">
          <span>我的等级</span>
          <span className="float-right">
            <span className={'d-inline-block ' + sLevelClassName}></span>
          </span>
        </div>
        <Divider />
        <div className="list">
          <span>我的关注</span>
          <span className="float-right">0</span>
        </div>
        <Divider />
        <div className="list">
          <span>我的赞</span>
          <span className="float-right">0</span>
        </div>
        <Divider />
        <div className="list">
          <span>显示我的投注</span>
          <Switch className="float-right" defaultChecked />
        </div>
        <Divider />
        <div className="list">
          <span>蔽所有投注</span>
          <Switch className="float-right" defaultChecked />
        </div>
        <Divider />
      </div>
    );
  }
}

export default Preference;
