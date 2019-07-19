import React from 'react';
import oIo from "socket.io-client";

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

class App extends React.Component {

  public constructor(...oProps: any) {
    super(oProps);
    this.chatroom = oChatroomSocket;
  }
  
  public chatroom: any;
  public login: any;

  public render(){
    return (
      <Socket.Provider value={{chatroom: this.chatroom}}>
        <Header>
        </Header>
        <Router>
        </Router>
      </Socket.Provider>
    );
  }
}

export default App;
