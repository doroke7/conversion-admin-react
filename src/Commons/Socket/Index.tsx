import React from 'react';
import oIo from "socket.io-client";

import {
  SOCKET,
} from '@/CONFIGS/';

let sChatroomUrl = SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT) ? ":" + SOCKET.PORT : "") + "/chatroom";

let oChatroomSocket = oIo(sChatroomUrl);

const Socket = React.createContext({
  chatroom: oChatroomSocket,
});

export default Socket;