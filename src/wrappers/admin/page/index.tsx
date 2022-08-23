import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch, useParams, useLocation, useHistory } from 'react-router-dom';

import Contexts from '@/Contexts/Index';
import events from '@/events/index';
import utilities from '@/utilities/index';
let page = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oParams: any = useParams();
    let oRouteMatch = useRouteMatch();
    let oHistory = useHistory();

    let [oState, cSetState] = useState<any>({
      count: Number.MAX_VALUE
    });

    let cSetPageCount = (iCount) => {
      cSetState({ count: iCount });
    };

    useEffect(() => {
      let iPage = oParams.page || 0;
      if (iPage <= 0) {
        let oMessage = {
          code: -1,
          message: '第1页已为首页',
          time: 3 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
        let sUrl = utilities.url(oRouteMatch.path, { ...oParams, page: 1 });
        oHistory.push(sUrl);
      }
      if (iPage > oState.count) {
        let oMessage = {
          code: -1,
          message: '第' + oState.count + '页已为末页',
          time: 3 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
        let sUrl = utilities.url(oRouteMatch.path, { ...oParams, page: oState.count });
        oHistory.push(sUrl);
      }
      return () => {};
    }, [oParams.page, oState.count]);
    return <Component setPageCount={cSetPageCount} {...oProps}></Component>;
  }

  return Wrapper;
};

export default page;
