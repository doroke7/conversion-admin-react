import React, { useEffect, useContext, useLayoutEffect } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

import Contexts from '@/Contexts';
import events from '@/events';

interface Props {
  children?: any;
}

/*
 * NOTE: 小写，这是函数
 */
interface Params {
  appId: string;
  page: string;
  limit: string;
}

let tab = (Component: any): any => {
  function Wrapper(oProps: any) {
    let sIcon = oProps.icon ?? '';
    let sId = oProps.id ?? '0-0-0';
    let sText = oProps.text ?? '未定义';
    let sPath = oProps.path ?? '';
    let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;
    let oLocation = useLocation();
    let oRouteMatch = useRouteMatch();
    let oParams: Params = useParams();

    useEffect(() => {
      if (iIndex == -1 && parseInt(oParams?.appId) >= 1) {
        let iAppId = parseInt(oParams?.appId) ?? 0;
        events.admin.emit('Navigation-onClickApp', iAppId);
      }
      return () => {};
    }, [iIndex, oParams.appId]);

    useEffect(() => {
      if (iIndex >= 0 && parseInt(oParams?.appId) >= 1) {
        let iAppId = parseInt(oParams?.appId) ?? 0;
        let oRoute = {
          id: sId,
          text: sText,
          url: oRouteMatch.url,
          path: sPath,
          icon: sIcon,
          query: ''
        };
        events.admin.emit('Navigation-onRoute', oRoute);
      }
      return () => {};
    }, [oRouteMatch.url]);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
