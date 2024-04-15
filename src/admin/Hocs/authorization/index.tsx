import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sdks from '@/admin/Sdks/Index';
import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';
import actions from '@/admin/actions/';
import CONFIGS from '@/CONFIGS/INDEX';

interface Props {
  children?: any;
}

/**
 * 这边是 HOC的写法， 完全可以用 hook 思维取代
 */

let authenticator = (Component: any): any => {

  function Wrapper(oProps: any) {

    let bAuthorization = oProps.authenticator ?? false;
    let aRedirections = oProps.redirections ?? [null, null];
    let oDispatch = useDispatch();

    let oHistory = useHistory();
    let oRouteMatch = useRouteMatch();
    let oParams = useParams() as { [key: string]: any };
    let [bStateStatus, cSetStateStatus] = useState<boolean>(false);
    let [sStateAuthorizations, cSetStateAuthorizations] = useState<string>('');

    let sPath = oRouteMatch.path.replace(/^\//, '').replace(/\/\*?$/, '');

    useEffect(() => {
      let cRefresh = async () => {
        let sJwt = Helpers.Authentication.authorization() ?? '';
        if (sJwt == '' && aRedirections[0]) {
          let oMessage = {
            code: -1,
            message: '令牌不存在, 即将跳转登入页面',
            time: 3 * 1000
          };
          events.emit('Alerts-onAlert', oMessage);
          Helpers.Path.set(oRouteMatch.url);
          oHistory.push(aRedirections[0]);
        }
        if (sJwt) {

          let oParam = {
            path: sPath,
          };

          let oSearch = {
          };

          let oOption = {
            appId: oParams?.appId ?? 0
          };

          let oResponse = await Sdks.Admin.Authentication.Authenticator.postRefresh(oParam, oSearch, oOption);
          sJwt = oResponse?.headers?.authorization ?? '';
          let sAuthorizations = oResponse?.data?.raw?.one?.authorizations ?? '00000000';
          let oAdminUser = oResponse?.data?.raw?.one?.adminUser ?? {};


          cSetStateAuthorizations(sAuthorizations);

          if (
            oResponse?.data?.code === undefined || !sJwt || oResponse?.data?.code <= -1
          ) {
            let sMessage = '未知错误';

            sMessage = oResponse?.data?.code === undefined ? '服务器未定义 code 错误' : sMessage;
            sMessage = oResponse?.data?.code >= 0 && !sJwt ? '服务器未定义 authorization 错误' : sMessage;
            sMessage = oResponse?.data?.code <= -1 ? '错误' : sMessage;

            if (aRedirections[0]) {
              let oMessage = {
                code: oResponse?.data?.code ?? -9999,
                message: oResponse?.data?.message ?? sMessage,
                time: 3 * 1000
              };
              Helpers.Path.set(oRouteMatch.url);

              events.emit('Alerts-onAlert', oMessage);
              oHistory.push(aRedirections[0]);
            }
          }

          sJwt && oDispatch(actions.authorizaion.set(sJwt));
          oAdminUser && oAdminUser?.id && oDispatch(actions.me.set(oAdminUser));

        }

        cSetStateStatus(true);
      };
      console.log('bAuthorization=', bAuthorization);

      console.log(CONFIGS?.JWT);
      if (CONFIGS?.JWT?.AUTHORIZATION && bAuthorization) {
        events.emit('Progress-onProgress', { value: 0, status: true });
        cRefresh();
        let oInterval = setInterval(cRefresh, CONFIGS.JWT.TIME ?? 60 * 1000);
        return () => {
          clearInterval(oInterval);
        };
        // events.emit('Progress-onProgress', { value: 90, status: true });
      }
    }, []);

    /**
     * NOTE： refresh 完毕后才渲染页面， 避免发生没有 tokne 却能 瞬间看到页面的情况
     */
    return bStateStatus || !CONFIGS.JWT.AUTHORIZATION ? <Component {...oProps} authorizaions={sStateAuthorizations}></Component> : <></>;
  }

  return Wrapper;
};

export default authenticator;
