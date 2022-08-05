import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { Admin } from '@/Commons';

import style from './style';

function None(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  return <>BBBBBBBBBBBBBBB</>;
}
export default None;
