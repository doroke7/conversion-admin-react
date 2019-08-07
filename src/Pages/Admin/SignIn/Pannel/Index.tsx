import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import style from './style';

interface State {
  name: string;
  password: string;
}

function Pannel(): any {
  const classes: any = style(void 0);

  const [oState, setValues] = React.useState<State>({
    name: '',
    password: '',
  });

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    setValues({ ...oState, name: sName });
  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    setValues({ ...oState, password: sPassword });
  };

  let SignIn = () => {
    console.log('SignIn', oState);
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
        onChange={onChangeName}
        margin="normal"
        fullWidth
        variant="outlined"
      />
      <TextField
        id="user-password"
        label="密码"
        className={classes.textField}
        value={oState.password}
        onChange={onChangePassword}
        margin="normal"
        fullWidth
        variant="outlined"
      />
      <Button onClick={SignIn} className={classes.button} variant="contained" color="primary" fullWidth>
        登入
      </Button>
      <div className={classes.forgetPasswordAndSignup}>
        <Link href={'/admin/forget-password'} className={classes.link}>
          忘记密码
        </Link>
        <Link href={'/admin/signup'} className={classes.link}>
          没有账号? 注冊
        </Link>
      </div>
      <h5 className={classes.copyright}>© copyright 2019 梦想平台版权所有</h5>
    </div>
  );
}
export default Pannel;
