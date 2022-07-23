import React, { useState, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Link, withRouter } from 'react-router-dom';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import AlertOfRedis from './AlertOfRedis/Index';
import administrator from '@/images/administrator.png';

import style from './style';

function Right(oProps: any) {
  let oClasses = style(void 0);
  let [oState, cSetState] = React.useState<any>({
    open: false,
    rotating: false
  });

  let cHandleClose = () => {
    cSetState({ ...oState, open: false });
  };

  let cHandleOpen = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleConfirm = () => {
    cSetState({ ...oState, rotating: true, open: false });
    setTimeout(() => {
      cSetState({ ...oState, rotating: false, open: false });
    }, 1000);
  };

  return (
    <div className={oClasses.right}>
      <IconButton className={oClasses.iconButton} onClick={cHandleOpen}>
        <FlipCameraAndroidIcon
          className={clsx(oClasses.icon, {
            [oClasses.iconAnimation]: oState.rotating
          })}></FlipCameraAndroidIcon>
      </IconButton>
      <AlertOfRedis open={oState.open} onClose={cHandleClose} onConfirm={cHandleConfirm}></AlertOfRedis>
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
