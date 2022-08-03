import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import { Admin } from '@/Commons';
import store from '@/store';
import router from '@/router';
import CONFIGS from '@/CONFIGS';

class App extends React.Component {
  public constructor(...oProps: any) {
    super(oProps);
    this.handleContextmenu = this.handleContextmenu.bind(this);
  }

  public chatroom: any;
  public chatroomFile: any;
  public chatroomUploader: any;
  public login: any;
  public handleContextmenu(oEvent: any) {
    if (CONFIGS.APP.ENV == 'MASTER') {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
    }
  }
  /** 必须要使用 exact, 否则相同父级别路由会模糊匹配 **/
  // 具有 nav 的设定值 才会用 Navigatiob 包起来
  /* 把 page 丢人 Nav 的 children 中， 最后再由 tabs 解析*/
  /*
    NOTE: 
  */
  public render() {
    return (
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <div onContextMenu={this.handleContextmenu}>
            <Switch>
              {router.admin.routes.map((oRoute, sIndex) => (
                <Route path={oRoute.path} key={sIndex} exact={oRoute.exact}>
                  {oRoute?.nav ? (
                    <Admin.Navigation>
                      <oRoute.component />
                    </Admin.Navigation>
                  ) : (
                    <oRoute.component />
                  )}
                </Route>
              ))}
            </Switch>
          </div>
        </BrowserRouter>
      </StoreContext.Provider>
    );
  }
}

export default App;

// <Route exact path="/">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>
