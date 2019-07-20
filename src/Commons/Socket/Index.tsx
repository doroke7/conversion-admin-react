import React from 'react';
import oIo from "socket.io-client";
// @ts-ignore
import SocketIOFileClient from "socket.io-file-client";
import SocketIOFileUpload from 'socketio-file-upload';

import {
  SOCKET,
} from '@/CONFIGS/';

let sChatroomUrl = SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT) ? ":" + SOCKET.PORT : "") + "/chatroom";

let oChatroomSocket = oIo(sChatroomUrl);
let oSocketIOFileClient = new SocketIOFileClient(oChatroomSocket);
const Socket = React.createContext({
  chatroom: oChatroomSocket,
  chatroomFile: oSocketIOFileClient
});

export default Socket;