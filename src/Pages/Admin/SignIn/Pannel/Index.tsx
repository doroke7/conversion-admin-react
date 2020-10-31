import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Components from '@/Components';
import { authenticationAction } from '@/actions/';

import style from './style';

import { MESSAGES, SERVICE } from '@/CONFIGS/';

interface State {
  name: string;
  password: string;
  open: boolean;
  text: string;
}

const ENTER_CODE = 13;

function Pannel(): any {
  let classes: any = style(void 0);

  const jwt = useMappedState((state) => state.jwt);

  let dispatch = useDispatch();

  let [oState, setState] = React.useState<State>({
    name: '',
    password: '',
    open: false,
    text: ''
  });

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
        throw new Error('THE_ADMINISTRATOR_NAME_IS_EMPTY');
      }

      if (!oState.password) {
        throw new Error('THE_ADMINISTRATOR_PASSWORD_IS_EMPTY');
      }

      let oBody = {
        name: oState.name,
        password: oState.password
      };
      await dispatch(authenticationAction.signIn(oBody));
    } catch (oException) {
      let sKey = oException.message;
      let sMessage = MESSAGES[sKey];
      setState({ ...oState, open: true, text: sMessage });
    }
  };

  let onClose = () => {
    setState({ ...oState, open: false });
  };

  let onKeyPress = (oEvent: any) => {
    if (ENTER_CODE === oEvent.charCode) {
      SignIn();
    }
  };

  return (
    <div className={classes.pannel}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <h2 className={classes.title}>管理平台</h2>
      <TextField
        id="user-name"
        label="名称"
        className={classes.textField}
        value={oState.name}
        //onChange={onChangeName}
        margin="normal"
        fullWidth
        variant="outlined"
        // onKeyPress={onKeyPress}
      />
      <TextField
        id="user-password"
        label="密码"
        className={classes.textField}
        value={oState.password}
        //onChange={onChangePassword}
        margin="normal"
        fullWidth
        variant="outlined"
        // onKeyPress={onKeyPress}
      />
      <Button onClick={SignIn} className={classes.button} variant="contained" color="primary" fullWidth>
        登入
      </Button>
      <div className={classes.forgetPasswordAndSignup}>
        {/* <Link href={SERVICE.HOST + SERVICE.PATH} className={classes.link}>
          短管理
        </Link>
        <Link href={'/admin/sign-up'} className={classes.link}>
          没有账号? 注冊
        </Link> */}
      </div>
      <h5 className={classes.copyright}>© copyright 2020 野草科技版权所有</h5>
      <Components.Admin.Dialogs open={oState.open} text={oState.text} onClose={onClose} />
    </div>
  );
}
export default Pannel;
