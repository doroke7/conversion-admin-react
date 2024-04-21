import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sdks from '@/admin/Sdks/Index';
import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';
import actions from '@/admin/actions/';
import CONFIGS from '@/CONFIGS/INDEX';
import utilities from '@/admin/utilities';


/**
 * 这边是 HOC的写法， 完全可以用 hook 思维取代
 */

let authorization = (Component: any): any => {

  function Wrapper(oProps: any) {

    let bAuthorization = oProps.authorization ?? false;
    let aRedirections = oProps.redirections ?? [null, null];
    let oDispatch = useDispatch();

    let oHistory = useHistory();
    let oRouteMatch = useRouteMatch();
    let oParams = useParams() as { [key: string]: any };
    let [bStateStatus, cSetStateStatus] = useState<boolean>(false);
    let [sStateAuthorizations, cSetStateAuthorizations] = useState<string>('');

    let sPath = oRouteMatch.path.replace(/^\//, '').replace(/\/\*?$/, '');

    console.log('oRouteMatch=', oRouteMatch);


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
          let oAutohorizations = oResponse?.data?.raw?.authorizations ?? {};
          let oMe = oResponse?.data?.raw?.me ?? {};

          oDispatch(actions.authorizaions.set(oAutohorizations));

          if (
            oResponse?.data?.code >= 0 && oResponse?.data?.code !== undefined
          ) {

            oDispatch(actions.authorizaion.set(sJwt));
            oDispatch(actions.me.set(oMe));
          }

          if (
            oResponse?.data?.code == -1
          ) {
            // 服务器回传 -1 (判定token 不合法), => 清空 本地浏览器 [登入token]; 清空 本地浏览器 [用户数据]
            sJwt = '';
            oMe = {};

            oDispatch(actions.authorizaion.set(sJwt));
            oDispatch(actions.me.set(oMe));
          }


          if (
            oResponse?.data?.code <= -2
          ) {
            // 服务器回传 -2 (判定服务器暂时错误), => 保留 本地浏览器 [登入token]; 清空 本地浏览器 [用户数据]
            oMe = {};
            oDispatch(actions.me.set(oMe));

          }

          if (oResponse?.data?.code === undefined) {
            // 服务器回传 undefined (判定服务器暂时错误), => 保留 本地浏览器 [登入token]; 清空 本地浏览器 [用户数据]

            oMe = {};
            oDispatch(actions.me.set(oMe));
          }

          if (
            oResponse?.data?.code <= -1
          ) {

            let sMessage = '未知错误';

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

        }

        cSetStateStatus(true);
      };

      if (CONFIGS?.JWT?.AUTHORIZATION && bAuthorization) {
        events.emit('Progress-onProgress', { value: 0, status: true });
        cRefresh();
        let oInterval = setInterval(cRefresh, CONFIGS.JWT.TIME ?? 60 * 1000);
        return () => {
          clearInterval(oInterval);
        };
      }
    }, []);

    /**
     * NOTE： refresh 完毕后才渲染页面， 避免发生没有 tokne 却能 瞬间看到页面的情况
     */
    return bStateStatus ? <Component {...oProps} authorizaions={sStateAuthorizations}></Component> : <></>;
  }

  return Wrapper;
};

export default authorization;
