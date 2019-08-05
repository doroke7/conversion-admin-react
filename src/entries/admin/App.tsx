import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { renderRoutes } from 'react-router-config';

import oIo from "socket.io-client";
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';

import oRoutes from '@/routers';

import {
  Header,
  Socket,
} from "@/Commons/";

import {
  SOCKET,
} from '@/CONFIGS/';



class App extends React.Component {

  public constructor(...oProps: any) {
    super(oProps);

  }
  
  public chatroom: any;
  public chatroomFile: any;
  public chatroomUploader: any;
  public login: any;

  public render(){


    return (
      <>
        <BrowserRouter>
          {renderRoutes(oRoutes.admin)}
        </BrowserRouter>
      </>

    );
  }
}

export default App;
