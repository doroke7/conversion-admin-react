import React from 'react';
import { Provider } from 'react-redux'

import oIo from "socket.io-client";
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';

import store from '@/store';

import {
  Router,
  Header,
  Socket,
} from "@/Commons/";

import {
  SOCKET,
} from '@/CONFIGS/';

let sChatroomUrl = SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT) ? ":" + SOCKET.PORT : "") + "/chatroom";

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

  public render(){
    let oValue = {
      chatroom: this.chatroom, 
      chatroomFile: this.chatroomFile, 
      chatroomUploader: this.chatroomUploader
    };

    return (
        <Socket.Provider value={oValue}>
          <Header>
          </Header>
          <Router>
          </Router>
        </Socket.Provider>

    );
  }
}

export default App;
