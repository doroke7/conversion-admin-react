import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Commons from '@/admin/Commons/Index';
import _ from './_/Index';
import CONFIGS from '@/CONFIGS/';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];
  let oAuthorizations = oProps.authorizations ?? {};

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <Commons.Navigation authorizations={oAuthorizations}>
          <Switch>
            {aRoutes.map((oRoute: any, sIndex: string) => (
              <Route path={oMatch.url + oRoute.path} key={sIndex} exact={oRoute.exact}>
                <oRoute.Component
                  routes={oRoute.routes}
                  icon={oRoute.icon}
                  title={oRoute.title}
                  id={oRoute.id}
                  text={oRoute.text}
                  path={oMatch.url + oRoute.path}
                  authorization={oRoute.authorization}
                  redirections={oRoute.redirections}
                />
              </Route>
            ))}

            <Route path={oMatch.url} key={aRoutes.lenth} exact={true}>
              <_
                path={oMatch.url}
                authorization={true}
                redirections={['/admin/authentication/authenticator/sign-in', null]}
                title={CONFIGS.ADMIN.NAME}
              />
            </Route>
          </Switch>
        </Commons.Navigation>
      </div>
    </Fade>
  );
}

export default Index;
