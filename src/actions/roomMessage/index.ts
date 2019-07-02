let oRoomMessage: any = {
  show: (aMessages: any) => {
    debugger;
    return {
      type: 'SHOW_ROOM_MESSAGE',
      payload: aMessages
    };
  }
};

export default oRoomMessage;
