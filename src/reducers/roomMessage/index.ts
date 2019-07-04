const oRoomMessage = (aMessages: any = [], oAction: any) => {
  let _aMessages = oAction.payload;
  let __aMessages = [];
  switch (oAction.type) {
    case 'SHOW_ROOM_MESSAGE':
      __aMessages = [...aMessages, ..._aMessages];
      return __aMessages;
    case 'WILL_SEND_ROOM_MESSAGE':
      __aMessages = [...aMessages, ..._aMessages];
      return __aMessages;

    case 'DID_SEND_ROOM_MESSAGE':
      debugger;
      let oMessage = _aMessages.pop();
      let iIndex = aMessages.length - 1;
      for(iIndex; iIndex >= 0 ; iIndex--) {
        let _oMessage = aMessages[iIndex];
        if (_oMessage.virtualId && oMessage.virtualId && _oMessage.virtualId === oMessage.virtualId) {
          aMessages[iIndex].loading = false;
        }
      }
      return aMessages;
    default:
      return aMessages;
  }
};

export default oRoomMessage;