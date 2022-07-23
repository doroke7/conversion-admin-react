import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import administrator from '@/images/administrator.png';

import style from './style';

function Right(oProps: any) {
  let oClasses = style(void 0);
  let [oState, cSetState] = React.useState<any>({
    open: false
  });

  let cHandleClose = () => {
    cSetState({ ...oState, open: false });
  };

  let cHandleOpen = () => {
    cSetState({ ...oState, open: true });
  };

  return (
    <div className={oClasses.right}>
      <IconButton className={oClasses.iconButton} onClick={cHandleOpen}>
        <FlipCameraAndroidIcon className={oClasses.icon}></FlipCameraAndroidIcon>
      </IconButton>
      <Dialog
        open={oState.open}
        onClose={cHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'警告:'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>清理全局缓存会造成数据库压力</span>
            <br></br>
            <br></br>

            <span>请问确定清理？</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cHandleClose} color="primary">
            取消
          </Button>
          <Button onClick={cHandleClose} color="primary" autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <div className={oClasses.avatarWrapper}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          className={oClasses.badge}
          variant="dot">
          <Avatar src={administrator}></Avatar>
        </Badge>
      </div>
    </div>
  );
}

export default withRouter(Right);
