import React from 'react';
import oIo from "socket.io-client";





// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';





import {
  Router,
  Header,
  Socket,
} from "@/Commons/";

import {
  SocketHelper,
} from '@/Helpers/';


import {
  SOCKET,
} from '@/CONFIGS/';

let sChatroomUrl = SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT) ? ":" + SOCKET.PORT : "") + "/chatroom";

let oChatroomSocket = oIo(sChatroomUrl);
let oSocketIOFileClient = new SocketIOFileClient(oChatroomSocket);
class App extends React.Component {

  public constructor(...oProps: any) {
    super(oProps);
    this.chatroom = oChatroomSocket;
    this.chatroomFile = oSocketIOFileClient;
  }
  
  public chatroom: any;
  public chatroomFile: any;
  public login: any;

  public render(){
    return (
      <Socket.Provider value={{chatroom: this.chatroom, chatroomFile: this.chatroomFile}}>
        <Header>
        </Header>
        <Router>
        </Router>
      </Socket.Provider>
    );
  }
}

export default App;
