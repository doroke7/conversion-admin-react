import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import style from './style';

function AlertOfRedis(oProps: any) {
  let oClasses = style(void 0);

  let bOpen = oProps.open ?? false;
  let cHandleClose = oProps.onClose ?? (() => void 0);
  let cHandleConfirm = oProps.onConfirm ?? (() => void 0);

  return (
    <Dialog
      open={bOpen}
      onClose={cHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h6">警告:</Typography>
        <IconButton aria-label="close" className={oClasses.iconButton} onClick={cHandleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span>清理缓存会造成数据库压力！我们不建议您如此操作。</span>
          <br></br>
          <br></br>
          <span>确定操作？</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={oClasses.dialogActions}>
        <Button variant="contained" onClick={cHandleClose} color="primary" autoFocus>
          取消
        </Button>
        <Button className={oClasses.confirmButton} variant="contained" onClick={cHandleConfirm} color="default">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertOfRedis;
