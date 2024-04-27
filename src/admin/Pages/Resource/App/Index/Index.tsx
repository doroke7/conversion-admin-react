import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Hocs from '@/admin/Hocs';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();



  return <div>APP</div>;
}
export default Hocs.authorization(Hocs.tab(Hocs.title(Index)));
