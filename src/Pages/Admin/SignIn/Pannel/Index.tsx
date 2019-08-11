import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import style from './style';

interface State {
  name: string;
  password: string;
  open: boolean;
  text: string;
}

function Pannel(): any {
  const classes: any = style(void 0);

  const [oState, setState] = React.useState<State>({
    name: '',
    password: '',
    open: false,
    text: '',
  });

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    setState({ ...oState, name: sName });
  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    setState({ ...oState, password: sPassword });
  };

  let handleClose = () => {
    setState({ ...oState, open: false });
  }

  let SignIn = () => {
    console.log('SignIn', oState);
    if (!oState.name) {
      setState({ ...oState, open: true, text: 'the user name is empty' });

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

      <Dialog
        open={oState.open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">错误</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {oState.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Pannel;
