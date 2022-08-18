import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import store from '@/store';
import router from '@/router';
import CONFIGS from '@/CONFIGS/INDEX';
import Commons from '@/Commons';
import Components from '@/Components';
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
  /**  必须要使用 exact, 否则相同父级别路由会模糊匹配 **/
  /**  具有 nav 的设定值 才会用 Navigatiob 包起来 **/
  /**  把 page 丢入 Nav 的 children 中， 最后再由 tabs 解析 **/
  /**  react-router-dom@5.0.0 <Route>比较麻烦 其下 组件是用 component={Componet} 而不是 component={<Component/>} */

  return (
    <StoreContext.Provider value={store}>
      <div className={oClasses.root} onContextMenu={cHandleContextmenu}>
        <Commons.Admin.Progress></Commons.Admin.Progress>
        <Commons.Admin.Alerts></Commons.Admin.Alerts>
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
      </div>
    </StoreContext.Provider>
  );
}

export default App;

// <Route exact path="/">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>
