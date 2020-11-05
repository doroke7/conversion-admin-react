import oIo from 'socket.io-client';
import { AuthenticationHelper } from '@/Helpers/';
import CONFIGS from '@/CONFIGS/';

const SOCKET = CONFIGS.SOCKET;

let sLoginUrl =
  SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || '80' !== SOCKET.PORT) ? ':' + SOCKET.PORT : '') + '/login';

const oLoginSocket = oIo(sLoginUrl);

let sJwt = AuthenticationHelper.getJwt();
let sChatroomUrl =
  SOCKET.HOST + (SOCKET.PORT && (80 !== SOCKET.PORT || '80' !== SOCKET.PORT) ? ':' + SOCKET.PORT : '') + '/chatroom';
let oOption = {
  query: {
    jwt: sJwt
  }
};
const oChatroomSocket = oIo(sChatroomUrl, oOption);

class SocketHelper {
  public constructor() {}
  public static login = oLoginSocket;
  public static chatroom = oChatroomSocket;
}

export default SocketHelper;
