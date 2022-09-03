import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import store from '@/admin/store/index';
import router from '@/admin/router/index';
import CONFIGS from '@/CONFIGS/INDEX';
import Commons from '@/admin/Commons/Index';
import Components from '@/admin/Components/Index';
import Pages from '@/admin/Pages/Index';

import Helpers from '@/admin/Helpers/Index';
import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    open: true,
    routes: router.admin.routes
  });

  let cHandleContextmenu = (oEvent: any) => {
    if (CONFIGS.APP.ENV == 'MASTER') {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
    }
  };
  useEffect(() => {
    /*
     * sVer: 客户端上次打开时候 浏览器的版本号
     */
    let sVer = Helpers.Ver.get();
    let sJwt = Helpers.Authentication.getJwt();

    /**
     * TITLE: 开启清理 window.storage 开关， 且 客户端版本提高的情况下 => 清理 window.storage
     */
    if (CONFIGS.ADMIN.STORAGE) {
      if ((Helpers.Ver.valid(sVer) && Helpers.Ver.compare(CONFIGS.ADMIN.VER, sVer)) || !Helpers.Ver.valid(sVer)) {
        window.localStorage.clear();
        Helpers.Authentication.setJwt(sJwt);
      }
    }

    Helpers.Ver.set(CONFIGS.ADMIN.VER);
  });

  return (
    <StoreContext.Provider value={store}>
      <div className={oClasses.root} onContextMenu={cHandleContextmenu}>
        <Commons.Progress></Commons.Progress>
        <Commons.Alerts></Commons.Alerts>
        <Pages._></Pages._>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
