import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import oIo from 'socket.io-client';
// @ts-ignore
import SocketIOFileClient from 'socket.io-file-client';
import SocketIOFileUpload from 'socketio-file-upload';

import router from '@/router';
import { Service } from '@/Commons';
import CONFIGS from '@/CONFIGS/';

const SOCKET = CONFIGS.SOCKET;

let sChatroomUrl =
  SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || '80' !== SOCKET.PORT) ? ':' + SOCKET.PORT : '') + '/chatroom';

let oChatroomSocket = oIo(sChatroomUrl);
let oSocketIOFileClient = new SocketIOFileClient(oChatroomSocket);
let oSocketIOFileUploader = new SocketIOFileUpload(oChatroomSocket);
let oNotificationEvent = new Event('notification', { bubbles: true, cancelable: false });

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
      notification: false,
      notificationEvent: oNotificationEvent,
      isScrolling: false
    };

    return (
      <Service.Tool.Provider value={oValue}>
        <Service.Header></Service.Header>
        <BrowserRouter>
          <Switch>
            {router.service.routes.map((oRoute, sIndex) => (
              <Route
                path={oRoute.path}
                key={sIndex}
                exact={oRoute.exact} /** 必须要使用 exact, 否则相同父级别路由会混肴 **/
                render={(oProps) => <oRoute.component />}></Route>
            ))}
          </Switch>
        </BrowserRouter>
      </Service.Tool.Provider>
    );
  }
}

export default App;
