let oRoomMessage: any = {
  show: (aMessages: any) => {
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aMessages
    };
  },

  add: (aMessages: any) => {
    return {
      type: 'ADD_ROOM_MESSAGE',
      payload: aMessages
    };
  },

};

export default oRoomMessage;
