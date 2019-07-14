import React from 'react';

import {
  Router,
  Header,
  Socket,
} from "@/Commons/";

import {
  SocketHelper,
} from '@/Helpers/';

import { SOCKET } from "@/CONFIGS/";


class App extends React.Component {

  public constructor(...oProps: any) {
    super(oProps);
    this.chatroom = SocketHelper.chatroom;
    this.login = SocketHelper.login;

  }
  public chatroom: any;
  public login: any;

  public render(){
    return (
      <Socket.Provider value={{chatroom: this.chatroom, login: this.login}}>
        <Header>
        </Header>
        <Router>
        </Router>
      </Socket.Provider>
    );
  }
}

export default App;
