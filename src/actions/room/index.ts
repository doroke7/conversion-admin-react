let oRoomAction: any = {
  show: (aRooms: any) => {
    return {
      type: 'SHOW_ROOM',
      payload: aRooms
    };
  },
  didSend: (aRooms: any) => {
    return {
      type: 'DID_SEND_ROOM',
      payload: aRooms
    };
  }
};

export default oRoomAction;
