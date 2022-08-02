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

  public render() {
    return (
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <div onContextMenu={this.handleContextmenu}>
            <Switch>
              {router.admin.routes.map((oRoute, sIndex) => (
                <Route
                  path={oRoute.path}
                  key={sIndex}
                  exact={oRoute.exact} /** 必须要使用 exact, 否则相同父级别路由会混肴 **/
                >
                  <oRoute.component />
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
