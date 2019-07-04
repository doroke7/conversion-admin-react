const oRoomMessage = (mState: any = [], oAction: any) => {
  let aMessages = oAction.payload;
  let _aMessages = [];
  switch (oAction.type) {
    case 'SHOW_ROOM_MESSAGE':
      _aMessages = [...mState, ...aMessages];
      return _aMessages;
    case 'WILL_SEND_ROOM_MESSAGE':
      _aMessages = [...mState, ...aMessages];
      return _aMessages;

    case 'DID_SEND_ROOM_MESSAGE':
      _aMessages = [...mState, ...aMessages];
      debugger;
      return _aMessages;
    default:
      return mState;
  }
};

export default oRoomMessage;