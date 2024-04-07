import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Commons from '@/admin/Commons/Index';
import wrappers from '@/admin/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  console.log('Pages.Resource._', 'aRoutes=', aRoutes);

  return (
    // <Fade> 效果，必须字元素只有一个 DIV
    <Fade in={true} timeout={1000}>
      <div>
        <Commons.Navigation>
          <Switch>
            {aRoutes.map((oRoute, sIndex) => (
              <Route path={oMatch.url + oRoute.path} key={sIndex} exact={oRoute.exact}>
                <oRoute.Component
                  routes={oRoute.routes}
                  icon={oRoute.icon}
                  title={oRoute.title}
                  id={oRoute.id}
                  text={oRoute.text}
                  path={oMatch.url + oRoute.path}
                  authenticator={oRoute.authenticator}
                  redirections={oRoute.redirections}
                />
              </Route>
            ))}
          </Switch>
        </Commons.Navigation>
      </div>
    </Fade>
  );
}
export default Index;
