import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import store from '@/store';
import router from '@/router';
import CONFIGS from '@/CONFIGS';
import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);

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
      <BrowserRouter>
        <div className={oClasses.root} onContextMenu={cHandleContextmenu}>
          <Switch>
            {router.admin.routes.map((oRoute, sIndex) => (
              <Route
                path={oRoute.path}
                key={sIndex}
                exact={oRoute.exact}
                component={(oProps: any) => <oRoute.component routes={oRoute.routes} />}></Route>
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App;

// <Route exact path="/">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>
