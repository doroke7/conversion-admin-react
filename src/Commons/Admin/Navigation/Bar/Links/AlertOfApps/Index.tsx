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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import Contexts from '@/Contexts';
import events from '@/events';
import style from './style';

function AlertOfApps(oProps: any) {
  let oClasses = style(void 0);

  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;
  let aApps = oProps.apps ?? [];
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

  let cHandleChange = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iIndex = Number(oEvent.target.value) ?? -1;
    oEvent.stopPropagation(); // 取消 link
    oEvent.preventDefault(); // 取消 a 取消 href
    events.admin.emit('Navigation-onClickApp', iIndex);
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
      <DialogContent className={oClasses.dialogContent}>
        <DialogContentText id="alert-dialog-description">
          <span
            className={clsx({
              [oClasses.textAnimation]: oState.shake
            })}>
            请先选择 应用程序
          </span>
        </DialogContentText>
        <FormControl className={oClasses.formControl}>
          {/* <InputLabel htmlFor="demo-dialog-native">应用程序</InputLabel> */}
          <Select value={iIndex} onChange={cHandleChange} input={<Input id="demo-dialog-native" />}>
            {iIndex >= 0 ? (
              ''
            ) : (
              <MenuItem value="-1">
                <em>未选择</em>
              </MenuItem>
            )}{' '}
            {/* 选了其中一个 APP 后，不不能再选空 APP了*/}
            {aApps.map((oApp: any, iIndexOfApp: any) => (
              <MenuItem key={iIndexOfApp} value={iIndexOfApp}>
                {oApp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
