import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

import Contexts from '@/Contexts/Index';
import events from '@/events/index';

let tab = (Component: any): any => {
  function Wrapper(oProps: any) {
    let sIcon = oProps.icon ?? '';
    let sId = oProps.id ?? '0-0-0';
    let sText = oProps.text ?? '未定义';
    let sPath = oProps.path ?? '';
    let oLocation = useLocation();
    let oRouteMatch = useRouteMatch();
    let oParams: any = useParams();

    useEffect(() => {
      if (parseInt(oParams?.appId) >= 1) {
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
      }
      return () => {};
    }, [oRouteMatch.url]);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
