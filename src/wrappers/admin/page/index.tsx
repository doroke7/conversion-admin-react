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
      min: 1,
      max: Number.MAX_VALUE
    });

    let cSetPageMax = (iCount) => {
      cSetState((oOldState) => {
        let oNewState = { ...oOldState, max: iCount };
        return oNewState;
      });
    };

    useEffect(() => {
      let iPage = oParams.page || 0;
      if (iPage < oState.min) {
        let oMessage = {
          code: -1,
          message: '页数1, 已为第一首页, 即将从 第' + iPage + '页 跳转到 第' + oState.min + '页',
          time: 3 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
        let sUrl = utilities.url(oRouteMatch.path, { ...oParams, page: 1 });
        oHistory.push(sUrl);
      }
      if (iPage > oState.max) {
        let oMessage = {
          code: -1,
          message: '页数' + oState.max + ', 已为最后末页, 即将从 第' + iPage + '页 跳转到 第' + oState.max + '页',
          time: 3 * 1000
        };
        events.admin.emit('Alerts-onAlert', oMessage);
        let sUrl = utilities.url(oRouteMatch.path, { ...oParams, page: oState.max });
        oHistory.push(sUrl);
      }
      return () => {};
    }, [oParams.page, oState.max]);
    return <Component setPageMax={cSetPageMax} {...oProps}></Component>;
  }

  return Wrapper;
};

export default page;
