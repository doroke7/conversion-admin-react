import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

  let oAuthorizations = oProps.authorizations ?? {};
  let sAuthorizaion = useSelector((oStore: any) => (oStore?.authorizations?.['admin/resource'] ?? ''));

  let [oStateOpen, cSetStateOpen] = useState<boolean>(false);
  let [oStateRotating, cSetStateRotating] = useState<boolean>(false);
  let [oStateAnchor, cSetStateAnchor] = useState<boolean>(null);


  let oHistory = useHistory();
  let oClasses = style(void 0);

  let iAuthorizaion = parseInt(sAuthorizaion, 2);

  let sFlushallAuthorization = oAuthorizations?.['FLUSHALL'] ?? '';
  let iFlushallAuthorization = parseInt(sFlushallAuthorization, 2);

  let bFlushall = (iAuthorizaion & iFlushallAuthorization) == iFlushallAuthorization;


  let cHandleClose = () => {
    cSetStateOpen(false);
  };

  let cHandleOpen = () => {
    cSetStateOpen(true);

  };

  let cHandleConfirm = async () => {
    cSetStateOpen(false);
    cSetStateRotating(true);

    let oResponse = await Sdks.Admin.System.Redis.postFlushall();
    let iCode = oResponse?.data?.code ?? -3;
    let oMessage = {
      code: iCode,
      message: oResponse?.data?.message ?? '未知错误',
      time: 2 * 1000
    };
    events.emit('Alerts-onAlert', oMessage);

    if (iCode < 0) {
      cSetStateRotating(false);

    }

    if (iCode >= 0) {
      setTimeout(() => {
        cSetStateRotating(false);
      }, 1200);
    }


  };

  let cHandleAvatarWrapperClick = (oEvent: any) => {
    oEvent.stopPropagation(); // 改用 全局处理取消预设的 右键交互
    oEvent.preventDefault(); // 改用 全局处理取消预设的 右键交互
    let oAnchor = oEvent.currentTarget;
    cSetStateAnchor(oAnchor);
  };

  let cHandleAvatarWrapperContextMenu = (oEvent: any) => {
    oEvent.stopPropagation(); // 改用 全局处理取消预设的 右键交互
    oEvent.preventDefault(); // 改用 全局处理取消预设的 右键交互
    let oAnchor = oEvent.currentTarget;
    cSetStateAnchor(oAnchor);

  };

  let cHandleDropdownClickAway = (oEvent: any) => {
    cSetStateAnchor(null);
  };

  let cHandleDropdownClick = async (oEvent: any) => {
    cSetStateAnchor(null);

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

    Helpers.Authentication.remove();

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
      {bFlushall ?
        <IconButton className={clsx(oClasses.iconButton, oClasses.iconButtonRefresh)} onClick={cHandleOpen}>
          <RefreshIcon
            className={clsx(oClasses.icon, {
              [oClasses.iconAnimation]: oStateRotating
            })}></RefreshIcon>
        </IconButton> : ''}
      <AlertOfRedis open={oStateOpen} onClose={cHandleClose} onConfirm={cHandleConfirm}></AlertOfRedis>
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
        open={Boolean(oStateAnchor)}
        anchor={oStateAnchor}
        onClickAway={cHandleDropdownClickAway}
        onClick={cHandleDropdownClick}></Dropdown>
    </div>
  );
}

export default Right;
