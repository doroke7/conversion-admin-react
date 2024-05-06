import React, { useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import router from '@/admin/router/index';
import Fallback from './Fallback/Index';
import style from './style';

function Index(oProps: any) {

  return (
    <Suspense fallback={<Fallback></Fallback>}>
      <BrowserRouter>
        <Switch>
          {router.admin.routes.map((oRoute, sIndex) => (
            <Route path={oRoute.path} key={sIndex} exact={oRoute.exact}>
              <oRoute.Component
                routes={oRoute.routes ?? []}
                icon={oRoute.icon}
                title={oRoute.title}
                authorization={oRoute.authorization}
                authorizations={oRoute.authorizations}
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
