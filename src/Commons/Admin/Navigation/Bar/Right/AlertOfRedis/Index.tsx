import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertOfRedis(oProps: any) {
  let bOpen = oProps.open ?? false;
  let cHandleClose = oProps.onClose ?? (() => void 0);
  let cHandleConfirm = oProps.onConfirm ?? (() => void 0);

  return (
    <Dialog
      open={bOpen}
      onClose={cHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{'警告:'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span>清理缓存会造成数据库压力！我们不建议您如此操作。</span>
          <br></br>
          <br></br>
          <span>确定操作？</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cHandleClose} color="primary" autoFocus>
          取消
        </Button>
        <Button onClick={cHandleConfirm} color="default">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertOfRedis;
