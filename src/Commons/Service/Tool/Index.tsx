import React from 'react';

const Tool = React.createContext({
  chatroom: null,
  chatroomFile: null,
  chatroomUploader: null,
  notification: false,
});

export default Tool;