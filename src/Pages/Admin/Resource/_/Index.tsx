import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Commons from '@/Commons';
import wrappers from '@/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  return (
    // <Fade> 效果，必须字元素只有一个 DIV
    <Fade in={true} timeout={2000}>
      <div>
        <Commons.Admin.Navigation>
          <Switch>
            {aRoutes.map((oRoute, sIndex) => (
              <Route path={oMatch.url + oRoute.path} key={sIndex} exact={oRoute.exact}>
                <oRoute.Component routes={oRoute.routes} Icon={oRoute.Icon} title={oRoute.title} />
              </Route>
            ))}
          </Switch>
        </Commons.Admin.Navigation>
      </div>
    </Fade>
  );
}
export default wrappers.admin.authenticator(wrappers.admin.tab(Index));
