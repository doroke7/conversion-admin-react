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
      let iIndex;
      let oMessage = _aMessages.pop();
      if (!oMessage.virtualId) {
        oMessage.loading = false;
        if(0 === aMessages.length) {
          __aMessages.push(oMessage);
          return __aMessages;

        }

        if(0 < aMessages.length && new Date(oMessage.addedTime).getTime() >= new Date(aMessages[aMessages.length - 1].addedTime).getTime()) {
          __aMessages.push(oMessage);
          return __aMessages;

        }

        if (0 < aMessages.length && new Date(oMessage.addedTime).getTime() < new Date(aMessages[aMessages.length - 1].addedTime).getTime()) {
          iIndex = aMessages.length - 1;
          for(iIndex; iIndex >= 0 ; iIndex--) {
            let _oMessage = aMessages[iIndex];
  
            if (new Date(oMessage.addedTime).getTime() > new Date(_oMessage.addedTime).getTime() && !_oMessage.loading) {
              __aMessages.splice(iIndex + 1, 0, oMessage);
              break;
            }
            if (0 === iIndex) {
              __aMessages.splice(0, 0, oMessage);

            }
          }
  
        }

        return __aMessages;
      }

      if (oMessage.virtualId) {
        oMessage.loading = false;
        if(0 === aMessages.length) {
          // __aMessages.push(oMessage);
        }

        if (0 < aMessages.length) {
          iIndex = aMessages.length - 1;
          for(iIndex; iIndex >= 0 ; iIndex--) {
            let _oMessage = aMessages[iIndex];
  
            if (_oMessage.virtualId && oMessage.virtualId && _oMessage.virtualId === oMessage.virtualId) {
              aMessages[iIndex].loading = false;
              break;
            }

            if (new Date(oMessage.addedTime).getTime() < new Date(_oMessage.addedTime).getTime()) {
              break;
            }

          }
  
        }
        __aMessages = aMessages;
      }


      return __aMessages;
    default:
      return aMessages;
  }
};

export default oRoomMessage;