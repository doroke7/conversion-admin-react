import oIo from "socket.io-client";
import {
  Authentication as AuthenticationHelper,
} from '@/Helpers/';
import { SOCKET } from "@/CONFIGS/";

let sAuthenticationUrl =
  SOCKET.HOST +
  (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
    ? ":" + SOCKET.PORT
    : "") +
  "/authentication";

const oAuthenticationSocket = oIo(sAuthenticationUrl);

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
const oChatroomSocket = oIo(sChatroomUrl, oOption);

class SocketHelper {
  public constructor () {
  }
  public static authentication = oAuthenticationSocket;
  public static chatroom = oChatroomSocket;
};

export default SocketHelper;