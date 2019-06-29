import oIo from "socket.io-client";
import { SOCKET } from "@/CONFIGS/";

let sAuthenticationUrl =
  SOCKET.HOST +
  (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
    ? ":" + SOCKET.PORT
    : "") +
  "/authentication";

const oAuthenticationSocket = oIo(sAuthenticationUrl);

let sChatroomUrl =
  SOCKET.HOST +
  (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
    ? ":" + SOCKET.PORT
    : "") +
  "/chatroom";

const oChatroomSocket = oIo(sChatroomUrl);

class SocketHelper {
  public static authentication = oAuthenticationSocket;
  public static chatroomSocket = oChatroomSocket;
};

export default SocketHelper;