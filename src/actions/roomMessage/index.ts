let oRoomMessage: any = {
  show: (aRoomMessages: any) => {
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aRoomMessages
    };
  },

  willSend: (aMessages: any) => {
    return {
      type: 'WILL_SEND_ROOM_MESSAGE',
      payload: aMessages
    };
  },

  didSend: (aMessages: any) => {
    return {
      type: 'DID_SEND_ROOM_MESSAGE',
      payload: aMessages
    };
  },

};

export default oRoomMessage;
