import React, { useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '@/admin/store/index';
import router from '@/admin/router/index';
import CONFIGS from '@/CONFIGS/INDEX';
import Commons from '@/admin/Commons/Index';
import Components from '@/admin/Components/Index';
import Helpers from '@/admin/Helpers/Index';
import style from './style';

function Index(oProps: any) {
  let oClasses: any = style(void 0);

  return (
    <div className={oClasses.root}>
      <Components.LoadingIcon className={oClasses.icon}></Components.LoadingIcon>
    </div>
  );
}

export default Index;
