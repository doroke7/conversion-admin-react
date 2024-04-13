import React, { useState, useCallback } from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import Sdks from '@/admin/Sdks/Index';
import Components from '@/admin/Components/Index';
import Exception from '@/admin/Exception/Index';
import actions from '@/admin/actions/';
import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';
import CONFIGS from '@/CONFIGS/INDEX';

import style from './style';

const ENTER_CODE = 13;

function Pannel(oProps: any): any {
  let oClasses: any = style(void 0);

  let oDispatch = useDispatch();
  let oHistory = useHistory();
  let oLocation = useLocation();

  let [sStateName, cSetStateName] = useState<string>('');
  let [sStatePassword, cSetStatePassword] = useState<string>('');
  let [bStateLoading, cSetStateLoading] = useState<boolean>(false);
  let [bStateAnimation, cSetStateAnimation] = useState<boolean>(false);
  let [bStateNameError, cSetStateNameError] = useState<boolean>(false);
  let [bStatePasswordError, cSetStatePasswordError] = useState<boolean>(false);

  let onChangeName = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    cSetStateName(sName);

  };

  let onChangePassword = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPassword = oEvent.target.value;
    cSetStatePassword(sPassword);
  };

  let cSignIn = useCallback(
    async () => {
      try {
        if (!sStateName) {
          cSetStateNameError(true);
          throw new Exception('请输入管理用户名称', -1);
        }

        if (!sStatePassword) {
          cSetStatePasswordError(true);
          throw new Exception('请输入管理用户密码', -1);
        }

        if (sStateName.length <= 3) {
          throw new Exception('请输入4 字元以上名称', -1);
        }

        if (sStatePassword.length <= 5) {
          cSetStatePasswordError(true);

          throw new Exception('请输入6 字以上元密码', -1);
        }
        events.emit('Progress-onProgress', { value: 0, status: true });

        let oParam = {
          name: sStateName,
          password: sStatePassword,
        }

        let oResponse = await Sdks.Admin.Authentication.Authenticator.postSignIn(oParam);
        let sJwt = oResponse?.headers?.authorization ?? '';
        let oAdminUser = oResponse?.data?.raw?.one?.adminUser ?? {};
        if (oResponse?.data?.code === undefined) {
          throw new Exception('服务器异常', -4);
        }

        if (oResponse && oResponse?.data?.code <= -1) {
          throw new Exception(oResponse?.data?.message ?? '', oResponse?.data?.code ?? 0);
        }

        if (!sJwt) {
          throw new Exception('接口响应缺少令牌', -2);
        }
        cSetStateLoading(true);
        cSetStateAnimation(true);

        Helpers.Authentication.set(sJwt);
        sJwt && oDispatch(actions.authorizaion.set(sJwt));
        oAdminUser && oAdminUser?.id && oDispatch(actions.adminUser.set(oAdminUser));

        if (oResponse && oResponse?.data?.code == 0) {
          let oMessage = {
            code: oResponse?.data?.code ?? 0,
            message: oResponse?.data?.message ?? '',
            time: 2 * 1000
          };
          events.emit('Alerts-onAlert', oMessage);
        }

        if (oResponse) {
          await new Promise((cResolve) => setTimeout(cResolve, 300));
          oHistory.push('/admin/resource');
          events.emit('Progress-onProgress', { value: 98, status: true });
        }
      } catch (oException) {
        let oMessage = {
          code: oException.code ?? -9999,
          message: oException.message ?? '未知错误',
          time: 3 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
        events.emit('Progress-onProgress', { value: 0, status: false });
      } finally {

        cSetStateLoading(false);

      }
    },
    [sStateName, sStatePassword]
  );

  let onKeyPress = (oEvent: any) => {
    cSetStateNameError(false);
    cSetStatePasswordError(false);

    if (ENTER_CODE === oEvent.charCode) {
      cSignIn();
    }
  };

  return (
    <div
      className={clsx(oClasses.pannel, {
        [oClasses.pannelAnimation]: bStateAnimation
      })}>
      <Avatar className={oClasses.avatar}>
        <LockIcon />
      </Avatar>
      <h2 className={oClasses.title}>{CONFIGS.ADMIN.NAME}</h2>
      <TextField
        error={bStateNameError}
        id="user-name"
        label="名称"
        className={oClasses.textField}
        onChange={onChangeName}
        margin="normal"
        fullWidth
        variant="outlined"
        onKeyPress={onKeyPress}
      />
      <TextField
        error={bStatePasswordError}
        id="user-password"
        label="密码"
        type="password"
        className={oClasses.textField}
        onChange={onChangePassword}
        margin="normal"
        fullWidth
        variant="outlined"
        onKeyPress={onKeyPress}
      />
      <Button onClick={cSignIn} className={oClasses.button} variant="contained" color="primary" fullWidth>
        登入
      </Button>
      <div className={oClasses.forgetPasswordAndSignup}></div>

      <div className={oClasses.decriptionAndVersion}>
        <span className={oClasses.decription}>{CONFIGS.ADMIN.DESCRIPTION}</span>
        <span className={oClasses.version}>Ver. ({CONFIGS.ADMIN.VER})</span>
      </div>
    </div>
  );
}
export default Pannel;
