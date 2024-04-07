const SOCKET: any = {
  HOST: process.env.SOCKET_HOST || 'fea.socket.chatroom.ques98.cn',
  PORT: '',
  STATUS: process.env.SOCKET_STATUS ? JSON.parse(process.env.SOCKET_STATUS) : true
};

export default SOCKET;
