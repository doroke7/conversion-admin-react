import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { Admin } from '@/Commons';

import style from './style';

function _(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  return (
    <Fade in={true} timeout={1000}>
      <Admin.Navigation>
        <Switch>
          {aRoutes.map((oRoute, sIndex) => (
            <Route
              path={oMatch.url + oRoute.path}
              key={sIndex}
              exact={oRoute.exact}
              component={(oProps: any) => <oRoute.component routes={oRoute.routes} />}></Route>
          ))}
        </Switch>
      </Admin.Navigation>
    </Fade>
  );
}
export default _;
