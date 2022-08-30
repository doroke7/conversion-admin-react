import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Sdks from '@/admin/Sdks/Index';
import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';
import CONFIGS from '@/admin/CONFIGS/INDEX';

interface Props {
  children?: any;
}

let authenticator = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oHistory = useHistory();
    let bAuthenticator = oProps.authenticator ?? false;
    let aRedirections = oProps.redirections ?? [null, null];

    let [oState, cSetState] = React.useState<any>({
      status: false
    });

    useEffect(() => {
      let cRefresh = async () => {
        let sJwt = Helpers.Authentication.getJwt() ?? '';
        if (sJwt == '' && aRedirections[0]) {
          let oMessage = {
            code: -1,
            message: '令牌不存在, 即将跳转登入页面',
            time: 3 * 1000
          };
          events.emit('Alerts-onAlert', oMessage);
          oHistory.push(aRedirections[0]);
        }
        if (sJwt) {
          let oResponse = await Sdks.Admin.Authentication.Authenticator.postRefresh();
          sJwt = oResponse?.headers?.authorization ?? '';

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
              events.emit('Alerts-onAlert', oMessage);
              oHistory.push(aRedirections[0]);
            }
          }

          if (oResponse?.data?.code >= 0 && sJwt) {
            Helpers.Authentication.setJwt(sJwt);
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
        cSetState({ status: true });
      };
      if (CONFIGS.JWT.AUTHENTICATOR && bAuthenticator) {
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
    return oState.status || !CONFIGS.JWT.AUTHENTICATOR ? <Component {...oProps}></Component> : <></>;
  }

  return Wrapper;
};

export default authenticator;
