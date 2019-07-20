import React from 'react';

const Socket = React.createContext({
  chatroom: null,
  chatroomFile: null,
  chatroomUploader: null,
});

export default Socket;