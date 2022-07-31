import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import { renderRoutes } from 'react-router-config';

import store from '@/store';
import oRoutes from '@/routers';
import CONFIGS from '@/CONFIGS';

class App extends React.Component {
  public constructor(...oProps: any) {
    super(oProps);
  }

  public render() {
    return <div>sssssssssss</div>;
  }
}

export default App;
