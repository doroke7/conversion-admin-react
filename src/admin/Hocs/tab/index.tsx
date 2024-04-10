import React, { useEffect } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

import Contexts from '@/admin/Contexts/Index';
import events from '@/admin/events/index';

let tab = (Component: any): any => {
  function Wrapper(oProps: any) {
    let sIcon = oProps.icon ?? '';
    let sId = oProps.id ?? '0-0-0';
    let sText = oProps.text ?? '未定义';
    let sPath = oProps.path ?? '';
    let cOnTab = oProps.onTab ?? (() => (void 0));

    let oLocation = useLocation();
    let oRouteMatch = useRouteMatch();
    let oParams: any = useParams();
    let iAppId = Number(oParams?.appId ?? 0);

    useEffect(() => {

      let oRoute = {
        id: sId,
        text: sText,
        url: oRouteMatch.url,
        params: oParams,
        path: sPath,
        icon: sIcon,
        query: ''
      };
      events.emit('Navigation-onTab', oRoute);
      return () => { };
    }, []);


    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
