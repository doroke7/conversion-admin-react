import React from 'react';
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
    loading: false
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

      cSetState({ ...oState, loading: true });

      let oResponse = await Sdks.Admin.Authentication.Authenticator.postSignIn(oState.name, oState.password);
      oDispatch(actions.admin.authentication.authenticator.postSignIn(oResponse));

      if (oResponse && oResponse?.data?.code <= -1) {
        throw new Exception(oResponse?.data?.message ?? '', oResponse?.data?.code ?? 0);
      }

      if (oResponse && oResponse?.data?.code >= 1) {
        let oMessage = {
          code: oResponse?.data?.code ?? 0,
          message: oResponse?.data?.message ?? '',
          time: 2 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
      }

      if (oResponse) {
        oHistory.push('/admin/resource');
      }
    } catch (oException) {
      let oMessage = {
        code: oException.code ?? 0,
        message: oException.message ?? '',
        time: 3 * 1000
      };
      events.admin.emit('Alerts-onAlert', oMessage);
    } finally {
      cSetState({ ...oState, loading: false });
    }
  };

  let onKeyPress = (oEvent: any) => {
    if (ENTER_CODE === oEvent.charCode) {
      SignIn();
    }
  };

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
      <Button
        onClick={SignIn}
        className={oClasses.button}
        startIcon={oState.loading ? <AutorenewIcon className={oClasses.autorenewIcon} /> : ''}
        variant="contained"
        color="primary"
        fullWidth>
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
