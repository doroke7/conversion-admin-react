import React from 'react';
import oIo from "socket.io-client";

import {
  Router,
  Header,
  Socket,
} from "@/Commons/";

import {
  Socket as SocketHelper,
  Authentication as AuthenticationHelper,
} from '@/Helpers/';

import { SOCKET } from "@/CONFIGS/";


class App extends React.Component {

  public constructor(...oProps: any) {
    super(oProps);
    this.chatroom = SocketHelper.chatroom;
    this.authentication = SocketHelper.authentication;

    window.onstorage = (oEvent: any) => {
      let sJwt = AuthenticationHelper.getJwt();
      let sChatroomUrl = SOCKET.HOST + 
                        (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
                         ? ":" + SOCKET.PORT : "") +
                         "/chatroom";
      let oOption = {
        query: {
          jwt: sJwt
        }
      };
      let oChatroomSocket = oIo(sChatroomUrl, oOption);
      this.chatroom = oChatroomSocket;
    };
  }
  public chatroom: any;
  public authentication: any;

  public render(){
    return (
      <Socket.Provider value={{chatroom: this.chatroom, authentication: this.authentication}}>
        <Header>
        </Header>
        <Router>
        </Router>
      </Socket.Provider>
    );
  }
}

export default App;
