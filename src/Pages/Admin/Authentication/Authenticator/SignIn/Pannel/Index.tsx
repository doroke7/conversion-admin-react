import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import Sdks from '@/Sdks';
import Components from '@/Components';
import Exception from '@/Exception/';
import actions from '@/actions/';
import Helpers from '@/Helpers/';
import events from '@/events';
import CONFIGS from '@/CONFIGS/';

import style from './style';

const MESSAGES = CONFIGS.MESSAGES;

interface State {
  name: string;
  password: string;
  loading: boolean;
  pannelAnimation: boolean;
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
    password: '',
    loading: false,
    pannelAnimation: false
  });

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    cSetState({ ...oState, name: sName });
  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    cSetState({ ...oState, password: sPassword });
  };

  let cSignIn = async () => {
    try {
      if (!oState.name) {
        throw new Exception('请输入管理用户名称', -1);
      }

      if (!oState.password) {
        throw new Exception('请输入管理用户密码', -1);
      }

      if (oState.name.length <= 3) {
        throw new Exception('请输入4 字元以上名称', -1);
      }

      if (oState.password.length <= 5) {
        throw new Exception('请输入6 字以上元密码', -1);
      }
      events.admin.emit('Progress-onProgress', { value: 0, status: true });

      let oResponse = await Sdks.Admin.Authentication.Authenticator.postSignIn(oState.name, oState.password);
      let sJwt = oResponse?.headers?.authorization ?? '';
      if (oResponse && oResponse?.data?.code <= -1) {
        throw new Exception(oResponse?.data?.message ?? '', oResponse?.data?.code ?? 0);
      }

      if (!sJwt) {
        throw new Exception('接口缺少令牌', -2);
      }
      cSetState({ ...oState, loading: true, pannelAnimation: true });

      Helpers.Authentication.setJwt(sJwt);
      oDispatch(actions.admin.authentication.authenticator.postSignIn(oResponse));

      if (oResponse && oResponse?.data?.code >= 1) {
        let oMessage = {
          code: oResponse?.data?.code ?? 0,
          message: oResponse?.data?.message ?? '',
          time: 2 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
      }

      if (oResponse) {
        /*
         * NOTE: 把 setTimeout 写成 “同步函数” 做法
           NOTE: await 只是语法糖，看起来像同步，事实上底层运作依然是异步
        */
        await new Promise((cResolve) => setTimeout(cResolve, 300));
        oHistory.push('/admin/resource');
        events.admin.emit('Progress-onProgress', { value: 98, status: true });
      }
    } catch (oException) {
      let oMessage = {
        code: oException.code ?? -9999,
        message: oException.message ?? '未知错误',
        time: 3 * 1000
      };
      events.admin.emit('Alerts-onAlert', oMessage);
      events.admin.emit('Progress-onProgress', { value: 0, status: false });
    } finally {
      cSetState((oOldState) => {
        let oNewState = { ...oOldState, loading: false };
        return oNewState;
      });
    }
  };

  let onKeyPress = (oEvent: any) => {
    if (ENTER_CODE === oEvent.charCode) {
      cSignIn();
    }
  };

  return (
    <div
      className={clsx(oClasses.pannel, {
        [oClasses.pannelAnimation]: oState.pannelAnimation
      })}>
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
      <Button onClick={cSignIn} className={oClasses.button} variant="contained" color="primary" fullWidth>
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
