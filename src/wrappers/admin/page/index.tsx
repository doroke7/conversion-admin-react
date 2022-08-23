import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

import Contexts from '@/Contexts/Index';
import events from '@/events/index';

let page = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oParams: any = useParams();

    useEffect(() => {
      if (oParams.page <= 0) {
      }
      return () => {};
    }, [oParams.page]);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default page;
