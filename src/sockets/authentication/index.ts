import oIo from "socket.io-client";
import { SOCKET } from "@/CONFIGS/";

let sAuthenticationUrl =
  SOCKET.HOST +
  (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
    ? ":" + SOCKET.PORT
    : "") +
  "/authentication";

const oAuthenticationSocket = oIo(sAuthenticationUrl);

export default oAuthenticationSocket;

