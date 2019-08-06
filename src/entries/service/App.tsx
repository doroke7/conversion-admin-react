import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';

import oIo from 'socket.io-client';
// @ts-ignore
import SocketIOFileClient from 'socket.io-file-client';
import SocketIOFileUpload from 'socketio-file-upload';

import oRoutes from '@/routers';

import { Header, Socket } from '@/commons';

import { SOCKET } from '@/CONFIGS/';

let sChatroomUrl =
  SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || '80' !== SOCKET.PORT) ? ':' + SOCKET.PORT : '') + '/chatroom';

let oChatroomSocket = oIo(sChatroomUrl);
let oSocketIOFileClient = new SocketIOFileClient(oChatroomSocket);
let oSocketIOFileUploader = new SocketIOFileUpload(oChatroomSocket);

class App extends React.Component {
  public constructor(...oProps: any) {
    super(oProps);
    this.chatroom = oChatroomSocket;
    this.chatroomFile = oSocketIOFileClient;
    this.chatroomUploader = oSocketIOFileUploader;
  }

  public chatroom: any;
  public chatroomFile: any;
  public chatroomUploader: any;
  public login: any;

  public render() {
    let oValue = {
      chatroom: this.chatroom,
      chatroomFile: this.chatroomFile,
      chatroomUploader: this.chatroomUploader,
    };

    return (
      <Socket.Provider value={oValue}>
        <Header></Header>
        <BrowserRouter>{renderRoutes(oRoutes.service)}</BrowserRouter>
      </Socket.Provider>
    );
  }
}

export default App;
