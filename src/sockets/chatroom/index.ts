import oIo from "socket.io-client";
import { SOCKET } from "@/CONFIGS/";

let sChatroomUrl =
  SOCKET.HOST +
  (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
    ? ":" + SOCKET.PORT
    : "") +
  "/chatroom";

const oChatroomSocket = oIo(sChatroomUrl);

export default oChatroomSocket;

