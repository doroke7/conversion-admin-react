import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import FlipCameraAndroidTwoToneIcon from '@material-ui/icons/FlipCameraAndroidTwoTone';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import events from '@/admin/events/index';
import Sdks from '@/admin/Sdks/Index';
import Helpers from '@/admin/Helpers/Index';

import AlertOfRedis from './AlertOfRedis/Index';
import Dropdown from './Dropdown/Index';
import RefreshIcon from './RefreshIcon/Index';
import AdministratorIcon from './AdministratorIcon/Index';

import style from './style';

function Right(oProps: any) {
  let oClasses = style(void 0);
  let [oState, cSetState] = useState<any>({
    open: false,
    rotating: false,
    anchor: null
  });
  let oHistory = useHistory();

  let cHandleClose = () => {
    cSetState({ ...oState, open: false });
  };

  let cHandleOpen = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleAlertOfRedisConfirm = () => {
    cSetState({ ...oState, rotating: true, open: false });
    setTimeout(() => {
      cSetState({ ...oState, rotating: false, open: false });
    }, 1200);
  };

  let cHandleAvatarWrapperClick = (oEvent: any) => {
    oEvent.stopPropagation(); // 改用 全局处理取消预设的 右键交互
    oEvent.preventDefault(); // 改用 全局处理取消预设的 右键交互
    let oAnchor = oEvent.currentTarget;
    cSetState({ ...oState, anchor: oAnchor });
  };

  let cHandleAvatarWrapperContextMenu = (oEvent: any) => {
    oEvent.stopPropagation(); // 改用 全局处理取消预设的 右键交互
    oEvent.preventDefault(); // 改用 全局处理取消预设的 右键交互
    let oAnchor = oEvent.currentTarget;
    cSetState({ ...oState, anchor: oAnchor });
  };

  let cHandleDropdownClickAway = (oEvent: any) => {
    cSetState({ ...oState, anchor: false });
  };

  let cHandleDropdownClick = async (oEvent: any) => {
    cSetState({ ...oState, anchor: false });
    events.emit('Progress-onProgress', { value: 0, status: true });

    let oResponse = await Sdks.Admin.Authentication.Authenticator.postSignOut();

    if (oResponse?.data?.code <= 0) {
      let oMessage = {
        code: oResponse?.data?.code ?? 0,
        message: oResponse?.data?.message ?? '',
        time: 2 * 1000
      };
      events.emit('Alerts-onAlert', oMessage);
    }

    Helpers.Authentication.removeJwt();
    if (oResponse?.data?.code <= 0) {
      let oMessage = {
        code: oResponse?.data?.code,
        message: oResponse?.data?.message ?? '登出成功',
        time: 2 * 1000
      };
      events.emit('Alerts-onAlert', oMessage);
      oHistory.push('/admin/authentication/authenticator/sign-in');
    }
    events.emit('Progress-onProgress', { value: 80, status: true });
  };

  return (
    <div className={oClasses.right}>
      <IconButton className={clsx(oClasses.iconButton, oClasses.iconButtonRefresh)} onClick={cHandleOpen}>
        <RefreshIcon
          className={clsx(oClasses.icon, {
            [oClasses.iconAnimation]: oState.rotating
          })}></RefreshIcon>
      </IconButton>
      <AlertOfRedis open={oState.open} onClose={cHandleClose} onConfirm={cHandleAlertOfRedisConfirm}></AlertOfRedis>
      <div
        className={oClasses.avatarWrapper}
        onClick={cHandleAvatarWrapperClick}
        onContextMenu={cHandleAvatarWrapperContextMenu}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          className={oClasses.badge}
          variant="dot">
          <Avatar className={oClasses.avatar}>
            <AdministratorIcon></AdministratorIcon>
          </Avatar>
        </Badge>
      </div>
      <Dropdown
        open={Boolean(oState.anchor)}
        anchor={oState.anchor}
        onClickAway={cHandleDropdownClickAway}
        onClick={cHandleDropdownClick}></Dropdown>
    </div>
  );
}

export default Right;
