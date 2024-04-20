import React, { useState, useEffect } from 'react';
import { useRouteMatch, useParams, useLocation, useHistory } from 'react-router-dom';

import Contexts from '@/admin/Contexts/Index';
import events from '@/admin/events/index';
import utilities from '@/admin/utilities/index';
let page = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oParams: any = useParams();
    let oRouteMatch = useRouteMatch();
    let oHistory = useHistory();

    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default page;
