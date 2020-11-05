let oRoomMessageAction: any = {
  show: (aRoomsMessages: any) => {
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aRoomsMessages
    };
  },

  willSend: (aRoomsMessages: any) => {
    return {
      type: 'WILL_SEND_ROOM_MESSAGE',
      payload: aRoomsMessages
    };
  },

  didSend: (aRoomsMessages: any) => {
    return {
      type: 'DID_SEND_ROOM_MESSAGE',
      payload: aRoomsMessages
    };
  }
};

export default oRoomMessageAction;
