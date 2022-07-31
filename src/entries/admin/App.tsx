import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreContext } from 'redux-react-hook';
import store from '@/store';

import { renderRoutes } from 'react-router-config';

import oRoutes from '@/routers';

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
    oEvent.stopPropagation(); // 取消 link
    oEvent.preventDefault(); // 取消 a tag 取消 href
  }

  public render() {
    return (
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <div onContextMenu={this.handleContextmenu}>{renderRoutes(oRoutes.admin)}</div>
        </BrowserRouter>
      </StoreContext.Provider>
    );
  }
}

export default App;
