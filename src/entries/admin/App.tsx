import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {StoreContext} from 'redux-react-hook';
import store from '@/store';

import { renderRoutes } from 'react-router-config';

import oRoutes from '@/routers';

class App extends React.Component {
  public constructor(...oProps: any) {
    super(oProps);
  }

  public chatroom: any;
  public chatroomFile: any;
  public chatroomUploader: any;
  public login: any;

  public render() {
    return (
      <StoreContext.Provider value={store}>
        <BrowserRouter>{renderRoutes(oRoutes.admin)}</BrowserRouter>
      </StoreContext.Provider>
    );
  }
}

export default App;
