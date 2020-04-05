let oRoomMessage: any = {
  show: (aRoomMessages: any) => {
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aRoomMessages
    };
  },

  willSend: (aRoomMessages: any) => {
    return {
      type: 'WILL_SEND_ROOM_MESSAGE',
      payload: aRoomMessages
    };
  },

  didSend: (aRoomMessages: any) => {
    return {
      type: 'DID_SEND_ROOM_MESSAGE',
      payload: aRoomMessages
    };
  },

};

export default oRoomMessage;
