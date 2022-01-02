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

import style from './style';

import CONFIGS from '@/CONFIGS/';

const MESSAGES = CONFIGS.MESSAGES;

interface State {
  name: string;
  password: string;
  open: boolean;
  text: string;
  error: boolean;
  alertOpen: boolean;
  alertMessage: string;
}

const ENTER_CODE = 13;

function Pannel(oProps: any): any {
  let oClasses: any = style(void 0);

  const jwt = useMappedState((state) => state.jwt);

  let dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  let [oState, setState] = React.useState<State>({
    name: '',
    password: '',
    open: false,
    text: '',
    error: true,
    alertOpen: false,
    alertMessage: ''
  });

  let redirect = async () => {
    let sJwt = Helpers.Authentication.getJwt();

    if (!sJwt) {
      throw new Error('客户端登入异常');
    }

    if ('/admin/authentication/authenticator/sign-in' == location.pathname) {
      history.push('/admin');
      return;
    }
  };

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    setState({ ...oState, name: sName });
  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    setState({ ...oState, password: sPassword });
  };

  let SignIn = async () => {
    try {
      if (!oState.name) {
        throw new Error('请输入管理用户名称');
      }

      if (!oState.password) {
        throw new Error('请输入管理用户密码');
      }

      let oParams = {};

      let oData = {
        param: {
          username: oState.name,
          password: oState.password
        }
      };
      let oPlayLoad = await dispatch(actions.admin.authentication.authenticator.signIn(oParams, oData));
      if (oPlayLoad) {
        setState({ ...oState, alertOpen: true, alertMessage: '登入成功' });
        history.push('/admin');
      }
    } catch (oException) {
      let sKey = oException.message;
      let sMessage = MESSAGES[sKey] || sKey;
      setState({ ...oState, open: true, text: sMessage });
    }
  };

  let onClose = () => {
    setState({ ...oState, open: false });
  };

  let onAlertClose = () => {
    setState({ ...oState, alertOpen: false });
  };

  let onKeyPress = (oEvent: any) => {
    if (ENTER_CODE === oEvent.charCode) {
      SignIn();
    }
  };

  // 全局跳转改写地方
  // redirect();

  return (
    <div className={oClasses.pannel}>
      <Components.Admin.Alert open={oState.alertOpen} message={oState.alertMessage} onClose={onAlertClose} />
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
      <div className={oClasses.forgetPasswordAndSignup}>
        {/* <Link href={SERVICE.HOST + SERVICE.PATH} className={oClasses.link}>
          短管理
        </Link>
        <Link href={'/admin/sign-up'} className={oClasses.link}>
          没有账号? 注冊
        </Link> */}
      </div>

      <div className={oClasses.decriptionAndVersion}>
        <span className={oClasses.decription}>{CONFIGS.APP.DESCRIPTION}</span>
        <span className={oClasses.version}>Ver. ({CONFIGS.APP.VER})</span>
      </div>
      <Components.Admin.Message open={oState.open} text={oState.text} onClose={onClose} />
    </div>
  );
}
export default Pannel;
