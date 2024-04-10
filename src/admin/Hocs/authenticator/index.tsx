import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import Sdks from '@/admin/Sdks/Index';
import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';
import CONFIGS from '@/CONFIGS/INDEX';

interface Props {
  children?: any;
}

/**
 * 这边是 HOC的写法， 完全可以用 hook 思维取代
 */

let authenticator = (Component: any): any => {

  function Wrapper(oProps: any) {

    let bAuthenticator = oProps.authenticator ?? false;
    let aRedirections = oProps.redirections ?? [null, null];

    let oHistory = useHistory();
    let oRouteMatch = useRouteMatch();
    let oParams = useParams() as { [key: string]: any };
    let [bStateStatus, cSetStateStatus] = useState<boolean>(false);
    let [sStateAuthorizations, cSetStateAuthorizations] = useState<string>('');

    let sUri = oRouteMatch.url.replace(/^\//, '').replace(/\/$/, '');

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
          Helpers.Authentication.setPath(oRouteMatch.url);
          oHistory.push(aRedirections[0]);
        }
        if (sJwt) {

          let oParam = {
            uri: sUri,
          };

          let oSearch = {

          };

          let oOption = {
            appId: oParams?.appId ?? 0
          };

          let oResponse = await Sdks.Admin.Authentication.Authenticator.postRefresh(oParam, oSearch, oOption);
          sJwt = oResponse?.headers?.authorization ?? '';
          let sAuthorizations = oResponse?.data?.result?.raw?.authorizations ?? '00000000';
          console.log(' Hocs.auth, oRouteMatch=', oRouteMatch);
          console.log(' Hocs.auth, oParams=', oParams);

          console.log(' Hocs.auth, oResponse=', oResponse);
          cSetStateAuthorizations(sAuthorizations);

          if (
            oResponse?.data?.code === undefined ||
            (oResponse?.data?.code >= 0 && !sJwt) ||
            oResponse?.data?.code <= -1
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
              Helpers.Authentication.setPath(oRouteMatch.url);

              events.emit('Alerts-onAlert', oMessage);
              oHistory.push(aRedirections[0]);
            }
          }

          if (oResponse?.data?.code >= 0 && sJwt) {
            Helpers.Authentication.setJwt(sJwt);
            if (!aRedirections[1]) {
              Helpers.Authentication.removePath();
            }
            if (aRedirections[1]) {
              let oMessage = {
                code: 1,
                message: '令牌持续有效, 即将跳转主页',
                time: 3 * 1000
              };
              events.emit('Alerts-onAlert', oMessage);
              oHistory.push(aRedirections[1]);
            }
          }
        }

        cSetStateStatus(true);
      };
      if (CONFIGS?.JWT?.AUTHENTICATOR && bAuthenticator) {
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
    return bStateStatus || !CONFIGS.JWT.AUTHENTICATOR ? <Component {...oProps} authorizaions={sStateAuthorizations}></Component> : <></>;
  }

  return Wrapper;
};

export default authenticator;
