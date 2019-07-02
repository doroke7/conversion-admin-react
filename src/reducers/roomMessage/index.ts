const oRoomMessage = (iState: any = [], oAction: any) => {
  let aMessages = oAction.payload;
  switch (oAction.type) {
    case 'SHOW_ROOM_MESSAGE':
      let _aMessages = [...iState, ...aMessages];
      return _aMessages;
    default:
      return iState;
  }
};

export default oRoomMessage;