import React, { useContext } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Contexts from '@/Contexts';

import style from './style';

function AlertOfApps(oProps: any) {
  let oClasses = style(void 0);

  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;

  let [oState, cSetState] = React.useState<any>({
    shake: false
  });

  let bOpen = oProps.open ?? false;
  let cHandleClose = oProps.onClose ?? (() => void 0);
  let cHandleConfirm = oProps.onConfirm ?? (() => void 0);
  let cWrapperHandleConfirm = () => {
    if (iIndex == -1) {
      cSetState({ ...oState, shake: true });
      setTimeout(() => {
        cSetState({ ...oState, shake: false });
      }, 100);
      return;
    }
    cHandleConfirm();
  };

  return (
    <Dialog
      open={bOpen}
      onClose={cHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h6">注意:</Typography>
        <IconButton aria-label="close" className={oClasses.iconButton} onClick={cHandleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span
            className={clsx({
              [oClasses.textAnimation]: oState.shake
            })}>
            请先选择 应用程序
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={oClasses.dialogActions}>
        <Button
          disabled={iIndex == -1}
          className={oClasses.confirmButton}
          variant="contained"
          onClick={cWrapperHandleConfirm}
          color="default">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertOfApps;
