const SOCKET: any = {
  HOST: process.env.SOCKET_HOST || 'fea.socket.chatroom.ques98.cn',
  PORT: '',
  STATUS: typeof JSON.parse(process.env.SOCKET_STATUS) !== 'undefined' ? JSON.parse(process.env.SOCKET_STATUS) : true
};

export default SOCKET;
