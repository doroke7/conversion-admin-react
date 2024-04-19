import React, { useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '@/admin/store/index';
import router from '@/admin/router/index';
import CONFIGS from '@/CONFIGS/INDEX';
import Commons from '@/admin/Commons/Index';
import Components from '@/admin/Components/Index';
import Helpers from '@/admin/Helpers/Index';
import Fallback from './Fallback/Index';
import style from './style';

function Index(oProps: any) {
  let oClasses: any = style(void 0);

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
