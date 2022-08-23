import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useParams, useLocation, useHistory } from 'react-router-dom';

import Contexts from '@/Contexts/Index';
import events from '@/events/index';

let page = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oParams: any = useParams();
    let oRouteMatch = useRouteMatch();
    let oHistory = useHistory();

    useEffect(() => {
      let iPage = oParams.page || 0;
      if (iPage <= 0) {
        // DO NOTHING
      }
      return () => {};
    }, [oParams.page]);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default page;
