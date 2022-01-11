import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import style from './style';

interface State {
  open: boolean;
  text: string;
}

function Message(oProps: any): any {
  let oClasses: any = style(void 0);

  return (
    <Dialog
      open={oProps.open}
      maxWidth="sm"
      fullWidth
      onClose={oProps.onClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <ErrorOutline className={oClasses.errorIcon} />
        <span className={oClasses.title}>错误</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{oProps.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={oProps.onClose} color="primary" autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Message;
