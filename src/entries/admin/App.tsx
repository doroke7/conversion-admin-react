import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
      <>
        <BrowserRouter>{renderRoutes(oRoutes.admin)}</BrowserRouter>
      </>
        );
    }
}

export default App;
