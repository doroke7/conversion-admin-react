import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Components from '@/Components';
import actions from '@/actions/';
import Helpers from '@/Helpers/';
import events from '@/events';
import CONFIGS from '@/CONFIGS/';

import style from './style';

const MESSAGES = CONFIGS.MESSAGES;

interface State {
  name: string;
  password: string;
}

const ENTER_CODE = 13;

function Pannel(oProps: any): any {
  let oClasses: any = style(void 0);

  const jwt = useMappedState((state) => state.jwt);

  let oDispatch = useDispatch();
  let oHistory = useHistory();
  let oLocation = useLocation();

  let [oState, cSetState] = React.useState<State>({
    name: '',
    password: ''
  });

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    cSetState({ ...oState, name: sName });
  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    cSetState({ ...oState, password: sPassword });
  };

  let SignIn = async () => {
    try {
      if (!oState.name) {
        throw new Error('请输入管理用户名称');
      }

      if (!oState.password) {
        throw new Error('请输入管理用户密码');
      }

      if (oState.name.length <= 3) {
        throw new Error('请输入4 字元以上名称');
      }

      if (oState.password.length <= 5) {
        throw new Error('请输入6 字以上元密码');
      }

      let oBody = {
        param: {
          username: oState.name,
          password: oState.password
        }
      };
      let oOption = {};
      let oQuery = {};

      let oPlayLoad = await oDispatch(actions.admin.authentication.authenticator.signIn(oBody, oOption, oQuery));
      if (oPlayLoad) {
        oHistory.push('/admin/resource');
      }
    } catch (oException) {
      let oMessage = {
        code: -1,
        message: oException.message,
        time: 50 * 1000
      };
      events.admin.emit('Alerts-onAlert', oMessage);
    }
  };

  let onKeyPress = (oEvent: any) => {
    if (ENTER_CODE === oEvent.charCode) {
      SignIn();
    }
  };

  // 全局跳转改写地方
  // redirect();
  // w
  return (
    <div className={oClasses.pannel}>
      <Avatar className={oClasses.avatar}>
        <LockIcon />
      </Avatar>
      <h2 className={oClasses.title}>{CONFIGS.APP.NAME}</h2>
      <TextField
        id="user-name"
        label="名称"
        className={oClasses.textField}
        onChange={onChangeName}
        margin="normal"
        fullWidth
        variant="outlined"
        onKeyPress={onKeyPress}
      />
      <TextField
        id="user-password"
        label="密码"
        type="password"
        className={oClasses.textField}
        onChange={onChangePassword}
        margin="normal"
        fullWidth
        variant="outlined"
        onKeyPress={onKeyPress}
      />
      <Button onClick={SignIn} className={oClasses.button} variant="contained" color="primary" fullWidth>
        登入
      </Button>
      <div className={oClasses.forgetPasswordAndSignup}></div>

      <div className={oClasses.decriptionAndVersion}>
        <span className={oClasses.decription}>{CONFIGS.APP.DESCRIPTION}</span>
        <span className={oClasses.version}>Ver. ({CONFIGS.APP.VER})</span>
      </div>
    </div>
  );
}
export default Pannel;
