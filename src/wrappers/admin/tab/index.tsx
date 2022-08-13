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
    let Icon = oProps.Icon ?? <></>;
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
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
