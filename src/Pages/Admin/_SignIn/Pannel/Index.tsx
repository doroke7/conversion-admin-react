import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import style from './style';

interface IState {
  name: string;
  password: string;
}

function Pannel(): any {
  const classes: any = style(void 0);

  const [values, setValues] = React.useState<IState>({
    name: '',
    password: '',
  });

  const handleChange = (sKey: keyof IState) => (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [sKey]: oEvent.target.value });
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
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        fullWidth
        variant="outlined"
      />
      <TextField
        id="user-password"
        label="密码"
        className={classes.textField}
        value={values.password}
        onChange={handleChange('password')}
        margin="normal"
        fullWidth
        variant="outlined"
      />
      <Button className={classes.button} variant="contained" color="primary" fullWidth>
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
