import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import store from '@/admin/store/index';
import router from '@/admin/router/index';
import CONFIGS from '@/CONFIGS/INDEX';
import Commons from '@/admin/Commons/Index';
import Components from '@/admin/Components/Index';
import Helpers from '@/admin/Helpers/Index';
import style from './style';

function Index(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    open: true,
    routes: router.admin.routes
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          {oState.routes.map((oRoute, sIndex) => (
            <Route path={oRoute.path} key={sIndex} exact={oRoute.exact}>
              <oRoute.Component
                routes={oRoute.routes}
                icon={oRoute.icon}
                title={oRoute.title}
                authenticator={oRoute.authenticator}
                redirections={oRoute.redirections}
              />
            </Route>
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Index;
