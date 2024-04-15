import React, { useEffect } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Contexts from '@/admin/Contexts/Index';
import hooks from '@/admin/hooks/index';
import events from '@/admin/events/index';

let tab = (Component: any): any => {
  function Wrapper(oProps: any) {
    let sIcon = oProps.icon ?? '';
    let sId = oProps.id ?? '0-0-0';
    let sText = oProps.text ?? '未定义';
    let sPath = oProps.path ?? '';

    let oLocation = useLocation();
    let oRouteMatch = useRouteMatch();
    let oParams: any = useParams();
    let oURLSearchParams = hooks.useURLSearchParams();
    let oMe = useSelector((oStore: any) => (oStore.me));

    let iAppId = Number(oParams?.appId ?? 0);
    let oOptions = {};

    for (let [sKey, mValue] of oURLSearchParams) {
      oOptions[sKey] = mValue;
    };

    let sURLSearchParams = oURLSearchParams.toString();

    useEffect(() => {

      let oRoute = {
        id: sId,
        text: sText,
        url: oRouteMatch.url,
        params: oParams,
        path: sPath,
        icon: sIcon,
        options: oOptions,
        adminUserId: oMe.id
      };
      events.emit('Navigation-onTab', oRoute);
      return () => { };
    }, [oParams.appId, sURLSearchParams]);


    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
