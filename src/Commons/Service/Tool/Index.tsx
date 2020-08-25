import React from 'react';

const Tool = React.createContext({
  chatroom: null,
  chatroomFile: null,
  chatroomUploader: null,
  notification: false,
  isScrolling: false
});

export default Tool;
