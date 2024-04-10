import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Hocs from '@/admin/Hocs';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];
  console.log(12, oProps);

  return (
    <div>

    </div>
  );
}
export default Hocs.authenticator(Index);
