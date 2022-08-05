import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { Admin } from '@/Commons';

import Icon from './Icon';
import style from './style';

function None(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  return (
    <div>
      <Icon></Icon>
      <div>按钮</div>
    </div>
  );
}
export default None;
