let oRoomMessage: any = {
  show: (aMessages: any) => {
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aMessages
    };
  }
};

export default oRoomMessage;
